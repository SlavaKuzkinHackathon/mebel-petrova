/** @type {import('next').NextConfig} */
/* const nextConfig = {
  reactStrictMode: true,
}

module.exports = nextConfig */

module.exports = {
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL,
    
  },
  images: {
    domains: [
      'localhost:5000'
    ],
  }
};