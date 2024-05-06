// RETURNS USER EMAIL AFTER SUCCESSFUL VERIFICATION

import httpstatus from "http-status";
import { Payload } from "payload";
import errors from "payload/dist/errors";
import { commitTransaction } from "payload/dist/utilities/commitTransaction";
import { createLocalReq } from "payload/dist/utilities/createLocalReq";
import { initTransaction } from "payload/dist/utilities/initTransaction";
import { killTransaction } from "payload/dist/utilities/killTransaction";

async function _customVerifyEmail(args: {
  collection: any;
  req: any;
  token: string;
}) {
  const { collection, req, token } = args;
  if (!Object.prototype.hasOwnProperty.call(args, "token")) {
    throw new errors.APIError("Missing required data.", httpstatus.BAD_REQUEST);
  }
  try {
    const shouldCommit = await initTransaction(req);
    const user = await req.payload.db.findOne({
      collection: collection.config.slug,
      req,
      where: {
        _verificationToken: {
          equals: token,
        },
      },
    });
    if (!user)
      throw new errors.APIError(
        "Verification token is invalid.",
        httpstatus.BAD_REQUEST
      );
    if (user && user._verified === true)
      throw new errors.APIError(
        "This account has already been activated.",
        httpstatus.ACCEPTED
      );
    await req.payload.db.updateOne({
      id: user.id,
      collection: collection.config.slug,
      data: {
        ...user,
        _verificationToken: null,
        _verified: true,
      },
      req,
    });
    if (shouldCommit) await commitTransaction(req);

    return user.email;
  } catch (error) {
    await killTransaction(req);
    throw error;
  }
}

export async function customVerifyEmail(
  payload: Payload,
  options: { collection: string; token: string }
) {
  const { collection: collectionSlug, token } = options;
  const collection = payload.collections[collectionSlug];
  if (!collection) {
    throw new errors.APIError(
      `The collection with slug ${String(
        collectionSlug
      )} can't be found. Verify Email Operation.`
    );
  }
  const req = createLocalReq(options, payload);
  return _customVerifyEmail({
    collection,
    req,
    token,
  });
}
