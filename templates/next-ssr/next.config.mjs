import withSvgr from 'next-plugin-svgr';

/** @type {import('next').NextConfig} */
const nextConfig = withSvgr({
  experimental: {
    reactCompiler: true,
  },
  svgrOptions: {
    icon: true,
    titleProp: true,
  },
});

export default nextConfig;
