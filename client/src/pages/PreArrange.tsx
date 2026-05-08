/**
 * WILLOW TREE FUNERALS — Pre-Arrangement Form
 * Multi-step form for families wishing to pre-arrange their own funeral.
 * Steps: Personal Details → Service Preferences → Final Wishes → Confirmation
 */

import { useState } from "react";
import { Link } from "wouter";
import {
  Phone, ArrowRight, ArrowLeft, CheckCircle2, Calendar,
  Shield, Heart, DollarSign, User, FileText, Check, Loader2,
} from "lucide-react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { trpc } from "@/lib/trpc";
import { COMPANY } from "../../../shared/company";
import { trackPreArrangeFormSubmit } from "@/lib/analytics";

const HEARSE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hearse-branded_c81955b1.png";

type Step = 1 | 2 | 3 | 4;

interface FormData {
  // Step 1 — Personal Details
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  phone: string;
  email: string;
  address: string;
  suburb: string;
  postcode: string;
  // Step 2 — Service Preferences
  serviceType: string;
  disposition: string;
  venue: string;
  // Step 3 — Final Wishes
  specialRequests: string;
  religiousPreferences: string;
  musicPreferences: string;
  readingPreferences: string;
  // Meta
  howDidYouHear: string;
}

const initialForm: FormData = {
  firstName: "", lastName: "", dateOfBirth: "", phone: "", email: "",
  address: "", suburb: "", postcode: "",
  serviceType: "", disposition: "", venue: "",
  specialRequests: "", religiousPreferences: "", musicPreferences: "", readingPreferences: "",
  howDidYouHear: "",
};

const steps = [
  { number: 1, label: "Personal Details", icon: User },
  { number: 2, label: "Service Preferences", icon: FileText },
  { number: 3, label: "Final Wishes", icon: Heart },
  { number: 4, label: "Confirmation", icon: Check },
];

