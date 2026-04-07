/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Build-time fallbacks so the app compiles without .env.local.
  // Real values from Vercel environment variables take over at runtime.
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://build-placeholder.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'build-placeholder-anon-key',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'xvfevfvqqlonzoxbehrc.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      // All Supabase storage buckets (covers any project URL)
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
    ],
  },
};

module.exports = nextConfig;
