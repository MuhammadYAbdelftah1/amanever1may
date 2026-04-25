# Requirements Document

## Introduction

This document specifies the requirements for the Aman Ever website, a multi-language, RTL-supported web application built with Next.js. The website serves as the digital presence for "أمان إيفر" (Aman Ever), a leading Saudi technology platform specializing in technical and marketing mediation for medical, healthcare, and cosmetic services.

### About Aman Ever

Aman Ever is a pioneering Saudi technology platform that manages an integrated digital ecosystem and smart applications designed to keep pace with the digital health transformation in line with Saudi Vision 2030. The platform acts as a technical bridge connecting users with elite medical, health, and cosmetic service providers in the Kingdom, offering comprehensive and innovative care solutions that redefine digital health services by combining innovation with the highest quality standards.

**Core Services:**
- Remote Medical Care: Medical consultations and appointment scheduling
- Home Services: Healthcare services at the beneficiary's residence
- E-Commerce Store: Integrated platform for purchasing medical products and services at discounted prices
- Smart Financial Solutions: Fixed offers and discounts, cashback program, and points wallet

**Vision:** To be the leading platform in medical marketing and digital healthcare in Saudi Arabia and the Arab region, actively contributing to achieving Saudi Vision 2030 targets in health and technical transformation.

**Mission:** To be a safe bridge connecting the community with medical and cosmetic services, facilitating easy and reliable access with the highest quality and technical standards. We are committed to elevating the patient experience by integrating technology with direct care and providing exclusive financial benefits.

**Core Values:**
- Clarity and Respect: Transparency and respect in all interactions
- Simplified Innovation: Making healthcare closer and easier for everyone
- Safe Experience: Reliable and secure medical experience
- Service Partnership: Building strong partnerships for better service delivery

The website supports Arabic (default), English, and Urdu languages, prioritizing accessibility, performance, and a clean, modern user experience with subtle animations.

## Glossary

- **Website**: The Aman Ever web application
- **Language_Switcher**: Component that allows users to change the display language
- **RTL_Engine**: System component that handles right-to-left text direction
- **LTR_Engine**: System component that handles left-to-right text direction
- **Animation_System**: Framer Motion-based component for UI animations
- **Image_Optimizer**: Next.js Image component for optimized image delivery
- **Translation_System**: next-intl-based internationalization system
- **Theme_System**: Design system managing colors, typography, and spacing
- **User**: Any person visiting the website
- **Content_Page**: Any page displaying website content
- **Navigation_Component**: Header/menu component for site navigation
- **Locale**: Language and regional settings (ar, en, ur)

## Requirements

### Requirement 1: Multi-Language Support

**User Story:** As a user, I want to view the website in my preferred language (Arabic, English, or Urdu), so that I can understand the content in my native language.

#### Acceptance Criteria

1. THE Translation_System SHALL support Arabic, English, and Urdu locales
2. WHEN the website loads without a specified locale, THE Translation_System SHALL default to Arabic
3. WHEN a user selects a language, THE Language_Switcher SHALL update all content to the selected locale
4. THE Translation_System SHALL persist the user's language preference across sessions
5. WHEN a locale is changed, THE Website SHALL reload content without losing the current page context

### Requirement 2: Bidirectional Text Support

**User Story:** As an Arabic or Urdu speaker, I want the website layout to display right-to-left, so that the content feels natural to read.

#### Acceptance Criteria

1. WHEN the locale is Arabic or Urdu, THE RTL_Engine SHALL render all content in right-to-left direction
2. WHEN the locale is English, THE LTR_Engine SHALL render all content in left-to-right direction
3. WHEN switching between RTL and LTR locales, THE Website SHALL flip the entire layout including navigation, content, and components
4. THE RTL_Engine SHALL mirror directional icons and UI elements appropriately
5. THE Website SHALL apply correct text alignment for each locale (right for RTL, left for LTR)

### Requirement 3: Typography System

**User Story:** As a user, I want text to be readable and culturally appropriate, so that I have a comfortable reading experience.

#### Acceptance Criteria

1. WHEN the locale is Arabic or Urdu, THE Theme_System SHALL use IBM Plex Sans Arabic font family
2. WHEN the locale is English, THE Theme_System SHALL use Roboto font family
3. THE Theme_System SHALL apply line-height of 1.6 to 1.7 for Arabic and Urdu text
4. THE Theme_System SHALL apply line-height of 1.5 for English text
5. THE Theme_System SHALL provide font sizes ranging from 12px to 30px across the typography scale
6. THE Website SHALL load fonts efficiently to minimize layout shift

