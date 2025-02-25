/** @type {import('next').NextConfig} */
const nextConfig = {
     // set proxy for api
     async rewrites() {
          return [
               {
                    source: "/api/:path*",
                    destination: "https://dashboard.satmoney.in/api/:path*",
               },
          ];
     },
};

export default nextConfig;
