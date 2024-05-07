// DOESN'T REQUIRE PASSWORD
// DOESN'T REQUIRE VERIFIED

import type { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { GeneratedTypes, Payload, RequestContext } from "payload";
import { getFieldsToSign } from "payload/dist/auth/operations/getFieldsToSign";
import { resetLoginAttempts } from "payload/dist/auth/strategies/local/resetLoginAttempts";
import { User } from "payload/dist/auth/types";
import { Collection } from "payload/dist/collections/config/types";
import { getDataLoader } from "payload/dist/collections/dataloader";
import { buildAfterOperation } from "payload/dist/collections/operations/utils";
import { AuthenticationError } from "payload/dist/errors";
import APIError from "payload/dist/errors/APIError";
import { setRequestContext } from "payload/dist/express/setRequestContext";
import { PayloadRequest } from "payload/dist/express/types";
import { afterRead } from "payload/dist/fields/hooks/afterRead";
import { i18nInit } from "payload/dist/translations/init";
import { commitTransaction } from "payload/dist/utilities/commitTransaction";
import getCookieExpiration from "payload/dist/utilities/getCookieExpiration";
import { initTransaction } from "payload/dist/utilities/initTransaction";
import { killTransaction } from "payload/dist/utilities/killTransaction";
import sanitizeInternalFields from "payload/dist/utilities/sanitizeInternalFields";

type Result = {
  exp?: number;
  token?: string;
  user?: User;
};

type Arguments = {
  collection: Collection;
  data: {
    email: string;
  };
  depth?: number;
  overrideAccess?: boolean;
  req: PayloadRequest;
  res?: Response;
  showHiddenFields?: boolean;
};

async function _customLogin<TSlug extends keyof GeneratedTypes["collections"]>(
  incomingArgs: Arguments
): Promise<Result & { user: GeneratedTypes["collections"][TSlug] }> {
  let args = incomingArgs;

  try {
    const shouldCommit = await initTransaction(args.req);

    // /////////////////////////////////////
    // beforeOperation - Collection
    // /////////////////////////////////////

    await args.collection.config.hooks.beforeOperation.reduce(
      async (priorHook, hook) => {
        await priorHook;

        args =
          (await hook({
            args,
            collection: args.collection?.config,
            context: args.req.context,
            operation: "login",
            req: args.req,
          })) || args;
      },
      Promise.resolve()
    );

    const {
      collection: { config: collectionConfig },
      data,
      depth,
      overrideAccess,
      req,
      req: {
        payload,
        payload: { config, secret },
      },
      showHiddenFields,
    } = args;

    // /////////////////////////////////////
    // Login
    // /////////////////////////////////////

    const { email: unsanitizedEmail } = data;

    const email = unsanitizedEmail
      ? unsanitizedEmail.toLowerCase().trim()
      : null;

    let user = await payload.db.findOne<any>({
      collection: collectionConfig.slug,
      req,
      where: { email: { equals: email?.toLowerCase() } },
    });

    if (!user) {
      throw new AuthenticationError(req.t);
    }

    user = sanitizeInternalFields(user);

    const maxLoginAttemptsEnabled =
      args.collection.config.auth.maxLoginAttempts > 0;

    if (maxLoginAttemptsEnabled) {
      await resetLoginAttempts({
        collection: collectionConfig,
        doc: user,
        payload: req.payload,
        req,
      });
    }

    const fieldsToSign = getFieldsToSign({
      collectionConfig,
      email: email as string,
      user,
    });

    await collectionConfig.hooks.beforeLogin.reduce(async (priorHook, hook) => {
      await priorHook;

      user =
        (await hook({
          collection: args.collection?.config,
          context: args.req.context,
          req: args.req,
          user,
        })) || user;
    }, Promise.resolve());

    const token = jwt.sign(fieldsToSign, secret, {
      expiresIn: collectionConfig.auth.tokenExpiration,
    });

    if (args.res) {
      const cookieOptions: CookieOptions = {
        domain: undefined,
        expires: getCookieExpiration(collectionConfig.auth.tokenExpiration),
        httpOnly: true,
        path: "/",
        sameSite: collectionConfig.auth.cookies.sameSite,
        secure: collectionConfig.auth.cookies.secure,
      };

      if (collectionConfig.auth.cookies.domain)
        cookieOptions.domain = collectionConfig.auth.cookies.domain;

      args.res.cookie(`${config.cookiePrefix}-token`, token, cookieOptions);
    }

    req.user = user;

    // /////////////////////////////////////
    // afterLogin - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterLogin.reduce(async (priorHook, hook) => {
      await priorHook;

      user =
        (await hook({
          collection: args.collection?.config,
          context: args.req.context,
          req: args.req,
          token,
          user,
        })) || user;
    }, Promise.resolve());

    // /////////////////////////////////////
    // afterRead - Fields
    // /////////////////////////////////////

    user = await afterRead({
      collection: collectionConfig,
      context: req.context,
      depth: depth as number,
      doc: user,
      global: null,
      overrideAccess: overrideAccess as boolean,
      req,
      showHiddenFields: showHiddenFields as boolean,
      locale: undefined as any,
      fallbackLocale: undefined as any,
    });

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook;

      user =
        (await hook({
          collection: args.collection?.config,
          context: req.context,
          doc: user,
          req,
        })) || user;
    }, Promise.resolve());

    // /////////////////////////////////////
    // afterRead - Collection
    // /////////////////////////////////////

    await collectionConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
      await priorHook;

      user =
        (await hook({
          collection: args.collection?.config,
          context: req.context,
          doc: user,
          req,
        })) || user;
    }, Promise.resolve());

    let result: Result & { user: GeneratedTypes["collections"][TSlug] } = {
      exp: (jwt.decode(token) as jwt.JwtPayload).exp,
      token,
      user,
    };

    // /////////////////////////////////////
    // afterOperation - Collection
    // /////////////////////////////////////

    result = await buildAfterOperation<GeneratedTypes["collections"][TSlug]>({
      args: { ...args, data: { ...args.data, password: "" } },
      collection: args.collection?.config,
      operation: "login",
      result,
    });

    if (collectionConfig.auth.removeTokenFromResponses) {
      delete result.token;
    }

    // /////////////////////////////////////
    // Return results
    // /////////////////////////////////////

    if (shouldCommit) await commitTransaction(req);

    return result;
  } catch (error: unknown) {
    await killTransaction(args.req);
    throw error;
  }
}

