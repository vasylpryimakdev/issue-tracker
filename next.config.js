const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'referrer-policy', value: 'no-referrer' }
        ]
      }
    ];
  },
  webpack(config, { isServer }) {
    config.resolve.alias['@'] = path.resolve(__dirname);

    if (isServer) {
      config.resolve.fallback = { fs: false };
    }

    return config;
  },
};

module.exports = nextConfig;