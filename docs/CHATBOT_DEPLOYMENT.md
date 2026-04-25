# Omniya Chatbot — Deployment Guide

## Pre-Deployment Checklist

### 1. Business Data Verification

- [ ] **Pricing**: Verify Premier (199 ر.س) and VIP (499 ر.س) with finance team
- [ ] **Network count**: Get real numbers per city from operations team
- [ ] **Specialties**: Confirm top 6 specialties with medical team
- [ ] **WhatsApp number**: Verify 0544608220 is correct business line
- [ ] **Emergency disclaimer**: Get legal approval for wording

### 2. Content Review

- [ ] **Privacy policy**: Ensure `/ar/privacy` page exists and is up-to-date
- [ ] **PDPL compliance**: Legal review of consent card text
- [ ] **Emergency card**: Medical review of 997/911 instructions
- [ ] **Handoff messages**: Review all prefilled WhatsApp messages
- [ ] **Error messages**: Review validation error text

### 3. Technical Verification

- [ ] **Build succeeds**: `npm run build` completes without errors
- [ ] **No console errors**: Check browser console in production mode
- [ ] **Lighthouse score**: a11y ≥ 95, performance ≥ 90
- [ ] **Bundle size**: Total JS < 150KB gzipped
- [ ] **localStorage**: Test persistence across sessions
- [ ] **Analytics**: Verify dataLayer events fire correctly

### 4. Testing

- [ ] **All test scenarios pass** (see CHATBOT_TESTING_GUIDE.md)
- [ ] **Cross-browser tested** (Chrome, Safari, Firefox, Edge)
- [ ] **Mobile tested** (iOS Safari, Android Chrome)
- [ ] **RTL verified** (Arabic layout correct)
- [ ] **Accessibility tested** (keyboard, screen reader)
- [ ] **Performance tested** (first message < 1s)

---

## Deployment Steps

### Option 1: Netlify (Recommended)

#### 1. Install Netlify CLI

```bash
npm install -g netlify-cli
```

#### 2. Login to Netlify

```bash
netlify login
```

#### 3. Initialize Site

```bash
netlify init
```

Follow prompts:
- **Team**: Select your team
- **Site name**: `amanever-production` (or custom)
- **Build command**: `npm run build`
- **Publish directory**: `.next`

#### 4. Configure Environment Variables

In Netlify dashboard → Site settings → Environment variables:

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://amanever.com
NEXT_PUBLIC_WHATSAPP_NUMBER=966544608220
```

#### 5. Deploy

```bash
netlify deploy --prod
```

#### 6. Verify

- Visit `https://amanever.com/ar/_dev/chat`
- Test all flows
- Check analytics events in browser console

---

### Option 2: Vercel

#### 1. Install Vercel CLI

```bash
npm install -g vercel
```

#### 2. Login

```bash
vercel login
```

#### 3. Deploy

```bash
vercel --prod
```

#### 4. Configure Domain

In Vercel dashboard → Domains → Add `amanever.com`

---

### Option 3: Self-Hosted (Docker)

#### 1. Create Dockerfile

```dockerfile
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
EXPOSE 3000
CMD ["node", "server.js"]
```

#### 2. Build Image

```bash
docker build -t amanever-web .
```

#### 3. Run Container

```bash
docker run -d \
  -p 3000:3000 \
  -e NODE_ENV=production \
  -e NEXT_PUBLIC_SITE_URL=https://amanever.com \
  --name amanever-web \
  amanever-web
```

#### 4. Setup Nginx Reverse Proxy

```nginx
server {
  listen 80;
  server_name amanever.com;

  location / {
    proxy_pass http://localhost:3000;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }
}
```

---

## Post-Deployment

### 1. Smoke Tests

Run these immediately after deployment:

```bash
# Test homepage
curl -I https://amanever.com/ar

# Test chatbot demo
curl -I https://amanever.com/ar/_dev/chat

# Test static assets
curl -I https://amanever.com/_next/static/...
```

### 2. Analytics Verification

1. Open browser console
2. Navigate to site
3. Open chatbot
4. Check `window.dataLayer` for events:
   - `chat_opened`
   - `chat_consent_given`
   - `chat_audience_selected`

### 3. Error Monitoring

