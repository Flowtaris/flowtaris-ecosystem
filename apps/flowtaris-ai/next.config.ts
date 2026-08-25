import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ['@repo/ui', '@flowtaris/cms-client', '@flowtaris/supabase-client', '@flowtaris/analytics', '@flowtaris/seo'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
      {
        protocol: 'https',
        hostname: 'flowtaris.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      // Supabase Storage — for admin-uploaded logos and assets
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // Allow any HTTPS image URL (for external logo URLs set by admin)
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  env: {
    // Ensure internal API fetches work in SSR/ISR contexts
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL ?? 'https://flowtaris.ai',
  },
};

export default nextConfig;