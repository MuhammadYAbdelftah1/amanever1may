# Omniya Chatbot — Technical Documentation

## Overview

**Omniya (أمنية)** is the intelligent assistant for Aman Ever, built as a production-ready web widget. This is **Phase 1 MVP** covering the B2C patient flow, with architecture ready to extend to 3 more audiences (doctors, B2B partners, affiliate marketers).

## Architecture

### Core Components

```
lib/chatbot/
├── types.ts              # TypeScript types & interfaces
├── constants.ts          # Brand tokens, URLs, storage keys
├── intents.ts            # Keyword-based intent detection
├── analytics.ts          # Event tracking (dataLayer)
├── transport.ts          # ChatTransport interface + MockTransport
├── store.ts              # Zustand store with localStorage persistence
└── flow-engine.ts        # JSON-driven state machine

components/chatbot/
├── OmniyaAvatar.tsx      # SVG avatar with pulse animation
├── TypingIndicator.tsx   # 3-dot bounce animation
├── BlocksRenderer.tsx    # Renders message blocks (text/card/list/link)
├── QuickReplies.tsx      # Horizontal chip row
├── MessageBubble.tsx     # User/bot message bubbles
├── ConsentCard.tsx       # PDPL consent on first open
├── EmergencyCard.tsx     # Red emergency card with 997/911
├── HumanHandoffBanner.tsx # Persistent WhatsApp CTA
├── ChatInput.tsx         # Text input + send button
├── ChatBody.tsx          # Scroll container for messages
├── ChatHeader.tsx        # Avatar + name + status + close
├── ChatWindow.tsx        # Main chat panel (orchestrator)
└── ChatLauncher.tsx      # Floating button + window mount

data/chatbot/flows/
├── root.json             # Audience router (entry point)
├── patient.json          # Full B2C patient flow
├── doctor.json           # Stub (handoff only)
├── partner.json          # Stub (handoff only)
└── affiliate.json        # Stub (handoff only)
```

## Flow Engine

The flow engine is a **deterministic state machine** driven by JSON configuration files.

### Flow File Structure

```json
{
  "startNode": "welcome",
  "nodes": {
    "welcome": {
      "id": "welcome",
      "blocks": [
        { "type": "text", "text": "هلا وسهلا!" }
      ],
      "quickReplies": [
        { "label": "خيار 1", "value": "option1" }
      ],
      "next": {
        "option1": "next-node-id"
      }
    }
  }
}
```

### Node Types

- **Static next**: `"next": "node-id"` — auto-advance after message
- **Mapped next**: `"next": { "value1": "node-a", "value2": "node-b" }` — based on quick reply
- **Input node**: `"input": { "key": "phone", "validate": "phone" }` — collect user data
- **Handoff node**: `"handoff": { "channel": "whatsapp", "prefilledMessage": "..." }` — transfer to human
- **Emergency node**: `"emergency": true` — shows red emergency card
- **Final node**: `"final": true` — ends conversation

### Block Types

- `text` — Plain text with markdown support (`**bold**`, `[link](url)`)
- `card` — Title + body + icon + optional href
- `list` — Key-value pairs (e.g., feature comparison)
- `link` — CTA button with external link
- `divider` — Horizontal line
- `image` — Image with alt text

## Adding a New Flow

### 1. Create Flow File

Create `data/chatbot/flows/my-flow.json`:

```json
{
  "startNode": "welcome",
  "nodes": {
    "welcome": {
      "id": "welcome",
      "blocks": [
        { "type": "text", "text": "Welcome to my flow!" }
      ],
      "quickReplies": [
        { "label": "Continue", "value": "continue" }
      ],
      "next": { "continue": "next-step" }
    },
    "next-step": {
      "id": "next-step",
      "blocks": [
        { "type": "text", "text": "This is the next step." }
      ],
      "final": true
    }
  }
}
```

### 2. Register Flow

In `components/chatbot/ChatWindow.tsx`:

```tsx
import myFlow from "@/data/chatbot/flows/my-flow.json";

useEffect(() => {
  // ...
  flowEngine.registerFlow("my-flow", myFlow as any);
}, []);
```

### 3. Link from Root

In `data/chatbot/flows/root.json`, add a quick reply:

```json
{
  "quickReplies": [
    { "label": "My Flow", "value": "my-flow" }
  ],
  "next": {
    "my-flow": "my-flow:welcome"
  }
}
```

## Swapping MockTransport with Real Backend

### Current (Phase 1)

```tsx
// lib/chatbot/transport.ts
export class MockTransport implements ChatTransport {
  async send(message) {
    // No-op — flow engine handles everything locally
  }
}
```

### Phase 2+ (Real Backend)

```tsx
export class RealtimeTransport implements ChatTransport {
  private ws: WebSocket;

  constructor(url: string) {
    this.ws = new WebSocket(url);
  }

  async send(message) {
    this.ws.send(JSON.stringify(message));
  }

  onMessage(cb) {
    this.ws.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      cb(msg);
    };
    return () => this.ws.close();
  }
}
```

Then in `ChatWindow.tsx`:

```tsx
const transport = new RealtimeTransport("wss://api.amanever.com/chat");
```

