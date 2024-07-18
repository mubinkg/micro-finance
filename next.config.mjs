/** @type {import('next').NextConfig} */
const nextConfig = {
  crossOrigin: 'anonymous',
  experimental: {
    missingSuspenseWithCSRBailout: false,
  },
  webpack: (config) => {
    config.resolve.alias.canvas = false;
    return config;
  },
  images: {
    remotePatterns: [{
      protocol: 'https',
      hostname: 'zimbacash-bucket.s3.amazonaws.com',
      port: '',
      pathname: '/**'
    }]
  },
}

export default nextConfig;
