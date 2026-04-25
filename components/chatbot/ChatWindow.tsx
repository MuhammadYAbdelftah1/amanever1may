"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatStore } from "@/lib/chatbot/store";
import { flowEngine } from "@/lib/chatbot/flow-engine";
import { ChatHeader } from "./ChatHeader";
import { ChatBody } from "./ChatBody";
import { ChatInput } from "./ChatInput";
import { HumanHandoffBanner } from "./HumanHandoffBanner";
import { ConsentCard } from "./ConsentCard";
import { EmergencyCard } from "./EmergencyCard";
import { track } from "@/lib/chatbot/analytics";

// Import flow files
import rootFlow from "@/data/chatbot/flows/root.json";
import patientFlow from "@/data/chatbot/flows/patient.json";
import doctorFlow from "@/data/chatbot/flows/doctor.json";
import partnerFlow from "@/data/chatbot/flows/partner.json";
import affiliateFlow from "@/data/chatbot/flows/affiliate.json";

export function ChatWindow() {
  const {
    isOpen,
    messages,
    isTyping,
    currentNodeId,
    userProfile,
    conversationStartedAt,
    closeChat,
    setConsent,
    resetConversation,
    checkExpiry,
  } = useChatStore();

  const [isInitialized, setIsInitialized] = useState(false);
  const [showEmergency, setShowEmergency] = useState(false);

  // Initialize flow engine
  useEffect(() => {
    if (isInitialized) return;

    // Register all flows
    flowEngine.registerFlow("root", rootFlow as any);
    flowEngine.registerFlow("patient", patientFlow as any);
    flowEngine.registerFlow("doctor", doctorFlow as any);
    flowEngine.registerFlow("partner", partnerFlow as any);
    flowEngine.registerFlow("affiliate", affiliateFlow as any);

    setIsInitialized(true);
  }, [isInitialized]);

  // Check expiry on mount
  useEffect(() => {
    checkExpiry();
  }, [checkExpiry]);

  // Start conversation when consent is given
  useEffect(() => {
    if (!isInitialized || !userProfile.consent || messages.length > 0) return;

    flowEngine.start();
  }, [isInitialized, userProfile.consent, messages.length]);

  // Track open/close
  useEffect(() => {
    if (isOpen) {
      track({ event: "chat_opened" });
    }
  }, [isOpen]);

  // Check for emergency node
  useEffect(() => {
    if (currentNodeId === "emergency") {
      setShowEmergency(true);
    }
  }, [currentNodeId]);

  const handleClose = () => {
    if (conversationStartedAt) {
      const durationMs = Date.now() - conversationStartedAt;
      track({
        event: "chat_closed",
        messagesCount: messages.length,
        durationMs,
      });
    }
    closeChat();
  };

  const handleConsent = () => {
    setConsent(true);
    track({ event: "chat_consent_given" });
  };

  const handleClearConversation = () => {
    resetConversation();
    setShowEmergency(false);
  };

  const handleQuickReply = (reply: { label: string; value: string }) => {
    flowEngine.handleUserInput({
      value: reply.value,
      quickReplyLabel: reply.label,
    });
  };

  const handleTextInput = (text: string) => {
    flowEngine.handleUserInput({ text });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.95 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="fixed inset-0 z-50 shadow-2xl ring-1 ring-slate-200 md:inset-auto md:bottom-24 md:start-6 md:w-[380px] md:h-[620px] md:rounded-3xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="chat-header"
      >
        <div className="flex flex-col h-full bg-white md:rounded-3xl overflow-hidden">
          {/* Header */}
          <ChatHeader
            onClose={handleClose}
            onClearConversation={handleClearConversation}
            isTyping={isTyping}
          />

          {/* Body */}
          <div className="flex-1 overflow-hidden bg-slate-50">
            {!userProfile.consent ? (
              // Show consent card
              <div className="flex items-center justify-center h-full p-6">
                <ConsentCard onAccept={handleConsent} />
              </div>
            ) : showEmergency ? (
              // Show emergency card
              <div className="flex items-center justify-center h-full p-6">
                <EmergencyCard onDismiss={() => setShowEmergency(false)} />
              </div>
            ) : (
              // Show chat
              <ChatBody
                messages={messages}
                isTyping={isTyping}
                onQuickReply={handleQuickReply}
              />
            )}
          </div>

          {/* Footer */}
          {userProfile.consent && !showEmergency && (
            <>
              <HumanHandoffBanner />
              <ChatInput
                onSend={handleTextInput}
                disabled={isTyping}
              />
            </>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
