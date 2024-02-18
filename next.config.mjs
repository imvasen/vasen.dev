/** @type {import('next').NextConfig} */
const nextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/directus-assets/:path*',
        destination: 'https://vasen-directus.azurewebsites.net/assets/:path*',
      },
    ];
  },
};

export default nextConfig;
