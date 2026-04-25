# Implementation Plan: Aman Ever Website

## Overview

This implementation plan breaks down the Aman Ever website into discrete, actionable coding tasks. The website is a multi-language (Arabic, English, Urdu), RTL-supported Next.js application with a clean, minimal design and subtle animations. The implementation follows a mobile-first approach and prioritizes accessibility and performance.

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS, shadcn/ui, next-intl, Framer Motion, lucide-react

**Key Features:** YouTube hero video background, multi-language support with RTL/LTR layouts, responsive design, subtle animations, IBM Plex Sans Arabic + Roboto fonts

## Tasks

- [x] 1. Initialize Next.js project and configure core dependencies
  - Create Next.js 15 project with App Router and TypeScript
  - Install and configure Tailwind CSS with custom color palette (#5E8F8F primary)
  - Install shadcn/ui and initialize component library
  - Install next-intl, Framer Motion, and lucide-react
  - Set up Turbopack for development
  - Configure TypeScript with strict mode
  - _Requirements: 11.1, 11.2, 12.1, 12.2, 12.3_

- [x] 2. Set up internationalization system
  - [x] 2.1 Configure next-intl with locale routing
    - Create i18n.ts configuration file with locale settings (ar, en, ur)
    - Create middleware.ts for locale detection and routing
    - Set Arabic as default locale
    - Configure locale prefix strategy (always show locale in URL)
    - _Requirements: 1.1, 1.2, 12.5_
  
  - [x] 2.2 Create translation message files
    - Create messages/ar.json with Arabic translations
    - Create messages/en.json with English translations
    - Create messages/ur.json with Urdu translations
    - Include all content: navigation, hero, services, about, vision, values
    - _Requirements: 1.1, 13.7_
  
  - [x] 2.3 Set up font configuration
    - Create lib/fonts.ts with IBM Plex Sans Arabic and Roboto font imports
    - Configure font weights (300, 400, 500, 600, 700)
    - Set up CSS variables for font families
    - Configure font-display: swap for performance
    - _Requirements: 3.1, 3.2, 3.6, 12.6_

- [x] 3. Configure Tailwind CSS theme system
  - Extend Tailwind config with custom primary color scale (#5E8F8F)
  - Add neutral color scale for backgrounds and text
  - Configure font family variables (arabic, latin)
  - Set up custom font sizes (xs to 3xl)
  - Configure line-height values for Arabic (1.65) and Latin (1.5)
  - Install and configure tailwindcss-rtl plugin
  - _Requirements: 4.1, 4.2, 4.3, 3.3, 3.4, 3.5, 11.3, 12.4_

- [x] 4. Create root layout with locale support
  - [x] 4.1 Implement app/[locale]/layout.tsx
    - Set up NextIntlClientProvider wrapper
    - Apply locale-specific fonts based on RTL/LTR
    - Set HTML lang and dir attributes dynamically
    - Import global styles
    - Configure metadata for SEO
    - _Requirements: 1.1, 2.1, 2.2, 3.1, 3.2, 12.7_
  
  - [x] 4.2 Create app/globals.css
    - Import Tailwind directives
    - Define CSS custom properties for colors
    - Add base styles for RTL/LTR support
    - Configure smooth scrolling behavior
    - _Requirements: 11.2, 12.4_
  
  - [x] 4.3 Create error boundary and not-found pages
    - Implement app/[locale]/error.tsx with localized error messages
    - Implement app/[locale]/not-found.tsx with 404 page
    - _Requirements: 1.1_

- [x] 5. Build core UI components with shadcn/ui
  - [x] 5.1 Install and customize shadcn/ui components
    - Install Button component with primary/secondary variants
    - Install Card component for content containers
    - Install Sheet component for mobile menu
    - Customize components to support RTL layouts
    - Apply custom color palette to all components
    - _Requirements: 11.1, 11.3, 11.4, 11.5_
  
  - [x] 5.2 Create utility functions
    - Create lib/utils.ts with cn() function for class merging
    - Create lib/constants.ts for services and values data
    - Add isValidLocale() validation function
    - _Requirements: 11.1_

- [x] 6. Implement navigation components
  - [x] 6.1 Create Header component
    - Build components/layout/header.tsx with logo and navigation
    - Implement responsive navigation (desktop menu, mobile hamburger)
    - Add RTL/LTR aware positioning for logo and menu items
    - Include links to Home, About, Services, Vision, Values pages
    - _Requirements: 2.3, 2.4, 5.5, 13.6_
  
  - [x] 6.2 Create Language Switcher component
    - Build components/layout/language-switcher.tsx
    - Display all three locales (Arabic, English, Urdu) with native names
    - Highlight current active locale
    - Implement locale switching with cookie persistence
    - Update URL to reflect new locale
    - _Requirements: 1.3, 1.4, 1.5_
  
  - [x] 6.3 Create Footer component
    - Build components/layout/footer.tsx with company info
    - Include social links and copyright notice
    - Support RTL/LTR layouts
    - _Requirements: 2.3, 13.6_
  
  - [ ]* 6.4 Write unit tests for navigation components
    - Test Language Switcher displays all locales
    - Test Language Switcher highlights current locale
    - Test locale switching triggers navigation
    - Test cookie persistence on locale change
    - _Requirements: 1.3, 1.4, 1.5_

- [x] 7. Create logo and favicon assets
  - [x] 7.1 Process logo file and create favicon variants
    - Convert logo.jpeg to optimized PNG format
    - Generate favicon sizes: 16x16, 32x32, 180x180, 192x192, 512x512
    - Create apple-touch-icon.png for iOS devices
    - Place all icons in public/icons/ directory
    - _Requirements: 8.5, 8.1.1, 8.1.2, 8.1.3_
  
  - [x] 7.2 Create Logo component
    - Build components/shared/logo.tsx
    - Use Next.js Image component for optimization
    - Support different sizes (small, medium, large)
    - Ensure logo displays correctly in RTL/LTR layouts
    - _Requirements: 8.1, 8.2, 14.3_
  
  - [x] 7.3 Configure web app manifest
    - Create app/manifest.json with brand colors and icons
    - Link manifest in root layout
    - _Requirements: 8.1.4_

- [x] 8. Checkpoint - Verify project structure and configuration
  - Ensure all tests pass, ask the user if questions arise.

- [x] 9. Implement animation system
  - [x] 9.1 Create reusable animation components
    - Build components/shared/animated-card.tsx with fade and slide animations
    - Build components/shared/animated-section.tsx with viewport detection
    - Implement staggered children animations
    - Add prefers-reduced-motion support
    - Keep animation durations between 200-400ms
    - _Requirements: 6.1, 6.2, 6.3, 6.4, 6.5, 6.6_
  
  - [x] 9.2 Create hover animation utilities
    - Add scale transformation (1.02) for interactive elements
    - Apply smooth transitions to buttons and cards
    - _Requirements: 6.2_
  
  - [ ]* 9.3 Write unit tests for animation components
    - Test animations respect prefers-reduced-motion
    - Test staggered animations apply correct delays
    - Test viewport detection triggers animations once
    - _Requirements: 6.5_

- [x] 10. Build home page hero section
  - [x] 10.1 Create HeroVideo component
    - Build components/home/hero-video.tsx for YouTube embed
    - Extract video ID from URL (https://www.youtube.com/watch?v=rpNSmOfCI4w)
    - Configure autoplay, mute, loop, and hide controls
    - Add dark overlay (bg-black/40) for text readability
    - Implement lazy loading for performance
    - Add fallback background color if video fails
    - _Requirements: 14.4, 14.5, 14.9, 8.3_
  
  - [x] 10.2 Create HeroSection component
    - Build components/home/hero-section.tsx with video background
    - Display Aman Ever logo prominently
    - Add hero title: "شريككم الذكي في رحلة الرعاية الطبية"
    - Add subtitle with company introduction
    - Include call-to-action buttons
    - Ensure responsive typography and layout
    - Support all three locales with proper translations
    - _Requirements: 14.1, 14.2, 14.3, 14.6, 14.7, 14.8_
  
  - [ ]* 10.3 Write integration tests for hero section
    - Test hero video embeds correctly
    - Test hero displays in all three locales
    - Test responsive layout on mobile, tablet, desktop
    - Test fallback behavior when video fails
    - _Requirements: 14.4, 14.5, 14.8, 14.9_

- [x] 11. Build services showcase section
  - [x] 11.1 Create ServiceCard component
    - Build components/shared/service-card.tsx
    - Display service icon, title, and description
    - Use lucide-react outline icons
    - Make cards clickable with hover effects
    - Support RTL/LTR layouts
    - _Requirements: 15.2, 15.3, 7.1, 7.2, 15.5_
  
  - [x] 11.2 Create ServicesSection component
    - Build components/home/services-section.tsx
    - Display all four core services in a grid
    - Use services data from lib/constants.ts
    - Apply responsive grid layout (1 col mobile, 2 tablet, 4 desktop)
    - Add staggered entrance animations to cards
    - Ensure consistent spacing and visual hierarchy
    - _Requirements: 15.1, 15.4, 15.6, 15.7_
  
  - [x] 11.3 Define services data in constants
    - Add services array to lib/constants.ts
    - Include: Remote Medical Care, Home Services, E-Commerce, Financial Solutions
    - Map each service to lucide-react icons (Video, Home, ShoppingCart, Wallet)
    - Include translation keys for titles and descriptions
    - _Requirements: 15.1, 15.2, 13.2_
  
  - [ ]* 11.4 Write unit tests for service components
    - Test ServiceCard renders icon, title, description
    - Test ServiceCard applies hover animations
    - Test ServicesSection displays all four services
    - Test responsive grid layout at different breakpoints
    - _Requirements: 15.2, 15.6_

- [x] 12. Create home page
  - Implement app/[locale]/page.tsx
  - Compose HeroSection and ServicesSection
  - Add page metadata for SEO
  - Ensure page is responsive and accessible
  - _Requirements: 14.1, 15.1, 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [x] 13. Checkpoint - Test home page functionality
  - Ensure all tests pass, ask the user if questions arise.

- [x] 14. Create About Us page
  - [x] 14.1 Implement app/[locale]/about/page.tsx
    - Display company introduction and background
    - Include mission statement
    - Include vision statement
    - Add content about Saudi Vision 2030 alignment
    - Use AnimatedCard for content sections
    - Support all three locales
    - _Requirements: 13.1, 13.7_
  
  - [x] 14.2 Add placeholder images for About page
    - Source team/office images from Unsplash or Pexels
    - Place in public/images/about/ directory
    - Use Next.js Image component with proper sizing
    - _Requirements: 8.7, 8.1, 8.2, 8.4_
  
  - [ ]* 14.3 Write integration tests for About page
    - Test page renders in all three locales
    - Test images load with proper optimization
    - Test responsive layout
    - _Requirements: 13.7, 5.6_

- [x] 15. Create Services page
  - [x] 15.1 Implement app/[locale]/services/page.tsx
    - Display detailed information for all four core services
    - Use ServiceCard components with expanded descriptions
    - Add service-specific icons and imagery
    - Include benefits and features for each service
    - Support all three locales
    - _Requirements: 13.2, 13.7_
  
  - [x] 15.2 Add placeholder images for services
    - Source medical/healthcare images from Unsplash or Pexels
    - Create images for: telemedicine, home care, ecommerce, financial
    - Place in public/images/services/ directory
    - _Requirements: 8.7, 8.1, 8.2_
  
  - [ ]* 15.3 Write integration tests for Services page
    - Test all four services display correctly
    - Test service cards are clickable
    - Test page renders in all three locales
    - _Requirements: 13.2, 13.7_

- [x] 16. Create Vision and Mission page
  - [x] 16.1 Implement app/[locale]/vision/page.tsx
    - Display vision statement prominently
    - Display mission statement
    - Highlight commitment to Saudi Vision 2030
    - Use AnimatedCard for content sections
    - Add inspirational imagery
    - Support all three locales
    - _Requirements: 13.3, 13.7_
  
  - [ ]* 16.2 Write integration tests for Vision page
    - Test vision and mission content displays
    - Test page renders in all three locales
    - Test animations trigger on scroll
    - _Requirements: 13.3, 13.7_

- [x] 17. Create Core Values page
  - [x] 17.1 Define core values data in constants
    - Add coreValues array to lib/constants.ts
    - Include: Clarity and Respect, Simplified Innovation, Safe Experience, Service Partnership
    - Map each value to lucide-react icons (Eye, Lightbulb, Shield, Handshake)
    - Include translation keys for titles and descriptions
    - _Requirements: 13.4_
  
  - [x] 17.2 Implement app/[locale]/values/page.tsx
    - Display all four core values in a grid
    - Use Card components with icons, titles, descriptions
    - Apply staggered entrance animations
    - Use responsive grid layout (1 col mobile, 2 tablet, 4 desktop)
    - Support all three locales
    - _Requirements: 13.4, 13.5, 13.7_
  
  - [ ]* 17.3 Write integration tests for Values page
    - Test all four values display correctly
    - Test responsive grid layout
    - Test page renders in all three locales
    - _Requirements: 13.4, 13.7_

- [x] 18. Implement RTL/LTR layout system
  - [x] 18.1 Add RTL-aware styling utilities
    - Use Tailwind logical properties (ms, me, ps, pe)
    - Add conditional classes for flex-row-reverse in RTL
    - Mirror directional icons in RTL layouts
    - Apply correct text alignment (right for RTL, left for LTR)
    - _Requirements: 2.3, 2.4, 2.5, 7.4_
  
  - [x] 18.2 Test RTL/LTR switching across all pages
    - Verify layout flips correctly for Arabic and Urdu
    - Verify layout is LTR for English
    - Test navigation, hero, services, and content pages
    - _Requirements: 2.1, 2.2, 2.3_
  
  - [ ]* 18.3 Write integration tests for bidirectional layouts
    - Test dir="rtl" applied for Arabic and Urdu
    - Test dir="ltr" applied for English
    - Test directional icons mirror in RTL
    - Test text alignment changes with locale
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5_

- [x] 19. Optimize images and assets
  - Configure Next.js Image component with proper sizes
  - Set up responsive image breakpoints
  - Enable WebP and AVIF format support
  - Implement lazy loading for below-fold images
  - Add blur placeholders to prevent layout shift
  - Optimize logo and favicon files
  - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.6, 9.5_

- [x] 20. Checkpoint - Test all pages and navigation
  - Ensure all tests pass, ask the user if questions arise.

- [x] 21. Implement accessibility features
  - [x] 21.1 Add semantic HTML and ARIA labels
    - Use semantic HTML5 elements (header, nav, main, footer, article, section)
    - Add ARIA labels to interactive elements (buttons, links, language switcher)
    - Ensure proper heading hierarchy (h1, h2, h3)
    - Add alt text to all images
    - _Requirements: 10.1, 10.3, 7.5_
  
  - [x] 21.2 Implement keyboard navigation
    - Ensure all interactive elements are keyboard accessible
    - Add visible focus indicators
    - Implement skip-to-content link
    - Maintain logical tab order
    - _Requirements: 10.2, 10.4, 10.6_
  
  - [x] 21.3 Add form accessibility (if forms exist)
    - Associate labels with form inputs
    - Add accessible error messages
    - _Requirements: 10.5_
  
  - [ ]* 21.4 Run automated accessibility tests
    - Install and configure axe-core or jest-axe
    - Test all pages for WCAG AA compliance
    - Test keyboard navigation flows
    - Test screen reader compatibility
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

- [x] 22. Performance optimization
  - [x] 22.1 Optimize bundle size
    - Enable tree-shaking for unused code
    - Analyze bundle with @next/bundle-analyzer
    - Implement code splitting for routes
    - Lazy load heavy components (Framer Motion animations)
    - _Requirements: 9.1, 9.2, 9.3, 9.5_
  
  - [x] 22.2 Configure caching strategies
    - Set up proper cache headers for static assets
    - Configure Next.js caching for pages and data
    - _Requirements: 9.6_
  
  - [ ]* 22.3 Run Lighthouse performance audit
    - Test performance score on all pages
    - Ensure score is above 90
    - Test on mobile and desktop
    - Optimize based on audit results
    - _Requirements: 9.4_

- [ ] 23. Cross-browser and responsive testing
  - [ ]* 23.1 Test on multiple browsers
    - Test on Chrome, Firefox, Safari, Edge
    - Verify layout consistency across browsers
    - Test RTL/LTR rendering in all browsers
    - _Requirements: 5.6_
  
  - [ ]* 23.2 Test responsive design at all breakpoints
    - Test at 320px (mobile), 768px (tablet), 1024px (desktop), 1920px (large desktop)
    - Verify mobile menu works correctly
    - Verify grid layouts adapt properly
    - Test hero section responsiveness
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

- [ ] 24. Final integration and polish
  - [ ] 24.1 Review all translations
    - Verify Arabic translations are accurate and natural
    - Verify English translations are clear
    - Verify Urdu translations are correct
    - Check for missing translation keys
    - _Requirements: 1.1, 13.7_
  
  - [ ] 24.2 Test locale persistence
    - Verify language preference persists across sessions
    - Test cookie-based locale storage
    - Test locale detection from browser settings
    - _Requirements: 1.4_
  
  - [ ] 24.3 Final visual polish
    - Review spacing and alignment across all pages
    - Ensure consistent color usage
    - Verify animations are subtle and smooth
    - Check hover states on all interactive elements
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 6.2, 6.6_

- [ ] 25. Final checkpoint - Complete testing and deployment preparation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional testing tasks and can be skipped for faster MVP delivery
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation and user feedback
- All placeholder images from Unsplash/Pexels can be easily replaced with custom images later
- The implementation follows a mobile-first approach throughout
- RTL/LTR support is built into every component from the start
- Accessibility is prioritized in all implementation tasks
