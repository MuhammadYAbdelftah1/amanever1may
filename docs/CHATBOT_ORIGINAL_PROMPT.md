# ORIGINAL PROMPT — Aman Ever Chatbot Widget (Phase 1 MVP)

> **Note**: This is the original prompt used to build the Omniya chatbot. It serves as a reference for the initial requirements and specifications.

---

You are a senior full-stack engineer. Build a production-ready **chatbot widget** for Aman Ever (`amanever.com`) — a Saudi healthtech platform. This is **Phase 1 MVP**: web widget only, covering the **B2C patient flow**, with architecture ready to extend to 3 more audiences (doctors, B2B partners, affiliate marketers) in later phases.

## Stack & constraints

- Next.js 14+ App Router, TypeScript strict.
- TailwindCSS + shadcn/ui + lucide-react icons.
- `framer-motion` for chat animations.
- `zustand` for chat state (persisted to `localStorage`).
- i18n: Arabic-first under `/ar/*`, fully RTL-native (`ps-*`, `pe-*`, `start-*`, `end-*`).
- No external chatbot SDK. Build the flow engine ourselves (JSON-config driven).
- No backend API yet — mock the send/receive with a local engine. Expose a clean `ChatTransport` interface so a real backend (WhatsApp Cloud API / OpenAI / Dialogflow) can be plugged in later.
- No fake screenshots, no stock avatars. Use abstract SVG illustration only.

## Persona — أمنية

- **Name (AR):** أمنية  ·  **Name (EN):** Omniya
- **Role:** المساعدة الذكية لأمان إيفر
- **Avatar:** abstract emerald-gradient SVG circle with a subtle pulse animation and a small medical-cross + heart glyph. **Do NOT use a human photo** (bias avoidance per CU Anschutz healthcare chatbot research).
- **Tone:** ودودة، محترفة، لهجة سعودية بسيطة (ليست فصحى متصلبة، وليست عامية مفرطة).
- **Greeting style:** "هلا وسهلا" / "حيّاك الله"
- **Never:** give medical diagnosis, promise specific outcomes, or collect national ID / insurance details in chat.
- **Always:** offer human handoff (WhatsApp 0544608220) within reach — persistent footer button.
- **Emergency trigger:** if the user mentions ألم في الصدر / صعوبة تنفس / نزيف / حالة طارئة / إسعاف → immediately show red emergency card with 911/997 + stop flow.

## File structure

```
app/[locale]/layout.tsx ← mount <ChatLauncher /> globally

components/chatbot/
  ChatLauncher.tsx ← floating button (bottom-start in RTL)
  ChatWindow.tsx ← the panel (header + body + input)
  ChatHeader.tsx ← Omniya avatar + name + status + close
  ChatBody.tsx ← scroll container, renders messages
  ChatInput.tsx ← text input + send + voice-note placeholder
  MessageBubble.tsx ← user/bot bubbles with RTL tails
  QuickReplies.tsx ← horizontal chip row
  TypingIndicator.tsx ← 3 animated dots
  ConsentCard.tsx ← PDPL consent on first open
  EmergencyCard.tsx ← red card with 997/911 + stop CTA
  HumanHandoffBanner.tsx ← persistent footer "تواصل مع موظف"
  OmniyaAvatar.tsx ← SVG avatar component (animated)
  BlocksRenderer.tsx ← renders typed message blocks (text/cards/links/forms)

lib/chatbot/
  flow-engine.ts ← JSON-driven state machine
  transport.ts ← ChatTransport interface + MockTransport
  store.ts ← zustand store (messages, currentNode, userInputs, consent)
  intents.ts ← keyword/regex intent detection (incl. emergency triggers)
  analytics.ts ← track(event, payload) — dataLayer push stub
  types.ts ← Message, Block, FlowNode, UserProfile, Audience
  constants.ts ← WhatsApp URL, emergency numbers, hotline, brand tokens

data/chatbot/flows/
  root.json ← audience router (entry node)
  patient.json ← B2C patient flow (full, this phase)
  doctor.json ← stub — single handoff node for now
  partner.json ← stub — single handoff node
  affiliate.json ← stub — single handoff node

knowledge/
  services.json ← service cards (from site config)
  membership.json ← Premier/VIP pricing (use TODO placeholders — not final)
  faq.json ← top 8 FAQs (from homepage FAQ section)
  network-cities.json ← cities list (Jeddah, Riyadh, Dammam…)
```

