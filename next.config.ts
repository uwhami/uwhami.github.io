import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
    output: "export",
    basePath: isProd ? "/uwhami.github.io" : "",
    assetPrefix: isProd ? "/uwhami.github.io/" : "",
};

export default nextConfig;
