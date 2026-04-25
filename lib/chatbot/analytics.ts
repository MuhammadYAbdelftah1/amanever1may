// Analytics tracking for chatbot events

type AnalyticsEvent =
  | { event: "chat_opened" }
  | { event: "chat_consent_given" }
  | { event: "chat_audience_selected"; audience: string }
  | { event: "chat_node_reached"; nodeId: string }
  | { event: "chat_quick_reply_clicked"; nodeId: string; value: string }
  | { event: "chat_user_message_sent"; length: number }
  | { event: "chat_emergency_triggered"; keyword: string }
  | { event: "chat_handoff_whatsapp_clicked"; topic: string }
  | { event: "chat_handoff_call_clicked"; topic: string }
  | { event: "chat_closed"; messagesCount: number; durationMs: number };

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
  }
}

export function track(eventData: AnalyticsEvent): void {
  if (typeof window === "undefined") return;

  // Initialize dataLayer if it doesn't exist
  if (!window.dataLayer) {
    window.dataLayer = [];
  }

  // Push event to dataLayer
  window.dataLayer.push({
    ...eventData,
    timestamp: Date.now(),
    source: "omniya_chatbot",
  });

  // Also log to console in development
  if (process.env.NODE_ENV === "development") {
    console.log("[Omniya Analytics]", eventData);
  }
}
