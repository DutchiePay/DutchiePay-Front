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
  images: {
    domains: [
      'https://d2m4bskl88m9ql.cloudfront.net',
      `https://${process.env.NEXT_PUBLIC_IMAGE_BUCKET}.s3.amazonaws.com`,
    ],
    unoptimized: true,
  },
};

export default nextConfig;
