/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true,
  },

  env: {
    AWS_REGION:process.env.AWS_REGION,
    ACCESS_KEY:process.env.ACCESS_KEY,
    SECRET_KEY:process.env.SECRET_KEY,
    BUCKET_NAME:process.env.BUCKET_NAME,
  },
/*   env:{
    TOSS_SECRET_SECRET:process.env.TOSS_SECRET_SECRET
  }, */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.pexels.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

module.exports = nextConfig;
