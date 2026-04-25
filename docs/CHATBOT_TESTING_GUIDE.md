# Omniya Chatbot — Testing Guide

## Quick Start

1. **Start dev server**:
   ```bash
   npm run dev
   ```

2. **Open demo page**:
   ```
   http://localhost:3000/ar/_dev/chat
   ```

3. **Test scenarios** (see below)

---

## Test Scenarios

### 1. First-Time User Flow

**Steps:**
1. Open demo page
2. Chat should auto-open
3. **Expected:** Consent card appears
4. Click "موافق"
5. **Expected:** Welcome message from Omniya appears
6. **Expected:** 4 audience quick replies visible

**Pass criteria:**
- ✅ Consent card shows on first open
- ✅ Consent persists after page refresh
- ✅ Welcome message appears after consent
- ✅ Quick replies are clickable

---

### 2. Emergency Detection

**Steps:**
1. Complete first-time flow
2. Select "أنا مستفيد"
3. In text input, type: `ألم في الصدر`
4. Press Enter

**Expected:**
- Red emergency card appears immediately
- Input is disabled
- 3 buttons visible: 997, 911, WhatsApp
- Alert role announced to screen readers

**Pass criteria:**
- ✅ Emergency card shows within 1s
- ✅ Red background with warning icon
- ✅ Phone buttons work (tel: links)
- ✅ WhatsApp button opens in new tab

**Alternative keywords to test:**
- `نزيف`
- `صعوبة تنفس`
- `إغماء`
- `طوارئ`

---

### 3. Booking Flow

**Steps:**
1. Select "أنا مستفيد"
2. Select "📅 حجز استشارة"
3. Select "🩺 طب عام"

**Expected:**
- Confirmation card with "استشارة طبية"
- "احجز الآن" link button
- "عندي سؤال ثاني" quick reply

**Pass criteria:**
- ✅ Card shows specialty info
- ✅ Link opens in new tab
- ✅ Back button returns to main menu

**Test other specialties:**
- أطفال
- نساء وولادة
- جلدية
- أسنان
- نفسي
- تخصص آخر (text input)

---

### 4. Membership Flow

**Steps:**
1. Select "أنا مستفيد"
2. Select "💳 أعرف عن الباقات"

**Expected:**
- 2 cards: Premier (199 ر.س) + VIP (499 ر.س)
- 3 quick replies: قارن، اشترك، رجوع

**Pass criteria:**
- ✅ Both cards visible
- ✅ Pricing displayed correctly
- ✅ Compare shows 6-row list
- ✅ Subscribe link opens in new tab

---

### 5. Network Flow

**Steps:**
1. Select "أنا مستفيد"
2. Select "🗺️ الشبكة الطبية"
3. Select "جدة"

**Expected:**
- Card with "120+ مقدم خدمة"
- "عرض الخريطة" link
- Back button

**Pass criteria:**
- ✅ City-specific result
- ✅ Link opens in new tab
- ✅ All 8 cities work

---

### 6. Support Flow (Phone Validation)

**Steps:**
1. Select "أنا مستفيد"
2. Select "💬 دعم فني"
3. Select "مشكلة تقنية في التطبيق"
4. Enter phone: `0512345678`
5. Press Enter

**Expected:**
- Input field with placeholder
- Validation on submit
- WhatsApp handoff message

**Pass criteria:**
- ✅ Valid phone accepted: `0512345678`, `+966512345678`
- ✅ Invalid phone rejected: `123`, `05123`, `abc`
- ✅ Error message shown for invalid input
- ✅ WhatsApp opens with prefilled message

---

### 7. Other Audiences (Stubs)

**Steps:**
1. Select "👨‍⚕️ أنا طبيب"

**Expected:**
- Single message: "تسجيل الأطباء يتطلب..."
- WhatsApp handoff button

**Pass criteria:**
- ✅ Doctor flow shows handoff
- ✅ Partner flow shows handoff
- ✅ Affiliate flow shows handoff
- ✅ Each has unique prefilled message

---

## UI/UX Tests

### 8. Typing Indicator

**Steps:**
1. Send any message
2. Observe bot response

**Expected:**
- Omniya avatar pulses
- 3 dots bounce animation
- ~900ms delay before message

