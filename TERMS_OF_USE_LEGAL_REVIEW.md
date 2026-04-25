# Terms of Use - Legal Review Required

⚠️ **MANDATORY LEGAL REVIEW BEFORE PRODUCTION**

This terms of use document is a DRAFT and must be reviewed by a Saudi legal advisor specialized in:
- **Saudi E-Commerce Law** (نظام التجارة الإلكترونية)
- **Anti-Financial Fraud Law** (نظام مكافحة الاحتيال المالي)
- **Ministry of Health regulations** for digital health services

---

## Critical Points Requiring Legal Review

### 1. Medical Services Disclaimer (Section 5) ⚠️ CRITICAL
**Current Text:** "أمان إيفر منصة وسيطة تربط بين المستخدمين ومقدمي الخدمات الصحية"

**Legal Questions:**
- Is the intermediary/platform model clearly defined under Saudi health regulations?
- Does this disclaimer adequately protect the company from medical malpractice liability?
- Are there specific MOH requirements for digital health platforms we must include?
- Should we add insurance requirements for healthcare providers in our network?
- Is the emergency services disclaimer (call 997) sufficient?

**Action Required:** Verify with MOH-specialized legal counsel

---

### 2. Liability Limitations (Section 10) ⚠️ CRITICAL
**Current Text:** "لا تتجاوز مسؤولية أمان إيفر قيمة الاشتراك السنوي المدفوع"

**Legal Questions:**
- Is this liability cap enforceable under Saudi law?
- Are there exceptions we must include (e.g., gross negligence, willful misconduct)?
- Does Saudi consumer protection law allow such limitations?
- Should we have different caps for different types of damages?

**Action Required:** Verify enforceability with legal counsel

---

### 3. Auto-Renewal and Cancellation (Section 4.2)
**Current Text:** "الاشتراكات تُجدد تلقائياً في نهاية كل دورة فوترة"

**Legal Questions:**
- Does this comply with Saudi e-commerce regulations on auto-renewal?
- Is 7-day notice before renewal sufficient, or is more required?
- Are cancellation procedures clear enough to meet consumer protection standards?
- Should we offer a cooling-off period (حق العدول)?

**Action Required:** Verify compliance with e-commerce law

---

### 4. Data Protection Cross-Reference
**Current Text:** References to privacy policy throughout

**Legal Questions:**
- Is the integration between Terms and Privacy Policy legally sound?
- Should we include a summary of key data protection rights here?
- Are PDPL requirements adequately addressed?

**Action Required:** Ensure consistency with privacy policy

---

### 5. Dispute Resolution (Section 12)
**Current Text:** "تختص المحاكم المختصة في مدينة جدة"

**Legal Questions:**
- Is Jeddah jurisdiction appropriate for all users (including those outside Jeddah)?
- Should we include arbitration clauses?
- Are there mandatory consumer dispute resolution procedures we must follow?
- Should we reference the Saudi Consumer Protection Association?

**Action Required:** Verify jurisdiction and dispute resolution procedures

---

### 6. Prohibited Conduct (Section 8)
**Current Text:** List of prohibited activities

**Legal Questions:**
- Are the prohibited activities comprehensive enough?
- Are penalties/consequences clearly stated?
- Do we need to add specific anti-fraud provisions?
- Should we reference specific Saudi laws being violated?

**Action Required:** Ensure comprehensive coverage and legal references

---

### 7. Intellectual Property (Section 9)
**Current Text:** "جميع حقوق الملكية الفكرية محفوظة"

**Legal Questions:**
- Is our trademark actually registered in Saudi Arabia?
- Are copyright claims properly stated?
- Do we need to reference specific IP registration numbers?
- What about user-generated content (reviews, comments)?

**Action Required:** Verify IP registrations and add registration numbers

---

### 8. Points and Wallet System (Section 6)
**Current Text:** "النقاط غير قابلة للتحويل النقدي"

**Legal Questions:**
- Does this system comply with Saudi financial regulations?
- Are there SAMA (Saudi Central Bank) requirements for digital wallets?
- Should points be considered a form of stored value?
- Tax implications of points (VAT treatment)?

**Action Required:** Verify with financial regulations expert

---

### 9. Discounts and Promotions (Section 7)
**Current Text:** "الخصم المعلن (حتى 80%) يعتمد على مزود الخدمة"

**Legal Questions:**
- Does "up to 80%" claim comply with advertising standards?
- Are we adequately disclosing that discounts vary by provider?
- Consumer protection requirements for promotional terms?
- Should we have a separate promotions terms document?

**Action Required:** Verify advertising compliance

---

### 10. Minors and Parental Consent (Section 3.1)
**Current Text:** "إذا كنت تحت سن 18، يجب الحصول على موافقة ولي الأمر"

**Legal Questions:**
- Is 18 the correct age threshold under Saudi law?
- How do we verify parental consent?
- Are there additional requirements for minors' medical data?
- Should we have a separate parental consent form?

**Action Required:** Verify age requirements and consent procedures

---

## Placeholders to Fill

