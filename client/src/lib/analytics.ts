/**
 * analytics.ts — Willow Tree Funerals
 *
 * Unified event tracking for Google Analytics 4 and Meta Pixel.
 * Both trackers are loaded conditionally in index.html only when
 * VITE_GA4_MEASUREMENT_ID / VITE_META_PIXEL_ID are set.
 *
 * Usage:
 *   import { trackPhoneClick, trackFormSubmit, trackCTAClick } from "@/lib/analytics";
 *
 * All functions are safe to call even when the trackers are not loaded —
 * they check for window.gtag / window.fbq before firing.
 */

// ── Type augmentation ─────────────────────────────────────────────────────────
declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
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
 * GA4: phone_click (custom)
 * Meta: Contact (standard)
 */
export function trackPhoneClick(source: string = "unknown"): void {
  trackEvent(
    "phone_click",
    { event_category: "contact", event_label: source, value: 1 },
    "Contact",
    { content_name: "phone_click", source },
  );
}

/**
 * Track a contact form submission.
 * GA4: generate_lead (recommended)
 * Meta: Lead (standard)
 */
export function trackContactFormSubmit(): void {
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "contact_form", value: 1 },
    "Lead",
    { content_name: "contact_form" },
  );
}

/**
 * Track a pre-arrangement enquiry form submission.
 * GA4: generate_lead
 * Meta: Lead
 */
export function trackPreArrangeFormSubmit(): void {
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "pre_arrange_form", value: 1 },
    "Lead",
    { content_name: "pre_arrange_form" },
  );
}

/**
 * Track a flowers enquiry form submission.
 * GA4: generate_lead
 * Meta: Lead
 */
export function trackFlowersFormSubmit(): void {
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "flowers_enquiry_form", value: 1 },
    "Lead",
    { content_name: "flowers_enquiry_form" },
  );
}

/**
 * Track an obituary tribute form submission.
 * GA4: generate_lead
 * Meta: Lead
 */
export function trackObituaryFormSubmit(): void {
  trackEvent(
    "generate_lead",
    { event_category: "form", event_label: "obituary_form", value: 1 },
    "Lead",
    { content_name: "obituary_form" },
  );
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
 * GA4: whatsapp_click (custom)
 * Meta: Contact
 */
export function trackWhatsAppClick(source: string = "unknown"): void {
  trackEvent(
    "whatsapp_click",
    { event_category: "contact", event_label: source, value: 1 },
    "Contact",
    { content_name: "whatsapp_click", source },
  );
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
