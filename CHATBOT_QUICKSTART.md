# Omniya Chatbot — Quick Start Guide

## 🚀 Get Started in 3 Minutes

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Dev Server

```bash
npm run dev
```

### 3. Open Demo Page

```
http://localhost:3000/ar/_dev/chat
```

---

## 🎮 Try These Scenarios

### Emergency Detection
1. Click "أنا مستفيد"
2. Type: `ألم في الصدر`
3. Press Enter
4. **Result**: Red emergency card appears

### Booking Flow
1. Click "أنا مستفيد"
2. Click "📅 حجز استشارة"
3. Select "🩺 طب عام"
4. **Result**: Booking confirmation with link

### Membership Comparison
1. Click "أنا مستفيد"
2. Click "💳 أعرف عن الباقات"
3. Click "قارن بينهم"
4. **Result**: 6-row comparison table

---

## 📁 Project Structure

```
lib/chatbot/              # Core logic
├── types.ts              # TypeScript types
├── store.ts              # Zustand state
├── flow-engine.ts        # State machine
└── ...

components/chatbot/       # UI components
├── ChatLauncher.tsx      # Floating button
├── ChatWindow.tsx        # Main panel
├── MessageBubble.tsx     # Chat bubbles
└── ...

data/chatbot/flows/       # Flow definitions
├── root.json             # Entry point
├── patient.json          # B2C flow
└── ...
```

---

## 🔧 Common Tasks

### Add a New Flow Node

Edit `data/chatbot/flows/patient.json`:

```json
{
  "my-new-node": {
    "id": "my-new-node",
    "blocks": [
      { "type": "text", "text": "Hello!" }
    ],
    "quickReplies": [
      { "label": "Continue", "value": "next" }
    ],
    "next": { "next": "another-node" }
  }
}
```

### Change Brand Colors

Edit `lib/chatbot/constants.ts`:

```typescript
export const brand = {
  primary: "emerald-600",  // Change to your color
  // ...
};
```

### Update WhatsApp Number

Edit `lib/chatbot/constants.ts`:

```typescript
export const WHATSAPP_NUMBER = "966544608220";  // Your number
```

---

## 📚 Documentation

- **Technical**: `docs/CHATBOT_README.md`
- **Testing**: `docs/CHATBOT_TESTING_GUIDE.md`
- **Deployment**: `docs/CHATBOT_DEPLOYMENT.md`
- **Summary**: `docs/CHATBOT_SUMMARY.md`

---

## 🐛 Troubleshooting

### Chat doesn't open?
- Check browser console for errors
- Verify `zustand` is installed: `npm install zustand`

### Messages not persisting?
- Check localStorage in DevTools
- Clear old data: `localStorage.clear()`

### Build fails?
- Run `npm run build` to see errors
- Check TypeScript errors: `npx tsc --noEmit`

---

## 🎯 Next Steps

1. ✅ Test all flows in demo page
2. ✅ Verify business data (pricing, network count)
3. ✅ Get legal review (emergency disclaimer)
4. ✅ Deploy to staging
5. ✅ Launch to production 🚀

---

## 💬 Need Help?

- **Technical**: See `docs/CHATBOT_README.md`
- **Testing**: See `docs/CHATBOT_TESTING_GUIDE.md`
- **Deployment**: See `docs/CHATBOT_DEPLOYMENT.md`

---

**Happy Coding! 🎉**