**Pass criteria:**
- ✅ Typing shows before each bot message
- ✅ Animation is smooth (60fps)
- ✅ Pulse ring visible on avatar

---

### 9. Quick Reply Interaction

**Steps:**
1. Click any quick reply chip

**Expected:**
- Chip disappears
- User bubble appears with chip label
- Bot responds

**Pass criteria:**
- ✅ Chip animates out
- ✅ User message echoes label exactly
- ✅ No duplicate messages

---

### 10. Auto-Scroll

**Steps:**
1. Send 10+ messages to fill scroll area
2. Observe scroll behavior

**Expected:**
- Auto-scrolls to bottom on new message
- Smooth scroll animation

**Pass criteria:**
- ✅ Always shows latest message
- ✅ No manual scroll needed
- ✅ Works on mobile + desktop

---

### 11. Clear Conversation

**Steps:**
1. Send several messages
2. Click menu (⋯) in header
3. Click "مسح المحادثة"
4. Confirm

**Expected:**
- Confirmation dialog
- All messages cleared
- Returns to welcome state

**Pass criteria:**
- ✅ Confirmation required
- ✅ State resets completely
- ✅ Consent is preserved

---

## Responsive Tests

### 12. Mobile View

**Steps:**
1. Open DevTools
2. Set viewport to iPhone 12 (390×844)
3. Open chat

**Expected:**
- Full-screen takeover
- No rounded corners
- Covers entire viewport

**Pass criteria:**
- ✅ No white gaps
- ✅ Header at top
- ✅ Input at bottom
- ✅ Scrollable body

---

### 13. Desktop View

**Steps:**
1. Set viewport to 1920×1080
2. Open chat

**Expected:**
- Floating card at bottom-start
- 380×620px dimensions
- Rounded corners (1.5rem)
- Shadow visible

**Pass criteria:**
- ✅ Positioned correctly (RTL: bottom-right)
- ✅ Doesn't cover launcher
- ✅ Stays within viewport

---

## RTL Tests

### 14. RTL Layout

**Steps:**
1. Verify page is `dir="rtl"`
2. Open chat

**Expected:**
- Launcher at bottom-right (visually)
- Window at bottom-right (visually)
- Bot bubbles on right
- User bubbles on left
- Bubble tails point correctly

**Pass criteria:**
- ✅ All logical props work (`start`, `end`)
- ✅ Tails flip direction
- ✅ Icons don't mirror
- ✅ Numbers stay LTR

---

## Accessibility Tests

### 15. Keyboard Navigation

**Steps:**
1. Tab through page
2. Focus on launcher
3. Press Enter
4. Tab through chat elements
5. Press Esc

**Expected:**
- Launcher is focusable
- Enter opens chat
- Focus trap inside window
- Esc closes chat
- Focus returns to launcher

**Pass criteria:**
- ✅ All interactive elements focusable
- ✅ Focus visible (outline)
- ✅ Tab order logical
- ✅ Esc works

---

### 16. Screen Reader

**Steps:**
1. Enable VoiceOver (Mac) or NVDA (Windows)
2. Navigate to launcher
3. Open chat

**Expected:**
- Launcher announced: "افتح شات أمنية"
- Dialog role announced
- Messages announced as they appear
- Emergency card uses alert role

**Pass criteria:**
- ✅ All buttons have labels
- ✅ Dialog role present
- ✅ Alert role on emergency
- ✅ No unlabeled elements

---

### 17. Reduced Motion

**Steps:**
1. Enable "Reduce motion" in OS settings
2. Open chat

**Expected:**
- No spring animations
- No bounce effects
- Instant transitions

**Pass criteria:**
- ✅ Respects `prefers-reduced-motion`
- ✅ Still functional
- ✅ No jarring movements

---

## Performance Tests

### 18. Bundle Size

**Steps:**
1. Run `npm run build`
2. Check output

**Expected:**
- Chatbot chunk < 50KB gzipped
- No duplicate dependencies
- Tree-shaking works

**Pass criteria:**
- ✅ Total JS < 150KB
- ✅ No console warnings
- ✅ Build succeeds

---

### 19. First Message Latency

**Steps:**
1. Open chat
2. Accept consent
3. Measure time to first message

