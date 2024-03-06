const path = require("path");
const { withPayload } = require("@payloadcms/next-payload");

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true,
  },
};

module.exports = withPayload(nextConfig, {
  configPath: path.resolve(__dirname, "./src/payload/payload.config.ts"),
  payloadPath: path.resolve(process.cwd(), "./src/payload/payloadClient.ts"),
  adminRoute: "/admin",
});
