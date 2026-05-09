/**
 * WILLOW TREE FUNERALS — Order Flowers Page
 * Design: Sacred Elegance — Royal Blue / Catholic-inspired
 * SEO: "funeral flowers sydney", "sympathy flowers hurstville", "order funeral flowers"
 * Includes: Flower enquiry form with arrangement type, delivery address, service date, contact details
 */

import { useState } from "react";
import { Link } from "wouter";
import { Phone, ChevronRight, Flower, Truck, Heart, Mail, CheckCircle2, AlertCircle, CalendarDays, MapPin, User, MessageSquare, Loader2 } from "lucide-react";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import SEOHead from "../components/SEOHead";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { COMPANY } from "../../../shared/company";
import { trpc } from "@/lib/trpc";
import { trackFlowersFormSubmit } from "@/lib/analytics";

const BUTTERFLY_FLOWERS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20230517-WA0056_b5a70d37.jpg";
const BIRDCAGE_GARDEN   = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/IMG-20250724-WA0048_67323615.jpg";
const CASKET_CATHEDRAL  = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/casket-cathedral_upscaled_1a1ea687.jpg";

const ARRANGEMENT_TYPES = [
  "Wreath Tribute",
  "Casket Flowers",
  "Tribute Heart Wreath",
  "Sympathy Arrangement",
  "Standing Spray",
  "Posy / Bouquet",
  "Other / Custom",
];

const schema = {
  "@context": "https://schema.org",
  "@type": "Service",
  "name": "Funeral Flower Delivery — Willow Tree Funerals",
  "description": "Order funeral and sympathy flowers through Willow Tree Funerals. Partnered with Rays Florist and Lazy Daisy Florist for premium delivery to church services, funeral homes, and memorials across Sydney.",
  "provider": {
    "@type": "FuneralHome",
    "name": COMPANY.name,
    "telephone": COMPANY.phone,
    "url": "https://willowtreefunerals.com.au",
  },
  "areaServed": { "@type": "City", "name": "Sydney" },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://willowtreefunerals.com.au/" },
    { "@type": "ListItem", "position": 2, "name": "Order Flowers", "item": "https://willowtreefunerals.com.au/order-flowers" },
  ],
};

const flowerTypes = [
  {
    title: "Wreath Tributes",
    desc: "A timeless symbol of eternal life and remembrance. Wreaths are a traditional choice for funeral services, crafted with seasonal blooms and foliage.",
    icon: <Flower size={28} className="text-brand-gold" />,
  },
  {
    title: "Casket Flowers",
    desc: "Elegant floral arrangements designed to rest atop the casket during the service. Available in a range of styles from traditional to contemporary.",
    icon: <Heart size={28} className="text-brand-gold" />,
  },
  {
    title: "Tribute Heart Wreaths",
    desc: "A heartfelt expression of love and loss. Heart-shaped wreaths are a beautiful tribute for those closest to the departed.",
    icon: <Heart size={28} className="text-brand-gold" />,
  },
  {
    title: "Sympathy Arrangements",
    desc: "Thoughtful floral gifts delivered to the family home or service venue — a meaningful way to express your condolences and support.",
    icon: <Flower size={28} className="text-brand-gold" />,
  },
];

