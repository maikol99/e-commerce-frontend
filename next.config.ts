import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode:true,
  images:{
    domains:[
      'images.unsplash.com',
      'media.istockphoto.com',
      'res.cloudinary.com',
      'localhost',
      'lh3.googleusercontent.com',
    ]
  }
};

export default nextConfig;
