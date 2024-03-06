import dotenv from "dotenv";
import path from "path";
import { InitOptions } from "payload/config";
import { Payload, getPayload } from "payload/dist/payload";
import config from "./payload.config";

dotenv.config({
  path: path.resolve(__dirname, "../../.env"),
});

let cached: {
  client: Payload | null;
  promise: Promise<Payload> | null;
} = (global as any).payload;

if (!cached) {
  cached = (global as any).payload = { client: null, promise: null };
}

interface Args {
  initOptions?: Partial<InitOptions>;
  seed?: boolean;
}

const getPayloadClient = async ({
  initOptions,
  seed,
}: Args = {}): Promise<Payload> => {
  if (!process.env.MONGODB_URI) {
    throw new Error("MONGODB_URI environment variable is missing");
  }
  if (!process.env.PAYLOAD_SECRET) {
    throw new Error("PAYLOAD_SECRET environment variable is missing");
  }
  if (cached.client) {
    return cached.client;
  }
  if (!cached.promise) {
    cached.promise = getPayload({
      // Make sure that your environment variables are filled out accordingly
      email: {
        fromAddress: process.env.EMAIL_USER!,
        fromName: process.env.EMAIL_NAME!,
        transportOptions: {
          host: "smtp.gmail.com",
          secure: true,
          port: 465,
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD,
          },
        },
      },
      secret: process.env.PAYLOAD_SECRET as string,
      config: config,
    });
  }
  try {
    cached.client = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }
  return cached.client;
};

export default getPayloadClient;
