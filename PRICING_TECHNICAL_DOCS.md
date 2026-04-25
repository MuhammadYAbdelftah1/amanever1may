# Pricing Page - Technical Documentation

## 🏗️ Architecture

### File Structure
```
├── app/[locale]/pricing/
│   └── page.tsx                    # Main pricing page
├── components/pricing/
│   ├── index.ts                    # Central exports
│   ├── PricingHero.tsx            # Hero section
│   ├── QuickComparison.tsx        # Quick comparison
│   ├── PricingPlans.tsx           # Plans display
│   ├── PricingCard.tsx            # Individual card
│   ├── SavingsCalculator.tsx      # Calculator
│   ├── ComparisonTable.tsx        # Comparison table
│   ├── InsuranceComparison.tsx    # Insurance comparison
│   ├── PricingTestimonials.tsx    # Testimonials
│   ├── B2BSection.tsx             # B2B section
│   ├── PricingFAQ.tsx             # FAQ
│   ├── FinalCTA.tsx               # Final CTA
│   ├── README.md                  # Component docs
│   └── __tests__/
│       └── pricing.test.ts        # Unit tests
├── data/
│   ├── pricing-data.ts            # Pricing data
│   └── pricing-config.ts          # Configuration
└── lib/
    ├── pricing-utils.ts           # Utility functions
    └── pricing-metadata.ts        # Metadata generator
```

## 🔧 Technical Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Internationalization**: next-intl
- **Testing**: Jest (configured)

## 📊 Data Flow

### 1. Static Data
All pricing data is centralized in `data/pricing-data.ts`:

```typescript
// Pricing tiers
export const PRICING_TIERS: PricingTier[]

// Comparison features
export const COMPARISON_FEATURES: ComparisonFeature[]

// FAQ items
export const PRICING_FAQ: FAQItem[]

// Calculator defaults and costs
export const CALCULATOR_DEFAULTS
export const CALCULATOR_COSTS
export const CALCULATOR_DISCOUNTS
```

### 2. Configuration
App-wide configuration in `data/pricing-config.ts`:

```typescript
export const PRICING_CONFIG = {
  contact: { phone, email, whatsapp },
  urls: { appDownload, businessPage, ... },
  features: { showFamilyPlans, enableCalculator, ... },
  analytics: { events: { ... } },
  trust: { rating, reviewCount, ... },
  paymentMethods: [...],
  guarantee: { days, description },
  b2b: { companies, employees, ... },
}
```

### 3. Utilities
Helper functions in `lib/pricing-utils.ts`:

```typescript
// Calculate savings
calculateSavings(inputs: CalculatorInputs): CalculatorResults

// Format currency
formatCurrency(amount: number): string

// Get recommendation
getRecommendedPlan(inputs: CalculatorInputs): Recommendation

// Validate inputs
validateCalculatorInputs(inputs: CalculatorInputs): ValidationResult

// URL sharing
generateShareableUrl(inputs: CalculatorInputs): string
parseCalculatorFromUrl(params: URLSearchParams): CalculatorInputs
```

## 🎨 Styling System

### Color Palette
```typescript
// Brand Colors
'#4A8B8E' // Primary teal
'#356B6E' // Primary teal hover
'#E8F1F1' // Light teal background

// Text Colors
'#1A2B2C' // Primary text
'#5A6B6C' // Secondary text

// Background Colors
'#FFFFFF' // White
'#F8FAFB' // Alternate background

// Border Colors
'#E5EAEB' // Default border
```

### Responsive Breakpoints
```css
/* Mobile */
@media (max-width: 767px) { ... }

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) { ... }

/* Desktop */
@media (min-width: 1024px) { ... }
```

### Component Patterns

#### Card Pattern
```tsx
<div className="bg-white rounded-xl p-6 shadow-lg border border-[#E5EAEB] hover:shadow-xl transition-all duration-300">
  {/* Content */}
</div>
```

#### Button Pattern
```tsx
<button className="bg-[#4A8B8E] text-white px-8 py-4 rounded-xl font-bold hover:bg-[#356B6E] transition-all duration-300">
  {/* Text */}
</button>
```

#### Gradient Background
```tsx
<div className="bg-gradient-to-br from-[#E8F1F1] to-white">
  {/* Content */}
</div>
```

## 🔍 SEO Implementation

### 1. Metadata
Generated using `lib/pricing-metadata.ts`:

```typescript
export const metadata = generatePricingMetadata('ar');
```

### 2. Structured Data
Multiple Schema.org types:

- **Product Schema**: Each pricing tier
- **FAQPage Schema**: FAQ section
- **BreadcrumbList Schema**: Navigation
- **Organization Schema**: Company info
- **AggregateRating Schema**: Reviews

### 3. Open Graph
```typescript
openGraph: {
  title: '...',
  description: '...',
  type: 'website',
  locale: 'ar_SA',
  images: [{ url: '/images/og-pricing.jpg', ... }],
}
```

## 🧮 Calculator Logic

### Input Parameters
```typescript
interface CalculatorInputs {
  doctorVisits: number;      // 0-24
  dentalVisits: number;      // 0-6
  monthlyMedicine: number;   // 0+
  homeCare: boolean;         // true/false
}
```

### Calculation Formula
```typescript
// 1. Calculate total cost without Aman
totalCost = (doctorVisits × avgDoctorCost) +
            (dentalVisits × avgDentalCost) +
            (monthlyMedicine × 12) +
            (homeCare ? homeCareCost : 0)

// 2. Calculate cost with each plan
withPlan = (totalCost × (1 - discount)) + planYearlyPrice

// 3. Calculate savings
savings = totalCost - withPlan
```