### Requirement 4: Color System

**User Story:** As a user, I want a visually consistent and accessible color scheme, so that the website is pleasant to use and easy to read.

#### Acceptance Criteria

1. THE Theme_System SHALL use #5E8F8F as the primary brand color
2. THE Theme_System SHALL generate a complete color scale from 50 to 900 for the primary color
3. THE Theme_System SHALL provide neutral colors including white and light gray backgrounds
4. THE Theme_System SHALL include semantic colors for success, error, and warning states
5. THE Theme_System SHALL ensure all color combinations meet WCAG AA contrast requirements for text readability

### Requirement 5: Responsive Design

**User Story:** As a mobile user, I want the website to work seamlessly on my device, so that I can access content on any screen size.

#### Acceptance Criteria

1. THE Website SHALL implement a mobile-first responsive design approach
2. WHEN viewed on mobile devices, THE Website SHALL display a single-column layout
3. WHEN viewed on tablet devices, THE Website SHALL adapt to a two-column layout where appropriate
4. WHEN viewed on desktop devices, THE Website SHALL utilize multi-column layouts optimally
5. THE Navigation_Component SHALL transform into a mobile-friendly menu on small screens
6. THE Website SHALL maintain readability and usability across all viewport sizes from 320px to 2560px width

### Requirement 6: Animation System

**User Story:** As a user, I want subtle visual feedback and smooth transitions, so that the interface feels polished and responsive.

#### Acceptance Criteria

1. THE Animation_System SHALL use Framer Motion for all animations
2. WHEN a user hovers over interactive elements, THE Animation_System SHALL apply a scale transformation of 1.02
3. WHEN cards or content blocks enter the viewport, THE Animation_System SHALL apply fade and slide animations
4. WHEN multiple cards are displayed, THE Animation_System SHALL stagger their entrance animations
5. THE Animation_System SHALL respect user's prefers-reduced-motion settings
6. THE Animation_System SHALL keep animation durations between 200ms and 400ms for optimal perceived performance

### Requirement 7: Icon System

**User Story:** As a user, I want clear and consistent iconography, so that I can quickly understand interface elements.

#### Acceptance Criteria

1. THE Website SHALL use lucide-react as the icon library
2. THE Website SHALL use outline-style icons exclusively
3. THE Website SHALL maintain consistent icon sizing across similar UI elements
4. WHEN the locale is RTL, THE Website SHALL mirror directional icons (arrows, chevrons)
5. THE Website SHALL ensure icons have appropriate aria-labels for accessibility

### Requirement 8: Image Optimization

**User Story:** As a user, I want images to load quickly without sacrificing quality, so that I have a fast browsing experience.

#### Acceptance Criteria

1. THE Image_Optimizer SHALL use Next.js Image component for all images
2. THE Image_Optimizer SHALL serve images in modern formats (WebP, AVIF) when supported
3. THE Image_Optimizer SHALL implement lazy loading for images below the fold
4. THE Image_Optimizer SHALL generate responsive image sizes for different viewports
5. THE Image_Optimizer SHALL display the Aman Ever logo from the provided logo file
6. THE Image_Optimizer SHALL prevent layout shift by reserving space for images before they load
7. THE Website SHALL use placeholder images from open-source resources (Unsplash, Pexels) until custom images are provided
8. THE Website SHALL support easy replacement of placeholder images with custom images via path configuration

### Requirement 8.1: Favicon and Brand Assets

**User Story:** As a user, I want to see the Aman Ever logo in my browser tab, so that I can easily identify the website among multiple open tabs.

#### Acceptance Criteria

1. THE Website SHALL use the Aman Ever logo as the favicon
2. THE Website SHALL provide favicon in multiple sizes (16x16, 32x32, 180x180, 192x192, 512x512)
3. THE Website SHALL include Apple touch icon for iOS devices
4. THE Website SHALL include web app manifest with brand colors and icons
5. THE Website SHALL ensure favicon displays correctly across all major browsers and devices

### Requirement 9: Performance Optimization

**User Story:** As a user, I want the website to load quickly, so that I don't waste time waiting.

#### Acceptance Criteria

1. THE Website SHALL use Next.js App Router for optimal performance
2. THE Website SHALL use Turbopack for development builds
3. THE Website SHALL implement code splitting for route-based lazy loading
4. THE Website SHALL achieve a Lighthouse performance score above 90
5. THE Website SHALL minimize JavaScript bundle size through tree-shaking and optimization
6. THE Website SHALL implement proper caching strategies for static assets

