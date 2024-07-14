/** @type {import('next').NextConfig} */
const withPlugins = require('next-compose-plugins');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const nextConfig = {
  trailingSlash: true,
  reactStrictMode: true,
  // Enable source map if needed
  productionBrowserSourceMaps: true,
};

module.exports = withPlugins(
  [
    [withBundleAnalyzer],
    // your other plugins here
  ],
  nextConfig,
);
