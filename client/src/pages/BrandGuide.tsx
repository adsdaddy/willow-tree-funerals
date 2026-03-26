/*
 * WILLOW TREE FUNERALS — Brand Guide Page
 * Route: /brand-guide
 * 9 Sections: Hero, Logo, Colours, Typography, Photography, Brand Values, Voice & Tone, Locations, Application
 *
 * Design Philosophy: "Sacred Elegance"
 * Fonts: Playfair Display (headings) + Montserrat (body) + Libre Baskerville (quotes/scripture)
 * Colours: Navy #0B1F3A, Royal Blue #1B4B8A, Mid Blue #2E6DB4, Light Blue #D4E3F5, Ivory #FAF8F2, Gold #B8973A
 * Mood: Classy, elegant, Catholic-inspired, dignified — never mournful.
 */

import { useState } from "react";
import { COMPANY } from "../../../shared/company";

// ── Print / PDF export ───────────────────────────────────────────────────────
const PRINT_STYLES = `
  @media print {
    /* Hide interactive / nav chrome */
    nav, .no-print, .animate-bounce { display: none !important; }
    /* Remove shadows and transitions */
    * { box-shadow: none !important; transition: none !important; }
    /* Force colour backgrounds to print */
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    /* Page breaks */
    section { page-break-inside: avoid; }
    /* Ensure full width */
    body, html { width: 100%; margin: 0; padding: 0; }
    /* A4 page size */
    @page { size: A4; margin: 12mm 10mm; }
  }
`;

function injectPrintStyles() {
  const existing = document.getElementById("wtf-print-styles");
  if (!existing) {
    const style = document.createElement("style");
    style.id = "wtf-print-styles";
    style.textContent = PRINT_STYLES;
    document.head.appendChild(style);
  }
}

function handleExportPDF() {
  injectPrintStyles();
  // Small delay to let styles inject before print dialog opens
  setTimeout(() => window.print(), 120);
}

// ── Brand constants ──────────────────────────────────────────────────────────
const NAVY   = "#0B1F3A";
const ROYAL  = "#1B4B8A";
const MID    = "#2E6DB4";
const LIGHT  = "#D4E3F5";
const IVORY  = "#FAF8F2";
const GOLD   = "#B8973A";

// ── Colour Swatch Component ──────────────────────────────────────────────────
function ColourSwatch({
  name, hex, oklch, usage, textDark = false
}: {
  name: string; hex: string; oklch: string; usage: string; textDark?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };
  return (
    <div className="group cursor-pointer" onClick={copy}>
      <div
        className="h-32 w-full mb-3 flex items-end p-3 transition-transform group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
        <span className={`font-mono text-xs font-medium ${textDark ? "text-[#0B1F3A]" : "text-white"} opacity-80`}>
          {copied ? "Copied!" : hex}
        </span>
      </div>
      <p className="font-sans font-semibold text-sm" style={{ color: NAVY }}>{name}</p>
      <p className="font-mono text-xs mt-0.5" style={{ color: ROYAL }}>{oklch}</p>
      <p className="font-sans text-xs text-gray-500 mt-1">{usage}</p>
    </div>
  );
}

// ── Type Scale Row ───────────────────────────────────────────────────────────
function TypeRow({ label, size, weight, family, sample }: {
  label: string; size: string; weight: string; family: string; sample: string;
}) {
  return (
    <div className="flex items-baseline gap-6 py-5 last:border-0" style={{ borderBottom: `1px solid ${LIGHT}` }}>
      <div className="w-28 shrink-0">
        <span className="section-label text-[10px]">{label}</span>
        <p className="font-sans text-xs text-gray-400 mt-1">{size} · {weight}</p>
      </div>
      <p style={{ fontFamily: family, fontSize: size, fontWeight: weight, lineHeight: 1.2, color: NAVY }}
         className="tracking-tight">
        {sample}
      </p>
    </div>
  );
}

