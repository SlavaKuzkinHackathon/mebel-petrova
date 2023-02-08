
const nextConfig  = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_API_URL:
      process.env.NEXT_PUBLIC_API_URL,
    
  },
  images: {
      domains: [
          "localhost",
          "2.gravatar.com",
          "0.gravatar.com",
          "secure.gravatar.com",
      ],
  },
};




module.exports = nextConfig