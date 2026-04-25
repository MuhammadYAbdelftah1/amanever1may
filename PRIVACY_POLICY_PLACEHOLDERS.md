# Privacy Policy - Placeholders to Fill

⚠️ **LEGAL REVIEW REQUIRED BEFORE PRODUCTION**

This privacy policy page must be reviewed by a Saudi legal advisor specialized in PDPL (Personal Data Protection Law) before going live.

## Required Placeholders

### 1. Contact Information
- **DPO_EMAIL**: Data Protection Officer email address
  - Location: `lib/data/privacy-content.ts`
  - Example: `privacy@amanever.com` or `dpo@amanever.com`
  - Used in: Contact section, CTA buttons

- **DPO_PHONE**: Data Protection Officer phone number
  - Location: `lib/data/privacy-content.ts`
  - Example: `920018041` or dedicated DPO line
  - Used in: Contact section

### 2. Dates
- **LAST_UPDATE_DATE**: Date of last policy update
  - Location: `lib/data/privacy-content.ts`
  - Format: `DD/MM/YYYY` (Arabic format) or `YYYY-MM-DD`
  - Example: `25/04/2026` or `2026-04-25`
  - Used in: Hero section badge

### 3. External Links
- **SDAIA_COMPLAINT_URL**: Direct link to SDAIA complaint form
  - Location: `lib/data/privacy-content.ts`
  - Example: `https://sdaia.gov.sa/complaints` (verify actual URL)
  - Used in: Contact section, authority info

### 4. Data Retention
- **DATA_RETENTION_PERIOD**: Specific retention periods per data type
  - Location: Currently hardcoded in section 8 table
  - Review with legal team to confirm:
    - Medical records: 10 years (verify with MOH requirements)
    - Financial records: 10 years (verify with ZATCA requirements)
    - Marketing data: Until consent withdrawal
    - System logs: 12 months

### 5. PDF Document
- **PDF_URL**: Path to downloadable PDF version
  - Location: `lib/data/privacy-content.ts` → `meta.pdfUrl`
  - Current: `/documents/privacy-policy-ar.pdf`
  - Action: Generate PDF from this page content and upload to `/public/documents/`

## TODO Before Launch

### Legal Review
- [ ] Review entire content with PDPL-specialized legal advisor
- [ ] Verify compliance with SDAIA regulations
- [ ] Confirm MOH requirements for health data retention
- [ ] Verify ZATCA requirements for financial data retention
- [ ] Review cookie policy section
- [ ] Confirm children's data collection procedures

### Technical Implementation
- [ ] Generate PDF version of the policy
- [ ] Implement cookie settings modal (linked from section 9)
- [ ] Create account deletion page (`/ar/account-deletion`)
- [ ] Test all internal anchor links
- [ ] Test sticky TOC on desktop
- [ ] Test mobile accordion TOC (if implemented)
- [ ] Verify RTL layout on all screen sizes

### Content Updates
- [ ] Fill all PLACEHOLDER values
- [ ] Add actual DPO contact information
- [ ] Verify SDAIA complaint URL
- [ ] Update last modified date
- [ ] Review and update data retention periods
- [ ] Add any missing data categories
- [ ] Review third-party service providers list

### Compliance
- [ ] Ensure data residency statement is accurate (servers in KSA)
- [ ] Verify encryption standards mentioned (AES-256)
- [ ] Confirm PCI-DSS compliance for payment processors
- [ ] Review user rights section for PDPL compliance
- [ ] Verify notification procedures for policy updates

## Files Created

1. **`lib/data/privacy-content.ts`**
   - Contains all policy content in structured format
   - Separated from component for easy updates
   - All placeholders marked with comments

2. **`app/[locale]/privacy-policy/page.tsx`**
   - Full privacy policy page component
   - Responsive design with sticky TOC
   - Alert boxes for important notices
   - CTA section at bottom

3. **`PRIVACY_POLICY_PLACEHOLDERS.md`** (this file)
   - Complete list of placeholders
   - TODO checklist
   - Implementation notes

## Design Notes

- Uses brand teal color (#4A8B8E) throughout
- Light theme (white background)
- Sticky table of contents on desktop
- Responsive cards for each section
- Alert boxes for important information (warning, info, success, error)
- Security measures displayed in grid with icons
- Contact information with clickable links
- CTA section with primary and secondary buttons

## Accessibility

- Proper heading hierarchy (H1 → H2 → H3)
- Skip to main content link
- ARIA labels where needed
- Keyboard navigation support
- Focus states on interactive elements
- Sufficient color contrast ratios

## Next Steps

1. Fill all placeholders with actual data
2. Schedule legal review with PDPL specialist
3. Generate PDF version
4. Implement cookie settings modal
5. Create account deletion page
6. Test thoroughly on all devices
7. Get final approval before publishing
