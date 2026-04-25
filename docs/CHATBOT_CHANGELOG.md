# Omniya Chatbot — Changelog

## Phase 1 MVP (Current) — January 2026

### ✨ Features

- **JSON-driven flow engine** — Deterministic state machine with node-based navigation
- **Full B2C patient flow** — Booking, membership, network, discounts, support
- **Emergency detection** — Keyword-based intent detection with immediate red card
- **PDPL consent management** — First-open consent card with privacy policy link
- **WhatsApp handoff** — Seamless transfer to human agents with prefilled messages
- **RTL-native Arabic UI** — Logical properties, flipped bubble tails, proper text direction
- **Framer Motion animations** — Spring transitions, typing indicators, pulse effects
- **localStorage persistence** — Auto-save conversation state with 90-day expiry
- **Accessibility (WCAG AA)** — Dialog role, focus trap, keyboard shortcuts, screen reader support
- **Analytics tracking** — 9 event types pushed to dataLayer
- **Responsive design** — Full-screen mobile, floating card desktop
- **Stub flows** — Doctor, partner, affiliate (handoff only, ready for Phase 4)

### 🎨 Components

- `ChatLauncher` — Floating button with unread badge
- `ChatWindow` — Main orchestrator with consent/emergency/chat states
- `ChatHeader` — Avatar, status, menu, close
- `ChatBody` — Scroll container with auto-scroll
- `ChatInput` — Text input with validation
- `MessageBubble` — User/bot bubbles with RTL support
- `QuickReplies` — Horizontal chip row
- `BlocksRenderer` — Text, card, list, link, divider, image
- `OmniyaAvatar` — SVG avatar with pulse animation
- `TypingIndicator` — 3-dot bounce
- `ConsentCard` — PDPL consent with accept/details
- `EmergencyCard` — Red card with 997/911 + WhatsApp
- `HumanHandoffBanner` — Persistent footer CTA

### 🛠️ Infrastructure

- `types.ts` — TypeScript types for all entities
- `constants.ts` — Brand tokens, URLs, storage keys
- `intents.ts` — Keyword-based intent detection
- `analytics.ts` — Event tracking with dataLayer
- `transport.ts` — ChatTransport interface + MockTransport
- `store.ts` — Zustand store with localStorage persistence
- `flow-engine.ts` — JSON-driven state machine

### 📊 Flows

- `root.json` — Audience router (4 audiences)
- `patient.json` — Full B2C flow (11 nodes)
- `doctor.json` — Stub (1 node)
- `partner.json` — Stub (1 node)
- `affiliate.json` — Stub (1 node)

### 📝 Documentation

- `CHATBOT_README.md` — Technical documentation
- `CHATBOT_CHANGELOG.md` — This file
- Demo page at `/ar/_dev/chat`

### 🐛 Known Issues

- Premier/VIP pricing is placeholder (199/499) — needs business verification
- Medical network count is placeholder (120+) — needs real data
- Privacy policy page `/ar/privacy` doesn't exist yet
- Voice note button is disabled (future feature)

---

## Phase 2 (Planned) — Q2 2026

### 🎯 Goals

- Replace MockTransport with WhatsApp Cloud API
- Real-time message sync with backend
- Message history across devices
- Admin dashboard for monitoring conversations
- A/B testing framework for flow optimization

### 🔧 Technical

- WebSocket connection to backend
- JWT authentication for users
- Message queue (Redis) for reliability
- PostgreSQL for conversation history
- Grafana dashboards for metrics

---

## Phase 3 (Planned) — Q3 2026

### 🎯 Goals

- Voice note recording and playback
- Image upload (e.g., prescription photos)
- Video consultation booking
- Payment integration (Hyperpay/Moyasar)
- Push notifications for follow-ups

### 🔧 Technical

- WebRTC for voice recording
- S3 for media storage
- FFmpeg for audio transcoding
- Stripe/Hyperpay SDK integration

---

## Phase 4 (Planned) — Q4 2026

### 🎯 Goals

- Full affiliate flow (registration, dashboard, payouts)
- Affiliate dashboard at `/ar/affiliate-dashboard`
- Commission tracking and reporting
- Referral link generation
- Payout automation

### 🔧 Technical

- Affiliate tracking pixel
- Commission calculation engine
- Payout API (bank transfer)
- Analytics dashboard (Chart.js)

---

## Future Enhancements

- **Multi-language support** — English (en), Urdu (ur)
- **AI-powered responses** — OpenAI GPT-4 for complex queries
- **Sentiment analysis** — Detect frustration and escalate
- **Proactive messaging** — "Your appointment is tomorrow"
- **Chatbot personality** — More conversational, less robotic
- **Rich media** — Carousels, videos, interactive cards
- **Integration with CRM** — Salesforce, HubSpot
- **HIPAA compliance** — For US expansion
