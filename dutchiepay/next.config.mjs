/** @type {import('next').NextConfig} */
const IMAGE_BUCKET = process.env.NEXT_PUBLIC_IMAGE_BUCKET;

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
  async redirects() {
    return [
      {
        source: '/mypage',
        destination: '/mypage/info',
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: `${IMAGE_BUCKET}.s3.amazonaws.com`,
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
