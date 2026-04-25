"use client";

import { motion } from "framer-motion";
import Image from "next/image";

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
    </div>
  );
}
