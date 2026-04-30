/** @type {import('next').NextConfig} */
const createNextIntlPlugin = require('next-intl/plugin');

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'web.komdigi.go.id'],
  },
};

module.exports = withNextIntl(nextConfig);
