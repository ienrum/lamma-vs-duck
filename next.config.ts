import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        hostname: 'lh3.googleusercontent.com',
      },
      {
        hostname: 'api.dicebear.com',
      },
    ],
  },
  async headers() {
    return process.env.NODE_ENV !== 'production'
      ? [
          {
            source: '/:path*',
            headers: [
              {
                key: 'Referrer-Policy',
                value: 'no-referrer-when-downgrade',
              },
              { key: 'Access-Control-Allow-Credentials', value: 'true' },
              { key: 'Access-Control-Allow-Origin', value: '*' },
              { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
              {
                key: 'Access-Control-Allow-Headers',
                value:
                  'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
              },
            ],
          },
        ]
      : [];
  },
};

export default nextConfig;
