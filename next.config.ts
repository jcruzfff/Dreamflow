import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Permissions-Policy',
            value: 'payment=(self "https://square.link" "https://checkout.square.site" "https://calendly.com" "https://assets.calendly.com" "https://www.recaptcha.net" "https://recaptcha.net")',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