## Data model (`lib/chatbot/types.ts`)

```typescript
export type Audience = "patient" | "doctor" | "partner" | "affiliate"

export type Block =
  | { type: "text"; text: string }
  | { type: "card"; title: string; body?: string; icon?: string; href?: string }
  | { type: "list"; items: Array<{ label: string; value: string }> }
  | { type: "link"; label: string; href: string; external?: boolean }
  | { type: "divider" }
  | { type: "image"; src: string; alt: string }

export type QuickReply = { label: string; value: string; icon?: string }

export type Message = {
  id: string
  role: "bot" | "user" | "system"
  blocks: Block[]
  quickReplies?: QuickReply[]
  createdAt: number
}

export type FlowNode = {
  id: string
  audience?: Audience
  blocks: Block[]
  quickReplies?: QuickReply[]
  input?: { key: string; placeholder: string; validate?: "phone" | "email" | "text"; required?: boolean }
  next?: string | Record<string, string> // static next OR map by quick-reply value
  handoff?: { channel: "whatsapp"; prefilledMessage: string }
  emergency?: boolean // marks this node as emergency screen
  final?: boolean
}

export type FlowFile = { startNode: string; nodes: Record<string, FlowNode> }

export type UserProfile = {
  audience?: Audience
  name?: string
  phone?: string
  city?: string
  specialty?: string
  consent: boolean
}
```

## Flow engine (`lib/chatbot/flow-engine.ts`)

Implement a deterministic state machine:

- Loads a `FlowFile` JSON.
- Tracks current node id in zustand.
- On node enter: emit a `Message` with the node's `blocks` + `quickReplies`, advance after small `setTimeout` (900ms typing delay + per-block stagger).
- On quick-reply click or text input: resolve `next` (string or map), go to next node.
- On `handoff`: render a "Open WhatsApp" button with the prefilled message URL-encoded.
- On `emergency: true`: replace UI with `EmergencyCard`, freeze input.
- Input validation: phone = `^(05|\\+9665)\\d{8}$` KSA format; email = standard regex.
- Always call `detectIntent(userText)` before node transition; if intent = `emergency`, jump to emergency node regardless of current position.

## Transport abstraction (`lib/chatbot/transport.ts`)

```typescript
export interface ChatTransport {
  send(message: { text?: string; value?: string; nodeId: string }): Promise<void>
  onMessage(cb: (msg: Message) => void): () => void
  setAudience(a: Audience): void
}

export class MockTransport implements ChatTransport {
  // drives the flow engine locally for Phase 1
}

// Phase 3+: RealtimeTransport wraps WhatsApp Cloud API / backend WebSocket.
```

## UI specs

### Launcher (`ChatLauncher.tsx`)

- Fixed `bottom-6 start-6` (RTL → visually bottom-right, which is natural on ar).
- 56×56 circle, emerald-600 bg, white Omniya glyph + a tiny green pulse dot.
- On unread: small badge with count.
- `aria-label="افتح شات أمنية"`, keyboard focusable, `Esc` closes window.

### Window (`ChatWindow.tsx`)

- Mobile: full-screen takeover, slide-up.
- Desktop: 380×620 floating card, `start-6 bottom-24`, rounded-3xl, shadow-2xl, `ring-1 ring-slate-200`.
- Framer-motion: spring slide+fade on mount/unmount.
- Header (emerald gradient): avatar + "أمنية" + subtitle "تردّ خلال ثواني" + status dot + close X (`end-3`).
- Body: `flex-col-reverse` scroll region, auto-scroll on new message.
- Footer: ChatInput + persistent HumanHandoffBanner above it.

### MessageBubble

- **Bot bubble:** bg `bg-slate-50`, text slate-900, rounded-2xl with tail on **start** side (RTL-aware: use logical borders).
- **User bubble:** bg `bg-emerald-600`, text white, tail on **end** side.
- Timestamp below in `text-[10px] text-slate-400`.
- Renders blocks via `BlocksRenderer`. Text blocks support inline bold (`**`) and links (`[label](url)`).

