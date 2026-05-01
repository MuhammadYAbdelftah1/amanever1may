"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle } from "lucide-react";

interface OmniyaAvatarProps {
  size?: "sm" | "md" | "lg";
  isTyping?: boolean;
  className?: string;
}

const sizeMap = {
  sm: 32,
  md: 40,
  lg: 56,
};

export function OmniyaAvatar({
  size = "md",
  isTyping = false,
  className = "",
}: OmniyaAvatarProps) {
  const dimension = sizeMap[size];
  const whatsappIconSize = size === "lg" ? 18 : size === "md" ? 14 : 10;

  return (
    <div className={`relative ${className}`} style={{ width: dimension, height: dimension }}>
      {/* Pulse ring when typing */}
      {isTyping && (
        <motion.div
          className="absolute inset-0 rounded-full bg-emerald-400"
          animate={{
            scale: [1, 1.3, 1.3],
            opacity: [0.4, 0, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeOut",
          }}
        />
      )}

      {/* Avatar image */}
      <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-emerald-200">
        <Image
          src="/images/omniya-avatar.jpg"
          alt="أمنية - المساعدة الذكية"
          fill
          sizes="100vw"
          className="object-cover"
          priority
          unoptimized
        />
      </div>

      {/* WhatsApp Badge - positioned at top right */}
      <div
        className="absolute -top-0.5 -right-0.5 bg-[#25D366] rounded-full flex items-center justify-center shadow-lg ring-2 ring-white"
        style={{
          width: whatsappIconSize + 6,
          height: whatsappIconSize + 6,
        }}
      >
        <MessageCircle
          className="text-white"
          style={{
            width: whatsappIconSize,
            height: whatsappIconSize,
          }}
        />
      </div>
    </div>
  );
}
