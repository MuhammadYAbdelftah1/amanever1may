"use client";

import { ChatLauncher } from "@/components/chatbot/ChatLauncher";
import { useChatStore } from "@/lib/chatbot/store";
import { useEffect } from "react";

export default function ChatDemoPage() {
  const { openChat, resetConversation } = useChatStore();

  // Auto-open chat on mount for demo
  useEffect(() => {
    openChat();
  }, [openChat]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 to-slate-50 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">
            🤖 Omniya Chatbot Demo
          </h1>
          <p className="text-lg text-slate-600">
            Phase 1 MVP — Web Widget with B2C Patient Flow
          </p>
        </div>

        {/* Info Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Features */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              ✨ Features
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>✅ JSON-driven flow engine</li>
              <li>✅ Full B2C patient journey</li>
              <li>✅ Emergency detection & handling</li>
              <li>✅ PDPL consent management</li>
              <li>✅ WhatsApp handoff</li>
              <li>✅ RTL-native Arabic UI</li>
              <li>✅ Framer Motion animations</li>
              <li>✅ localStorage persistence</li>
              <li>✅ Accessibility (WCAG AA)</li>
            </ul>
          </div>

          {/* Test Scenarios */}
          <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              🧪 Test Scenarios
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              <li>
                <strong>Emergency:</strong> Type &quot;ألم في الصدر&quot; or &quot;نزيف&quot;
              </li>
              <li>
                <strong>Booking:</strong> Select &quot;أنا مستفيد&quot; → &quot;حجز استشارة&quot;
              </li>
              <li>
                <strong>Membership:</strong> Select &quot;أعرف عن الباقات&quot;
              </li>
              <li>
                <strong>Network:</strong> Select &quot;الشبكة الطبية&quot;
              </li>
              <li>
                <strong>Support:</strong> Select &quot;دعم فني&quot; → enter phone
              </li>
              <li>
                <strong>Other audiences:</strong> Select doctor/partner/affiliate
              </li>
            </ul>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            🎮 Controls
          </h2>
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => openChat()}
              className="px-6 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-colors"
            >
              Open Chat
            </button>
            <button
              onClick={() => useChatStore.getState().closeChat()}
              className="px-6 py-3 bg-slate-600 text-white rounded-full font-semibold hover:bg-slate-700 transition-colors"
            >
              Close Chat
            </button>
            <button
              onClick={() => {
                resetConversation();
                openChat();
              }}
              className="px-6 py-3 bg-red-600 text-white rounded-full font-semibold hover:bg-red-700 transition-colors"
            >
              Reset & Restart
            </button>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 shadow-lg">
          <h2 className="text-xl font-bold mb-4">🛠️ Tech Stack</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <div className="font-semibold text-emerald-400">Framework</div>
              <div className="text-slate-300">Next.js 15 App Router</div>
            </div>
            <div>
              <div className="font-semibold text-emerald-400">State</div>
              <div className="text-slate-300">Zustand + localStorage</div>
            </div>
            <div>
              <div className="font-semibold text-emerald-400">Animation</div>
              <div className="text-slate-300">Framer Motion</div>
            </div>
            <div>
              <div className="font-semibold text-emerald-400">Styling</div>
              <div className="text-slate-300">Tailwind + shadcn/ui</div>
            </div>
          </div>
        </div>

        {/* TODO List */}
        <div className="mt-8 bg-amber-50 border-2 border-amber-200 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-amber-900 mb-4">
            📋 TODO (Post-MVP)
          </h2>
          <ul className="space-y-1 text-sm text-amber-800">
            <li>⏳ Verify Premier/VIP pricing (currently 199/499 placeholder)</li>
            <li>⏳ Real medical network count per city (currently 120+)</li>
            <li>⏳ WhatsApp Business API integration (Phase 2)</li>
            <li>⏳ Voice note recording (Phase 3)</li>
            <li>⏳ Full affiliate flow (Phase 4)</li>
            <li>⏳ English translation (en locale)</li>
            <li>⏳ Privacy policy page at /ar/privacy</li>
            <li>⏳ Legal review of emergency disclaimer</li>
          </ul>
        </div>
      </div>

      {/* Chat Widget */}
      <ChatLauncher />
    </div>
  );
}