export default function PreArrange() {
  const [step, setStep] = useState<Step>(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submitMutation = trpc.preArrange.preArrange.useMutation({
    onSuccess: () => { setSubmitted(true); trackPreArrangeFormSubmit(); },
    onError: (err: { message?: string }) => { setError(err.message || "Something went wrong. Please call us directly."); },
  });

  const update = (field: keyof FormData, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    setError(null);
    submitMutation.mutate({
      firstName: form.firstName,
      lastName: form.lastName,
      dateOfBirth: form.dateOfBirth,
      phone: form.phone,
      email: form.email,
      address: `${form.address}, ${form.suburb} ${form.postcode}`,
      serviceType: form.serviceType,
      disposition: form.disposition,
      venue: form.venue,
      specialRequests: form.specialRequests,
      religiousPreferences: form.religiousPreferences,
      musicPreferences: form.musicPreferences,
      readingPreferences: form.readingPreferences,
      howDidYouHear: form.howDidYouHear,
    });
  };

  const inputClass = "w-full border border-brand-light-blue/80 rounded-lg px-4 py-3.5 text-brand-navy text-base focus:outline-none focus:ring-2 focus:ring-brand-royal/30 focus:border-brand-royal bg-white placeholder:text-brand-navy/30";
  const labelClass = "block text-brand-navy text-sm font-semibold mb-1.5";
  const selectClass = `${inputClass} cursor-pointer`;

  if (submitted) {
    return (
      <>
        <SEOHead
          title="Pre-Arrangement Request Received | Willow Tree Funerals"
          description="Thank you for submitting your pre-arrangement request. Our team will be in touch within 24 hours."
          canonical="https://www.willowtreefunerals.com.au/pre-arrange"
        />
        <Nav />
        <section className="min-h-[70vh] bg-brand-ivory flex items-center py-20 pt-32">
          <div
            className="container max-w-2xl text-center"
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
            <h1 className="font-serif text-brand-navy font-bold text-3xl mb-4">
              Thank You, {form.firstName}
            </h1>
            <p className="text-brand-navy/65 text-base leading-relaxed mb-8">
              Your pre-arrangement request has been received. Our team will personally review your details and be in touch within 24 hours to discuss your wishes and answer any questions.
            </p>
            <div className="bg-white rounded-2xl border border-brand-light-blue/60 p-8 mb-8 text-left">
              <p className="section-label mb-3">What Happens Next</p>
              <div className="space-y-4">
                {[
                  { icon: Phone, title: "Personal Call from Our Team", desc: "A Family Care Specialist will call you within 24 hours to discuss your wishes in detail." },
                  { icon: FileText, title: "Written Confirmation", desc: "We will provide a written summary of your pre-arrangement wishes for your records." },
                  { icon: Shield, title: "No Obligation", desc: "There is no obligation or payment required at this stage. We are simply here to help you plan." },
                ].map(({ icon: Icon, title, desc }) => (
                  <div key={title} className="flex gap-4">
                    <div className="w-9 h-9 rounded-xl bg-brand-light-blue/40 flex items-center justify-center shrink-0">
                      <Icon size={16} className="text-brand-royal" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy text-sm mb-0.5">{title}</p>
                      <p className="text-brand-navy/55 text-xs leading-relaxed">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href={COMPANY.phoneHref} className="btn-royal flex items-center justify-center gap-2">
                <Phone size={14} /> Call Us Now
              </a>
              <Link href="/" className="btn-outline flex items-center justify-center gap-2">
                Return Home <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SEOHead
        title="Pre-Arrange Your Funeral | Willow Tree Funerals Sydney"
        description="Pre-arrange your own funeral with Willow Tree Funerals — the most thoughtful gift you can give your family. No obligation. Lock in today's prices."
        canonical="https://www.willowtreefunerals.com.au/pre-arrange"
      />
      <Nav />

      {/* Hero */}
      <section
        className="relative py-24 pt-36 bg-brand-navy overflow-hidden"
        style={{ backgroundImage: `url(${HEARSE_IMG})`, backgroundSize: "cover", backgroundPosition: "center 40%" }}
      >
        <div className="absolute inset-0 bg-brand-navy/85" />
        <div className="relative z-10 container max-w-3xl">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-brand-royal/20 flex items-center justify-center">
              <Calendar size={18} className="text-brand-gold" />
            </div>
            <p className="section-label text-brand-gold">Planning Ahead</p>
          </div>
          <h1 className="font-serif text-white font-bold leading-tight mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", letterSpacing: "-0.025em" }}>
            Pre-Arrange Your Funeral
          </h1>
          <p className="text-white/65 text-lg leading-relaxed mb-6">
            The most thoughtful gift you can give your family. Pre-arranging your funeral removes the burden of decision-making during grief and locks in today's prices.
          </p>
          <div className="flex flex-wrap gap-4">
            {[
              { icon: Shield, label: "No obligation" },
              { icon: DollarSign, label: "Lock in today's prices" },
              { icon: Heart, label: "Peace of mind for your family" },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2 text-white/70 text-sm">
                <Icon size={14} className="text-brand-gold" /> {label}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 bg-brand-ivory">
        <div className="container max-w-3xl">

          {/* Step indicator */}
          <div className="flex items-center justify-between mb-12 relative">
            <div className="absolute top-5 left-0 right-0 h-px bg-brand-light-blue/60 -z-0" />
            {steps.map(({ number, label, icon: Icon }) => {
              const isActive = step === number;
              const isDone = step > number;
              return (
                <div key={number} className="flex flex-col items-center gap-2 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isDone ? "bg-brand-royal border-brand-royal" :
                    isActive ? "bg-white border-brand-royal shadow-md" :
                    "bg-white border-brand-light-blue/60"
                  }`}>
                    {isDone
                      ? <CheckCircle2 size={18} className="text-white" />
                      : <Icon size={16} className={isActive ? "text-brand-royal" : "text-brand-navy/30"} />
                    }
                  </div>
                  <span className={`text-xs font-semibold hidden sm:block ${isActive ? "text-brand-royal" : isDone ? "text-brand-navy/60" : "text-brand-navy/30"}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Step 1 — Personal Details */}
          {step === 1 && (
            <div className="bg-white rounded-2xl border border-brand-light-blue/60 p-8 shadow-sm">
              <h2 className="font-serif text-brand-navy font-bold text-2xl mb-2">Your Personal Details</h2>
              <p className="text-brand-navy/55 text-sm mb-8">This information will be kept strictly confidential and used only to record your pre-arrangement wishes.</p>
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>First Name *</label>
                  <input type="text" className={inputClass} value={form.firstName} onChange={e => update("firstName", e.target.value)} placeholder="John" required />
                </div>
                <div>
                  <label className={labelClass}>Last Name *</label>
                  <input type="text" className={inputClass} value={form.lastName} onChange={e => update("lastName", e.target.value)} placeholder="Smith" required />
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" className={inputClass} value={form.dateOfBirth} onChange={e => update("dateOfBirth", e.target.value)} />
                </div>
                <div>
                  <label className={labelClass}>Phone Number *</label>
                  <input type="tel" className={inputClass} value={form.phone} onChange={e => update("phone", e.target.value)} placeholder="0400 000 000" required />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Email Address</label>
                  <input type="email" className={inputClass} value={form.email} onChange={e => update("email", e.target.value)} placeholder="john@example.com" />
                </div>
                <div className="sm:col-span-2">
                  <label className={labelClass}>Home Address</label>
                  <input type="text" className={inputClass} value={form.address} onChange={e => update("address", e.target.value)} placeholder="123 Example Street" />
                </div>
                <div>
                  <label className={labelClass}>Suburb</label>
                  <input type="text" className={inputClass} value={form.suburb} onChange={e => update("suburb", e.target.value)} placeholder="Hurstville" />
                </div>
                <div>
                  <label className={labelClass}>Postcode</label>
                  <input type="text" className={inputClass} value={form.postcode} onChange={e => update("postcode", e.target.value)} placeholder="2220" />
                </div>
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  onClick={() => setStep(2)}
                  disabled={!form.firstName || !form.lastName || !form.phone}
                  className="btn-royal flex items-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next Step <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 2 — Service Preferences */}
          {step === 2 && (
            <div className="bg-white rounded-2xl border border-brand-light-blue/60 p-8 shadow-sm">
              <h2 className="font-serif text-brand-navy font-bold text-2xl mb-2">Service Preferences</h2>
              <p className="text-brand-navy/55 text-sm mb-8">Tell us about the type of service you would like. These are your wishes — we will ensure they are respected.</p>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Type of Service</label>
                  <select className={selectClass} value={form.serviceType} onChange={e => update("serviceType", e.target.value)}>
                    <option value="">Please select...</option>
                    <option value="Catholic Funeral Mass">Catholic Funeral Mass</option>
                    <option value="Multi-Faith Service">Multi-Faith Service</option>
                    <option value="Secular Celebration of Life">Secular Celebration of Life</option>
                    <option value="Graveside Service">Graveside Service Only</option>
                    <option value="Direct Cremation">Direct Cremation (no service)</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Burial or Cremation</label>
                  <select className={selectClass} value={form.disposition} onChange={e => update("disposition", e.target.value)}>
                    <option value="">Please select...</option>
                    <option value="Burial">Burial</option>
                    <option value="Cremation">Cremation</option>
                    <option value="Not sure yet">Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Preferred Venue</label>
                  <select className={selectClass} value={form.venue} onChange={e => update("venue", e.target.value)}>
                    <option value="">Please select...</option>
                    <option value="Parish Church">My Parish Church</option>
                    <option value="Funeral Chapel">Funeral Chapel</option>
                    <option value="Graveside">Graveside Only</option>
                    <option value="At Home">At Home</option>
                    <option value="Other">Other / Not sure yet</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>How did you hear about us?</label>
                  <select className={selectClass} value={form.howDidYouHear} onChange={e => update("howDidYouHear", e.target.value)}>
                    <option value="">Please select...</option>
                    <option value="Google Search">Google Search</option>
                    <option value="Google Maps">Google Maps</option>
                    <option value="Word of Mouth">Word of Mouth / Recommendation</option>
                    <option value="Previous Client">Previous Client</option>
                    <option value="Parish / Church">Parish / Church</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(1)} className="btn-outline flex items-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={() => setStep(3)} className="btn-royal flex items-center gap-2">
                  Next Step <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 3 — Final Wishes */}
          {step === 3 && (
            <div className="bg-white rounded-2xl border border-brand-light-blue/60 p-8 shadow-sm">
              <h2 className="font-serif text-brand-navy font-bold text-2xl mb-2">Your Final Wishes</h2>
              <p className="text-brand-navy/55 text-sm mb-8">Share any specific wishes, preferences, or requests. There are no right or wrong answers — this is about honouring who you are.</p>
              <div className="space-y-5">
                <div>
                  <label className={labelClass}>Religious or Faith Preferences</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={form.religiousPreferences}
                    onChange={e => update("religiousPreferences", e.target.value)}
                    placeholder="e.g. Catholic Mass at St Patrick's Parish, Hurstville. Father Michael to officiate if possible."
                  />
                </div>
                <div>
                  <label className={labelClass}>Music Preferences</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={form.musicPreferences}
                    onChange={e => update("musicPreferences", e.target.value)}
                    placeholder="e.g. Ave Maria, Amazing Grace, and a favourite song..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Readings or Tributes</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={3}
                    value={form.readingPreferences}
                    onChange={e => update("readingPreferences", e.target.value)}
                    placeholder="e.g. John 14:1-6, a poem by my daughter, a tribute from my son..."
                  />
                </div>
                <div>
                  <label className={labelClass}>Any Other Special Requests</label>
                  <textarea
                    className={`${inputClass} resize-none`}
                    rows={4}
                    value={form.specialRequests}
                    onChange={e => update("specialRequests", e.target.value)}
                    placeholder="e.g. Flowers — white lilies only. Dress me in my blue suit. I would like a horse-drawn hearse..."
                  />
                </div>
              </div>
              <div className="mt-8 flex justify-between">
                <button onClick={() => setStep(2)} className="btn-outline flex items-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
                <button onClick={() => setStep(4)} className="btn-royal flex items-center gap-2">
                  Review & Submit <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* Step 4 — Review & Confirm */}
          {step === 4 && (
            <div className="bg-white rounded-2xl border border-brand-light-blue/60 p-8 shadow-sm">
              <h2 className="font-serif text-brand-navy font-bold text-2xl mb-2">Review Your Details</h2>
              <p className="text-brand-navy/55 text-sm mb-8">Please review your pre-arrangement details before submitting. Our team will be in touch within 24 hours.</p>

              <div className="space-y-6 mb-8">
                {/* Personal */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="section-label">Personal Details</p>
                    <button onClick={() => setStep(1)} className="text-brand-royal text-xs font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="bg-brand-ivory rounded-lg p-4 grid sm:grid-cols-2 gap-2 text-sm">
                    <div><span className="text-brand-navy/50">Name:</span> <span className="text-brand-navy font-medium">{form.firstName} {form.lastName}</span></div>
                    <div><span className="text-brand-navy/50">Phone:</span> <span className="text-brand-navy font-medium">{form.phone}</span></div>
                    {form.email && <div><span className="text-brand-navy/50">Email:</span> <span className="text-brand-navy font-medium">{form.email}</span></div>}
                    {form.suburb && <div><span className="text-brand-navy/50">Suburb:</span> <span className="text-brand-navy font-medium">{form.suburb}</span></div>}
                  </div>
                </div>

                {/* Service */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="section-label">Service Preferences</p>
                    <button onClick={() => setStep(2)} className="text-brand-royal text-xs font-semibold hover:underline">Edit</button>
                  </div>
                  <div className="bg-brand-ivory rounded-lg p-4 grid sm:grid-cols-2 gap-2 text-sm">
                    {form.serviceType && <div><span className="text-brand-navy/50">Service Type:</span> <span className="text-brand-navy font-medium">{form.serviceType}</span></div>}
                    {form.disposition && <div><span className="text-brand-navy/50">Burial/Cremation:</span> <span className="text-brand-navy font-medium">{form.disposition}</span></div>}
                    {form.venue && <div><span className="text-brand-navy/50">Venue:</span> <span className="text-brand-navy font-medium">{form.venue}</span></div>}
                  </div>
                </div>

                {/* Wishes */}
                {(form.religiousPreferences || form.musicPreferences || form.specialRequests) && (
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <p className="section-label">Final Wishes</p>
                      <button onClick={() => setStep(3)} className="text-brand-royal text-xs font-semibold hover:underline">Edit</button>
                    </div>
                    <div className="bg-brand-ivory rounded-lg p-4 space-y-2 text-sm">
                      {form.religiousPreferences && <div><span className="text-brand-navy/50">Faith:</span> <span className="text-brand-navy">{form.religiousPreferences}</span></div>}
                      {form.musicPreferences && <div><span className="text-brand-navy/50">Music:</span> <span className="text-brand-navy">{form.musicPreferences}</span></div>}
                      {form.specialRequests && <div><span className="text-brand-navy/50">Special Requests:</span> <span className="text-brand-navy">{form.specialRequests}</span></div>}
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 rounded-lg px-4 py-3 text-sm mb-6">
                  {error}
                </div>
              )}

              <div className="bg-brand-light-blue/20 rounded-lg p-4 mb-6 text-sm text-brand-navy/70 leading-relaxed">
                <strong className="text-brand-navy">No obligation.</strong> Submitting this form does not commit you to any arrangement or payment. A Family Care Specialist will call you within 24 hours to discuss your wishes in a relaxed, no-pressure conversation.
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(3)} className="btn-outline flex items-center gap-2">
                  <ArrowLeft size={14} /> Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitMutation.isPending}
                  className="btn-royal flex items-center gap-2 disabled:opacity-60"
                >
                  {submitMutation.isPending ? (
                    <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                  ) : (
                    <>Submit Pre-Arrangement <CheckCircle2 size={14} /></>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* Reassurance panel */}
          <div className="mt-8 grid sm:grid-cols-3 gap-4">
            {[
              { icon: Shield, title: "Strictly Confidential", desc: "Your details are never shared with third parties." },
              { icon: Phone, title: "No Obligation", desc: "No payment or commitment required at any stage." },
              { icon: Heart, title: "Personal Follow-Up", desc: "A Family Care Specialist will call you personally within 24 hours." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-xl border border-brand-light-blue/60 p-5 text-center">
                <div className="w-10 h-10 rounded-xl bg-brand-light-blue/40 flex items-center justify-center mx-auto mb-3">
                  <Icon size={18} className="text-brand-royal" />
                </div>
                <p className="font-semibold text-brand-navy text-sm mb-1">{title}</p>
                <p className="text-brand-navy/50 text-xs leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
