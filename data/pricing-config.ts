/**
 * Pricing Page Configuration
 * Centralized configuration for easy maintenance
 */

export const PRICING_CONFIG = {
  // Contact Information
  contact: {
    phone: '+966920000000', // TODO: Replace with actual phone number
    email: 'support@amanever.com',
    whatsapp: '+966500000000', // TODO: Replace with actual WhatsApp number
  },

  // URLs
  urls: {
    appDownload: '#download',
    businessPage: '/ar/for-business',
    termsOfService: '/ar/terms-of-use',
    privacyPolicy: '/ar/privacy-policy',
    refundPolicy: '/ar/refund-policy',
  },

  // Feature Flags
  features: {
    showFamilyPlans: true,
    showBusinessPlans: true,
    enableCalculator: true,
    enableTestimonials: true,
    showInsuranceComparison: true,
  },

  // Analytics Events
  analytics: {
    events: {
      pageViewed: 'pricing_page_viewed',
      planToggleChanged: 'plan_toggle_changed',
      planCardHover: 'plan_card_hover',
      calculatorUsed: 'savings_calculator_used',
      planCtaClicked: 'plan_cta_clicked',
      faqExpanded: 'faq_expanded',
      comparisonViewed: 'comparison_with_insurance_viewed',
    },
  },

  // Trust Indicators
  trust: {
    rating: 4.8,
    reviewCount: 1250,
    networkSize: '500+',
    partners: ['المواساة', 'سليمان الحبيب', 'دله'],
    certifications: ['PDPL', 'SDAIA'],
  },

  // Payment Methods
  paymentMethods: [
    { id: 'mada', name: 'مدى', icon: '💳' },
    { id: 'visa', name: 'فيزا', icon: '💳' },
    { id: 'apple-pay', name: 'Apple Pay', icon: '' },
    { id: 'tabby', name: 'تابي', icon: '📱' },
    { id: 'tamara', name: 'تمارا', icon: '📱' },
  ],

  // Guarantee
  guarantee: {
    days: 0,
    description: '',
  },

  // B2B Stats
  b2b: {
    companies: '500+',
    employees: '15K+',
    avgSavings: '40%',
    rating: 4.9,
  },
};

/**
 * Helper function to track analytics events
 * TODO: Integrate with actual analytics service (Google Analytics, Mixpanel, etc.)
 */
export function trackPricingEvent(
  eventName: string,
  properties?: Record<string, any>
) {
  if (typeof window !== 'undefined') {
    // Example: Google Analytics
    // window.gtag?.('event', eventName, properties);
    
    // Example: Mixpanel
    // window.mixpanel?.track(eventName, properties);
    
    // For now, just log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('📊 Analytics Event:', eventName, properties);
    }
  }
}
