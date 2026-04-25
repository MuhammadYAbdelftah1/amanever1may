"use client";

import { useState } from 'react';
import { Smartphone } from 'lucide-react';

/**
 * Temporary QR Code Component
 * 
 * This is a placeholder QR code that detects the user's device
 * and redirects to the appropriate app store.
 * 
 * TODO: Replace with actual QR code image when app is published
 */

interface TempQRCodeProps {
  iosUrl?: string;
  androidUrl?: string;
  huaweiUrl?: string;
}

export function TempQRCode({
  iosUrl = "https://apps.apple.com/sa/app/amanever",
  androidUrl = "https://play.google.com/store/apps/details?id=com.amanever",
  huaweiUrl = "https://appgallery.huawei.com/app/amanever",
}: TempQRCodeProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    // Detect device and redirect
    const userAgent = navigator.userAgent || navigator.vendor;
    
    // iOS detection
    if (/iPad|iPhone|iPod/.test(userAgent)) {
      window.open(iosUrl, '_blank');
      return;
    }
    
    // Huawei detection
    if (/huawei/i.test(userAgent)) {
      window.open(huaweiUrl, '_blank');
      return;
    }
    
    // Android detection (default)
    if (/android/i.test(userAgent)) {
      window.open(androidUrl, '_blank');
      return;
    }
    
    // Desktop - show all options
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 3000);
  };

  return (
    <div className="relative">
      <button
        onClick={handleClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className="w-24 h-24 bg-white rounded-lg flex flex-col items-center justify-center hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-[#4A8B8E] focus:outline-none group border border-[#E5EAEB]"
        aria-label="امسح الكود للتحميل"
      >
        {/* QR Code Pattern (Simplified) */}
        <div className="grid grid-cols-3 gap-1 mb-2">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-[#1A2B2C] rounded-sm"
              style={{
                opacity: [0, 2, 4, 6, 8].includes(i) ? 1 : 0.3,
              }}
            />
          ))}
        </div>
        
        {/* Icon */}
        <Smartphone className="w-5 h-5 text-[#5A6B6C] group-hover:text-[#4A8B8E] transition-colors" aria-hidden="true" />
      </button>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-[#1A2B2C] text-white text-xs rounded-lg whitespace-nowrap z-10">
          انقر للتحميل من المتجر المناسب
          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-[#1A2B2C]" />
        </div>
      )}
    </div>
  );
}
