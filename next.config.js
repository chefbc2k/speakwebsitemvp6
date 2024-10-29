/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { 
    unoptimized: false,
    domains: [
      'picsum.photos',
      'images.unsplash.com'
    ]
  },
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  transpilePackages: ['react-map-gl', 'mapbox-gl'],
};

module.exports = nextConfig;