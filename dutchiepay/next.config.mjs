/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/map-reversegeocode/:path*',
        destination:
          'https://naveropenapi.apigw.ntruss.com/map-reversegeocode/v2/:path*',
      },
    ];
  },
  images: { unoptimized: true },
  output: 'export',
};

export default nextConfig;
