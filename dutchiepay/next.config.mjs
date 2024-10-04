/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

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
  images: {
    domains: ['https://d2m4bskl88m9ql.cloudfront.net'],
    unoptimized: true,
  },
  assetPrefix: isProd ? 'https://d2m4bskl88m9ql.cloudfront.net' : '',
  output: 'export',
  trailingSlash: true,
};

export default nextConfig;
