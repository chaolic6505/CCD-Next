/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        staleTimes: {
            dynamic: 0,
            static: 180,
        }
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "utfs.io",
            },
        ],
    },
};

const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(nextConfig);