// ── Logo Card ────────────────────────────────────────────────────────────────
function LogoCard({ bg, src, label }: { bg: string; src: string; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="overflow-hidden flex items-center justify-center p-10"
        style={{ backgroundColor: bg, minHeight: 180 }}
      >
        <img src={src} alt={`Willow Tree Funerals logo — ${label}`}
             className="max-w-[260px] max-h-[110px] object-contain" />
      </div>
      <p className="font-sans text-xs text-gray-500 text-center">{label}</p>
    </div>
  );
}

// ── Main Brand Guide Page ────────────────────────────────────────────────────
export default function BrandGuide() {
  const navItems = [
    { id: "logo",        label: "Logo" },
    { id: "colours",     label: "Colours" },
    { id: "typography",  label: "Typography" },
    { id: "photography", label: "Photography" },
    { id: "values",      label: "Brand Values" },
    { id: "voice",       label: "Voice & Tone" },
    { id: "locations",   label: "Locations" },
    { id: "application", label: "Application" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const [exporting, setExporting] = useState(false);
  const onExportPDF = () => {
    setExporting(true);
    injectPrintStyles();
    setTimeout(() => {
      window.print();
      setExporting(false);
    }, 150);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: IVORY, fontFamily: "'Montserrat', system-ui, sans-serif" }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background image with deep royal blue overlay */}
        <div className="absolute inset-0">
          <img src={COMPANY.assets.heroBg} alt="Willow tree by a calm pond at sunrise"
               className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: `linear-gradient(to right, rgba(11,31,58,0.94) 45%, rgba(11,31,58,0.55) 100%)`
          }} />
        </div>

        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-8 py-6">
          <img src={COMPANY.assets.logoWhite} alt="Willow Tree Funerals"
               className="h-12 object-contain" />
          <div className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                      className="font-sans text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors no-print">
                {item.label}
              </button>
            ))}
            {/* PDF Export button */}
            <button
              onClick={onExportPDF}
              disabled={exporting}
              className="no-print flex items-center gap-2 font-sans text-xs tracking-widest uppercase transition-all"
              style={{
                padding: "0.5rem 1.25rem",
                background: GOLD,
                color: NAVY,
                fontWeight: 600,
                letterSpacing: "0.1em",
                border: "none",
                cursor: exporting ? "wait" : "pointer",
                opacity: exporting ? 0.7 : 1,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {exporting ? "Preparing…" : "Export PDF"}
            </button>
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-24">
          <p className="section-label mb-4" style={{ color: GOLD }}>Identity Manual · {COMPANY.year}</p>
          <h1 className="font-serif text-white tracking-tight leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 600 }}>
            Brand<br />Guide
          </h1>
          <p className="font-sans text-white/75 text-lg max-w-md mb-8" style={{ fontWeight: 400 }}>
            The visual identity and communication standards for {COMPANY.name} — Hurstville &amp; Macquarie Links, Sydney NSW.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Compassionate", "Dignified", "Faithful", "Elegant", "Personal"].map(v => (
              <span key={v} className="px-4 py-1.5 text-white/80 font-sans text-xs tracking-widest uppercase"
                    style={{ border: `1px solid rgba(184,151,58,0.5)` }}>
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Logo bottom-right watermark */}
        <div className="absolute bottom-8 right-8 z-10 opacity-15">
          <img src={COMPANY.assets.logoWhite} alt="" className="h-16 object-contain" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-sans text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,0.3)" }} />
        </div>
      </section>

      {/* ── SECTION 2: LOGO ─────────────────────────────────────────────── */}
      <section id="logo" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">02 — Logo</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ fontWeight: 600, color: NAVY }}>
            The Willow Tree Mark
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            The logo combines a detailed willow tree illustration with refined spaced capitals. The cross motif within the "O" reflects the brand's Christian faith foundation. The scripture reference "John 14:1-3" anchors the brand in hope and eternal comfort — a cornerstone of Catholic and Christian funeral tradition.
          </p>

          {/* Logo variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <LogoCard bg={IVORY}  src={COMPANY.assets.logoDark}  label="Primary — Dark on Ivory" />
            <LogoCard bg={NAVY}   src={COMPANY.assets.logoWhite} label="Reversed — White on Navy (Primary Dark)" />
            <LogoCard bg={ROYAL}  src={COMPANY.assets.logoWhite} label="On Royal Blue (Hero / Header)" />
            <LogoCard bg={LIGHT}  src={COMPANY.assets.logoDark}  label="On Light Blue (Section Backgrounds)" />
          </div>

          {/* Clear space rule */}
          <div className="mb-12 p-8" style={{ backgroundColor: LIGHT }}>
            <p className="section-label mb-4">Clear Space Rule</p>
            <p className="font-sans text-sm leading-relaxed" style={{ color: NAVY }}>
              Always maintain a minimum clear space equal to the height of the letter "W" in "WILLOW" around all sides of the logo. Never crowd the logo with other elements, text, or imagery.
            </p>
          </div>

          {/* Logo Don'ts */}
          <div className="border-l-4 pl-6" style={{ borderColor: GOLD }}>
            <p className="font-sans font-medium text-sm uppercase tracking-widest mb-4" style={{ color: GOLD }}>Logo Don'ts</p>
            <ul className="font-sans text-sm text-gray-600 space-y-2">
              <li>✗ Do not stretch or distort the logo proportions</li>
              <li>✗ Do not place the dark logo on dark photographic backgrounds without a light overlay</li>
              <li>✗ Do not use the logo smaller than 120px wide in digital contexts</li>
              <li>✗ Do not recreate or alter the tree illustration or typography</li>
              <li>✗ Do not remove the scripture reference "John 14:1-3" from the primary logo</li>
              <li>✗ Do not use the logo on clashing colours — only use on approved palette backgrounds</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: COLOURS ──────────────────────────────────────────── */}
      <section id="colours" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3" style={{ color: GOLD }}>03 — Colours</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            Colour Palette
          </h2>
          <p className="font-sans text-white/60 max-w-2xl mb-16 text-sm leading-relaxed">
            Inspired by the deep, reverent tones of Catholic tradition — the rich royal blue of vestments, the warmth of candlelight gold, and the purity of ivory. Click any swatch to copy the HEX value.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-4">
            <ColourSwatch name="Navy"       hex={NAVY}  oklch="oklch(0.18 0.04 250)" usage="Primary text, dark backgrounds, footer" />
            <ColourSwatch name="Royal Blue" hex={ROYAL} oklch="oklch(0.38 0.12 255)" usage="Primary brand colour, CTAs, headers" />
            <ColourSwatch name="Mid Blue"   hex={MID}   oklch="oklch(0.50 0.13 255)" usage="Hover states, secondary elements" />
            <ColourSwatch name="Light Blue" hex={LIGHT} oklch="oklch(0.90 0.04 255)" usage="Section backgrounds, card highlights" textDark />
            <ColourSwatch name="Ivory"      hex={IVORY} oklch="oklch(0.98 0.01 90)"  usage="Page background, card backgrounds" textDark />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <ColourSwatch name="Ecclesiastical Gold" hex={GOLD}    oklch="oklch(0.65 0.10 75)" usage="Premium accents, scripture, awards" />
            <ColourSwatch name="Silver"              hex="#C8C8C8" oklch="oklch(0.80 0.00 0)"  usage="Subtle borders, disabled states" textDark />
          </div>

          {/* Colour philosophy */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              {
                title: "The Blue of Faith",
                desc: "Royal Blue (#1B4B8A) is the soul of the brand — evoking the deep blue of the Virgin Mary's mantle, the dignity of Catholic vestments, and the trust of a steady presence in times of grief."
              },
              {
                title: "The Gold of Reverence",
                desc: "Ecclesiastical Gold (#B8973A) is used sparingly — for scripture references, premium touches, and moments of sacred emphasis. It echoes the gold of church altars and candlelight."
              },
              {
                title: "The Ivory of Peace",
                desc: "Ivory (#FAF8F2) replaces cold white throughout — it is warm, calm, and welcoming. It is the colour of a chapel wall bathed in morning light, never clinical or sterile."
              },
            ].map(rule => (
              <div key={rule.title} className="border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="font-sans font-medium text-white text-sm mb-2">{rule.title}</p>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TYPOGRAPHY ───────────────────────────────────────── */}
      <section id="typography" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">04 — Typography</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ fontWeight: 600, color: NAVY }}>
            Type System
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            Three typefaces work in harmony: Playfair Display brings warmth and heritage to headings; Montserrat provides clarity and modernity for body text and UI; Libre Baskerville adds gravitas to scripture and pull quotes — the voice of the sacred text.
          </p>

          {/* Font families */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {[
              {
                name: "Playfair Display",
                role: "Headings · H1 – H4",
                family: "'Playfair Display', Georgia, serif",
                sample: "Honouring Life",
                note: "Serif elegance. Weight 600 maximum. Used for all headings, hero text, and section titles. Conveys heritage and dignity."
              },
              {
                name: "Montserrat",
                role: "Body · Navigation · Buttons",
                family: "'Montserrat', system-ui, sans-serif",
                sample: "Compassionate care for every family",
                note: "Clean sans-serif. Weights 400 (body), 500 (buttons/labels), 600 (emphasis). Always uppercase for navigation and CTAs."
              },
              {
                name: "Libre Baskerville",
                role: "Quotes · Scripture · Accent",
                family: "'Libre Baskerville', Georgia, serif",
                sample: '"Let not your heart be troubled."',
                note: "Italic for pull quotes and scripture. Regular for formal accent text. Echoes the gravitas of sacred texts and liturgical writing."
              }
            ].map(font => (
              <div key={font.name} className="p-6" style={{ border: `1px solid ${LIGHT}` }}>
                <p className="section-label mb-1">{font.role}</p>
                <p className="font-sans font-medium text-sm mb-4" style={{ color: NAVY }}>{font.name}</p>
                <p className="mb-4 leading-snug" style={{ fontFamily: font.family, fontSize: "1.5rem", fontWeight: 600, color: NAVY }}>
                  {font.sample}
                </p>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">{font.note}</p>
              </div>
            ))}
          </div>

          {/* Type scale */}
          <div className="p-8" style={{ border: `1px solid ${LIGHT}` }}>
            <p className="section-label mb-6">Type Scale</p>
            <TypeRow label="Display"    size="4.5rem"    weight="600" family="'Playfair Display', serif" sample="Honouring Life" />
            <TypeRow label="H1"         size="3rem"      weight="600" family="'Playfair Display', serif" sample="Funeral Services in Hurstville" />
            <TypeRow label="H2"         size="2.25rem"   weight="600" family="'Playfair Display', serif" sample="We Are Here to Help" />
            <TypeRow label="H3"         size="1.5rem"    weight="600" family="'Playfair Display', serif" sample="Celebration of Life Services" />
            <TypeRow label="Body Large" size="1.125rem"  weight="400" family="'Montserrat', sans-serif"  sample="Compassionate care for families across Sydney." />
            <TypeRow label="Body"       size="0.9375rem" weight="400" family="'Montserrat', sans-serif"  sample="We journey with you through every step of the process." />
            <TypeRow label="Label / Nav" size="0.75rem"  weight="500" family="'Montserrat', sans-serif"  sample="ABOUT US · SERVICES · CONTACT" />
            <TypeRow label="Scripture"  size="1.125rem"  weight="400" family="'Libre Baskerville', serif" sample='"Do not let your hearts be troubled." — John 14:1' />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PHOTOGRAPHY ──────────────────────────────────────── */}
      <section id="photography" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">05 — Photography</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ fontWeight: 600, color: NAVY }}>
            Photography Style
          </h2>
          <p className="font-sans max-w-2xl mb-12 text-sm leading-relaxed" style={{ color: `${NAVY}b0` }}>
            Photography should feel hopeful, warm, and dignified — never clinical or mournful. Soft natural light, genuine human connection, sacred spaces, and the beauty of nature are the core visual themes.
          </p>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div className="col-span-2 row-span-2 overflow-hidden" style={{ aspectRatio: "4/3" }}>
              <img src={COMPANY.assets.brucePodium} alt="Bruce Missen conducting a funeral service"
                   className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.grandmotherGranddaughter} alt="Grandmother and granddaughter sharing a moment"
                   className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.urnGreenery} alt="Cremation urn with greenery"
                   className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.chapelInterior} alt="Modern funeral chapel interior"
                   className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.churchService} alt="Church funeral service"
                   className="w-full h-full object-cover" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.cremationUrn} alt="Cremation urn with red roses"
                   className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Photography rules */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-sans font-medium text-sm mb-3 uppercase tracking-widest" style={{ color: NAVY }}>✓ Do Use</p>
              <ul className="font-sans text-sm space-y-2" style={{ color: `${NAVY}b0` }}>
                <li>Soft, diffused natural light — golden hour preferred</li>
                <li>Genuine human connection — holding hands, supportive gestures</li>
                <li>Sacred spaces — churches, chapels, memorial parks</li>
                <li>Nature imagery — willow trees, calm water, soft florals</li>
                <li>Dignified ceremony photography — respectful and composed</li>
                <li>Warm tonal palette — ivories, blues, and soft golds</li>
              </ul>
            </div>
            <div>
              <p className="font-sans font-medium text-sm mb-3 uppercase tracking-widest" style={{ color: GOLD }}>✗ Avoid</p>
              <ul className="font-sans text-sm space-y-2" style={{ color: `${NAVY}b0` }}>
                <li>Harsh, clinical, or overly dark imagery</li>
                <li>Artificially posed or generic stock photography</li>
                <li>Images that feel mournful or distressing</li>
                <li>Busy, cluttered backgrounds that distract from the subject</li>
                <li>Oversaturated or heavily filtered photography</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 6: BRAND VALUES ─────────────────────────────────────── */}
      <section id="values" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">06 — Brand Values</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ fontWeight: 600, color: NAVY }}>
            What We Stand For
          </h2>

          {/* Scripture pull quote */}
          <blockquote className="border-l-4 pl-6 my-12" style={{ borderColor: GOLD }}>
            <p className="font-baskerville italic text-xl md:text-2xl leading-relaxed" style={{ color: NAVY }}>
              "Do not let your hearts be troubled. You believe in God; believe also in me. My Father's house has many rooms... I am going there to prepare a place for you."
            </p>
            <cite className="font-sans text-xs tracking-widest uppercase mt-3 block not-italic" style={{ color: GOLD }}>
              — John 14:1-3
            </cite>
          </blockquote>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {[
              {
                number: "01",
                title: "Compassionate Care",
                desc: "We listen, care for, and guide each family with unwavering empathy. Every family deserves to feel heard, supported, and respected throughout their journey."
              },
              {
                number: "02",
                title: "Faith & Dignity",
                desc: "Rooted in Christian faith, we honour Catholic, Protestant, and all faith traditions with reverence. We understand the sacred nature of farewell and treat every service as an act of worship."
              },
              {
                number: "03",
                title: "Meticulous Attention to Detail",
                desc: "We believe the most meaningful memorial services are built on the small, wonderful details that made a loved one truly special. Nothing is too small to matter."
              },
              {
                number: "04",
                title: "Community Commitment",
                desc: "We actively give back — supporting International Women's Day, Australia's Biggest Morning Tea, and providing specific care for families experiencing miscarriage. We are part of this community."
              },
            ].map(value => (
              <div key={value.number} className="flex gap-6">
                <span className="font-serif text-5xl leading-none shrink-0" style={{ fontWeight: 600, color: LIGHT }}>
                  {value.number}
                </span>
                <div>
                  <h3 className="font-serif text-xl mb-2" style={{ fontWeight: 600, color: NAVY }}>
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Director card */}
          <div className="flex flex-col md:flex-row gap-8 items-center p-8" style={{ backgroundColor: NAVY }}>
            <img src={COMPANY.assets.bruceHeadshot} alt="Bruce Missen — Funeral Director & Owner"
                 className="w-32 h-32 rounded-full object-cover object-top shrink-0"
                 style={{ border: `2px solid ${GOLD}` }} />
            <div>
              <p className="section-label mb-2" style={{ color: GOLD }}>Funeral Director &amp; Owner</p>
              <h3 className="font-serif text-white text-2xl mb-3" style={{ fontWeight: 600 }}>
                {COMPANY.director}
              </h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                Bruce Missen founded Willow Tree Funerals with a deep commitment to serving families across Sydney's St George, Sutherland Shire, and South West regions. His approach is personal, compassionate, and guided by faith — ensuring every farewell is as unique as the life it honours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: VOICE & TONE ─────────────────────────────────────── */}
      <section id="voice" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: NAVY }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3" style={{ color: GOLD }}>07 — Voice &amp; Tone</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            How We Speak
          </h2>
          <p className="font-sans text-white/60 max-w-2xl mb-16 text-sm leading-relaxed">
            We speak as a trusted guide and a comforting friend. Our language is warm, clear, and uplifting — focusing on the celebration of life and the healing journey, not the logistics of death.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { trait: "Empathetic",    desc: "We acknowledge pain without dwelling in it. We meet families where they are." },
              { trait: "Professional",  desc: "We are expert and trustworthy. Our language is clear, never clinical or cold." },
              { trait: "Reassuring",    desc: "We guide families through uncertainty with calm confidence and clarity." },
              { trait: "Uplifting",     desc: "We focus on celebrating life, creating meaning, and finding hope in farewell." },
            ].map(t => (
              <div key={t.trait} className="border-t pt-6" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="font-serif text-lg mb-2" style={{ fontWeight: 600, color: GOLD }}>{t.trait}</p>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Do / Don't examples */}
          <div className="space-y-4">
            <p className="section-label mb-6" style={{ color: GOLD }}>Language Examples</p>
            {[
              {
                dont: "We process the deceased efficiently.",
                do:   "We bring your loved one into our care with the utmost dignity and respect."
              },
              {
                dont: "Cheap funeral packages available.",
                do:   "Beautiful farewells tailored to your family's budget."
              },
              {
                dont: "Body collection and preparation services.",
                do:   "We gently bring your loved one into our care and prepare them with reverence."
              },
              {
                dont: "Death notice submission.",
                do:   "Share the news of your loved one's passing with the community they touched."
              },
            ].map((ex, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-4">
                <div className="p-4" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                  <span className="font-sans text-[10px] uppercase tracking-widest block mb-2" style={{ color: GOLD }}>✗ Avoid</span>
                  <p className="font-sans text-white/50 text-sm italic">{ex.dont}</p>
                </div>
                <div className="p-4" style={{ backgroundColor: `${ROYAL}22`, border: `1px solid ${ROYAL}55` }}>
                  <span className="font-sans text-[10px] uppercase tracking-widest block mb-2" style={{ color: MID }}>✓ Use Instead</span>
                  <p className="font-sans text-white text-sm">{ex.do}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: LOCATIONS ────────────────────────────────────────── */}
      <section id="locations" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">08 — Locations &amp; Market Strategy</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ fontWeight: 600, color: NAVY }}>
            Two Locations. One Standard of Care.
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            Willow Tree Funerals operates from two strategic locations — serving the established St George community from Hurstville, and pioneering a premium presence in Sydney's rapidly growing South West corridor from Macquarie Links.
          </p>

          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Location 1 */}
            <div className="p-8" style={{ backgroundColor: NAVY }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: GOLD }}>Location 01</p>
                  <h3 className="font-serif text-white text-2xl" style={{ fontWeight: 600 }}>Hurstville</h3>
                  <p className="font-sans text-white/50 text-xs mt-1">118 Durham Street, Hurstville NSW 2220</p>
                </div>
                <span className="font-sans text-xs px-2 py-1 text-white/60" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  Est. 2018
                </span>
              </div>
              <p className="font-sans text-white/65 text-sm leading-relaxed mb-6">
                Our founding location in the heart of the St George area. Serving Hurstville, Kogarah, Rockdale, Bexley, Penshurst, Mortdale, and the wider Sutherland Shire. A trusted name in the community for over six years.
              </p>
              <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="font-sans text-xs text-white/40 uppercase tracking-widest mb-2">Service Area</p>
                <p className="font-sans text-white/60 text-xs">St George · Sutherland Shire · Inner South Sydney</p>
              </div>
            </div>

            {/* Location 2 */}
            <div className="p-8" style={{ backgroundColor: ROYAL }}>
              <div className="flex items-start justify-between mb-6">
                <div>
                  <p className="font-sans text-xs tracking-widest uppercase mb-1" style={{ color: GOLD }}>Location 02</p>
                  <h3 className="font-serif text-white text-2xl" style={{ fontWeight: 600 }}>Macquarie Links</h3>
                  <p className="font-sans text-white/50 text-xs mt-1">Macquarie Links, NSW 2565</p>
                </div>
                <span className="font-sans text-xs px-2 py-1 text-white/60" style={{ border: "1px solid rgba(255,255,255,0.2)" }}>
                  New
                </span>
              </div>
              <p className="font-sans text-white/80 text-sm leading-relaxed mb-6">
                Strategically positioned between Campbelltown and Liverpool — the only premium, faith-based funeral home in the area. Serving families across South West Sydney and the rapidly growing Macarthur region, with direct access to the new MacArthur Memorial Park at Varroville.
              </p>
              <div className="border-t pt-4" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <p className="font-sans text-xs text-white/50 uppercase tracking-widest mb-2">Service Area</p>
                <p className="font-sans text-white/70 text-xs">Campbelltown · Liverpool · Ingleburn · Narellan · Gregory Hills · Varroville</p>
              </div>
            </div>
          </div>

          {/* MacArthur Memorial Park callout */}
          <div className="p-8 mb-12" style={{ backgroundColor: LIGHT }}>
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="shrink-0">
                <div className="w-16 h-16 flex items-center justify-center" style={{ backgroundColor: ROYAL }}>
                  <span className="text-white text-2xl">✦</span>
                </div>
              </div>
              <div>
                <p className="section-label mb-2">Strategic Opportunity</p>
                <h3 className="font-serif text-xl mb-3" style={{ fontWeight: 600, color: NAVY }}>
                  MacArthur Memorial Park — Sydney's Newest Cemetery
                </h3>
                <p className="font-sans text-sm leading-relaxed text-gray-600">
                  MacArthur Memorial Park (166-176 St Andrews Rd, Varroville NSW 2566) is Sydney's first new greenfield Crown cemetery since the 1920s — 113 hectares, multi-denominational, with an architecturally designed chapel and over 136,000 burial plots. Now open. Willow Tree Funerals at Macquarie Links is positioned as the closest premium funeral director to this landmark cemetery, making us the natural first choice for South West Sydney families.
                </p>
              </div>
            </div>
          </div>

          {/* South West SEO suburb grid */}
          <div>
            <p className="section-label mb-6">South West Sydney Service Areas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px" style={{ backgroundColor: LIGHT }}>
              {[
                "Campbelltown", "Liverpool", "Ingleburn", "Macquarie Links",
                "Narellan", "Gregory Hills", "Varroville", "Leumeah",
                "Minto", "Casula", "Prestons", "All South West Sydney"
              ].map(suburb => (
                <div key={suburb} className="px-4 py-3 font-sans text-xs font-medium" style={{ backgroundColor: IVORY, color: NAVY }}>
                  {suburb}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 9: APPLICATION ──────────────────────────────────────── */}
      <section id="application" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">09 — Application</p>
          <h2 className="font-serif text-4xl md:text-5xl mb-4" style={{ fontWeight: 600, color: NAVY }}>
            Design in Action
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            The brand system applied across digital touchpoints — buttons, form elements, cards, and website sections.
          </p>

          {/* Button system */}
          <div className="mb-16">
            <p className="section-label mb-6">Button System</p>
            <div className="flex flex-wrap gap-4 items-center p-8 mb-2" style={{ backgroundColor: IVORY, border: `1px solid ${LIGHT}` }}>
              <button className="btn-primary">Get in Touch</button>
              <button className="btn-outline">View Services</button>
              <button className="btn-royal">Call 24/7</button>
              <button className="btn-primary opacity-40 cursor-not-allowed">Disabled State</button>
            </div>
            <div className="flex flex-wrap gap-4 items-center p-8" style={{ backgroundColor: NAVY }}>
              <button className="btn-royal">Get in Touch</button>
              <button style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0.75rem 2rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
                transition: "all 0.3s ease", background: "transparent",
                color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)"
              }}>
                View Services
              </button>
              <button style={{
                display: "inline-flex", alignItems: "center", justifyContent: "center",
                padding: "0.75rem 2rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
                transition: "all 0.3s ease", background: "transparent",
                color: GOLD, border: `1px solid ${GOLD}`
              }}>
                Scripture Reference
              </button>
            </div>
          </div>

          {/* Service card mockup */}
          <div className="mb-16">
            <p className="section-label mb-6">Service Card</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Traditional Funeral",    desc: "A full funeral service with burial or cremation, conducted with dignity and personalised to honour your loved one's life.", icon: "✦" },
                { title: "Catholic Funeral Mass",  desc: "A reverent Requiem Mass coordinated with your parish priest, honouring the Catholic tradition of commending the soul to God.", icon: "✝" },
                { title: "Celebration of Life",    desc: "A personalised, uplifting service that focuses on the joy and legacy of a life well lived — in any venue, any style.", icon: "✦" },
              ].map(card => (
                <div key={card.title} className="p-6 group transition-colors" style={{ border: `1px solid ${LIGHT}`, backgroundColor: IVORY }}>
                  <span className="text-2xl block mb-4" style={{ color: ROYAL }}>{card.icon}</span>
                  <h3 className="font-serif text-lg mb-3" style={{ fontWeight: 600, color: NAVY }}>
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                  <span className="section-label">Learn More →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design tokens reference */}
          <div className="p-8" style={{ backgroundColor: NAVY }}>
            <p className="section-label mb-6" style={{ color: GOLD }}>Design Token Reference</p>
            <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
              {[
                ["--color-brand-navy",       "oklch(0.18 0.04 250)", NAVY],
                ["--color-brand-royal",      "oklch(0.38 0.12 255)", ROYAL],
                ["--color-brand-mid-blue",   "oklch(0.50 0.13 255)", MID],
                ["--color-brand-light-blue", "oklch(0.90 0.04 255)", LIGHT],
                ["--color-brand-ivory",      "oklch(0.98 0.01 90)",  IVORY],
                ["--color-brand-gold",       "oklch(0.65 0.10 75)",  GOLD],
                ["--font-family-serif",      "'Playfair Display', serif",      "Headings"],
                ["--font-family-sans",       "'Montserrat', sans-serif",       "Body / UI"],
                ["--font-family-baskerville","'Libre Baskerville', serif",     "Quotes / Scripture"],
              ].map(([token, value, note]) => (
                <div key={token} className="flex gap-3 pb-2" style={{ borderBottom: "1px solid rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.6)" }}>
                  <span className="shrink-0" style={{ color: MID }}>{token}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>{value}</span>
                  <span className="ml-auto shrink-0" style={{ color: "rgba(255,255,255,0.3)" }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-8 md:px-16" style={{ borderTop: `1px solid ${LIGHT}`, backgroundColor: IVORY }}>
        {/* Mobile PDF export button */}
        <div className="flex justify-center mb-8 md:hidden no-print">
          <button
            onClick={onExportPDF}
            className="flex items-center gap-2 font-sans text-xs tracking-widest uppercase"
            style={{
              padding: "0.75rem 2rem",
              background: GOLD,
              color: NAVY,
              fontWeight: 600,
              letterSpacing: "0.1em",
              border: "none",
              cursor: "pointer",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export PDF
          </button>
        </div>
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={COMPANY.assets.logoDark} alt="Willow Tree Funerals" className="h-10 object-contain" />
          <p className="font-sans text-xs text-gray-400 text-center">
            © {COMPANY.year} {COMPANY.name} · Brand Guide · Identity Manual
          </p>
          <p className="font-baskerville italic text-sm" style={{ color: GOLD }}>{COMPANY.scripture}</p>
        </div>
      </footer>

    </div>
  );
}
