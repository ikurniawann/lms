/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'web.komdigi.go.id'],
  },
  // Force no-cache for fresh deploys
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'Cache-Control',
          value: 'no-store, max-age=0',
        },
      ],
    },
  ],
};

module.exports = withNextIntl(nextConfig);