### QuickReplies

- Horizontal scroll row (`overflow-x-auto`, `scrollbar-hide`), `gap-2`, `py-2`.
- Each chip: `rounded-full border border-emerald-300 bg-white text-emerald-700 px-4 py-2 text-sm`, hover emerald-50.
- On click: chip disappears with the old message, user bubble appears echoing the label.
- Max ≈ 5 visible; scrollable for more.

### TypingIndicator

- 3 dots, bouncing `animate-bounce` with staggered delays, inside a bot bubble.

### ConsentCard (first open only)

- Emerald icon + heading "موافقتك على معالجة البيانات".
- Body (short): نحفظ محادثتك لتحسين الخدمة. لا نشارك بياناتك مع طرف ثالث. بياناتك محمية وفق **نظام حماية البيانات الشخصية السعودي (PDPL)**.
- 2 buttons: **"موافق"** (emerald, primary) → proceeds. **"التفاصيل"** → opens `/ar/privacy` in new tab.
- Store consent in `localStorage` key `amanever:chat:consent:v1`.

### EmergencyCard

- Full-width card, red-50 bg, red-600 border-s-4, ⚠️ icon.
- Title: "هذه حالة طارئة — لا ننصح بالانتظار"
- Body: اتصل بالإسعاف فوراً
- 2 big buttons: 📞 **"اتصل بـ 997"** (`tel:997`) + 📞 **"اتصل بـ 911"** (`tel:911`)
- Third button (subtle): "أو تواصل مع طبيب في أمان إيفر الآن" → WhatsApp handoff.
- Input is disabled until user clicks "فهمت".

### HumanHandoffBanner

- Thin bar above input: "تبي تكلم موظف؟ → تواصل عبر واتساب"
- On click: open `https://wa.me/966544608220?text=مرحبا،%20جاني%20من%20شات%20أمنية`

### OmniyaAvatar

- 40×40 (header: 32×32), SVG:
  - circular gradient bg `from-emerald-400 to-emerald-600`
  - centered medical cross formed from 2 rounded rectangles
  - small heart dot overlay
  - `<circle>` pulse ring using `animate-ping` opacity 0.4 when bot is "typing"

## Root flow (`data/chatbot/flows/root.json`)

```json
{
  "startNode": "welcome",
  "nodes": {
    "welcome": {
      "id": "welcome",
      "blocks": [
        { "type": "text", "text": "هلا وسهلا! 👋 أنا أمنية — مساعدتك الذكية في أمان إيفر." },
        { "type": "text", "text": "كيف أقدر أخدمك اليوم؟" }
      ],
      "quickReplies": [
        { "label": "🩺 أنا مستفيد", "value": "patient", "icon": "user" },
        { "label": "👨‍⚕️ أنا طبيب", "value": "doctor", "icon": "stethoscope" },
        { "label": "🏢 أنا شريك/منشأة", "value": "partner", "icon": "building" },
        { "label": "💰 مسوّق بالعمولة", "value": "affiliate", "icon": "trending-up" }
      ],
      "next": {
        "patient": "patient:welcome",
        "doctor": "doctor:welcome",
        "partner": "partner:welcome",
        "affiliate": "affiliate:welcome"
      }
    }
  }
}
```

## Patient flow (`data/chatbot/flows/patient.json`) — **full implementation**

Nodes to implement (IDs prefixed `patient:`):

1. **`welcome`** — "حيّاك الله! وش اللي تحتاجه اليوم؟"
   Quick replies:
   - 📅 حجز استشارة → `book-specialty`
   - 💳 أعرف عن الباقات → `membership-menu`
   - 🗺️ الشبكة الطبية → `network-city`
   - 🎟️ الخصومات والكاش باك → `discounts-info`
   - 💬 دعم فني → `support`

2. **`book-specialty`** — "أي تخصص تحتاج؟"
   Quick replies (top 6): طب عام، أطفال، نساء وولادة، جلدية، أسنان، نفسي
   - "تخصص آخر" → text input `specialty` → `book-confirm`
   - Any selection → `book-confirm`

