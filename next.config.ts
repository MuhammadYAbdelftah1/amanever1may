import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

// Bundle analyzer configuration (enable with ANALYZE=true npm run build)
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig: NextConfig = {
  // Enable tree-shaking and optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Optimize production builds
  productionBrowserSourceMaps: false,
  
  // Enable experimental optimizations
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', '@radix-ui/react-dialog', '@radix-ui/react-slot'],
  },

  images: {
    // Enable modern image formats (WebP and AVIF)
    formats: ['image/avif', 'image/webp'],
    
    // Responsive breakpoints for device sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    
    // Icon and small image sizes
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    
    // Image optimization quality (default: 75)
    // Lower values = smaller files, higher values = better quality
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year cache
    
    // Disable static image imports optimization in favor of runtime optimization
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    
    // Remote image domains
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Configure headers for caching
  async headers() {
    return [
      {
        // Cache static assets (images, fonts, etc.)
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache fonts
        source: '/:path*.woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache manifest and icons
        source: '/manifest.json',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, must-revalidate',
          },
        ],
      },
    ];
  },
};

export default withBundleAnalyzer(withNextIntl(nextConfig));
