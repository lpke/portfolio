import nextMDX from '@next/mdx';
import type { NextConfig } from 'next';

const withMDX = nextMDX({ extension: /\.mdx?$/ });

const nextConfig: NextConfig = withMDX({
  reactStrictMode: true,
  reactCompiler: true,
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
  images: {
    deviceSizes: [
      320, 420, 768, 1024, 1200, 1440, 1920, 2560, 3000, 3500, 4000,
    ],
  },
});

export default nextConfig;
