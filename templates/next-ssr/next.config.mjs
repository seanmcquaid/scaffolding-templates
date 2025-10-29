/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    reactCompiler: true,
  },
  svgrOptions: {
    icon: true,
    titleProp: true,
  },
};

export default nextConfig;
