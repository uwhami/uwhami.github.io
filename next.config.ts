import type { NextConfig } from "next";


const nextConfig: NextConfig = {
    output: "export",
    images: { // next/image 사용 시 추가
        unoptimized: true,
    },
};
export default nextConfig;