### Contact Information
- **LEGAL_EMAIL**: Legal team email address
  - Location: `lib/data/terms-content.ts`
  - Suggested: `legal@amanever.com`
  - Used in: Contact section, CTA buttons

### Dates and Versions
- **LAST_UPDATE_DATE**: Date of last terms update
  - Location: `lib/data/terms-content.ts`
  - Format: `DD/MM/YYYY` or `YYYY-MM-DD`
  - Example: `25/04/2026`

- **VERSION_NUMBER**: Version number
  - Location: `lib/data/terms-content.ts`
  - Format: `X.Y` (e.g., "1.0", "2.1")
  - Increment on each update

### Financial
- **MAX_COMPENSATION_AMOUNT**: Maximum compensation limit
  - Location: Section 10 (currently: "قيمة الاشتراك السنوي")
  - Needs legal review to determine appropriate cap

### Documents
- **PDF_URL**: Path to downloadable PDF version
  - Location: `lib/data/terms-content.ts` → `meta.pdfUrl`
  - Current: `/documents/terms-of-use-ar.pdf`
  - Action: Generate PDF and upload to `/public/documents/`

---

## Compliance Checklist

### Saudi E-Commerce Law
- [ ] Clear identification of the merchant (company name, CR, address)
- [ ] Transparent pricing (including VAT)
- [ ] Clear description of services
- [ ] Payment and delivery terms
- [ ] Return and refund policy (cross-reference)
- [ ] Privacy and data protection (cross-reference)
- [ ] Dispute resolution procedures
- [ ] Right of withdrawal (حق العدول) if applicable

### Ministry of Health Requirements
- [ ] Clear disclaimer about platform vs. provider role
- [ ] Emergency services guidance (997)
- [ ] Healthcare provider licensing requirements
- [ ] Medical data handling procedures
- [ ] Telemedicine regulations compliance
- [ ] Prescription handling rules

### Consumer Protection
- [ ] Clear and understandable language
- [ ] No unfair or hidden terms
- [ ] Reasonable liability limitations
- [ ] Clear cancellation procedures
- [ ] Transparent pricing and fees
- [ ] Adequate notice for changes

### PDPL Compliance
- [ ] Cross-reference to privacy policy
- [ ] Data subject rights mentioned
- [ ] Consent mechanisms
- [ ] Data retention policies
- [ ] International data transfers (if any)

---

## Recommended Additions

### 1. Force Majeure Clause
Add explicit force majeure provisions covering:
- Natural disasters
- Pandemics
- Government actions
- Technical failures beyond control

### 2. Severability Clause
Add: "If any provision is found unenforceable, the remaining provisions remain in effect."

### 3. Entire Agreement Clause
Add: "These terms constitute the entire agreement between parties."

### 4. Language Precedence
Add: "In case of conflict between Arabic and English versions, Arabic prevails."

### 5. Assignment
Add: "Users cannot assign rights; company can assign with notice."

---

## Files Created

1. **`lib/data/terms-content.ts`**
   - All terms content in structured format
   - Separated from component for easy updates
   - Placeholders marked with comments

2. **`app/[locale]/terms-of-use/page.tsx`**
   - Full terms of use page component
   - Responsive design with sticky TOC
   - Special highlighting for critical sections
   - Alert boxes for important notices

3. **`TERMS_OF_USE_LEGAL_REVIEW.md`** (this file)
   - Critical points requiring legal review
   - Compliance checklists
   - Recommended additions

---

## Design Features

### Critical Section Highlighting
- Section 5 (Medical Services) has yellow background (`bg-[#FEF3C7]`)
- Warning icon in TOC and section header
- Prominent border and styling

### Liability Section
- Special styling with scale icon (⚖️)
- Clear visual separation
- Important box for compensation cap

### Prohibited Conduct
- Red-themed cards with ban icons
- Clear visual indication of restrictions

### Responsive Design
- Sticky TOC on desktop
- Mobile-friendly layout
- Proper RTL support

---

## Next Steps

1. **Immediate:**
   - [ ] Fill all PLACEHOLDER values
   - [ ] Schedule legal review with specialized counsel
   - [ ] Prepare list of specific questions for lawyer

2. **Legal Review:**
   - [ ] Review all 10 critical points above
   - [ ] Verify compliance with all checklists
   - [ ] Add recommended clauses
   - [ ] Get written approval

3. **Technical:**
   - [ ] Generate PDF version
   - [ ] Implement version control system
   - [ ] Set up change notification system
   - [ ] Create user acceptance flow

4. **Before Launch:**
   - [ ] Final legal sign-off
   - [ ] Test all links and references
   - [ ] Verify mobile responsiveness
   - [ ] Ensure consistency with privacy policy

---

## Legal Counsel Contact

**Required Expertise:**
- Saudi E-Commerce Law
- Healthcare/Medical Law
- Consumer Protection
- Data Protection (PDPL)
- Contract Law

**Recommended:** Engage a law firm with specific experience in digital health platforms in Saudi Arabia.

---

**⚠️ DO NOT PUBLISH WITHOUT LEGAL APPROVAL ⚠️**
