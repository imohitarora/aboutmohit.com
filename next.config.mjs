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
    ],
  },
};

export default nextConfig;