## Adding English (en) Locale

### 1. Duplicate Flow Files

Copy all `data/chatbot/flows/*.json` to `data/chatbot/flows/en/*.json` and translate.

### 2. Load Based on Locale

```tsx
import { useLocale } from "next-intl";

const locale = useLocale();
const flowPath = locale === "en" ? "en/patient" : "patient";
const patientFlow = await import(`@/data/chatbot/flows/${flowPath}.json`);
```

### 3. Update Constants

```tsx
export const OMNIYA_NAME = locale === "en" ? "Omniya" : "أمنية";
```

## State Management

### Zustand Store

```tsx
const {
  messages,          // Message[]
  currentNodeId,     // string | null
  userProfile,       // { name?, phone?, city?, consent }
  isOpen,            // boolean
  isTyping,          // boolean
  unreadCount,       // number
  openChat,          // () => void
  closeChat,         // () => void
  addMessage,        // (msg: Message) => void
  resetConversation, // () => void
} = useChatStore();
```

### Persistence

State is persisted to `localStorage` under key `amanever:chat:state:v1`. Conversations auto-expire after 90 days.

## Analytics Events

All events are pushed to `window.dataLayer`:

- `chat_opened`
- `chat_consent_given`
- `chat_audience_selected` `{ audience }`
- `chat_node_reached` `{ nodeId }`
- `chat_quick_reply_clicked` `{ nodeId, value }`
- `chat_user_message_sent` `{ length }`
- `chat_emergency_triggered` `{ keyword }`
- `chat_handoff_whatsapp_clicked` `{ topic }`
- `chat_closed` `{ messagesCount, durationMs }`

## Accessibility

- **Dialog role**: `role="dialog"`, `aria-modal="true"`
- **Focus trap**: Keyboard focus stays inside window when open
- **Keyboard shortcuts**: `Esc` closes window
- **Screen reader**: All buttons have `aria-label`
- **Emergency alert**: `role="alert"`, `aria-live="assertive"`
- **Contrast**: WCAG AA verified (emerald-600 on white)
- **Reduced motion**: Respects `prefers-reduced-motion`

## RTL Support

All components use **logical properties**:

- `ps-4` / `pe-3` instead of `pl-4` / `pr-3`
- `start-6` / `end-6` instead of `left-6` / `right-6`
- `ms-auto` / `me-2` instead of `ml-auto` / `mr-2`

Message bubble tails flip direction based on `dir="rtl"`.

## Testing

### Demo Page

Visit `/ar/_dev/chat` for interactive demo with:

- Feature list
- Test scenarios
- Reset controls
- Tech stack info

### Test Scenarios

1. **Emergency**: Type "ألم في الصدر" → should show red emergency card
2. **Booking**: Select "أنا مستفيد" → "حجز استشارة" → select specialty
3. **Membership**: Select "أعرف عن الباقات" → compare plans
4. **Network**: Select "الشبكة الطبية" → choose city
5. **Support**: Select "دعم فني" → enter phone → WhatsApp handoff
6. **Other audiences**: Select doctor/partner/affiliate → immediate handoff

### Manual QA Checklist

- [ ] Consent card shows on first open
- [ ] Consent persists after refresh
- [ ] Emergency keywords trigger red card
- [ ] Phone validation works (05xxxxxxxx)
- [ ] Quick replies disappear after click
- [ ] User bubble echoes quick reply label
- [ ] Typing indicator shows before bot messages
- [ ] Auto-scroll to bottom on new messages
- [ ] WhatsApp handoff opens in new tab
- [ ] Clear conversation resets state
- [ ] Unread badge shows when chat closed
- [ ] Launcher pulse dot animates
- [ ] Mobile: full-screen takeover
- [ ] Desktop: floating card at bottom-start
- [ ] RTL: launcher appears on right side
- [ ] Keyboard: Esc closes window
- [ ] Keyboard: Enter sends message
- [ ] Focus trap works inside window
- [ ] Screen reader announces messages
- [ ] Reduced motion: no bounce/spring

## TODO (Post-MVP)

### Business Data

- [ ] Verify Premier/VIP pricing (currently 199/499 placeholder)
- [ ] Real medical network count per city (currently 120+)
- [ ] Top 6 specialties — validate with product team
- [ ] Legal review of emergency disclaimer wording

### Technical

- [ ] Replace MockTransport with WhatsApp Cloud API (Phase 2)
- [ ] Voice note recording (Phase 3)
- [ ] Full affiliate flow + dashboard (Phase 4)
- [ ] English translation (en locale)
- [ ] Privacy policy page at `/ar/privacy`
- [ ] Add `amanever:chat:consent:v1` to cookie policy
- [ ] Stress test: long messages, emoji spam, SQL-injection-looking strings
- [ ] Measure: first-message latency, handoff rate, completion rate

## Performance

- **Bundle size**: ~45KB gzipped (including Framer Motion)
- **First message latency**: <1s (typing delay + render)
- **Lighthouse a11y**: ≥95 (target)

## Browser Support

- Chrome 90+
- Safari 14+
- Firefox 88+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

## License

Proprietary — Aman Ever © 2026
