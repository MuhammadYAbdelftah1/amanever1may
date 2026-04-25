# Image Optimization Guide

This document describes the image optimization strategy implemented for the Aman Ever website.

## Overview

All images are optimized using Next.js Image component with the following features:
- **Modern Formats**: Automatic WebP and AVIF conversion
- **Responsive Sizing**: Multiple breakpoints for different devices
- **Lazy Loading**: Below-fold images load on demand
- **Quality Control**: Balanced quality settings for optimal file size
- **Layout Stability**: Proper dimensions to prevent layout shift

## Configuration

### Next.js Image Config (`next.config.ts`)

```typescript
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  minimumCacheTTL: 31536000, // 1 year
}
```

## Responsive Breakpoints

| Breakpoint | Width | Use Case |
|------------|-------|----------|
| 640px | Mobile | Small phones |
| 750px | Mobile | Large phones |
| 828px | Tablet | Small tablets |
| 1080px | Tablet | Large tablets |
| 1200px | Desktop | Small desktops |
| 1920px | Desktop | Full HD displays |
| 2048px | Desktop | 2K displays |
| 3840px | Desktop | 4K displays |

## Image Usage Patterns

### 1. Logo (Above-fold, Priority)

```tsx
<Image
  src="/images/logo.jpeg"
  alt="أمان إيفر - Aman Ever"
  width={200}
  height={67}
  priority // Load immediately
  quality={90} // Higher quality for branding
  sizes="(max-width: 640px) 120px, (max-width: 768px) 160px, 200px"
/>
```

**Optimization:**
- `priority`: Loads immediately (above-fold)
- `quality={90}`: Higher quality for brand consistency
- Fixed dimensions prevent layout shift
- Responsive sizes for different viewports

### 2. Hero/Feature Images (Full-width)

```tsx
<Image
  src="/images/about/vision.jpg"
  alt="Our Vision for the Future"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, (max-width: 1280px) 90vw, 1200px"
  loading="lazy"
  quality={85}
/>
```

**Optimization:**
- `fill`: Responsive container-based sizing
- `loading="lazy"`: Deferred loading for below-fold
- `quality={85}`: Balanced quality/size ratio
- `sizes`: Precise viewport-based sizing

### 3. Content Images (Grid/Cards)

```tsx
<Image
  src="/images/about/team.jpg"
  alt="Aman Ever Team"
  fill
  className="object-cover"
  sizes="(max-width: 768px) 100vw, 50vw"
  loading="lazy"
  quality={85}
/>
```

**Optimization:**
- `sizes="50vw"`: Half viewport width on desktop
- `loading="lazy"`: Below-fold optimization
- Container-based responsive sizing

## Quality Settings

| Image Type | Quality | Rationale |
|------------|---------|-----------|
| Logo | 90 | Brand consistency, small file |
| Hero Images | 85 | Balance quality/performance |
| Content Images | 85 | Good quality, reasonable size |
| Thumbnails | 75 | Default, sufficient for small sizes |

## Lazy Loading Strategy

### Priority Loading (Above-fold)
- Logo in header
- Hero section images
- First viewport content

### Lazy Loading (Below-fold)
- About page images
- Vision page images
- Service images
- Footer content

## Favicon and Brand Assets

### Favicon Configuration

The logo is used as the favicon with multiple sizes:

```typescript
icons: {
  icon: [
    { url: '/images/logo.jpeg', sizes: '32x32', type: 'image/jpeg' },
    { url: '/images/logo.jpeg', sizes: '16x16', type: 'image/jpeg' },
  ],
  apple: [
    { url: '/images/logo.jpeg', sizes: '180x180', type: 'image/jpeg' },
  ],
}
```

### Web App Manifest

Located at `/public/manifest.json`:
- App name and description
- Theme color: `#5E8F8F` (primary brand color)
- Icons for PWA installation
- RTL direction support

## Performance Impact

### Before Optimization
- Large JPEG files served at full resolution
- No format conversion
- No lazy loading
- Potential layout shift

### After Optimization
- Automatic WebP/AVIF conversion (30-50% smaller)
- Responsive sizing (only load needed resolution)
- Lazy loading (faster initial page load)
- No layout shift (dimensions specified)

### Expected Improvements
- **Page Load Time**: 20-40% faster
- **Bandwidth Usage**: 30-50% reduction
- **Lighthouse Score**: +5-10 points
- **Core Web Vitals**: Improved LCP and CLS

## Best Practices

### DO ✅
- Use `priority` for above-fold images
- Specify `width` and `height` for static images
- Use `fill` for responsive containers
- Define accurate `sizes` attribute
- Use `loading="lazy"` for below-fold images
- Set appropriate `quality` based on image type
- Use descriptive `alt` text

### DON'T ❌
- Use `priority` on all images (defeats purpose)
- Omit `sizes` attribute (causes oversized downloads)
- Use `quality={100}` (unnecessarily large files)
- Skip `alt` text (accessibility issue)
- Use `loading="eager"` unless necessary
- Forget to test on slow connections

## Testing Checklist

- [ ] Images load in WebP/AVIF on supported browsers
- [ ] Responsive images load correct sizes at each breakpoint
- [ ] Above-fold images load immediately
- [ ] Below-fold images lazy load
- [ ] No layout shift during image loading
- [ ] Favicon displays correctly in browser tabs
- [ ] PWA icons work on mobile devices
- [ ] Images work in all three locales (ar, en, ur)
- [ ] Alt text is appropriate and localized
- [ ] Performance metrics improved (Lighthouse)

## Monitoring

### Key Metrics to Track
- **LCP (Largest Contentful Paint)**: Should be < 2.5s
- **CLS (Cumulative Layout Shift)**: Should be < 0.1
- **Image Load Time**: Monitor via Network tab
- **Format Adoption**: Check WebP/AVIF usage rate
- **Cache Hit Rate**: Monitor CDN cache performance

### Tools
- Chrome DevTools Network tab
- Lighthouse CI
- WebPageTest
- Next.js Analytics

## Future Enhancements

1. **Blur Placeholders**: Generate blur data URLs for smoother loading
2. **Art Direction**: Different images for mobile vs desktop
3. **Image CDN**: Consider using dedicated image CDN
4. **Optimized Favicons**: Generate PNG favicons from logo
5. **Responsive Logo**: Different logo sizes for mobile/desktop
6. **Image Sprites**: Combine small icons into sprites

## Resources

- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Web.dev Image Optimization](https://web.dev/fast/#optimize-your-images)
- [MDN Responsive Images](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images)
