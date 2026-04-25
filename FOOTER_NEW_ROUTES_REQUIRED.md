# New Routes Required for Footer

## 📋 Overview
This document lists all new routes that need to be created for the restructured footer. Each route is currently pointing to `#` as a placeholder.

## 🔗 Routes to Create

### Platform Section (المنصة)

| Route | Priority | Description | Notes |
|-------|----------|-------------|-------|
| `/ar/about` | HIGH | About Aman Ever page | Core company info |
| `/ar/why-us` | HIGH | Why choose Aman Ever | Value proposition, differentiators |
| `/ar/pricing` | HIGH | Pricing & packages | Membership cards, pricing tiers |
| `/ar/network` | MEDIUM | Medical network | List of partner hospitals, clinics, doctors |
| `/ar/home-care` | MEDIUM | Home care services | Home healthcare offerings |
| `/ar/blog` | HIGH | Blog/Articles | **Important for SEO** - health tips, news |
| `/ar/faq` | HIGH | Frequently Asked Questions | Common questions & answers |

### Partner Section (للشركاء)

| Route | Priority | Description | Notes |
|-------|----------|-------------|-------|
| `/ar/doctors/login` | HIGH | Doctor portal login | Redirect to actual doctor platform |
| `/ar/merchants/login` | HIGH | Merchant portal login | Redirect to actual merchant platform |
| `/ar/partners` | MEDIUM | Partner signup form | Lead magnet for hospitals/clinics |
| `/ar/careers` | MEDIUM | Careers page | Job listings, company culture |
| `/ar/investors` | LOW | Investor relations | Optional - depends on company stage |

### Legal Section (قانوني)

| Route | Priority | Description | Notes |
|-------|----------|-------------|-------|
| `/ar/privacy` | HIGH | Privacy policy (PDPL) | **Required by law** |
| `/ar/terms` | HIGH | Terms of service | **Required by law** |
| `/ar/refund` | HIGH | Refund policy | **Required for e-commerce** |
| Cookie Settings | MEDIUM | Cookie preferences modal | Implement as modal, not page |

## 📊 Priority Breakdown

### HIGH Priority (Must have before launch)
1. `/ar/about` - Core company information
2. `/ar/why-us` - Value proposition
3. `/ar/pricing` - Revenue driver
4. `/ar/blog` - SEO & content marketing
5. `/ar/faq` - Reduce support load
6. `/ar/doctors/login` - Partner access
7. `/ar/merchants/login` - Partner access
8. `/ar/privacy` - Legal requirement
9. `/ar/terms` - Legal requirement
10. `/ar/refund` - Legal requirement

### MEDIUM Priority (Important but can wait)
1. `/ar/network` - Trust builder
2. `/ar/home-care` - Service showcase
3. `/ar/partners` - Lead generation
4. `/ar/careers` - Talent acquisition
5. Cookie Settings - Privacy compliance

### LOW Priority (Nice to have)
1. `/ar/investors` - Only if actively fundraising

## 🎯 Recommended Implementation Order

### Phase 1: Legal & Core (Week 1)
```
1. /ar/privacy
2. /ar/terms
3. /ar/refund
4. /ar/about
5. /ar/faq
```

### Phase 2: Conversion (Week 2)
```
6. /ar/why-us
7. /ar/pricing
8. /ar/blog (setup + 3-5 initial posts)
```

### Phase 3: Partners (Week 3)
```
9. /ar/doctors/login (redirect to existing platform)
10. /ar/merchants/login (redirect to existing platform)
11. /ar/partners (lead form)
```

### Phase 4: Additional (Week 4)
```
12. /ar/network
13. /ar/home-care
14. /ar/careers
15. Cookie Settings modal
```

### Phase 5: Optional
```
16. /ar/investors (if needed)
```

## 📝 Page Templates

### Simple Pages (Use existing layout)
- About
- Why Us
- FAQ
- Careers
- Investors

### Complex Pages (Need custom components)
- Pricing (pricing cards, comparison table)
- Blog (blog listing, article template, categories)
- Network (searchable directory, filters)
- Partners (multi-step form, file upload)

### Legal Pages (Use legal template)
- Privacy
- Terms
- Refund

## 🔄 Redirects Needed

Some links should redirect to existing pages:

```typescript
// In next.config.ts or middleware
const redirects = [
  {
    source: '/ar/doctors/login',
    destination: 'https://doctors.amanever.com/login', // Actual doctor platform
    permanent: false,
  },
  {
    source: '/ar/merchants/login',
    destination: 'https://merchants.amanever.com/login', // Actual merchant platform
    permanent: false,
  },
];
```

## 📋 Content Checklist

For each page, prepare:

### Text Content
- [ ] Page title (H1)
- [ ] Meta description (150-160 chars)
- [ ] Body content (Arabic)
- [ ] CTA buttons text
- [ ] Breadcrumb labels

### Images
- [ ] Hero image (if applicable)
- [ ] Section images
- [ ] Icons
- [ ] OG image (1200x630px)

### SEO
- [ ] Meta title
- [ ] Meta description
- [ ] Keywords
- [ ] Schema.org markup
- [ ] Canonical URL
- [ ] Alt text for images

### Legal (for legal pages)
- [ ] Review by legal team
- [ ] Last updated date
- [ ] Version number
- [ ] Contact info for questions

## 🌐 Multi-language Support

All routes should support 3 languages:
- `/ar/...` - Arabic (primary)
- `/en/...` - English
- `/ur/...` - Urdu

Example:
```
/ar/about
/en/about
/ur/about
```

## 🎨 Design Consistency

All new pages should follow:
- Same header/footer as existing pages
- Consistent color scheme (emerald accent)
- RTL-first design
- Mobile-responsive
- Accessibility standards (WCAG AA)

## ⚡ Quick Start Template

For each new page:

```tsx
// app/[locale]/[page]/page.tsx
import { Header } from '@/components/layout/header';
import { setRequestLocale } from 'next-intl/server';

export default async function PageName({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Header locale={locale} />
      <main id="main-content" className="min-h-screen">
        {/* Page content here */}
      </main>
    </>
  );
}

export async function generateMetadata() {
  return {
    title: 'Page Title | أمان إيفر',
    description: 'Page description...',
  };
}
```

## 📊 Progress Tracking

Use this checklist to track progress:

### Platform Pages
- [ ] `/ar/about`
- [ ] `/ar/why-us`
- [ ] `/ar/pricing`
- [ ] `/ar/network`
- [ ] `/ar/home-care`
- [ ] `/ar/blog`
- [ ] `/ar/faq`

### Partner Pages
- [ ] `/ar/doctors/login`
- [ ] `/ar/merchants/login`
- [ ] `/ar/partners`
- [ ] `/ar/careers`
- [ ] `/ar/investors`

### Legal Pages
- [ ] `/ar/privacy`
- [ ] `/ar/terms`
- [ ] `/ar/refund`
- [ ] Cookie Settings

---

**Total Routes**: 15 pages + 1 modal = 16 items  
**Estimated Time**: 3-4 weeks (with content ready)  
**Next Action**: Start with Phase 1 (Legal & Core)