Setup error tracking (e.g., Sentry):

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN",
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.1,
});
```

### 4. Performance Monitoring

Setup RUM (Real User Monitoring):

- Google Analytics 4
- Vercel Analytics
- Cloudflare Web Analytics

---

## Rollback Plan

### If Critical Bug Found

#### Option 1: Netlify Rollback

```bash
netlify rollback
```

#### Option 2: Git Revert

```bash
git revert HEAD
git push origin main
netlify deploy --prod
```

#### Option 3: Feature Flag

Add to `lib/chatbot/constants.ts`:

```typescript
export const CHATBOT_ENABLED = process.env.NEXT_PUBLIC_CHATBOT_ENABLED === "true";
```

In `app/[locale]/layout.tsx`:

```tsx
{CHATBOT_ENABLED && <ChatLauncher />}
```

Set env var to `false` to disable instantly.

---

## Monitoring

### Key Metrics to Track

1. **Engagement**
   - Chat open rate
   - Messages per session
   - Completion rate (reached final node)

2. **Performance**
   - First message latency (target: < 1s)
   - Time to interactive (target: < 3s)
   - Bundle size (target: < 150KB)

3. **Errors**
   - JavaScript errors
   - Failed API calls (Phase 2+)
   - Validation errors

4. **Business**
   - Handoff rate (% of conversations → WhatsApp)
   - Emergency triggers per day
   - Top intents (booking, membership, etc.)

### Dashboards

#### Google Analytics 4

Custom events:
- `chat_opened`
- `chat_audience_selected`
- `chat_handoff_whatsapp_clicked`

#### Grafana (Phase 2+)

Panels:
- Messages per hour
- Average session duration
- Handoff rate by audience
- Emergency triggers timeline

---

## Maintenance

### Weekly

- [ ] Review error logs
- [ ] Check analytics for anomalies
- [ ] Test critical flows manually

### Monthly

- [ ] Update dependencies (`npm outdated`)
- [ ] Review and update FAQ content
- [ ] Analyze top user queries
- [ ] A/B test flow variations

### Quarterly

- [ ] Lighthouse audit
- [ ] Accessibility audit
- [ ] Security audit (`npm audit`)
- [ ] Legal review of disclaimers

---

## Scaling Considerations

### Current Limits (Phase 1)

- **Concurrent users**: Unlimited (client-side only)
- **Storage**: localStorage (5-10MB per user)
- **No backend**: All logic runs in browser

### Phase 2+ (Backend Required)

When adding real-time features:

1. **WebSocket server**
   - AWS API Gateway WebSocket
   - Socket.io on Node.js
   - Pusher/Ably (managed)

2. **Database**
   - PostgreSQL for conversations
   - Redis for session state
   - S3 for media uploads

3. **Scaling strategy**
   - Horizontal scaling (multiple Node.js instances)
   - Load balancer (ALB/Nginx)
   - CDN for static assets (CloudFront)

4. **Cost estimates**
   - 10K users/month: ~$50/month
   - 100K users/month: ~$500/month
   - 1M users/month: ~$5K/month

---

## Security

### Current (Phase 1)

- ✅ No sensitive data stored
- ✅ No authentication required
- ✅ XSS protection (React escaping)
- ✅ HTTPS only (enforced by Next.js)

### Phase 2+ Additions

- [ ] JWT authentication
- [ ] Rate limiting (100 req/min per IP)
- [ ] Input sanitization (DOMPurify)
- [ ] CORS policy (whitelist domains)
- [ ] CSP headers (Content Security Policy)
- [ ] Encryption at rest (database)
- [ ] Encryption in transit (TLS 1.3)

---

## Troubleshooting

### Issue: Chat doesn't open

**Symptoms**: Launcher visible but clicking does nothing

**Diagnosis**:
1. Check browser console for errors
2. Verify `zustand` is installed
3. Check localStorage quota

**Fix**:
```bash
npm install zustand
npm run build
```

---

### Issue: Messages not persisting

**Symptoms**: Conversation resets on page refresh

**Diagnosis**:
1. Check localStorage in DevTools
2. Verify key `amanever:chat:state:v1` exists
3. Check for quota exceeded errors

**Fix**:
- Clear old data: `localStorage.clear()`
- Increase expiry: Change `CONVERSATION_EXPIRY_DAYS` in constants

---

### Issue: Emergency card not showing

**Symptoms**: Typing emergency keywords doesn't trigger card

**Diagnosis**:
1. Check `intents.ts` regex patterns
2. Verify `detectIntent()` is called
3. Check `currentNodeId` in store

**Fix**:
- Add more keywords to `EMERGENCY` regex
- Test with exact phrases: "ألم في الصدر"

---

### Issue: WhatsApp link not working

**Symptoms**: Clicking handoff button does nothing

**Diagnosis**:
1. Check `WHATSAPP_NUMBER` in constants
2. Verify URL encoding
3. Test on mobile device

**Fix**:
```typescript
// Ensure number format is correct
export const WHATSAPP_NUMBER = "966544608220"; // No + or spaces
```

---

## Support Contacts

### Technical Issues
- **DevOps**: devops@amanever.com
- **Frontend**: frontend@amanever.com
- **On-call**: +966-XXX-XXXX

### Business Issues
- **Product**: product@amanever.com
- **Legal**: legal@amanever.com
- **Customer Support**: support@amanever.com

---

## Changelog

See `CHATBOT_CHANGELOG.md` for version history.

---

## License

Proprietary — Aman Ever © 2026
