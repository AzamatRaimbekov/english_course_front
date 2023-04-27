/** @type {import('next').NextConfig} */

const nextConfig = {
  compiler: {
    reactStrictMode: true,
    styledComponents: true,
  },
  experimental: {
    appDir: false,
  },
  reactStrictMode: false,
  swcMinify: true,
  pageExtensions: ["page.tsx", "page.ts", "page.jsx", "page.js"],
  sassOptions: {
    includePaths: ["./src"],
    // prependData: `@import "./styles/vars/temp.scss";`,
  },

  async rewrites() {
    return [
      {
        source: '/localhost/:path*',
        destination: 'http://localhost:4444/:path*',
      },
      {
        source: '/localhost/:path*',
        destination: 'http://localhost:3000/:path*',
      },
    ]
  },

};

module.exports = nextConfig;
