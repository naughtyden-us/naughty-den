/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Enable strict type checking in production
    ignoreBuildErrors: false,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      // You should add all other external image hosts here as well.
      // For example, if you use placehold.co and Google's user content:
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // ...other configurations like images
};


export default nextConfig;