# Aman Ever Website

**شريككم الذكي في رحلة الرعاية الطبية**  
Your Smart Partner in Healthcare Journey

---

## 🏥 About

Aman Ever is a Saudi healthtech platform providing comprehensive healthcare services including:

- 🩺 Telemedicine consultations
- 🏠 Home healthcare services
- 💊 Pharmacy delivery
- 💳 Healthcare financing solutions
- 🎟️ Discounts & cashback programs

---

## 🤖 NEW: Omniya Chatbot

**Phase 1 MVP is now complete!** 🎉

Omniya (أمنية) is our intelligent healthcare assistant, built as a production-ready web widget.

### Quick Start

```bash
npm install
npm run dev
# Visit http://localhost:3000/ar/_dev/chat
```

### Documentation

- **Quick Start**: [`CHATBOT_QUICKSTART.md`](./CHATBOT_QUICKSTART.md)
- **Technical Docs**: [`docs/CHATBOT_README.md`](./docs/CHATBOT_README.md)
- **Testing Guide**: [`docs/CHATBOT_TESTING_GUIDE.md`](./docs/CHATBOT_TESTING_GUIDE.md)
- **Deployment**: [`docs/CHATBOT_DEPLOYMENT.md`](./docs/CHATBOT_DEPLOYMENT.md)
- **Summary**: [`docs/CHATBOT_SUMMARY.md`](./docs/CHATBOT_SUMMARY.md)

### Features

- ✅ JSON-driven flow engine
- ✅ Full B2C patient journey
- ✅ Emergency detection
- ✅ WhatsApp handoff
- ✅ RTL-native Arabic UI
- ✅ WCAG AA accessibility
- ✅ localStorage persistence

---

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State**: Zustand
- **Animation**: Framer Motion
- **i18n**: next-intl (Arabic, English, Urdu)
- **Icons**: Lucide React

---

## 📦 Project Structure

```
app/[locale]/              # Next.js App Router pages
├── about/                 # About page
├── services/              # Services page
├── values/                # Values page
├── vision/                # Vision page
└── _dev/chat/             # Chatbot demo page

components/
├── chatbot/               # Omniya chatbot components (NEW)
├── global/                # Global components (header, footer)
├── home/                  # Homepage sections
├── services/              # Services page components
├── shared/                # Shared components
└── ui/                    # shadcn/ui components

lib/
├── chatbot/               # Chatbot core logic (NEW)
├── constants/             # App constants
├── data/                  # Configuration data
└── fonts.ts               # Font definitions

data/chatbot/flows/        # Chatbot flow definitions (NEW)
├── root.json              # Audience router
├── patient.json           # B2C patient flow
├── doctor.json            # Doctor flow (stub)
├── partner.json           # Partner flow (stub)
└── affiliate.json         # Affiliate flow (stub)

messages/                  # i18n translations
├── ar.json                # Arabic
├── en.json                # English
└── ur.json                # Urdu

docs/                      # Documentation
├── CHATBOT_*.md           # Chatbot documentation (NEW)
└── *.md                   # Other documentation
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Installation

```bash
# Clone repository
git clone https://github.com/amanever/website.git
cd website

# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build

```bash
# Production build
npm run build

# Start production server
npm start
```

### Lint

```bash
npm run lint
```

---

## 🌐 Localization

The site supports 3 languages:

- **Arabic (ar)** — Default, RTL
- **English (en)** — LTR
- **Urdu (ur)** — RTL

Routes are prefixed with locale:
- `/ar` — Arabic
- `/en` — English
- `/ur` — Urdu

---

## 🎨 Design System

### Colors

- **Primary**: Emerald (#059669)
- **Neutral**: Slate
- **Danger**: Red (#dc2626)
- **WhatsApp**: #25D366

### Typography

- **Arabic**: IBM Plex Sans Arabic
- **Latin**: Roboto

### Spacing

- Base unit: 4px (0.25rem)
- Scale: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

---

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

---

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation
- Screen reader support
- Focus indicators
- Skip to content link
- Semantic HTML

---

## 📊 Analytics

Events are tracked via `window.dataLayer`:

- Page views
- Button clicks
- Form submissions
- Chatbot interactions (9 event types)

---

## 🧪 Testing

### Manual Testing

See [`docs/CHATBOT_TESTING_GUIDE.md`](./docs/CHATBOT_TESTING_GUIDE.md) for 27 test scenarios.

### Automated Testing (Future)

- **Unit tests**: Jest
- **E2E tests**: Playwright
- **Visual regression**: Percy

---

## 🚢 Deployment

### Netlify (Recommended)

```bash
netlify deploy --prod
```

### Vercel

```bash
vercel --prod
```

### Docker

```bash
docker build -t amanever-web .
docker run -p 3000:3000 amanever-web
```

See [`docs/CHATBOT_DEPLOYMENT.md`](./docs/CHATBOT_DEPLOYMENT.md) for detailed instructions.

---

## 📄 License

Proprietary — Aman Ever © 2026

---

## 🤝 Contributing

This is a private repository. For internal contributors:

1. Create a feature branch
2. Make your changes
3. Submit a pull request
4. Wait for code review

---

## 📞 Support

- **Technical**: devops@amanever.com
- **Product**: product@amanever.com
- **General**: info@amanever.com

---

## 🙏 Acknowledgments

Built with ❤️ using:

- [Next.js](https://nextjs.org/) by Vercel
- [Tailwind CSS](https://tailwindcss.com/) by Tailwind Labs
- [Framer Motion](https://www.framer.com/motion/) by Framer
- [Zustand](https://github.com/pmndrs/zustand) by Poimandres
- [shadcn/ui](https://ui.shadcn.com/) by shadcn
- [Lucide Icons](https://lucide.dev/) by Lucide

---

**Made with ❤️ in Saudi Arabia 🇸🇦**