// ── Enquiry Form ──────────────────────────────────────────────────────────────
function FlowerEnquiryForm() {
  const [form, setForm] = useState({
    arrangementType: "",
    customArrangement: "",
    deliveryAddress: "",
    deliverySuburb: "",
    serviceDate: "",
    serviceTime: "",
    name: "",
    phone: "",
    email: "",
    additionalNotes: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const mutation = trpc.flowers.submitEnquiry.useMutation({
    onSuccess: () => { setSubmitted(true); trackFlowersFormSubmit(); },
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => { const e = { ...prev }; delete e[field]; return e; });
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.arrangementType) e.arrangementType = "Please select an arrangement type";
    if (form.arrangementType === "Other / Custom" && !form.customArrangement.trim())
      e.customArrangement = "Please describe the custom arrangement";
    if (!form.deliveryAddress.trim() || form.deliveryAddress.trim().length < 5)
      e.deliveryAddress = "Please enter a delivery address";
    if (!form.deliverySuburb.trim()) e.deliverySuburb = "Please enter a suburb";
    if (!form.serviceDate) e.serviceDate = "Please enter the service date";
    if (!form.name.trim()) e.name = "Please enter your name";
    if (!form.phone.trim() || form.phone.trim().length < 6) e.phone = "Please enter a valid phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = "Please enter a valid email address";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    mutation.mutate({
      arrangementType: form.arrangementType,
      customArrangement: form.customArrangement || undefined,
      deliveryAddress: form.deliveryAddress,
      deliverySuburb: form.deliverySuburb,
      serviceDate: form.serviceDate,
      serviceTime: form.serviceTime || undefined,
      name: form.name,
      phone: form.phone,
      email: form.email || undefined,
      additionalNotes: form.additionalNotes || undefined,
    });
  }

  if (submitted) {
    return (
      <div
        className="rounded-2xl bg-brand-navy p-10 text-center shadow-lg"
        style={{ animation: 'wtfFadeUp 0.5s ease forwards' }}
      >
        <style>{`
          @keyframes wtfFadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
          @keyframes wtfScaleIn { from { opacity:0; transform:scale(0.5); } to { opacity:1; transform:scale(1); } }
          .wtf-check-ring { animation: wtfScaleIn 0.4s 0.25s ease both; }
        `}</style>
        <div className="wtf-check-ring w-20 h-20 rounded-full bg-brand-gold/10 border-2 border-brand-gold flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 size={36} className="text-brand-gold" />
        </div>
        <h3 className="font-serif text-white text-2xl font-semibold mb-2">Flower Enquiry Received</h3>
        <p className="text-brand-gold text-sm font-medium tracking-wide uppercase mb-6">Thank you for your order</p>
        <p className="text-white/70 leading-relaxed mb-8">
          Our team has received your flower enquiry and will be in touch shortly to confirm your arrangement and delivery details.
        </p>
        <div className="bg-white/5 border border-white/10 p-6 mb-8 text-left">
          <p className="text-brand-gold text-xs font-semibold uppercase tracking-widest mb-5">What Happens Next</p>
          <div className="space-y-5">
            {[
              { step: '1', text: 'Your enquiry has been received and our floral team is reviewing your request.' },
              { step: '2', text: 'A team member will call or email you to confirm the arrangement, delivery address, and timing.' },
              { step: '3', text: 'Your flowers will be prepared with care and delivered to the service location.' },
            ].map(({ step, text }) => (
              <div key={step} className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-brand-gold/20 border border-brand-gold/40 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-brand-gold text-xs font-bold">{step}</span>
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{text}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2">
            <Phone size={14} /> Call Us: {COMPANY.phone}
          </a>
          <button
            onClick={() => { setSubmitted(false); setForm({ arrangementType: "", customArrangement: "", deliveryAddress: "", deliverySuburb: "", serviceDate: "", serviceTime: "", name: "", phone: "", email: "", additionalNotes: "" }); }}
            className="btn-outline border-white/30 text-white/70 hover:bg-white/10 text-sm"
          >
            Submit Another Enquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl bg-white border border-brand-light-blue shadow-lg overflow-hidden">
      {/* Form header */}
      <div className="bg-brand-navy px-8 py-6">
        <h3 className="font-serif text-white text-xl font-semibold">Flower Enquiry Form</h3>
        <p className="text-white/60 text-sm mt-1">
          Complete the form below and we will contact you to confirm your order.
        </p>
      </div>

      <div className="p-8 space-y-7">

        {/* ── Section 1: Arrangement ── */}
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-brand-royal font-semibold mb-4 flex items-center gap-2">
            <Flower size={13} /> Arrangement Type
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {ARRANGEMENT_TYPES.map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => set("arrangementType", type)}
                className={`rounded-xl border px-3 py-3 text-sm font-sans font-medium text-left transition-all leading-snug ${
                  form.arrangementType === type
                    ? "border-brand-royal bg-brand-royal/10 text-brand-royal"
                    : "border-brand-light-blue text-brand-navy/70 hover:border-brand-royal hover:text-brand-navy"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          {errors.arrangementType && (
            <p className="text-red-500 text-xs mt-2 flex items-center gap-1">
              <AlertCircle size={12} /> {errors.arrangementType}
            </p>
          )}
        </div>

        {/* Custom arrangement description — shown when "Other / Custom" selected */}
        {form.arrangementType === "Other / Custom" && (
          <div>
            <label className="block font-sans text-xs tracking-widest uppercase text-brand-navy/60 font-semibold mb-2">
              Describe Your Custom Arrangement <span className="text-red-400">*</span>
            </label>
            <textarea
              value={form.customArrangement}
              onChange={(e) => set("customArrangement", e.target.value)}
              rows={3}
              placeholder="e.g. White lilies and roses, large standing spray..."
              className={`w-full rounded-xl border px-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors resize-none ${errors.customArrangement ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
            />
            {errors.customArrangement && (
              <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                <AlertCircle size={12} /> {errors.customArrangement}
              </p>
            )}
          </div>
        )}

        {/* ── Section 2: Delivery Details ── */}
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-brand-royal font-semibold mb-4 flex items-center gap-2">
            <MapPin size={13} /> Delivery Details
          </p>
          <div className="space-y-4">
            <div>
              <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                Delivery Address <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.deliveryAddress}
                onChange={(e) => set("deliveryAddress", e.target.value)}
                placeholder="e.g. St George Catholic Church, 1 Park Road, Hurstville"
                className={`w-full rounded-xl border px-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors ${errors.deliveryAddress ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
              />
              {errors.deliveryAddress && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.deliveryAddress}
                </p>
              )}
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                  Suburb <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.deliverySuburb}
                  onChange={(e) => set("deliverySuburb", e.target.value)}
                  placeholder="e.g. Hurstville"
                  className={`w-full rounded-xl border px-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors ${errors.deliverySuburb ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
                />
                {errors.deliverySuburb && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.deliverySuburb}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                  Service Date <span className="text-red-400">*</span>
                </label>
                <div className="relative">
                  <CalendarDays size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/70 pointer-events-none" />
                  <input
                    type="date"
                    value={form.serviceDate}
                    onChange={(e) => set("serviceDate", e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full rounded-xl border pl-10 pr-4 py-3.5 text-base text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors ${errors.serviceDate ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
                  />
                </div>
                {errors.serviceDate && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.serviceDate}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                Service Time <span className="text-brand-navy/70 font-normal">(optional)</span>
              </label>
              <input
                type="time"
                value={form.serviceTime}
                onChange={(e) => set("serviceTime", e.target.value)}
                className="w-full sm:w-48 rounded-xl border border-brand-light-blue bg-brand-ivory/40 px-4 py-3.5 text-base text-brand-navy focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors"
              />
            </div>
          </div>
        </div>

        {/* ── Section 3: Contact Details ── */}
        <div>
          <p className="font-sans text-xs tracking-widest uppercase text-brand-royal font-semibold mb-4 flex items-center gap-2">
            <User size={13} /> Your Contact Details
          </p>
          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                  Full Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => set("name", e.target.value)}
                  placeholder="Your name"
                  autoComplete="name"
                  className={`w-full rounded-xl border px-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors ${errors.name ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.name}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                  Phone Number <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => set("phone", e.target.value)}
                  placeholder="e.g. 0400 000 000"
                  autoComplete="tel"
                  className={`w-full rounded-xl border px-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors ${errors.phone ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <AlertCircle size={12} /> {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block font-sans text-xs text-brand-navy/60 font-medium mb-1.5">
                Email Address <span className="text-brand-navy/70 font-normal">(optional)</span>
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-navy/70 pointer-events-none" />
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => set("email", e.target.value)}
                  placeholder="your@email.com"
                  autoComplete="email"
                  className={`w-full rounded-xl border pl-10 pr-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors ${errors.email ? "border-red-300 bg-red-50" : "border-brand-light-blue bg-brand-ivory/40"}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                  <AlertCircle size={12} /> {errors.email}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* ── Section 4: Additional Notes ── */}
        <div>
          <label className="font-sans text-xs tracking-widest uppercase text-brand-royal font-semibold mb-4 flex items-center gap-2">
            <MessageSquare size={13} /> Additional Notes <span className="text-brand-navy/70 font-normal normal-case tracking-normal">(optional)</span>
          </label>
          <textarea
            value={form.additionalNotes}
            onChange={(e) => set("additionalNotes", e.target.value)}
            rows={3}
            placeholder="e.g. Preferred colours, specific flowers, any special requests..."
            className="w-full rounded-xl border border-brand-light-blue bg-brand-ivory/40 px-4 py-3.5 text-base text-brand-navy placeholder-brand-navy/30 focus:outline-none focus:ring-2 focus:ring-brand-royal/30 transition-colors resize-none"
          />
        </div>

        {/* Mutation error */}
        {mutation.isError && (
          <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 flex items-start gap-2">
            <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
            <p className="text-red-700 text-sm">
              Something went wrong. Please try again or call us on{" "}
              <a href={COMPANY.phoneHref} className="font-semibold underline">{COMPANY.phone}</a>.
            </p>
          </div>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={mutation.isPending}
          className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {mutation.isPending ? (
            <>
              <Loader2 size={15} className="animate-spin" />
              Sending Enquiry...
            </>
          ) : (
            <>
              <Flower size={15} /> Submit Flower Enquiry
            </>
          )}
        </button>

        <p className="text-center text-brand-navy/70 text-xs leading-relaxed">
          By submitting this form you agree to be contacted by Willow Tree Funerals regarding your flower order.
          Alternatively, call us directly on{" "}
          <a href={COMPANY.phoneHref} className="text-brand-royal hover:underline">{COMPANY.phone}</a> or email{" "}
          <a href={`mailto:${COMPANY.email}`} className="text-brand-royal hover:underline">{COMPANY.email}</a>.
        </p>
      </div>
    </form>
  );
}

// ── Page ──────────────────────────────────────────────────────────────────────
export default function OrderFlowers() {
  useScrollReveal();

  return (
    <>
      <SEOHead
        title="Order Funeral Flowers | Willow Tree Funerals — Sydney Delivery"
        description="Order funeral and sympathy flowers through Willow Tree Funerals. Partnered with Rays Florist and Lazy Daisy Florist for premium delivery to church services, funeral homes, and memorials across Sydney."
        canonical="/order-flowers"
        schema={schema}
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative min-h-[55vh] flex items-end"
        style={{
          backgroundImage: `url(${BUTTERFLY_FLOWERS})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/60 to-brand-navy/20" />
        <div className="relative z-10 container pb-16 pt-32">
          <p className="section-label text-brand-gold mb-3">Order Flowers</p>
          <h1 className="font-serif text-white text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight max-w-3xl mb-4">
            Flowers for a Final Farewell
          </h1>
          <p className="text-white/75 text-lg max-w-2xl leading-relaxed">
            A beautiful floral tribute is one of the most meaningful ways to honour a life and express your love and condolences.
          </p>
        </div>
      </section>

      {/* Quote banner */}
      <section className="py-12 bg-brand-navy">
        <div className="container">
          <blockquote className="text-center">
            <p className="scripture text-brand-gold text-xl md:text-2xl leading-relaxed max-w-3xl mx-auto">
              "Those we love don't go away, they walk beside us everyday — unseen, unheard, but always near, still loved, still missed and very dear."
            </p>
          </blockquote>
        </div>
      </section>

      {/* Intro + Delivery info */}
      <section className="py-20 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="scroll-reveal">
              <p className="section-label mb-3">Our Preferred Florists</p>
              <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight mb-6">
                Premium Floral Tributes
              </h2>
              <p className="text-brand-navy/70 text-lg leading-relaxed mb-5">
                Willow Tree Funerals has partnered with multiple trusted local florists including — <strong>Rays Florist</strong> and <strong>Lazy Daisy Florist</strong> — to provide beautiful, premium floral arrangements for funeral services and sympathy deliveries.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-5">
                Funeral flowers include wreath tributes, casket flowers, tribute heart wreaths, standing sprays, and sympathy arrangements. Every order is crafted with care and delivered with dignity.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                We offer a premium funeral delivery service to our customers at no extra cost. Servicing the local area ensures your flowers are always delivered well in advance of the service.
              </p>

              <div className="rounded-2xl bg-brand-light-blue/40 border border-brand-light-blue p-6 mb-6">
                <div className="flex items-start gap-3">
                  <Truck size={20} className="text-brand-royal mt-0.5 shrink-0" />
                  <div>
                    <p className="font-serif text-brand-navy font-semibold mb-1">Premium Delivery — No Extra Cost</p>
                    <p className="text-brand-navy/65 text-sm leading-relaxed">
                      We deliver to church services, funeral homes, memorials, and the family home. Always delivered well in advance of the service.
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct contact */}
              <div className="rounded-2xl bg-brand-navy/5 border border-brand-navy/10 p-6">
                <p className="font-serif text-brand-navy font-semibold mb-3">Prefer to order by phone or email?</p>
                <div className="flex flex-col gap-2">
                  <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-brand-royal font-semibold text-sm hover:underline">
                    <Phone size={14} /> {COMPANY.phone}
                  </a>
                  <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-brand-royal font-semibold text-sm hover:underline">
                    <Mail size={14} /> {COMPANY.email}
                  </a>
                </div>
              </div>
            </div>

            <div className="scroll-reveal">
              <img
                src={CASKET_CATHEDRAL}
                alt="Floral tribute at a funeral service — Willow Tree Funerals"
                className="rounded-2xl shadow-2xl w-full object-cover"
                style={{ maxHeight: "520px" }}
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Flower types */}
      <section className="py-20 bg-brand-ivory">
        <div className="container">
          <div className="text-center mb-14 scroll-reveal">
            <p className="section-label mb-3">Flower Arrangements</p>
            <h2 className="font-serif text-brand-navy text-4xl md:text-5xl font-semibold leading-tight">
              Types of Funeral Flowers
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 scroll-reveal-stagger">
            {flowerTypes.map((type, i) => (
              <div key={i} className="bg-white rounded-2xl p-7 border border-brand-light-blue hover:border-brand-royal hover:shadow-lg transition-all">
                <div className="mb-5">{type.icon}</div>
                <h3 className="font-serif text-brand-navy text-lg font-semibold mb-3">{type.title}</h3>
                <p className="text-brand-navy/60 text-sm leading-relaxed">{type.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Enquiry Form Section ── */}
      <section id="enquiry-form" className="py-24 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-14 items-start">
            {/* Left: context */}
            <div className="lg:col-span-2 scroll-reveal">
              <p className="section-label mb-3">Place an Order</p>
              <h2 className="font-serif text-brand-navy text-3xl md:text-4xl font-semibold leading-tight mb-5">
                Send a Flower Enquiry
              </h2>
              <p className="text-brand-navy/70 leading-relaxed mb-6">
                Complete the form and our team will contact you to confirm your order, discuss your preferences, and arrange delivery to the service venue.
              </p>

              <div className="space-y-4">
                {[
                  { icon: <Flower size={16} className="text-brand-gold" />, label: "Choose your arrangement type" },
                  { icon: <MapPin size={16} className="text-brand-gold" />, label: "Tell us where and when to deliver" },
                  { icon: <Phone size={16} className="text-brand-gold" />, label: "We'll call to confirm your order" },
                  { icon: <Truck size={16} className="text-brand-gold" />, label: "Flowers delivered before the service" },
                ].map((step, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand-light-blue/50 flex items-center justify-center shrink-0">
                      {step.icon}
                    </div>
                    <p className="text-brand-navy/70 text-sm">{step.label}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl bg-brand-ivory border border-brand-light-blue p-5">
                <p className="font-serif text-brand-navy font-semibold text-sm mb-2">Urgent? Call us directly</p>
                <a href={COMPANY.phoneHref} className="flex items-center gap-2 text-brand-royal font-semibold hover:underline mb-1">
                  <Phone size={14} /> {COMPANY.phone}
                </a>
                <a href={`mailto:${COMPANY.email}`} className="flex items-center gap-2 text-brand-royal font-semibold hover:underline text-sm">
                  <Mail size={14} /> {COMPANY.email}
                </a>
                <p className="text-brand-navy/70 text-xs mt-2">Available 24 hours, 7 days a week</p>
              </div>
            </div>

            {/* Right: form */}
            <div className="lg:col-span-3 scroll-reveal">
              <FlowerEnquiryForm />
            </div>
          </div>
        </div>
      </section>

      {/* Photo gallery strip */}
      <section className="py-16 bg-brand-ivory overflow-hidden">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <img src={BUTTERFLY_FLOWERS} alt="Funeral flowers" className="rounded-2xl object-cover w-full h-48 md:h-64" loading="lazy" />
            <img src={BIRDCAGE_GARDEN} alt="Garden ceremony with flowers" className="rounded-2xl object-cover w-full h-48 md:h-64" loading="lazy" />
            <img src={CASKET_CATHEDRAL} alt="Casket with floral tribute" className="rounded-2xl object-cover w-full h-48 md:h-64 hidden md:block" loading="lazy" />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-brand-royal">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="font-serif text-white text-2xl md:text-3xl font-semibold mb-2">
                Ready to Order Flowers?
              </h2>
              <p className="text-white/75">
                Call <strong className="text-white">{COMPANY.phone}</strong> or email{" "}
                <strong className="text-white">{COMPANY.email}</strong> — we are here 24/7.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 shrink-0">
              <a href={COMPANY.phoneHref} className="btn-primary bg-white text-brand-navy border-white hover:bg-brand-ivory flex items-center gap-2">
                <Phone size={15} /> {COMPANY.phone}
              </a>
              <a href="#enquiry-form" className="btn-outline border-white text-white hover:bg-white hover:text-brand-navy flex items-center gap-2">
                Enquiry Form <ChevronRight size={14} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
