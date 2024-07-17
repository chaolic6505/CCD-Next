/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['utfs.io']
    }
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer(nextConfig);
