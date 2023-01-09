/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    minimumCacheTTL: 60,
    remotePatterns: [
      {
        protocol: 'https',
        // hostname: 'source.unsplash.com/**'
        hostname: 'images.unsplash.com/**'
      }
    ]
  }
};
