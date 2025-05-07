import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "i.imgur.com",
      "placehold.co",
      "www.google.com",
      "www.pexels.com",
      "www.shutterstock.com",
      "static.vecteezy.com",
      "api.lorem.space",
      "placeimg.com",
      "picsum.photos",
      "api.escuelajs.co",
      "cdn.lorem.space",
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