3. **`book-confirm`** — card with summary + CTA:
   - Card: "استشارة في تخصص {{specialty}} — ابتداءً من 50 ريال"
   - Link block: "احجز الآن في التطبيق" → `https://amanever.com/#services-package`
   - Quick reply: "عندي سؤال ثاني" → `welcome`

4. **`membership-menu`** — "عندنا باقتين:"
   - Card Premier: "Premier — 199 ريال/شهر · خصم 50% · استشارة مجانية/شهر" [TODO: verify pricing]
   - Card VIP: "VIP — 499 ريال/شهر · خصم 80% · استشارات غير محدودة · زيارة منزلية" [TODO: verify]
   - Quick replies: "قارن بينهم" → `membership-compare` · "اشترك" → link to `/ar/membership` · "رجوع" → `welcome`

5. **`membership-compare`** — `list` block with feature matrix (6 rows), then back to menu.

6. **`network-city`** — "في أي مدينة؟"
   Quick replies: جدة، الرياض، الدمام، مكة، المدينة، تبوك، الخبر، أبها
   → `network-result` (card: "في {{city}}: 120+ مقدم خدمة [TODO real count]. شوف الخريطة الكاملة") + link to `/ar/medical-network`.

7. **`discounts-info`** — explains خصم 80% + cashback + wallet points, CTA to `/ar/services#financial`.

8. **`support`** — 3 quick replies:
   - "مشكلة تقنية في التطبيق" → `support-tech` → handoff
   - "استفسار عن فاتورة/استرداد" → `support-billing` → handoff
   - "غير ذلك" → handoff

9. **`support-tech`** / **`support-billing`** — collect phone (input validate="phone") then → handoff node with prefilled WhatsApp message.

10. **`handoff-whatsapp`** — `handoff` node. Prefilled: `مرحبا، أنا {{name || "عميل"}} — رقمي {{phone}} — موضوع: {{topic}}`.

11. **`emergency`** — `emergency: true`. Used when intent detector flags emergency keywords at any step.

## Stub flows (other audiences — Phase 1 placeholder)

Each of `doctor.json`, `partner.json`, `affiliate.json` has only one node — a polite message + handoff:

- **Doctor:** "أهلاً دكتور! تسجيل الأطباء يتطلب رفع رخصة SCFHS ونموذج كامل. راح يخدمك فريقنا المخصص عبر واتساب مباشرة." → handoff (prefilled: "أرغب بالانضمام كطبيب في الشبكة").
- **Partner:** "شكراً على اهتمامك بالشراكة! فريق B2B يتواصل معك." → handoff (prefilled: "أمثّل منشأة وأرغب بمعرفة تفاصيل الشراكة").
- **Affiliate:** "برنامج المسوّقين بالعمولة قيد الإطلاق — نسعد بانضمامك كمؤسس مبكّر." → handoff (prefilled: "أرغب بالتسجيل في برنامج المسوّقين بالعمولة").

> 🔜 Phase 4 سيستبدل الـ affiliate stub بـ flow كامل للتسجيل + لوحة التحكم.

## Intent detection (`lib/chatbot/intents.ts`)

Simple regex/keyword map. No LLM yet.

```typescript
const EMERGENCY = /\b(ألم\s*في\s*الصدر|صعوبة\s*تنفس|نزيف|إغماء|سكتة|جلطة|طوارئ|طارئ|إسعاف|911|997|emergency)\b/iu
const BOOKING = /\b(حجز|موعد|استشارة|كشف|أحجز|بحجز)\b/iu
const MEMBERSHIP= /\b(باقة|اشتراك|عضوية|VIP|بريميير|Premier)\b/iu
const NETWORK = /\b(مستشفى|عيادة|صيدلية|شبكة|مقدم\s*خدمة)\b/iu
const REFUND = /\b(استرداد|استرجاع|فلوسي|فاتورة|مبلغ)\b/iu

export function detectIntent(text: string): "emergency" | "booking" | "membership" | "network" | "refund" | "unknown" {
  if (EMERGENCY.test(text)) return "emergency"
  if (BOOKING.test(text)) return "booking"
  if (MEMBERSHIP.test(text)) return "membership"
  if (NETWORK.test(text)) return "network"
  if (REFUND.test(text)) return "refund"
  return "unknown"
}
```

## Analytics events (stub, push to `window.dataLayer`)