type Options<TSlug extends keyof GeneratedTypes["collections"]> = {
  collection: TSlug;
  context?: RequestContext;
  data: {
    email: string;
    password: string;
  };
  depth?: number;
  fallbackLocale?: string;
  locale?: string;
  overrideAccess?: boolean;
  req?: PayloadRequest;
  res?: Response;
  showHiddenFields?: boolean;
};

export async function customLogin<
  TSlug extends keyof GeneratedTypes["collections"]
>(
  payload: Payload,
  options: Omit<Options<TSlug>, "data"> & { data: { email: string } }
): Promise<Result & { user: GeneratedTypes["collections"][TSlug] }> {
  const {
    collection: collectionSlug,
    context,
    data,
    depth,
    fallbackLocale: fallbackLocaleArg = options?.req?.fallbackLocale,
    locale: localeArg = null,
    overrideAccess = true,
    req = {} as PayloadRequest,
    res,
    showHiddenFields,
  } = options;
  setRequestContext(req, context);

  const collection = payload.collections[collectionSlug];
  const localizationConfig = payload?.config?.localization;
  const defaultLocale = localizationConfig
    ? localizationConfig.defaultLocale
    : null;
  const locale = localeArg || req?.locale || defaultLocale;
  const fallbackLocale = localizationConfig
    ? localizationConfig.locales.find(({ code }) => locale === code)
        ?.fallbackLocale
    : null;

  if (!collection) {
    throw new APIError(
      `The collection with slug ${String(
        collectionSlug
      )} can't be found. Login Operation.`
    );
  }

  req.payloadAPI = req.payloadAPI || "local";
  req.payload = payload;
  req.i18n = i18nInit(payload.config.i18n);

  if (!req.t) req.t = req.i18n.t;
  if (!req.payloadDataLoader) req.payloadDataLoader = getDataLoader(req);

  const args = {
    collection,
    data,
    depth,
    overrideAccess,
    req,
    res,
    showHiddenFields,
  };

  if (locale) args.req.locale = locale;
  if (fallbackLocale) {
    args.req.fallbackLocale =
      typeof fallbackLocaleArg !== "undefined"
        ? fallbackLocaleArg
        : fallbackLocale || (defaultLocale as string | undefined);
  }

  return _customLogin<TSlug>(args);
}
