/*
 * WILLOW TREE FUNERALS  -  Brand Guide Page
 * Route: /brand-guide
 * 9 Sections: Hero, Logo, Colours, Typography, Photography, Brand Values, Voice & Tone, Locations, Application
 *
 * Design Philosophy: "Sacred Elegance"
 * Fonts: Playfair Display (headings, max weight 600) + Montserrat (body/nav/buttons) + Libre Baskerville (quotes/scripture)
 * Colours: Navy #0B1F3A · Royal Blue #1B4B8A · Mid Blue #2E6DB4 · Light Blue #D4E3F5 · Ivory #FAF8F2 · Gold #B8973A
 * Mood: Classy, elegant, Catholic-inspired, dignified  -  never mournful.
 *
 * Skill compliance:
 * - All heading weights ≤ 600 (font-semibold)
 * - Hero: text top-left, logo absolute bottom-right
 * - Section spacing: py-36 md:py-44 (editorial whitespace)
 * - Alternating left/right layouts between sections
 * - Text on dark backgrounds: minimum white/75
 * - Phone mockup: iPhone 14 Pro proportions with Dynamic Island
 * - PDF: Puppeteer script at scripts/export-brand-guide-pdf.mjs
 */

import { useState } from "react";
import { COMPANY } from "../../../shared/company";

// ── Print / PDF export (browser fallback) ───────────────────────────────────
const PRINT_STYLES = `
  @media print {
    nav, .no-print, .animate-bounce { display: none !important; }
    * { box-shadow: none !important; transition: none !important; }
    * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
    section { page-break-inside: avoid; }
    body, html { width: 100%; margin: 0; padding: 0; }
    @page { size: A4; margin: 12mm 10mm; }
  }
`;

function injectPrintStyles() {
  if (!document.getElementById("wtf-print-styles")) {
    const s = document.createElement("style");
    s.id = "wtf-print-styles";
    s.textContent = PRINT_STYLES;
    document.head.appendChild(s);
  }
}

// ── Brand colour constants ───────────────────────────────────────────────────
const NAVY   = "#0B1F3A";
const ROYAL  = "#1B4B8A";
const MID    = "#2E6DB4";
const LIGHT  = "#D4E3F5";
const IVORY  = "#FAF8F2";
const GOLD   = "#B8973A";