**Expected:**
- < 1s from consent to message

**Pass criteria:**
- ✅ Feels instant
- ✅ No blank screen
- ✅ Typing indicator shows

---

### 20. Memory Leaks

**Steps:**
1. Open/close chat 50 times
2. Check DevTools Memory tab

**Expected:**
- No memory growth
- Event listeners cleaned up

**Pass criteria:**
- ✅ Heap size stable
- ✅ No detached DOM nodes
- ✅ No console errors

---

## Edge Cases

### 21. Long Messages

**Steps:**
1. Send a 500-character message

**Expected:**
- Message wraps correctly
- Bubble doesn't overflow
- Scroll works

**Pass criteria:**
- ✅ No horizontal scroll
- ✅ Readable text
- ✅ Bubble max-width respected

---

### 22. Emoji Spam

**Steps:**
1. Send: `🎉🎉🎉🎉🎉🎉🎉🎉🎉🎉`

**Expected:**
- Renders correctly
- No layout break

**Pass criteria:**
- ✅ Emojis visible
- ✅ No overflow
- ✅ Bubble size adapts

---

### 23. SQL Injection Attempt

**Steps:**
1. Send: `'; DROP TABLE users; --`

**Expected:**
- Treated as plain text
- No errors
- Bot responds normally

**Pass criteria:**
- ✅ No console errors
- ✅ No XSS vulnerability
- ✅ Text escaped properly

---

### 24. Rapid Clicking

**Steps:**
1. Click quick reply 10 times rapidly

**Expected:**
- Only 1 message sent
- No duplicate bubbles

**Pass criteria:**
- ✅ Debounced correctly
- ✅ No race conditions
- ✅ State consistent

---

### 25. Offline Behavior

**Steps:**
1. Open DevTools Network tab
2. Set to "Offline"
3. Try to send message

**Expected:**
- Graceful degradation
- Error message (future)
- No crash

**Pass criteria:**
- ✅ No console errors
- ✅ App doesn't freeze
- ✅ State preserved

---

## Browser Compatibility

### 26. Cross-Browser

**Test on:**
- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

**Pass criteria:**
- ✅ All features work
- ✅ No visual bugs
- ✅ Animations smooth

---

## Regression Tests

### 27. After Code Changes

**Always test:**
1. First-time user flow
2. Emergency detection
3. Phone validation
4. Quick reply interaction
5. Clear conversation
6. Keyboard navigation

**Pass criteria:**
- ✅ All core flows work
- ✅ No new console errors
- ✅ Build succeeds

---

## Automated Testing (Future)

### Playwright E2E Tests

```typescript
test('emergency detection', async ({ page }) => {
  await page.goto('/ar/_dev/chat');
  await page.click('[aria-label="افتح شات أمنية"]');
  await page.click('text=موافق');
  await page.click('text=أنا مستفيد');
  await page.fill('input', 'ألم في الصدر');
  await page.press('input', 'Enter');
  await expect(page.locator('[role="alert"]')).toBeVisible();
});
```

### Jest Unit Tests

```typescript
describe('detectIntent', () => {
  it('detects emergency keywords', () => {
    expect(detectIntent('ألم في الصدر')).toBe('emergency');
    expect(detectIntent('نزيف')).toBe('emergency');
  });
});
```

---

## Reporting Bugs

**Template:**

```
**Title:** [Component] Brief description

**Steps to reproduce:**
1. ...
2. ...

**Expected:** ...
**Actual:** ...

**Environment:**
- Browser: Chrome 120
- OS: macOS 14
- Viewport: 1920×1080

**Screenshots:** (attach)
**Console errors:** (paste)
```

---

## Sign-Off Checklist

Before marking Phase 1 as complete:

- [ ] All 27 test scenarios pass
- [ ] No console errors in production build
- [ ] Lighthouse a11y score ≥ 95
- [ ] Works on all target browsers
- [ ] RTL layout verified
- [ ] Keyboard navigation works
- [ ] Screen reader tested
- [ ] Performance benchmarks met
- [ ] Documentation complete
- [ ] Demo page functional
- [ ] Legal review of emergency disclaimer
- [ ] Privacy policy page exists
- [ ] Business data verified (pricing, network count)