Track these events:
- `chat_opened`
- `chat_consent_given`
- `chat_audience_selected` { audience }
- `chat_node_reached` { nodeId }
- `chat_quick_reply_clicked` { nodeId, value }
- `chat_user_message_sent` { length }
- `chat_emergency_triggered` { keyword }
- `chat_handoff_whatsapp_clicked` { topic }
- `chat_closed` { messagesCount, durationMs }

## Accessibility

- The widget is a dialog: `role="dialog"`, `aria-modal="true"`, `aria-labelledby` pointing to header.
- Focus trap inside window. `Esc` closes. Return focus to launcher on close.
- Every quick reply is a real `<button>` with `aria-label`.
- Emergency card uses `role="alert"` + `aria-live="assertive"`.
- Contrast AA verified for emerald-600 on white, emerald-50 chips.
- Input has visible label (sr-only) "اكتب رسالتك".
- Respect `prefers-reduced-motion`: disable spring/bounce.

## RTL specifics

- All margins/paddings use logical props (`ps-4`, `pe-3`, `ms-auto`, `me-2`).
- Message bubble tail direction inverts based on `dir="rtl"` (use logical border radius).
- Forward arrows: `ArrowLeft` icon (since forward motion is leftward in RTL).
- Launcher at `start-6 bottom-6` (appears on right visually).
- Numbers, phone numbers, and Latin brand names stay LTR via `<bdi>` wrappers.

## Brand tokens

```typescript
export const brand = {
  primary: "emerald-600",
  primaryDark: "emerald-700",
  primaryLight: "emerald-50",
  surface: "white",
  text: "slate-900",
  muted: "slate-500",
  danger: "red-600",
  whatsapp: "#25D366",
  radius: { bubble: "1rem", window: "1.5rem", chip: "9999px" },
  font: "IBM Plex Sans Arabic, Noto Sans Arabic, system-ui, sans-serif",
}
```

## Privacy & compliance

- Show `ConsentCard` on first open, block all flows until accepted.
- Never prompt for: national ID, insurance numbers, passwords, exact medical diagnosis details, payment card data.
- Link to `/ar/privacy` visible in header menu (⋯) and inside ConsentCard.
- Clear conversation option in header menu → wipes zustand + localStorage.
- Auto-expire conversation history after 90 days (check `createdAt` on mount).

## TODO checklist (for me, the human, to fill after code ships)

- [ ] Premier / VIP pricing — final values from business (currently placeholder 199/499)
- [ ] Medical network real count per city (currently placeholder 120+)
- [ ] Top 6 specialties — validate with product team (currently general/pediatrics/OBGYN/derma/dental/psych)
- [ ] Real WhatsApp Business API endpoint (currently `wa.me` deep link only)
- [ ] Replace MockTransport with real backend in Phase 2
- [ ] PDPL privacy policy page `/ar/privacy` must exist before launch
- [ ] Legal review of emergency disclaimer wording
- [ ] QA: Arabic dialect variations (سعودي/خليجي)
- [ ] Stress test: long messages, emoji spam, SQL-injection-looking strings
- [ ] Add `amanever:chat:consent:v1` to cookie policy
- [ ] Verify tel: links work on iOS Safari + Android Chrome
- [ ] Measure: first-message latency, handoff rate, completion rate
- [ ] Plan Phase 2: WhatsApp Cloud API + same flow engine
- [ ] Plan Phase 4: Affiliate full flow + dashboard at `/ar/affiliate-dashboard`

## Deliverables

1. All files listed in the file structure — production-ready, typed, tested on mobile + desktop.
2. One Storybook-style demo page at `/ar/_dev/chat` rendering the widget inline for QA.
3. README with:
   - How to add a new flow (JSON file + register in root).
   - How to swap `MockTransport` with a real backend.
   - How to add a new language (en).
4. No console errors, no hydration warnings, Lighthouse a11y ≥ 95.

---

## Implementation Status

✅ **COMPLETE** — All requirements have been implemented. See:
- `CHATBOT_IMPLEMENTATION_COMPLETE.md` for completion report
- `CHATBOT_DELIVERY_REPORT.md` for delivery details
- `docs/CHATBOT_README.md` for technical documentation
