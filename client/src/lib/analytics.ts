/**
 * analytics.ts  -  Willow Tree Funerals
 *
 * Unified event tracking for Google Analytics 4 and Meta Pixel.
 * Both trackers are loaded conditionally in index.html only when
 * VITE_GA4_MEASUREMENT_ID / VITE_META_PIXEL_ID are set.
 *
 * Usage:
 *   import { trackPhoneClick, trackFormSubmit, trackCTAClick } from "@/lib/analytics";
 *
 * All functions are safe to call even when the trackers are not loaded  - 
 * they check for window.gtag / window.fbq before firing.
 */

// ── Type augmentation ─────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
    __GADS_ID?: string;
  }
}

// Google Ads conversion labels  -  create these in Google Ads → Goals → Conversions
// then paste the label value (e.g. 'AbCdEfGhIjKlMnOp') from the tag setup screen.
// Leave as empty string until you have the label; the event will still fire to the
// account-level tag (AW-16467075039) which is sufficient for Smart Bidding.
const GADS_CONVERSION_LABELS = {
  phone_click: '',       // Google Ads conversion label for phone clicks
  generate_lead: '',     // Google Ads conversion label for form submissions
  whatsapp_click: '',    // Google Ads conversion label for WhatsApp clicks
} as const;

/** Fire a Google Ads conversion event. Safe to call even if Ads tag not loaded. */
function trackGAdsConversion(conversionType: keyof typeof GADS_CONVERSION_LABELS, value = 1): void {
  if (typeof window.gtag !== 'function') return;
  const label = GADS_CONVERSION_LABELS[conversionType];
  const sendTo = label
    ? `AW-16467075039/${label}`
    : 'AW-16467075039';
  window.gtag('event', 'conversion', {
    send_to: sendTo,
    value,
    currency: 'AUD',
  });
}

// ── Core dispatcher ───────────────────────────────────────────────────────────

/**
 * Send an event to GA4 and/or Meta Pixel.
 *
 * @param ga4EventName  GA4 event name (snake_case recommended)
 * @param ga4Params     GA4 event parameters
 * @param metaEventName Meta Pixel standard event name (optional; omit to skip Meta)
 * @param metaParams    Meta Pixel event parameters (optional)
 */
export function trackEvent(
  ga4EventName: string,
  ga4Params: Record<string, unknown> = {},
  metaEventName?: string,
  metaParams?: Record<string, unknown>,
): void {
  // GA4
  if (typeof window.gtag === "function") {
    window.gtag("event", ga4EventName, ga4Params);
  }

  // Meta Pixel
  if (metaEventName && typeof window.fbq === "function") {
    window.fbq("track", metaEventName, metaParams ?? {});
  }
}

// ── Conversion helpers ────────────────────────────────────────────────────────

/**
 * Track a phone number click.
 * GA4: Ads_Phone_Call_Click (imported as Google Ads conversion)
 * GA4: phone_click (legacy, kept for historical continuity)
 * Meta: Contact (standard)
 */
export function trackPhoneClick(source: string = "unknown"): void {
  // Fire the GA4 event that Google Ads imports as a conversion
  trackEvent(
    "Ads_Phone_Call_Click",
    { event_category: "contact", event_label: source, value: 1 },
    "Contact",
    { content_name: "phone_click", source },
  );
  // Also fire legacy event name for GA4 reporting continuity
  trackEvent(
    "phone_click",
    { event_category: "contact", event_label: source, value: 1 },
  );
  trackGAdsConversion('phone_click');
}

/**
 * Track a contact form submission.
 * GA4: Ads_Form_Submit (imported as Google Ads conversion)
 * GA4: generate_lead (legacy, kept for historical continuity)
 * Meta: Lead (standard)
 */
