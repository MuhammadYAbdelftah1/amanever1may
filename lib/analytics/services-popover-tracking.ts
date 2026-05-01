/**
 * Services Popover Analytics Tracking
 * Track user interactions with the services popover for optimization
 */

// Types
interface ServiceClickEvent {
  serviceId: string;
  serviceTitle: string;
  source: 'desktop' | 'mobile';
  timestamp: number;
}

interface PopoverEvent {
  action: 'open' | 'close';
  source: 'desktop' | 'mobile';
  timestamp: number;
}

/**
 * Track when the services popover is opened
 */
export function trackPopoverOpen(source: 'desktop' | 'mobile') {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'services_popover_open', {
      event_category: 'Navigation',
      event_label: `Services Menu - ${source}`,
      source: source,
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics: Services Popover Opened', { source });
  }
}

/**
 * Track when the services popover is closed
 */
export function trackPopoverClose(source: 'desktop' | 'mobile', method: 'click_outside' | 'escape' | 'close_button' | 'service_click') {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'services_popover_close', {
      event_category: 'Navigation',
      event_label: `Services Menu - ${source}`,
      source: source,
      close_method: method,
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics: Services Popover Closed', { source, method });
  }
}

/**
 * Track when a service is clicked from the popover
 */
export function trackServiceClick(
  serviceId: string,
  serviceTitle: string,
  source: 'desktop' | 'mobile'
) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'service_click', {
      event_category: 'Services',
      event_label: serviceTitle,
      service_id: serviceId,
      source: source,
      location: 'popover',
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics: Service Clicked', {
      serviceId,
      serviceTitle,
      source,
    });
  }
}

/**
 * Track when "View All Services" is clicked
 */
export function trackViewAllServices(source: 'desktop' | 'mobile') {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'view_all_services_click', {
      event_category: 'Services',
      event_label: 'View All Services',
      source: source,
      location: 'popover',
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics: View All Services Clicked', { source });
  }
}

/**
 * Track popover interaction time (how long it was open)
 */
export function trackPopoverInteractionTime(
  source: 'desktop' | 'mobile',
  durationMs: number
) {
  // Google Analytics 4
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', 'services_popover_interaction_time', {
      event_category: 'Engagement',
      event_label: 'Services Popover',
      source: source,
      duration_ms: durationMs,
      duration_seconds: Math.round(durationMs / 1000),
    });
  }

  // Console log for development
  if (process.env.NODE_ENV === 'development') {
    console.log('📊 Analytics: Popover Interaction Time', {
      source,
      durationMs,
      durationSeconds: Math.round(durationMs / 1000),
    });
  }
}

// ============================================================================
// HOW TO USE IN COMPONENTS
// ============================================================================

/*

// في services-popover.tsx:

import {
  trackPopoverOpen,
  trackPopoverClose,
  trackServiceClick,
  trackViewAllServices,
  trackPopoverInteractionTime,
} from '@/lib/analytics/services-popover-tracking';

// عند فتح الـ popover:
const handleToggle = () => {
  if (!isOpen) {
    trackPopoverOpen(isMobile ? 'mobile' : 'desktop');
    setOpenTime(Date.now()); // احفظ وقت الفتح
  } else {
    const duration = Date.now() - openTime;
    trackPopoverInteractionTime(isMobile ? 'mobile' : 'desktop', duration);
    trackPopoverClose(isMobile ? 'mobile' : 'desktop', 'close_button');
  }
  setIsOpen(!isOpen);
};

// عند النقر على خدمة:
<Link
  onClick={() => {
    trackServiceClick(service.id, service.title, isMobile ? 'mobile' : 'desktop');
    setIsOpen(false);
  }}
>

// عند النقر على "عرض جميع الخدمات":
<Link
  onClick={() => {
    trackViewAllServices(isMobile ? 'mobile' : 'desktop');
    setIsOpen(false);
  }}
>

*/

// ============================================================================
// ANALYTICS DASHBOARD QUERIES
// ============================================================================

/*

في Google Analytics 4، يمكنك إنشاء التقارير التالية:

1. **معدل فتح الـ Popover:**
   - Event: services_popover_open
   - Dimension: source (desktop/mobile)
   - Metric: Event count

2. **الخدمات الأكثر نقراً:**
   - Event: service_click
   - Dimension: event_label (service title)
   - Metric: Event count
   - Sort: Descending

3. **معدل التحويل من الـ Popover:**
   - Funnel:
     1. services_popover_open
     2. service_click
     3. [conversion event]

4. **متوسط وقت التفاعل:**
   - Event: services_popover_interaction_time
   - Metric: Average duration_seconds

5. **طرق الإغلاق الأكثر استخداماً:**
   - Event: services_popover_close
   - Dimension: close_method
   - Metric: Event count

*/

// ============================================================================
// A/B TESTING IDEAS
// ============================================================================

/*

أفكار لاختبار A/B:

1. **عدد الخدمات المعروضة:**
   - Variant A: 6 خدمات (الحالي)
   - Variant B: 4 خدمات فقط (الأكثر طلباً)
   - Metric: CTR على الخدمات

2. **ترتيب الخدمات:**
   - Variant A: ترتيب ثابت
   - Variant B: ترتيب حسب الشعبية
   - Metric: Conversion rate

3. **وجود الصور:**
   - Variant A: أيقونات فقط (الحالي)
   - Variant B: صور + أيقونات
   - Metric: Engagement time

4. **حجم الـ Popover:**
   - Variant A: 600px (الحالي)
   - Variant B: 700px (أكبر)
   - Metric: Bounce rate

*/

const servicesPopoverTracking = {
  trackPopoverOpen,
  trackPopoverClose,
  trackServiceClick,
  trackViewAllServices,
  trackPopoverInteractionTime,
};

export default servicesPopoverTracking;
