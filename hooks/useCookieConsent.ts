"use client";

import { useState, useEffect, useCallback } from 'react';
import {
  CookieConsent,
  DEFAULT_COOKIE_CONSENT,
  COOKIE_CONSENT_KEY,
  COOKIE_CONSENT_VERSION,
} from '@/lib/data/cookie-categories';

/**
 * Cookie Consent Management Hook
 * 
 * Manages cookie consent state across the application.
 * Integrates with Google Tag Manager Consent Mode v2.
 */

export function useCookieConsent() {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as CookieConsent;
        
        // Check if version matches
        if (parsed.version === COOKIE_CONSENT_VERSION) {
          setConsent(parsed);
          setHasInteracted(true);
          
          // Apply consent to GTM
          applyConsentToGTM(parsed);
        } else {
          // Version mismatch - reset to default
          setConsent(DEFAULT_COOKIE_CONSENT);
        }
      } else {
        // No stored consent - use default
        setConsent(DEFAULT_COOKIE_CONSENT);
      }
    } catch (error) {
      console.error('Error loading cookie consent:', error);
      setConsent(DEFAULT_COOKIE_CONSENT);
    }

    setIsLoaded(true);
  }, []);

  // Save consent to localStorage
  const saveConsent = useCallback((newConsent: CookieConsent) => {
    if (typeof window === 'undefined') return;

    try {
      const consentWithTimestamp = {
        ...newConsent,
        timestamp: new Date().toISOString(),
        version: COOKIE_CONSENT_VERSION,
      };

      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consentWithTimestamp));
      setConsent(consentWithTimestamp);
      setHasInteracted(true);

      // Apply consent to GTM
      applyConsentToGTM(consentWithTimestamp);

      // Clean up disabled cookies
      cleanupDisabledCookies(newConsent);

      // Reload page to apply changes
      window.location.reload();
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  }, []);

  // Update specific category
  const updateCategory = useCallback((category: keyof Omit<CookieConsent, 'timestamp' | 'version'>, enabled: boolean) => {
    if (!consent) return;

    const newConsent = {
      ...consent,
      [category]: enabled,
    };

    saveConsent(newConsent);
  }, [consent, saveConsent]);

  // Accept all cookies
  const acceptAll = useCallback(() => {
    const allAccepted: CookieConsent = {
      essential: true,
      analytics: true,
      marketing: true,
      personalization: true,
      timestamp: new Date().toISOString(),
      version: COOKIE_CONSENT_VERSION,
    };

    saveConsent(allAccepted);
  }, [saveConsent]);

  // Reject non-essential cookies
  const rejectNonEssential = useCallback(() => {
    const onlyEssential: CookieConsent = {
      essential: true,
      analytics: false,
      marketing: false,
      personalization: false,
      timestamp: new Date().toISOString(),
      version: COOKIE_CONSENT_VERSION,
    };

    saveConsent(onlyEssential);
  }, [saveConsent]);

  return {
    consent,
    isLoaded,
    hasInteracted,
    updateCategory,
    acceptAll,
    rejectNonEssential,
    saveConsent,
  };
}

/**
 * Apply consent to Google Tag Manager Consent Mode v2
 */
function applyConsentToGTM(consent: CookieConsent) {
  if (typeof window === 'undefined') return;

  // Check if gtag is available
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('consent', 'update', {
      analytics_storage: consent.analytics ? 'granted' : 'denied',
      ad_storage: consent.marketing ? 'granted' : 'denied',
      ad_user_data: consent.marketing ? 'granted' : 'denied',
      ad_personalization: consent.marketing ? 'granted' : 'denied',
      personalization_storage: consent.personalization ? 'granted' : 'denied',
      functionality_storage: 'granted', // Always granted for essential
      security_storage: 'granted', // Always granted for essential
    });
  }
}

/**
 * Clean up cookies for disabled categories
 */
function cleanupDisabledCookies(consent: CookieConsent) {
  if (typeof window === 'undefined') return;

  const cookiesToDelete: string[] = [];

  // Analytics cookies
  if (!consent.analytics) {
    cookiesToDelete.push('_ga', '_ga_*', '_gid', '_gat', '_hjid', '_clck', '_clsk');
  }

  // Marketing cookies
  if (!consent.marketing) {
    cookiesToDelete.push('_fbp', '_fbc', '_ttp', '_scid', '_gcl_au', '_gcl_aw');
  }

  // Personalization cookies
  if (!consent.personalization) {
    cookiesToDelete.push('preferred_specialties', 'saved_doctors', 'last_city', 'ui_preferences');
  }

  // Delete cookies
  cookiesToDelete.forEach((cookieName) => {
    // Handle wildcard patterns
    if (cookieName.includes('*')) {
      const prefix = cookieName.replace('*', '');
      const allCookies = document.cookie.split(';');
      
      allCookies.forEach((cookie) => {
        const name = cookie.split('=')[0].trim();
        if (name.startsWith(prefix)) {
          deleteCookie(name);
        }
      });
    } else {
      deleteCookie(cookieName);
    }
  });
}

/**
 * Delete a specific cookie
 */
function deleteCookie(name: string) {
  // Delete for current domain
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  
  // Delete for parent domain
  const domain = window.location.hostname;
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${domain};`;
  
  // Delete for root domain
  const rootDomain = domain.split('.').slice(-2).join('.');
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.${rootDomain};`;
}