### Requirement 10: Accessibility

**User Story:** As a user with disabilities, I want to navigate and use the website with assistive technologies, so that I have equal access to content.

#### Acceptance Criteria

1. THE Website SHALL provide semantic HTML structure for all content
2. THE Website SHALL ensure all interactive elements are keyboard accessible
3. THE Website SHALL provide appropriate ARIA labels and roles for dynamic content
4. THE Website SHALL maintain a logical focus order throughout all pages
5. THE Website SHALL ensure all form inputs have associated labels
6. THE Website SHALL provide skip-to-content links for keyboard users
7. THE Website SHALL support screen reader navigation

### Requirement 11: Component Library Integration

**User Story:** As a developer, I want a consistent UI component library, so that I can build interfaces efficiently.

#### Acceptance Criteria

1. THE Website SHALL use shadcn/ui as the component library
2. THE Website SHALL use Tailwind CSS for styling
3. THE Website SHALL customize shadcn/ui components to match the Theme_System
4. THE Website SHALL ensure all components support RTL layouts
5. THE Website SHALL maintain consistent spacing and sizing across all components

### Requirement 12: Build and Development Configuration

**User Story:** As a developer, I want a properly configured development environment, so that I can work efficiently.

#### Acceptance Criteria

1. THE Website SHALL use TypeScript for type safety
2. THE Website SHALL configure Next.js with App Router architecture
3. THE Website SHALL enable Turbopack for development server
4. THE Website SHALL configure Tailwind CSS with the custom color palette
5. THE Website SHALL set up next-intl with proper locale routing
6. THE Website SHALL configure font loading for IBM Plex Sans Arabic and Roboto
7. THE Website SHALL include proper TypeScript types for all configurations

### Requirement 13: Content Pages and Information Architecture

**User Story:** As a user, I want to learn about Aman Ever's services, vision, and values, so that I can understand what the platform offers and make informed decisions.

#### Acceptance Criteria

1. THE Website SHALL include an "About Us" page displaying company information, mission, and vision
2. THE Website SHALL include a "Services" page listing all core services (Remote Medical Care, Home Services, E-Commerce Store, Smart Financial Solutions)
3. THE Website SHALL include a "Vision and Mission" section explaining the company's goals and commitment to Saudi Vision 2030
4. THE Website SHALL include a "Values" section displaying the four core values (Clarity and Respect, Simplified Innovation, Safe Experience, Service Partnership)
5. THE Website SHALL display service descriptions with appropriate icons and visual hierarchy
6. THE Website SHALL organize content in a logical, easy-to-navigate structure
7. THE Website SHALL ensure all content pages are available in all three supported locales (Arabic, English, Urdu)

### Requirement 14: Home Page Hero Section

**User Story:** As a visitor, I want to immediately understand what Aman Ever offers when I land on the homepage, so that I can quickly decide if the platform meets my needs.

#### Acceptance Criteria

1. THE Website SHALL display a hero section on the homepage with the company tagline "شريككم الذكي في رحلة الرعاية الطبية" (Your Smart Partner in Healthcare Journey)
2. THE Website SHALL include a brief introduction highlighting Aman Ever as a leading Saudi technology platform
3. THE Website SHALL display the Aman Ever logo prominently in the hero section
4. THE Website SHALL embed a background video from YouTube (https://www.youtube.com/watch?v=rpNSmOfCI4w) in the hero section
5. THE Website SHALL ensure the hero video plays automatically, is muted, loops continuously, and does not obstruct content readability
6. THE Website SHALL include call-to-action buttons for primary user actions
7. THE Website SHALL use the hero section to communicate the platform's value proposition clearly
8. THE Website SHALL ensure the hero section is responsive and visually appealing across all devices
9. THE Website SHALL provide a fallback background color or image if the video fails to load

### Requirement 15: Services Showcase

**User Story:** As a potential user, I want to see all available services at a glance, so that I can explore what Aman Ever offers.

#### Acceptance Criteria

1. THE Website SHALL display a services section showcasing the four core services
2. WHEN displaying services, THE Website SHALL use cards with icons, titles, and brief descriptions
3. THE Website SHALL use outline icons from lucide-react for each service
4. THE Website SHALL apply subtle entrance animations to service cards using Framer Motion
5. THE Website SHALL ensure service cards are clickable and link to detailed service pages
6. THE Website SHALL display services in a responsive grid layout (1 column on mobile, 2 on tablet, 4 on desktop)
7. THE Website SHALL maintain consistent spacing and visual hierarchy across all service cards
