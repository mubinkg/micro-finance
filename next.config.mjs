/** @type {import('next').NextConfig} */
const nextConfig = {
    crossOrigin: 'anonymous',
    experimental: {
        missingSuspenseWithCSRBailout: false,
    },
}

export default nextConfig;