export function trackContactFormSubmit(): void {
  // Fire the GA4 event that Google Ads imports as a conversion
  trackEvent(
    "Ads_Form_Submit",
    { event_category: "form", event_label: "contact_form", value: 1 },
    "Lead",
    { content_name: "contact_form" },
  );
  // Also fire legacy event name for GA4 reporting continuity
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "contact_form", value: 1 },
  );
  trackGAdsConversion('generate_lead');
}

/**
 * Track a pre-arrangement enquiry form submission.
 * GA4: Ads_Form_Submit (imported as Google Ads conversion)
 * GA4: generate_lead (legacy, kept for historical continuity)
 * Meta: Lead (standard)
 */
export function trackPreArrangeFormSubmit(): void {
  // Fire the GA4 event that Google Ads imports as a conversion
  trackEvent(
    "Ads_Form_Submit",
    { event_category: "form", event_label: "pre_arrange_form", value: 1 },
    "Lead",
    { content_name: "pre_arrange_form" },
  );
  // Also fire legacy event name for GA4 reporting continuity
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "pre_arrange_form", value: 1 },
  );
  trackGAdsConversion('generate_lead');
}

/**
 * Track a flowers enquiry form submission.
 * GA4: Ads_Form_Submit (imported as Google Ads conversion)
 * GA4: generate_lead (legacy, kept for historical continuity)
 * Meta: Lead (standard)
 */
export function trackFlowersFormSubmit(): void {
  // Fire the GA4 event that Google Ads imports as a conversion
  trackEvent(
    "Ads_Form_Submit",
    { event_category: "form", event_label: "flowers_enquiry_form", value: 1 },
    "Lead",
    { content_name: "flowers_enquiry_form" },
  );
  // Also fire legacy event name for GA4 reporting continuity
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "flowers_enquiry_form", value: 1 },
  );
  trackGAdsConversion('generate_lead');
}

/**
 * Track an obituary tribute form submission.
 * GA4: Ads_Form_Submit (imported as Google Ads conversion)
 * GA4: generate_lead (legacy, kept for historical continuity)
 * Meta: Lead (standard)
 */
export function trackObituaryFormSubmit(): void {
  // Fire the GA4 event that Google Ads imports as a conversion
  trackEvent(
    "Ads_Form_Submit",
    { event_category: "form", event_label: "obituary_form", value: 1 },
    "Lead",
    { content_name: "obituary_form" },
  );
  // Also fire legacy event name for GA4 reporting continuity
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "obituary_form", value: 1 },
  );
  trackGAdsConversion('generate_lead');
}

/**
 * Track a primary CTA click ("Arrange a Funeral", "Get a Quote", etc.).
 * GA4: cta_click (custom)
 * Meta: InitiateCheckout (closest standard event for high-intent action)
 */
export function trackCTAClick(label: string, source: string = "unknown"): void {
  trackEvent(
    "cta_click",
    { event_category: "engagement", event_label: label, source, value: 1 },
    "InitiateCheckout",
    { content_name: label, source },
  );
}

/**
 * Track a WhatsApp button click.
 * GA4: Ads_WhatsApp_Click (imported as Google Ads conversion)
 * GA4: whatsapp_click (legacy, kept for historical continuity)
 * Meta: Contact
 */
export function trackWhatsAppClick(source: string = "unknown"): void {
  // Fire the GA4 event that Google Ads imports as a conversion
  trackEvent(
    "Ads_WhatsApp_Click",
    { event_category: "contact", event_label: source, value: 1 },
    "Contact",
    { content_name: "whatsapp_click", source },
  );
  // Also fire legacy event name for GA4 reporting continuity
  trackEvent(
    "whatsapp_click",
    { event_category: "contact", event_label: source, value: 1 },
  );
  trackGAdsConversion('whatsapp_click');
}

/**
 * Track a page view manually (used for SPA route changes).
 * GA4 handles page views automatically via config; this is for Meta Pixel.
 */
export function trackPageView(path: string): void {
  if (typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
  if (typeof window.gtag === "function") {
    window.gtag("event", "page_view", { page_path: path });
  }
}