// ── Colour Swatch (click-to-copy) ────────────────────────────────────────────
function ColourSwatch({ name, hex, oklch, usage, textDark = false }: {
  name: string; hex: string; oklch: string; usage: string; textDark?: boolean;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="group cursor-pointer" onClick={() => {
      navigator.clipboard.writeText(hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }}>
      <div className="h-36 w-full mb-4 flex items-end p-4 transition-transform group-hover:scale-[1.02]"
           style={{ backgroundColor: hex }}>
        <span className={`font-mono text-xs font-medium ${textDark ? "text-[#0B1F3A]/70" : "text-white/80"}`}>
          {copied ? "✓ Copied!" : hex}
        </span>
      </div>
      <p className="font-sans text-sm font-semibold mb-0.5" style={{ color: NAVY }}>{name}</p>
      <p className="font-mono text-[11px] mb-1" style={{ color: ROYAL }}>{oklch}</p>
      <p className="font-sans text-xs text-gray-500 leading-relaxed">{usage}</p>
    </div>
  );
}

// ── Logo Card ────────────────────────────────────────────────────────────────
function LogoCard({ bg, src, label }: { bg: string; src: string; label: string }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="overflow-hidden flex items-center justify-center p-12"
           style={{ backgroundColor: bg, minHeight: 200, maxWidth: "100%" }}>
        <img src={src} alt={`Willow Tree Funerals logo  -  ${label}`}
             className="object-contain" style={{ maxWidth: 260, maxHeight: 120 }} />
      </div>
      <p className="font-sans text-xs text-gray-500 text-center tracking-wide">{label}</p>
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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });

  const [exporting, setExporting] = useState(false);
  const onExportPDF = () => {
    setExporting(true);
    injectPrintStyles();
    setTimeout(() => { window.print(); setExporting(false); }, 150);
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: IVORY }}>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 1  -  HERO
          Layout: text top-left, logo absolute bottom-right (skill spec)
      ══════════════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background */}
        <div className="absolute inset-0">
          <img src={COMPANY.assets.heroBg} alt="Willow tree by a calm pond at sunrise"
               className="w-full h-full object-cover" />
          <div className="absolute inset-0"
               style={{ background: "linear-gradient(to right, rgba(11,31,58,0.92) 50%, rgba(11,31,58,0.45) 100%)" }} />
        </div>

        {/* Nav */}
        <nav className="relative z-20 flex items-center justify-between px-8 md:px-16 py-7 no-print">
          <img src={COMPANY.assets.logoWhite} alt="Willow Tree Funerals" className="h-11 object-contain" />
          <div className="hidden md:flex items-center gap-7">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                      className="font-sans text-[11px] tracking-[0.18em] uppercase text-white/75 hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
            <button onClick={onExportPDF} disabled={exporting}
                    className="flex items-center gap-2 font-sans text-[11px] tracking-[0.14em] uppercase transition-all"
                    style={{ padding: "0.5rem 1.25rem", background: GOLD, color: NAVY, fontWeight: 600,
                             cursor: exporting ? "wait" : "pointer", opacity: exporting ? 0.7 : 1 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                   strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
              </svg>
              {exporting ? "Preparing…" : "Export PDF"}
            </button>
          </div>
        </nav>

        {/* Hero text  -  top-left */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-32 pt-8">
          <p className="font-sans text-[11px] tracking-[0.22em] uppercase mb-5"
             style={{ color: GOLD }}>Identity Manual · {COMPANY.year}</p>
          <h1 className="font-serif text-white tracking-tight leading-[0.95] mb-8"
              style={{ fontSize: "clamp(3.5rem, 9vw, 8rem)", fontWeight: 600 }}>
            Brand<br />Guide
          </h1>
          <p className="font-sans text-white/80 text-lg max-w-lg mb-10 leading-relaxed" style={{ fontWeight: 400 }}>
            The visual identity and communication standards for {COMPANY.name}  - <br />
            Hurstville &amp; Macquarie Links, Sydney NSW.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Compassionate", "Dignified", "Faithful", "Elegant", "Personal"].map(v => (
              <span key={v} className="px-4 py-1.5 font-sans text-[11px] tracking-[0.18em] uppercase text-white/80"
                    style={{ border: `1px solid rgba(184,151,58,0.45)` }}>{v}</span>
            ))}
          </div>
        </div>

        {/* Logo  -  absolute bottom-right (skill spec: never overlapping text) */}
        <div className="absolute bottom-10 right-10 z-10 opacity-20 hidden md:block">
          <img src={COMPANY.assets.logoWhite} alt="" className="h-20 object-contain" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce no-print">
          <span className="font-sans text-white/60 text-[10px] tracking-[0.22em] uppercase">Scroll</span>
          <div className="w-px h-8" style={{ backgroundColor: "rgba(255,255,255,0.25)" }} />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 2  -  LOGO
          Layout: text left, logo grid right (alternating: odd = text-left)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="logo" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-6xl mx-auto">

          {/* Asymmetric intro: label + heading left, description right */}
          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div>
              <p className="section-label mb-4">02  -  Logo</p>
              <h2 className="font-serif leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: NAVY }}>
                The Willow<br />Tree Mark
              </h2>
            </div>
            <div>
              <p className="font-sans text-gray-600 text-sm leading-[1.9]">
                The logo combines a detailed willow tree illustration with refined spaced capitals. The cross motif within the "O" reflects the brand's Christian faith foundation. The scripture reference "John 14:1-3" anchors the brand in hope and eternal comfort  -  a cornerstone of Catholic and Christian funeral tradition.
              </p>
              <div className="mt-8 pt-6" style={{ borderTop: `1px solid ${LIGHT}` }}>
                <p className="font-baskerville italic text-sm" style={{ color: GOLD }}>
                  "I am going there to prepare a place for you."  -  John 14:2
                </p>
              </div>
            </div>
          </div>

          {/* Logo variants grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-20">
            <LogoCard bg={IVORY}  src={COMPANY.assets.logoDark}  label="Primary  -  Dark on Ivory" />
            <LogoCard bg={NAVY}   src={COMPANY.assets.logoWhite} label="Reversed  -  White on Navy" />
            <LogoCard bg={ROYAL}  src={COMPANY.assets.logoWhite} label="On Royal Blue (Hero / Header)" />
            <LogoCard bg={LIGHT}  src={COMPANY.assets.logoDark}  label="On Light Blue (Section Backgrounds)" />
          </div>

          {/* Clear space + Don'ts: two-column */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8" style={{ backgroundColor: LIGHT }}>
              <p className="section-label mb-4">Clear Space Rule</p>
              <p className="font-sans text-sm leading-[1.9]" style={{ color: NAVY }}>
                Always maintain a minimum clear space equal to the height of the letter "W" in "WILLOW" around all sides of the logo. Never crowd the logo with other elements, text, or imagery.
              </p>
            </div>
            <div className="p-8" style={{ border: `1px solid ${LIGHT}` }}>
              <p className="font-sans font-semibold text-xs uppercase tracking-[0.18em] mb-4" style={{ color: GOLD }}>
                Logo Don'ts
              </p>
              <ul className="font-sans text-sm text-gray-600 space-y-2.5 leading-relaxed">
                <li className="flex gap-3"><span style={{ color: GOLD }}>✗</span> Do not stretch or distort the logo proportions</li>
                <li className="flex gap-3"><span style={{ color: GOLD }}>✗</span> Do not place the dark logo on dark photographic backgrounds</li>
                <li className="flex gap-3"><span style={{ color: GOLD }}>✗</span> Do not use the logo smaller than 120px wide in digital contexts</li>
                <li className="flex gap-3"><span style={{ color: GOLD }}>✗</span> Do not recreate or alter the tree illustration or typography</li>
                <li className="flex gap-3"><span style={{ color: GOLD }}>✗</span> Do not remove the scripture reference "John 14:1-3"</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 3  -  COLOURS
          Layout: heading right, swatches full-width below (even = reversed)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="colours" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto">

          {/* Asymmetric intro: description left, heading right */}
          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div>
              <p className="font-sans text-sm leading-[1.9] text-white/75">
                Inspired by the deep, reverent tones of Catholic tradition  -  the rich royal blue of vestments, the warmth of candlelight gold, and the purity of ivory. Click any swatch to copy the HEX value.
              </p>
            </div>
            <div className="md:text-right">
              <p className="section-label mb-4" style={{ color: GOLD }}>03  -  Colours</p>
              <h2 className="font-serif text-white leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600 }}>
                Colour<br />Palette
              </h2>
            </div>
          </div>

          {/* Swatches */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 mb-5">
            <ColourSwatch name="Navy"       hex={NAVY}  oklch="oklch(0.18 0.04 250)" usage="Primary text, dark backgrounds, footer" />
            <ColourSwatch name="Royal Blue" hex={ROYAL} oklch="oklch(0.38 0.12 255)" usage="Primary brand colour, CTAs, headers" />
            <ColourSwatch name="Mid Blue"   hex={MID}   oklch="oklch(0.50 0.13 255)" usage="Hover states, secondary elements" />
            <ColourSwatch name="Light Blue" hex={LIGHT} oklch="oklch(0.90 0.04 255)" usage="Section backgrounds, card highlights" textDark />
            <ColourSwatch name="Ivory"      hex={IVORY} oklch="oklch(0.98 0.01 90)"  usage="Page background, card backgrounds" textDark />
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-24">
            <ColourSwatch name="Ecclesiastical Gold" hex={GOLD}    oklch="oklch(0.65 0.10 75)" usage="Premium accents, scripture, awards" />
            <ColourSwatch name="Silver"              hex="#C8C8C8" oklch="oklch(0.80 0.00 0)"  usage="Subtle borders, disabled states" textDark />
          </div>

          {/* Colour philosophy  -  three columns */}
          <div className="grid md:grid-cols-3 gap-10">
            {[
              {
                title: "The Blue of Faith",
                desc: "Royal Blue (#1B4B8A) is the soul of the brand  -  evoking the deep blue of the Virgin Mary's mantle, the dignity of Catholic vestments, and the trust of a steady presence in times of grief."
              },
              {
                title: "The Gold of Reverence",
                desc: "Ecclesiastical Gold (#B8973A) is used sparingly  -  for scripture references, premium touches, and moments of sacred emphasis. It echoes the gold of church altars and candlelight."
              },
              {
                title: "The Ivory of Peace",
                desc: "Ivory (#FAF8F2) replaces cold white throughout  -  it is warm, calm, and welcoming. It is the colour of a chapel wall bathed in morning light, never clinical or sterile."
              },
            ].map(rule => (
              <div key={rule.title} className="border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <p className="font-sans font-semibold text-white text-sm mb-3">{rule.title}</p>
                <p className="font-sans text-white/75 text-sm leading-[1.9]">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 4  -  TYPOGRAPHY
          Layout: large specimen left, details right (odd = text-left)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="typography" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div>
              <p className="section-label mb-4">04  -  Typography</p>
              <h2 className="font-serif leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: NAVY }}>
                Type<br />System
              </h2>
            </div>
            <div>
              <p className="font-sans text-gray-600 text-sm leading-[1.9]">
                Three typefaces work in harmony: Playfair Display brings warmth and heritage to headings; Montserrat provides clarity and modernity for body text and UI; Libre Baskerville adds gravitas to scripture and pull quotes  -  the voice of the sacred text.
              </p>
              <p className="font-sans text-xs mt-4 tracking-widest uppercase" style={{ color: ROYAL }}>
                Max heading weight: 600 (SemiBold)  -  never bold or heavier
              </p>
            </div>
          </div>

          {/* Three font specimens  -  large editorial display */}
          <div className="space-y-0 mb-24">
            {[
              {
                name: "Playfair Display",
                role: "Headings · H1 – H4",
                family: "'Playfair Display', Georgia, serif",
                specimen: "Honouring Life",
                specimenSize: "clamp(2.5rem, 6vw, 5rem)",
                note: "Serif elegance. Weight 600 maximum. Used for all headings, hero text, and section titles. Conveys heritage and dignity.",
                bg: IVORY,
              },
              {
                name: "Montserrat",
                role: "Body · Navigation · Buttons",
                family: "'Montserrat', system-ui, sans-serif",
                specimen: "Compassionate care for every family",
                specimenSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
                note: "Clean sans-serif. Weights 400 (body), 500 (buttons/labels), 600 (emphasis). Always uppercase for navigation and CTAs.",
                bg: LIGHT,
              },
              {
                name: "Libre Baskerville",
                role: "Quotes · Scripture · Accent",
                family: "'Libre Baskerville', Georgia, serif",
                specimen: '"Let not your heart be troubled."',
                specimenSize: "clamp(1.25rem, 3vw, 2.25rem)",
                note: "Italic for pull quotes and scripture. Regular for formal accent text. Echoes the gravitas of sacred texts and liturgical writing.",
                bg: NAVY,
              },
            ].map((font, i) => (
              <div key={font.name}
                   className="grid md:grid-cols-3 items-center"
                   style={{ backgroundColor: font.bg, padding: "3rem 2.5rem" }}>
                {/* Specimen  -  2 cols */}
                <div className="md:col-span-2 pr-0 md:pr-12 mb-6 md:mb-0">
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase mb-4"
                     style={{ color: i === 2 ? GOLD : ROYAL }}>
                    {font.role}
                  </p>
                  <p className="leading-tight tracking-tight"
                     style={{ fontFamily: font.family, fontSize: font.specimenSize, fontWeight: 600,
                              color: i === 2 ? "rgba(255,255,255,0.9)" : NAVY, fontStyle: i === 2 ? "italic" : "normal" }}>
                    {font.specimen}
                  </p>
                </div>
                {/* Details */}
                <div className="border-l pl-8" style={{ borderColor: i === 2 ? "rgba(255,255,255,0.12)" : LIGHT }}>
                  <p className="font-sans font-semibold text-sm mb-2"
                     style={{ color: i === 2 ? "rgba(255,255,255,0.9)" : NAVY }}>{font.name}</p>
                  <p className="font-sans text-xs leading-[1.8]"
                     style={{ color: i === 2 ? "rgba(255,255,255,0.75)" : "#6b7280" }}>{font.note}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Type scale */}
          <div className="p-10" style={{ border: `1px solid ${LIGHT}` }}>
            <p className="section-label mb-8">Type Scale</p>
            {[
              { label: "Display",     size: "4.5rem",    weight: "600", family: "'Playfair Display', serif",    sample: "Honouring Life" },
              { label: "H1",          size: "3rem",      weight: "600", family: "'Playfair Display', serif",    sample: "Funeral Services in Hurstville" },
              { label: "H2",          size: "2.25rem",   weight: "600", family: "'Playfair Display', serif",    sample: "We Are Here to Help" },
              { label: "H3",          size: "1.5rem",    weight: "600", family: "'Playfair Display', serif",    sample: "Celebration of Life Services" },
              { label: "Body Large",  size: "1.125rem",  weight: "400", family: "'Montserrat', sans-serif",     sample: "Compassionate care for families across Sydney." },
              { label: "Body",        size: "0.9375rem", weight: "400", family: "'Montserrat', sans-serif",     sample: "We journey with you through every step of the process." },
              { label: "Label / Nav", size: "0.75rem",   weight: "500", family: "'Montserrat', sans-serif",     sample: "ABOUT US · SERVICES · CONTACT" },
              { label: "Scripture",   size: "1.125rem",  weight: "400", family: "'Libre Baskerville', serif",   sample: '"Do not let your hearts be troubled."  -  John 14:1' },
            ].map(row => (
              <div key={row.label} className="flex items-baseline gap-6 py-5 last:border-0"
                   style={{ borderBottom: `1px solid ${LIGHT}` }}>
                <div className="w-28 shrink-0">
                  <span className="section-label text-[10px]">{row.label}</span>
                  <p className="font-sans text-[11px] text-gray-400 mt-1">{row.size} · {row.weight}</p>
                </div>
                <p style={{ fontFamily: row.family, fontSize: row.size, fontWeight: row.weight,
                            lineHeight: 1.2, color: NAVY }} className="tracking-tight">
                  {row.sample}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 5  -  PHOTOGRAPHY
          Layout: description right, grid left (even = reversed)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="photography" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div className="md:order-2">
              <p className="section-label mb-4">05  -  Photography</p>
              <h2 className="font-serif leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: NAVY }}>
                Photography<br />Style
              </h2>
            </div>
            <div className="md:order-1">
              <p className="font-sans text-sm leading-[1.9]" style={{ color: `${NAVY}cc` }}>
                Photography should feel hopeful, warm, and dignified  -  never clinical or mournful. Soft natural light, genuine human connection, sacred spaces, and the beauty of nature are the core visual themes.
              </p>
            </div>
          </div>

          {/* Photo grid  -  asymmetric masonry */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-20">
            <div className="col-span-2 overflow-hidden" style={{ aspectRatio: "16/9" }}>
              <img src={COMPANY.assets.brucePodium} alt="Bruce Missen conducting a funeral service"
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "3/4" }}>
              <img src={COMPANY.assets.bruceHeadshot} alt="Bruce Missen  -  Funeral Director"
                   className="w-full h-full object-cover object-top transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.grandmotherGranddaughter} alt="Grandmother and granddaughter"
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.churchService} alt="Church funeral service"
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="overflow-hidden" style={{ aspectRatio: "1/1" }}>
              <img src={COMPANY.assets.cremationUrn} alt="Cremation urn with red roses"
                   className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" />
            </div>
          </div>

          {/* Photography rules */}
          <div className="grid md:grid-cols-2 gap-10">
            <div className="p-8" style={{ backgroundColor: IVORY }}>
              <p className="font-sans font-semibold text-xs uppercase tracking-[0.18em] mb-5" style={{ color: ROYAL }}>
                ✓ Do Use
              </p>
              <ul className="font-sans text-sm space-y-3 leading-relaxed" style={{ color: `${NAVY}cc` }}>
                {["Soft, diffused natural light  -  golden hour preferred",
                  "Genuine human connection  -  holding hands, supportive gestures",
                  "Sacred spaces  -  churches, chapels, memorial parks",
                  "Nature imagery  -  willow trees, calm water, soft florals",
                  "Dignified ceremony photography  -  respectful and composed",
                  "Warm tonal palette  -  ivories, blues, and soft golds"].map(t => (
                  <li key={t} className="flex gap-3"><span style={{ color: ROYAL }}> - </span>{t}</li>
                ))}
              </ul>
            </div>
            <div className="p-8" style={{ backgroundColor: NAVY }}>
              <p className="font-sans font-semibold text-xs uppercase tracking-[0.18em] mb-5" style={{ color: GOLD }}>
                ✗ Avoid
              </p>
              <ul className="font-sans text-sm space-y-3 leading-relaxed text-white/75">
                {["Harsh, clinical, or overly dark imagery",
                  "Artificially posed or generic stock photography",
                  "Images that feel mournful or distressing",
                  "Busy, cluttered backgrounds that distract from the subject",
                  "Oversaturated or heavily filtered photography"].map(t => (
                  <li key={t} className="flex gap-3"><span style={{ color: GOLD }}> - </span>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 6  -  BRAND VALUES
          Layout: large numbered list, full-width alternating (odd = text-left)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="values" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div>
              <p className="section-label mb-4">06  -  Brand Values</p>
              <h2 className="font-serif leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: NAVY }}>
                What We<br />Stand For
              </h2>
            </div>
            <div>
              <blockquote className="border-l-4 pl-6" style={{ borderColor: GOLD }}>
                <p className="font-baskerville italic text-lg md:text-xl leading-relaxed" style={{ color: NAVY }}>
                  "Do not let your hearts be troubled. You believe in God; believe also in me. My Father's house has many rooms… I am going there to prepare a place for you."
                </p>
                <cite className="font-sans text-xs tracking-[0.18em] uppercase mt-4 block not-italic" style={{ color: GOLD }}>
                   -  John 14:1-3
                </cite>
              </blockquote>
            </div>
          </div>

          {/* Values  -  large editorial numbered list */}
          <div className="space-y-0 mb-24">
            {[
              {
                number: "01",
                title: "Compassionate Care",
                desc: "We listen, care for, and guide each family with unwavering empathy. Every family deserves to feel heard, supported, and respected throughout their journey.",
                bg: IVORY,
              },
              {
                number: "02",
                title: "Faith & Dignity",
                desc: "Rooted in Christian faith, we honour Catholic, Protestant, and all faith traditions with reverence. We understand the sacred nature of farewell and treat every service as an act of worship.",
                bg: LIGHT,
              },
              {
                number: "03",
                title: "Meticulous Attention to Detail",
                desc: "We believe the most meaningful memorial services are built on the small, wonderful details that made a loved one truly special. Nothing is too small to matter.",
                bg: IVORY,
              },
              {
                number: "04",
                title: "Community Commitment",
                desc: "We actively give back  -  supporting International Women's Day, Australia's Biggest Morning Tea, and providing specific care for families experiencing miscarriage. We are part of this community.",
                bg: LIGHT,
              },
            ].map((value, i) => (
              <div key={value.number}
                   className="grid md:grid-cols-12 items-center gap-0"
                   style={{ backgroundColor: value.bg, padding: "3.5rem 2.5rem", borderBottom: `1px solid ${LIGHT}` }}>
                <div className={`md:col-span-2 mb-4 md:mb-0 ${i % 2 === 1 ? "md:order-3" : ""}`}>
                  <span className="font-serif leading-none"
                        style={{ fontSize: "clamp(3rem, 6vw, 5rem)", fontWeight: 600, color: LIGHT }}>
                    {value.number}
                  </span>
                </div>
                <div className={`md:col-span-10 ${i % 2 === 1 ? "md:order-1 md:pr-16" : "md:pl-8"}`}>
                  <h3 className="font-serif mb-3"
                      style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)", fontWeight: 600, color: NAVY }}>
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-[1.9] max-w-2xl">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Director card */}
          <div className="grid md:grid-cols-3 gap-0 overflow-hidden">
            <div className="overflow-hidden" style={{ minHeight: 320 }}>
              <img src={COMPANY.assets.bruceHeadshot} alt="Bruce Missen  -  Funeral Director & Owner"
                   className="w-full h-full object-cover object-top" />
            </div>
            <div className="md:col-span-2 flex flex-col justify-center p-10 md:p-14"
                 style={{ backgroundColor: NAVY }}>
              <p className="section-label mb-3" style={{ color: GOLD }}>Funeral Director &amp; Owner</p>
              <h3 className="font-serif text-white mb-5"
                  style={{ fontSize: "clamp(1.5rem, 3vw, 2.25rem)", fontWeight: 600 }}>
                {COMPANY.director}
              </h3>
              <p className="font-sans text-white/75 text-sm leading-[1.9]">
                Bruce Missen founded Willow Tree Funerals with a deep commitment to serving families across Sydney's St George, Sutherland Shire, and South West regions. His approach is personal, compassionate, and guided by faith  -  ensuring every farewell is as unique as the life it honours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 7  -  VOICE & TONE
          Layout: traits right, examples left (even = reversed)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="voice" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: NAVY }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div className="md:order-2">
              <p className="section-label mb-4" style={{ color: GOLD }}>07  -  Voice &amp; Tone</p>
              <h2 className="font-serif text-white leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600 }}>
                How We<br />Speak
              </h2>
            </div>
            <div className="md:order-1">
              <p className="font-sans text-white/75 text-sm leading-[1.9]">
                We speak as a trusted guide and a comforting friend. Our language is warm, clear, and uplifting  -  focusing on the celebration of life and the healing journey, not the logistics of death.
              </p>
            </div>
          </div>

          {/* Four traits */}
          <div className="grid md:grid-cols-4 gap-8 mb-24">
            {[
              { trait: "Empathetic",   desc: "We acknowledge pain without dwelling in it. We meet families where they are." },
              { trait: "Professional", desc: "We are expert and trustworthy. Our language is clear, never clinical or cold." },
              { trait: "Reassuring",   desc: "We guide families through uncertainty with calm confidence and clarity." },
              { trait: "Uplifting",    desc: "We focus on celebrating life, creating meaning, and finding hope in farewell." },
            ].map(t => (
              <div key={t.trait} className="border-t pt-8" style={{ borderColor: "rgba(255,255,255,0.12)" }}>
                <p className="font-serif text-xl mb-3" style={{ fontWeight: 600, color: GOLD }}>{t.trait}</p>
                <p className="font-sans text-white/75 text-sm leading-[1.8]">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Do / Don't examples */}
          <div>
            <p className="section-label mb-8" style={{ color: GOLD }}>Language Examples</p>
            <div className="space-y-4">
              {[
                { dont: "We process the deceased efficiently.",
                  do:   "We bring your loved one into our care with the utmost dignity and respect." },
                { dont: "Cheap funeral packages available.",
                  do:   "Beautiful farewells tailored to your family's budget." },
                { dont: "Body collection and preparation services.",
                  do:   "We gently bring your loved one into our care and prepare them with reverence." },
                { dont: "Death notice submission.",
                  do:   "Share the news of your loved one's passing with the community they touched." },
              ].map((ex, i) => (
                <div key={i} className="grid md:grid-cols-2 gap-4">
                  <div className="p-5" style={{ backgroundColor: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] block mb-3" style={{ color: GOLD }}>✗ Avoid</span>
                    <p className="font-sans text-white/60 text-sm italic leading-relaxed">{ex.dont}</p>
                  </div>
                  <div className="p-5" style={{ backgroundColor: `${ROYAL}28`, border: `1px solid ${ROYAL}55` }}>
                    <span className="font-sans text-[10px] uppercase tracking-[0.18em] block mb-3" style={{ color: MID }}>✓ Use Instead</span>
                    <p className="font-sans text-white/90 text-sm leading-relaxed">{ex.do}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 8  -  LOCATIONS
          Layout: text left, location cards right (odd = text-left)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="locations" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: IVORY }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div>
              <p className="section-label mb-4">08  -  Locations &amp; Market Strategy</p>
              <h2 className="font-serif leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: NAVY }}>
                Two Locations.<br />One Standard<br />of Care.
              </h2>
            </div>
            <div>
              <p className="font-sans text-gray-600 text-sm leading-[1.9]">
                Willow Tree Funerals operates from two strategic locations  -  serving the established St George community from Hurstville, and pioneering a premium presence in Sydney's rapidly growing South West corridor from Macquarie Links.
              </p>
            </div>
          </div>

          {/* Location cards */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            <div className="p-10" style={{ backgroundColor: NAVY }}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: GOLD }}>Location 01</p>
                  <h3 className="font-serif text-white" style={{ fontSize: "1.75rem", fontWeight: 600 }}>Hurstville</h3>
                  <p className="font-sans text-white/60 text-xs mt-1">118 Durham Street, Hurstville NSW 2220</p>
                </div>
                <span className="font-sans text-xs px-3 py-1 text-white/60 shrink-0"
                      style={{ border: "1px solid rgba(255,255,255,0.2)" }}>Est. 2018</span>
              </div>
              <p className="font-sans text-white/75 text-sm leading-[1.9] mb-8">
                Our founding location in the heart of the St George area. Serving Hurstville, Kogarah, Rockdale, Bexley, Penshurst, Mortdale, and the wider Sutherland Shire. A trusted name in the community for over six years.
              </p>
              <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.1)" }}>
                <p className="font-sans text-[10px] text-white/60 uppercase tracking-[0.18em] mb-2">Service Area</p>
                <p className="font-sans text-white/75 text-xs">St George · Sutherland Shire · Inner South Sydney</p>
              </div>
            </div>

            <div className="p-10" style={{ backgroundColor: ROYAL }}>
              <div className="flex items-start justify-between mb-8">
                <div>
                  <p className="font-sans text-[11px] tracking-[0.2em] uppercase mb-2" style={{ color: GOLD }}>Location 02</p>
                  <h3 className="font-serif text-white" style={{ fontSize: "1.75rem", fontWeight: 600 }}>Macquarie Links</h3>
                  <p className="font-sans text-white/75 text-xs mt-1">Macquarie Links, NSW 2565</p>
                </div>
                <span className="font-sans text-xs px-3 py-1 text-white/75 shrink-0"
                      style={{ border: "1px solid rgba(255,255,255,0.3)" }}>New</span>
              </div>
              <p className="font-sans text-white/85 text-sm leading-[1.9] mb-8">
                Strategically positioned between Campbelltown and Liverpool  -  the only premium, faith-based funeral home in the area. Serving families across South West Sydney and the rapidly growing Macarthur region, with direct access to the new MacArthur Memorial Park at Varroville.
              </p>
              <div className="border-t pt-5" style={{ borderColor: "rgba(255,255,255,0.2)" }}>
                <p className="font-sans text-[10px] text-white/60 uppercase tracking-[0.18em] mb-2">Service Area</p>
                <p className="font-sans text-white/85 text-xs">Campbelltown · Liverpool · Ingleburn · Narellan · Gregory Hills · Varroville</p>
              </div>
            </div>
          </div>

          {/* MacArthur Memorial Park callout */}
          <div className="grid md:grid-cols-12 gap-0 mb-16 overflow-hidden" style={{ backgroundColor: LIGHT }}>
            <div className="md:col-span-2 flex items-center justify-center p-8" style={{ backgroundColor: ROYAL }}>
              <div className="text-center">
                <span className="text-white text-4xl block mb-2">✦</span>
                <p className="font-sans text-white/75 text-[10px] uppercase tracking-[0.18em]">Strategic</p>
              </div>
            </div>
            <div className="md:col-span-10 p-10">
              <p className="section-label mb-3">Strategic Opportunity</p>
              <h3 className="font-serif mb-4" style={{ fontSize: "1.5rem", fontWeight: 600, color: NAVY }}>
                MacArthur Memorial Park  -  Sydney's Newest Cemetery
              </h3>
              <p className="font-sans text-sm leading-[1.9] text-gray-600">
                MacArthur Memorial Park (166-176 St Andrews Rd, Varroville NSW 2566) is Sydney's first new greenfield Crown cemetery since the 1920s  -  113 hectares, multi-denominational, with an architecturally designed chapel and over 136,000 burial plots. Now open. Willow Tree Funerals at Macquarie Links is positioned as the closest premium funeral director to this landmark cemetery, making us the natural first choice for South West Sydney families.
              </p>
            </div>
          </div>

          {/* South West suburb grid */}
          <div>
            <p className="section-label mb-6">South West Sydney Service Areas</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-px" style={{ backgroundColor: LIGHT }}>
              {["Campbelltown", "Liverpool", "Ingleburn", "Macquarie Links",
                "Narellan", "Gregory Hills", "Varroville", "Leumeah",
                "Minto", "Casula", "Prestons", "All South West Sydney"].map(suburb => (
                <div key={suburb} className="px-5 py-4 font-sans text-xs font-medium"
                     style={{ backgroundColor: IVORY, color: NAVY }}>{suburb}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          SECTION 9  -  APPLICATION
          Layout: description right, mockups left (even = reversed)
      ══════════════════════════════════════════════════════════════════════ */}
      <section id="application" className="py-36 md:py-44 px-8 md:px-16 lg:px-24" style={{ backgroundColor: LIGHT }}>
        <div className="max-w-6xl mx-auto">

          <div className="grid md:grid-cols-2 gap-16 mb-24 items-end">
            <div className="md:order-2">
              <p className="section-label mb-4">09  -  Application</p>
              <h2 className="font-serif leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", fontWeight: 600, color: NAVY }}>
                Design<br />in Action
              </h2>
            </div>
            <div className="md:order-1">
              <p className="font-sans text-gray-600 text-sm leading-[1.9]">
                The brand system applied across digital touchpoints  -  buttons, form elements, cards, and mobile UI. Every element reinforces the same values: dignified, warm, and trustworthy.
              </p>
            </div>
          </div>

          {/* Button system */}
          <div className="mb-20">
            <p className="section-label mb-6">Button System</p>
            <div className="flex flex-wrap gap-4 items-center p-10 mb-2"
                 style={{ backgroundColor: IVORY, border: `1px solid ${LIGHT}` }}>
              <button className="btn-primary">Get in Touch</button>
              <button className="btn-outline">View Services</button>
              <button className="btn-royal">Call 24/7</button>
              <button className="btn-primary opacity-40 cursor-not-allowed">Disabled State</button>
            </div>
            <div className="flex flex-wrap gap-4 items-center p-10" style={{ backgroundColor: NAVY }}>
              <button className="btn-royal">Get in Touch</button>
              <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                               padding: "0.75rem 2rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                               fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
                               transition: "all 0.3s ease", background: "transparent",
                               color: "rgba(255,255,255,0.85)", border: "1px solid rgba(255,255,255,0.3)" }}>
                View Services
              </button>
              <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center",
                               padding: "0.75rem 2rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 500,
                               fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase",
                               transition: "all 0.3s ease", background: "transparent",
                               color: GOLD, border: `1px solid ${GOLD}` }}>
                Scripture Reference
              </button>
            </div>
          </div>

          {/* Service cards + Phone mockup side by side */}
          <div className="grid md:grid-cols-2 gap-12 mb-20 items-start">

            {/* Service cards */}
            <div>
              <p className="section-label mb-6">Service Card</p>
              <div className="space-y-4">
                {[
                  { title: "Traditional Funeral",   desc: "A full funeral service with burial or cremation, conducted with dignity and personalised to honour your loved one's life.", icon: "✦" },
                  { title: "Catholic Funeral Mass",  desc: "A reverent Requiem Mass coordinated with your parish priest, honouring the Catholic tradition of commending the soul to God.", icon: "✝" },
                  { title: "Celebration of Life",   desc: "A personalised, uplifting service that focuses on the joy and legacy of a life well lived  -  in any venue, any style.", icon: "✦" },
                ].map(card => (
                  <div key={card.title} className="p-6 flex gap-5 items-start"
                       style={{ border: `1px solid ${LIGHT}`, backgroundColor: IVORY }}>
                    <span className="text-xl shrink-0 mt-0.5" style={{ color: ROYAL }}>{card.icon}</span>
                    <div>
                      <h3 className="font-serif text-base mb-2" style={{ fontWeight: 600, color: NAVY }}>{card.title}</h3>
                      <p className="font-sans text-xs text-gray-600 leading-[1.8]">{card.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* iPhone 14 Pro mockup  -  skill spec proportions */}
            <div>
              <p className="section-label mb-6">Mobile UI Mockup</p>
              <div className="flex justify-center">
                <div className="relative flex flex-col overflow-hidden"
                     style={{ width: 240, aspectRatio: "393/852",
                              border: "5px solid #1C2B33", borderRadius: 40,
                              backgroundColor: NAVY }}>
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-10 rounded-full"
                       style={{ width: 90, height: 28, backgroundColor: "#000" }} />

                  {/* Screen content */}
                  <div className="flex-1 flex flex-col overflow-hidden" style={{ paddingTop: 48 }}>
                    {/* Mini nav */}
                    <div className="flex items-center justify-between px-4 py-3"
                         style={{ backgroundColor: NAVY }}>
                      <img src={COMPANY.assets.logoWhite} alt="Logo" style={{ height: 20, objectFit: "contain" }} />
                      <div className="flex gap-1">
                        {[1,2,3].map(i => (
                          <div key={i} className="rounded-full" style={{ width: 4, height: 4, backgroundColor: "rgba(255,255,255,0.4)" }} />
                        ))}
                      </div>
                    </div>

                    {/* Hero mini */}
                    <div className="relative overflow-hidden" style={{ height: 120 }}>
                      <img src={COMPANY.assets.brucePodium} alt="Service"
                           className="w-full h-full object-cover" />
                      <div className="absolute inset-0 flex flex-col justify-end p-3"
                           style={{ background: "linear-gradient(to top, rgba(11,31,58,0.9) 0%, transparent 60%)" }}>
                        <p className="font-serif text-white text-xs leading-tight" style={{ fontWeight: 600 }}>
                          Serving Families<br />Across Sydney
                        </p>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 p-4" style={{ backgroundColor: IVORY }}>
                      <p className="font-sans text-[8px] uppercase tracking-[0.15em] mb-2" style={{ color: ROYAL }}>
                        Our Services
                      </p>
                      {["Traditional Funeral", "Catholic Mass", "Celebration of Life"].map(s => (
                        <div key={s} className="flex items-center justify-between py-2"
                             style={{ borderBottom: `1px solid ${LIGHT}` }}>
                          <p className="font-sans text-[9px]" style={{ color: NAVY }}>{s}</p>
                          <span className="text-[8px]" style={{ color: ROYAL }}>→</span>
                        </div>
                      ))}
                      <button className="w-full mt-4 py-2 font-sans text-[9px] uppercase tracking-[0.12em] text-white"
                              style={{ backgroundColor: ROYAL }}>
                        Call 24/7
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Design token reference */}
          <div className="p-10" style={{ backgroundColor: NAVY }}>
            <p className="section-label mb-8" style={{ color: GOLD }}>Design Token Reference</p>
            <div className="grid md:grid-cols-2 gap-3 font-mono text-xs">
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
                <div key={token} className="flex gap-3 pb-3"
                     style={{ borderBottom: "1px solid rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.6)" }}>
                  <span className="shrink-0" style={{ color: MID }}>{token}</span>
                  <span style={{ color: "rgba(255,255,255,0.4)" }}>{value}</span>
                  <span className="ml-auto shrink-0" style={{ color: "rgba(255,255,255,0.35)" }}>{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="py-16 px-8 md:px-16" style={{ borderTop: `1px solid ${LIGHT}`, backgroundColor: IVORY }}>
        {/* Mobile PDF export */}
        <div className="flex justify-center mb-10 md:hidden no-print">
          <button onClick={onExportPDF}
                  className="flex items-center gap-2 font-sans text-xs tracking-[0.14em] uppercase"
                  style={{ padding: "0.75rem 2rem", background: GOLD, color: NAVY, fontWeight: 600 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Export PDF
          </button>
        </div>
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
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
