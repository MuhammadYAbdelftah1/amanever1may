'use client';

import { useEffect, useState } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { setupNetworkListeners } from '@/lib/utils/fetch-with-retry';

export function NetworkStatus() {
  const [isOnline, setIsOnline] = useState(true);
  const [showOffline, setShowOffline] = useState(false);

  useEffect(() => {
    // Set initial state
    setIsOnline(navigator.onLine);

    // Setup listeners
    const cleanup = setupNetworkListeners(
      () => {
        setIsOnline(true);
        setShowOffline(false);
      },
      () => {
        setIsOnline(false);
        setShowOffline(true);
      }
    );

    return cleanup;
  }, []);

  // Don't show anything if online
  if (isOnline && !showOffline) {
    return null;
  }

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOnline ? 'bg-emerald-600' : 'bg-red-600'
      }`}
      role="alert"
      aria-live="polite"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-center gap-2 text-white">
          {isOnline ? (
            <>
              <Wifi className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium">
                تم استعادة الاتصال بالإنترنت
              </span>
            </>
          ) : (
            <>
              <WifiOff className="h-5 w-5" aria-hidden="true" />
              <span className="text-sm font-medium">
                لا يوجد اتصال بالإنترنت. يرجى التحقق من اتصالك.
              </span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
