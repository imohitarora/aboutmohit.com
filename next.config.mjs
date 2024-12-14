/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.aboutmohit.com",
        port: "",
        pathname: "/avatar-mohit.jpeg",
        search: "",
      },
      // img.icons8.com
      {
        protocol: "https",
        hostname: "img.icons8.com",
        port: "",
        pathname: "/**",
        search: "",
      },
    ],
  },
};

export default nextConfig;