### Animation
```typescript
// Animated counter for savings display
const animateSavings = (target: number) => {
  const duration = 1000;
  const steps = 50;
  const increment = target / steps;
  
  // Increment every (duration / steps) ms
  setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval();
    }
  }, duration / steps);
}
```

## 📱 Responsive Design

### Mobile (<768px)
- Stack all cards vertically
- Recommended plan shown first
- Horizontal scroll for comparison table
- Calculator in single column
- Simplified navigation

### Tablet (768px-1023px)
- 2 cards per row + 1 featured
- Scrollable comparison table
- Calculator in two columns
- Compact spacing

### Desktop (≥1024px)
- 3 cards in a row
- Full comparison table
- Calculator in two columns
- Generous spacing

## 🧪 Testing

### Unit Tests
Located in `components/pricing/__tests__/pricing.test.ts`

Test coverage:
- ✅ Cost calculations
- ✅ Discount calculations
- ✅ Savings calculations
- ✅ Plan pricing
- ✅ Edge cases

Run tests:
```bash
npm test components/pricing/__tests__/pricing.test.ts
```

### Manual Testing Checklist
- [ ] All plans display correctly
- [ ] Toggle switches work (individual/family/business)
- [ ] Billing cycle toggle works (monthly/yearly)
- [ ] Calculator produces accurate results
- [ ] Calculator animation works smoothly
- [ ] FAQ accordion expands/collapses
- [ ] All CTAs link correctly
- [ ] Responsive on all devices
- [ ] RTL layout correct
- [ ] No console errors

## 📊 Analytics Integration

### Events to Track
```typescript
// Page view
trackPricingEvent('pricing_page_viewed', {
  locale: 'ar',
  timestamp: Date.now(),
});

// Plan selection
trackPricingEvent('plan_cta_clicked', {
  plan: 'plus',
  billing: 'yearly',
  price: 3490,
});

// Calculator usage
trackPricingEvent('savings_calculator_used', {
  doctorVisits: 6,
  dentalVisits: 2,
  savings: 5460,
  recommendedPlan: 'plus',
});

// FAQ interaction
trackPricingEvent('faq_expanded', {
  question: 'هل أمان إيفر بديل للتأمين الصحي؟',
  index: 0,
});
```

### Implementation
Add to `data/pricing-config.ts`:

```typescript
export function trackPricingEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  // Google Analytics
  window.gtag?.('event', eventName, properties);
  
  // Mixpanel
  window.mixpanel?.track(eventName, properties);
  
  // Custom analytics
  // ...
}
```

## 🔐 Security Considerations

### Input Validation
All calculator inputs are validated:

```typescript
validateCalculatorInputs(inputs) {
  // Check ranges
  if (inputs.doctorVisits < 0 || inputs.doctorVisits > 24) {
    return { valid: false, errors: [...] };
  }
  // ...
}
```

### XSS Prevention
- All user inputs sanitized
- No `dangerouslySetInnerHTML` except for Schema.org JSON-LD
- React's built-in XSS protection

### Data Privacy
- No PII collected in calculator
- No cookies required
- GDPR/PDPL compliant

## ⚡ Performance Optimization

### Code Splitting
- Each component is lazy-loadable
- Dynamic imports for heavy components

### Image Optimization
- Use Next.js Image component
- WebP format with fallbacks
- Lazy loading below fold

### Bundle Size
- Tree-shaking enabled
- Minimal dependencies
- Tailwind CSS purging

### Caching Strategy
```typescript
// Static page generation
export const revalidate = 3600; // 1 hour

// Or ISR (Incremental Static Regeneration)
export const revalidate = 60; // 1 minute
```

## 🌐 Internationalization

### Locale Support
Currently supports:
- Arabic (ar) - Primary
- English (en) - Future

### Adding New Locale
1. Add translations to `messages/{locale}.json`
2. Update `routing.ts`
3. Generate metadata for locale
4. Test RTL/LTR layout

## 🚀 Deployment

### Pre-deployment Checklist
- [ ] Update prices in `pricing-data.ts`
- [ ] Replace placeholder testimonials
- [ ] Add real phone numbers
- [ ] Create OG image
- [ ] Test all links
- [ ] Run TypeScript check: `npm run type-check`
- [ ] Run linter: `npm run lint`
- [ ] Run tests: `npm test`
- [ ] Test on staging environment

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=https://amanever.com
NEXT_PUBLIC_ANALYTICS_ID=UA-XXXXXXXXX-X
NEXT_PUBLIC_GTM_ID=GTM-XXXXXXX
```

### Build Command
```bash
npm run build
```

### Deployment Platforms
- Vercel (recommended)
- Netlify
- AWS Amplify
- Custom server

## 🐛 Troubleshooting

### Common Issues

#### Calculator not updating
- Check state management
- Verify event handlers
- Check console for errors

#### Styles not applying
- Clear Tailwind cache: `npm run dev -- --turbo`
- Check class name typos
- Verify Tailwind config

#### Schema.org errors
- Validate using Google Rich Results Test
- Check JSON-LD syntax
- Verify required fields

#### TypeScript errors
- Run `npm run type-check`
- Check import paths
- Verify interface definitions

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Schema.org Documentation](https://schema.org)
- [Lucide Icons](https://lucide.dev)
- [next-intl Documentation](https://next-intl-docs.vercel.app)

## 🤝 Contributing

### Code Style
- Use TypeScript strict mode
- Follow ESLint rules
- Use Prettier for formatting
- Write meaningful commit messages

### Pull Request Process
1. Create feature branch
2. Make changes
3. Write/update tests
4. Update documentation
5. Submit PR with description

## 📞 Support

For technical questions or issues:
- Check this documentation
- Review component README files
- Check test files for examples
- Contact development team

---

**Last Updated**: April 25, 2026
**Version**: 1.0.0
**Maintainer**: Development Team
