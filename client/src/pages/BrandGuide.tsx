/**
 * WILLOW TREE FUNERALS — Brand Guide Page
 * Route: /brand-guide
 * 8 Sections: Hero, Logo, Colours, Typography, Photography, Brand Values, Voice & Tone, Application
 *
 * Design Philosophy: "Serene Elegance"
 * Fonts: Playfair Display (headings) + Montserrat (body) + Libre Baskerville (quotes)
 * Colours: Deep Teal #0D2123, Sage Teal #54B6BF, Soft Mint #CBE0E3, Warm White #FBFAEF, Gold #C16510
 */

import { useState } from "react";
import { COMPANY } from "../../../shared/company";

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
        className="h-32 w-full rounded-sm mb-3 flex items-end p-3 transition-transform group-hover:scale-[1.02]"
        style={{ backgroundColor: hex }}
      >
        <span className={`font-mono text-xs font-medium ${textDark ? "text-[#0D2123]" : "text-white"} opacity-80`}>
          {copied ? "Copied!" : hex}
        </span>
      </div>
      <p className="font-sans font-600 text-sm text-[#0D2123]">{name}</p>
      <p className="font-mono text-xs text-[#54B6BF] mt-0.5">{oklch}</p>
      <p className="font-sans text-xs text-gray-500 mt-1">{usage}</p>
    </div>
  );
}

// ── Type Scale Row ───────────────────────────────────────────────────────────
function TypeRow({ label, size, weight, family, sample }: {
  label: string; size: string; weight: string; family: string; sample: string;
}) {
  return (
    <div className="flex items-baseline gap-6 py-5 border-b border-[#CBE0E3] last:border-0">
      <div className="w-28 shrink-0">
        <span className="section-label text-[10px]">{label}</span>
        <p className="font-sans text-xs text-gray-400 mt-1">{size} · {weight}</p>
      </div>
      <p style={{ fontFamily: family, fontSize: size, fontWeight: weight, lineHeight: 1.2 }}
         className="text-[#0D2123] tracking-tight">
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
        className="rounded-sm overflow-hidden flex items-center justify-center p-8"
        style={{ backgroundColor: bg, minHeight: 160 }}
      >
        <img src={src} alt={`Willow Tree Funerals logo — ${label}`}
             className="max-w-[240px] max-h-[100px] object-contain" />
      </div>
      <p className="font-sans text-xs text-gray-500 text-center">{label}</p>
    </div>
  );
}

// ── Main Brand Guide Page ────────────────────────────────────────────────────
export default function BrandGuide() {
  const navItems = [
    { id: "logo", label: "Logo" },
    { id: "colours", label: "Colours" },
    { id: "typography", label: "Typography" },
    { id: "photography", label: "Photography" },
    { id: "values", label: "Brand Values" },
    { id: "voice", label: "Voice & Tone" },
    { id: "application", label: "Application" },
  ];

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FBFAEF", fontFamily: "'Montserrat', system-ui, sans-serif" }}>

      {/* ── SECTION 1: HERO ─────────────────────────────────────────────── */}
      <section className="relative min-h-screen flex flex-col justify-between overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <img src={COMPANY.assets.heroBg} alt="Willow tree by a calm pond at sunrise"
               className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{
            background: "linear-gradient(to right, rgba(13,33,35,0.88) 45%, rgba(13,33,35,0.35) 100%)"
          }} />
        </div>

        {/* Sticky nav */}
        <nav className="relative z-20 flex items-center justify-between px-8 py-6">
          <img src={COMPANY.assets.logoWhite} alt="Willow Tree Funerals"
               className="h-12 object-contain" />
          <div className="hidden md:flex gap-6">
            {navItems.map(item => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                      className="font-sans text-xs tracking-widest uppercase text-white/70 hover:text-white transition-colors">
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pb-24">
          <p className="section-label text-[#54B6BF] mb-4">Identity Manual · {COMPANY.year}</p>
          <h1 className="font-serif text-white tracking-tight leading-none mb-6"
              style={{ fontSize: "clamp(3rem, 8vw, 7rem)", fontWeight: 600 }}>
            Brand<br />Guide
          </h1>
          <p className="font-sans text-white/75 text-lg max-w-md mb-8" style={{ fontWeight: 400 }}>
            The visual identity and communication standards for {COMPANY.name} — Hurstville, Sydney NSW.
          </p>
          <div className="flex flex-wrap gap-3">
            {["Compassionate", "Dignified", "Hopeful", "Trustworthy", "Personal"].map(v => (
              <span key={v} className="px-4 py-1.5 border border-white/30 text-white/80 font-sans text-xs tracking-widest uppercase">
                {v}
              </span>
            ))}
          </div>
        </div>

        {/* Logo bottom-right */}
        <div className="absolute bottom-8 right-8 z-10 opacity-20">
          <img src={COMPANY.assets.logoWhite} alt="" className="h-16 object-contain" />
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
          <span className="font-sans text-white/50 text-xs tracking-widest uppercase">Scroll</span>
          <div className="w-px h-8 bg-white/30" />
        </div>
      </section>

      {/* ── SECTION 2: LOGO ─────────────────────────────────────────────── */}
      <section id="logo" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">02 — Logo</p>
          <h2 className="font-serif text-[#0D2123] text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            The Willow Tree Mark
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            The logo combines a detailed willow tree illustration with refined spaced capitals. The cross motif within the "O" reflects the brand's Christian faith foundation. The scripture reference "John 14:1-3" anchors the brand in hope and comfort.
          </p>

          {/* Logo variants */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            <LogoCard bg="#FBFAEF" src={COMPANY.assets.logoDark} label="Primary — Dark on Warm White" />
            <LogoCard bg="#0D2123" src={COMPANY.assets.logoWhite} label="Reversed — White on Deep Teal" />
            <LogoCard bg="#CBE0E3" src={COMPANY.assets.logoDark} label="On Soft Mint" />
            <LogoCard bg="#54B6BF" src={COMPANY.assets.logoWhite} label="On Brand Teal" />
          </div>

          {/* Logo Don'ts */}
          <div className="border-l-4 border-[#C16510] pl-6">
            <p className="font-sans font-medium text-sm text-[#C16510] uppercase tracking-widest mb-4">Logo Don'ts</p>
            <ul className="font-sans text-sm text-gray-600 space-y-2">
              <li>✗ Do not stretch or distort the logo proportions</li>
              <li>✗ Do not place the dark logo on dark photographic backgrounds without a light overlay</li>
              <li>✗ Do not use the logo smaller than 120px wide in digital contexts</li>
              <li>✗ Do not recreate or alter the tree illustration or typography</li>
              <li>✗ Do not remove the scripture reference "John 14:1-3" from the primary logo</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: COLOURS ──────────────────────────────────────────── */}
      <section id="colours" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: "#0D2123" }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-[#54B6BF] mb-3">03 — Colours</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            Colour Palette
          </h2>
          <p className="font-sans text-white/60 max-w-2xl mb-16 text-sm leading-relaxed">
            Inspired by the calming tones of nature — deep teal waters, sage foliage, and warm morning light. Click any swatch to copy the HEX value.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <ColourSwatch name="Deep Teal" hex="#0D2123" oklch="oklch(0.22 0.03 200)" usage="Primary text, dark backgrounds, footer" />
            <ColourSwatch name="Brand Teal" hex="#54B6BF" oklch="oklch(0.68 0.11 215)" usage="Primary brand colour, CTAs, links" />
            <ColourSwatch name="Sage" hex="#2C6F76" oklch="oklch(0.55 0.08 210)" usage="Mid-tone, hover states, borders" />
            <ColourSwatch name="Soft Mint" hex="#CBE0E3" oklch="oklch(0.88 0.04 215)" usage="Section backgrounds, highlights" textDark />
            <ColourSwatch name="Warm White" hex="#FBFAEF" oklch="oklch(0.98 0.01 95)" usage="Page background, card backgrounds" textDark />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            <ColourSwatch name="Gold Accent" hex="#C16510" oklch="oklch(0.55 0.15 55)" usage="Premium accents, awards, highlights" />
            <ColourSwatch name="Warm Peach" hex="#F8CFB0" oklch="oklch(0.82 0.08 75)" usage="Soft warmth, floral accents" textDark />
          </div>

          {/* Colour usage rules */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            {[
              { title: "Primary Palette", desc: "Deep Teal and Brand Teal are the dominant brand colours. Use them for all primary UI elements, headings, and key calls-to-action." },
              { title: "Background System", desc: "Warm White (#FBFAEF) is the standard page background — never pure white. Soft Mint is used for alternating section backgrounds." },
              { title: "Accent Usage", desc: "Gold (#C16510) is used sparingly — for premium touches, award badges, and hover micro-interactions. Never use it as a primary button colour." },
            ].map(rule => (
              <div key={rule.title} className="border-t border-white/10 pt-6">
                <p className="font-sans font-medium text-white text-sm mb-2">{rule.title}</p>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{rule.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TYPOGRAPHY ───────────────────────────────────────── */}
      <section id="typography" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">04 — Typography</p>
          <h2 className="font-serif text-[#0D2123] text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            Type System
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            Three typefaces work in harmony: Playfair Display brings warmth and heritage to headings; Montserrat provides clarity and modernity for body text and UI; Libre Baskerville adds gravitas to scripture and pull quotes.
          </p>

          {/* Font families */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                name: "Playfair Display",
                role: "Headings · H1 – H4",
                family: "'Playfair Display', Georgia, serif",
                sample: "Honouring Life",
                note: "Serif elegance. Weight 600 maximum. Used for all headings, hero text, and section titles."
              },
              {
                name: "Montserrat",
                role: "Body · Navigation · Buttons",
                family: "'Montserrat', system-ui, sans-serif",
                sample: "Compassionate care for every family",
                note: "Clean sans-serif. Weights 400 (body), 500 (buttons/labels), 600 (emphasis). Always uppercase for nav and CTAs."
              },
              {
                name: "Libre Baskerville",
                role: "Quotes · Scripture · Accent",
                family: "'Libre Baskerville', Georgia, serif",
                sample: '"Let not your heart be troubled."',
                note: "Italic for pull quotes and scripture. Regular for formal accent text. Never used for headings or body copy."
              }
            ].map(font => (
              <div key={font.name} className="border border-[#CBE0E3] p-6">
                <p className="section-label mb-1">{font.role}</p>
                <p className="font-sans font-medium text-[#0D2123] text-sm mb-4">{font.name}</p>
                <p className="text-[#0D2123] mb-4 leading-snug"
                   style={{ fontFamily: font.family, fontSize: "1.5rem", fontWeight: 600 }}>
                  {font.sample}
                </p>
                <p className="font-sans text-xs text-gray-500 leading-relaxed">{font.note}</p>
              </div>
            ))}
          </div>

          {/* Type scale */}
          <div className="border border-[#CBE0E3] p-8">
            <p className="section-label mb-6">Type Scale</p>
            <TypeRow label="Display" size="4.5rem" weight="600" family="'Playfair Display', serif" sample="Honouring Life" />
            <TypeRow label="H1" size="3rem" weight="600" family="'Playfair Display', serif" sample="Funeral Services in Hurstville" />
            <TypeRow label="H2" size="2.25rem" weight="600" family="'Playfair Display', serif" sample="We Are Here to Help" />
            <TypeRow label="H3" size="1.5rem" weight="600" family="'Playfair Display', serif" sample="Celebration of Life Services" />
            <TypeRow label="Body Large" size="1.125rem" weight="400" family="'Montserrat', sans-serif" sample="Compassionate care for families across Sydney." />
            <TypeRow label="Body" size="0.9375rem" weight="400" family="'Montserrat', sans-serif" sample="We journey with you through every step of the process." />
            <TypeRow label="Label / Nav" size="0.75rem" weight="500" family="'Montserrat', sans-serif" sample="ABOUT US · SERVICES · CONTACT" />
            <TypeRow label="Scripture" size="1.125rem" weight="400" family="'Libre Baskerville', serif" sample='"Do not let your hearts be troubled." — John 14:1' />
          </div>
        </div>
      </section>

      {/* ── SECTION 5: PHOTOGRAPHY ──────────────────────────────────────── */}
      <section id="photography" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: "#CBE0E3" }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">05 — Photography</p>
          <h2 className="font-serif text-[#0D2123] text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            Photography Style
          </h2>
          <p className="font-sans text-[#0D2123]/70 max-w-2xl mb-12 text-sm leading-relaxed">
            Photography should feel hopeful, warm, and dignified — never clinical or mournful. Soft natural light, genuine human connection, and the beauty of nature are the core visual themes.
          </p>

          {/* Photo grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
            <div className="col-span-2 row-span-2 rounded-sm overflow-hidden aspect-[4/3]">
              <img src={COMPANY.assets.brucePodium} alt="Bruce Missen conducting a funeral service"
                   className="w-full h-full object-cover" />
            </div>
            <div className="rounded-sm overflow-hidden aspect-square">
              <img src={COMPANY.assets.grandmotherGranddaughter} alt="Grandmother and granddaughter sharing a moment"
                   className="w-full h-full object-cover" />
            </div>
            <div className="rounded-sm overflow-hidden aspect-square">
              <img src={COMPANY.assets.urnGreenery} alt="Cremation urn with greenery"
                   className="w-full h-full object-cover" />
            </div>
            <div className="rounded-sm overflow-hidden aspect-square">
              <img src={COMPANY.assets.chapelInterior} alt="Modern funeral chapel interior"
                   className="w-full h-full object-cover" />
            </div>
            <div className="rounded-sm overflow-hidden aspect-square">
              <img src={COMPANY.assets.churchService} alt="Church funeral service"
                   className="w-full h-full object-cover" />
            </div>
            <div className="rounded-sm overflow-hidden aspect-square">
              <img src={COMPANY.assets.cremationUrn} alt="Cremation urn with red roses"
                   className="w-full h-full object-cover" />
            </div>
          </div>

          {/* Photography rules */}
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="font-sans font-medium text-[#0D2123] text-sm mb-3 uppercase tracking-widest">✓ Do Use</p>
              <ul className="font-sans text-sm text-[#0D2123]/70 space-y-2">
                <li>Soft, diffused natural light — golden hour preferred</li>
                <li>Genuine human connection — holding hands, supportive gestures</li>
                <li>Nature imagery — willow trees, calm water, soft florals</li>
                <li>Dignified ceremony photography — respectful and composed</li>
                <li>Warm tonal palette — creams, sage greens, soft teals</li>
              </ul>
            </div>
            <div>
              <p className="font-sans font-medium text-[#C16510] text-sm mb-3 uppercase tracking-widest">✗ Avoid</p>
              <ul className="font-sans text-sm text-[#0D2123]/70 space-y-2">
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
      <section id="values" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">06 — Brand Values</p>
          <h2 className="font-serif text-[#0D2123] text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            What We Stand For
          </h2>

          {/* Scripture pull quote */}
          <blockquote className="border-l-4 border-[#54B6BF] pl-6 my-12">
            <p className="font-baskerville italic text-[#0D2123] text-xl md:text-2xl leading-relaxed">
              "Do not let your hearts be troubled. You believe in God; believe also in me. My Father's house has many rooms... I am going there to prepare a place for you."
            </p>
            <cite className="font-sans text-xs text-[#54B6BF] tracking-widest uppercase mt-3 block not-italic">
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
                title: "Meticulous Attention to Detail",
                desc: "We believe the most meaningful memorial services are built on the small, wonderful details that made a loved one truly special. Nothing is too small to matter."
              },
              {
                number: "03",
                title: "Inclusivity & Respect",
                desc: "We honour the funeral and interment customs of all faiths, cultures, and backgrounds. Every life deserves to be celebrated in a way that is true to who they were."
              },
              {
                number: "04",
                title: "Community Commitment",
                desc: "We actively give back to our community — supporting International Women's Day, Australia's Biggest Morning Tea, and providing specific care for families experiencing miscarriage."
              },
            ].map(value => (
              <div key={value.number} className="flex gap-6">
                <span className="font-serif text-[#CBE0E3] text-5xl leading-none shrink-0" style={{ fontWeight: 600 }}>
                  {value.number}
                </span>
                <div>
                  <h3 className="font-serif text-[#0D2123] text-xl mb-2" style={{ fontWeight: 600 }}>
                    {value.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed">{value.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Director card */}
          <div className="flex flex-col md:flex-row gap-8 items-center bg-[#0D2123] p-8 rounded-sm">
            <img src={COMPANY.assets.bruceHeadshot} alt="Bruce Missen — Funeral Director & Owner"
                 className="w-32 h-32 rounded-full object-cover object-top shrink-0 border-2 border-[#54B6BF]" />
            <div>
              <p className="section-label text-[#54B6BF] mb-2">Funeral Director & Owner</p>
              <h3 className="font-serif text-white text-2xl mb-3" style={{ fontWeight: 600 }}>
                {COMPANY.director}
              </h3>
              <p className="font-sans text-white/70 text-sm leading-relaxed">
                Bruce Missen founded Willow Tree Funerals with a deep commitment to serving families across Sydney's St George and Sutherland Shire regions. His approach is personal, compassionate, and guided by faith — ensuring every farewell is as unique as the life it honours.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: VOICE & TONE ─────────────────────────────────────── */}
      <section id="voice" className="py-24 px-8 md:px-16 lg:px-24" style={{ backgroundColor: "#0D2123" }}>
        <div className="max-w-5xl mx-auto">
          <p className="section-label text-[#54B6BF] mb-3">07 — Voice & Tone</p>
          <h2 className="font-serif text-white text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            How We Speak
          </h2>
          <p className="font-sans text-white/60 max-w-2xl mb-16 text-sm leading-relaxed">
            We speak as a trusted guide and a comforting friend. Our language is warm, clear, and uplifting — focusing on the celebration of life and the healing journey, not the logistics of death.
          </p>

          <div className="grid md:grid-cols-4 gap-6 mb-16">
            {[
              { trait: "Empathetic", desc: "We acknowledge pain without dwelling in it. We meet families where they are." },
              { trait: "Professional", desc: "We are expert and trustworthy. Our language is clear, never clinical or cold." },
              { trait: "Reassuring", desc: "We guide families through uncertainty with calm confidence and clarity." },
              { trait: "Uplifting", desc: "We focus on celebrating life, creating meaning, and finding hope in farewell." },
            ].map(t => (
              <div key={t.trait} className="border-t border-white/10 pt-6">
                <p className="font-serif text-[#54B6BF] text-lg mb-2" style={{ fontWeight: 600 }}>{t.trait}</p>
                <p className="font-sans text-white/50 text-xs leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>

          {/* Do / Don't examples */}
          <div className="space-y-4">
            <p className="section-label text-[#54B6BF] mb-6">Language Examples</p>
            {[
              {
                dont: "We process the deceased efficiently.",
                do: "We bring your loved one into our care with the utmost dignity and respect."
              },
              {
                dont: "Cheap funeral packages available.",
                do: "Beautiful farewells tailored to your family's budget."
              },
              {
                dont: "Body collection and preparation services.",
                do: "We gently bring your loved one into our care and prepare them with reverence."
              },
              {
                dont: "Death notice submission.",
                do: "Share the news of your loved one's passing with the community they touched."
              },
            ].map((ex, i) => (
              <div key={i} className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4">
                  <span className="font-sans text-[10px] text-[#C16510] uppercase tracking-widest block mb-2">✗ Avoid</span>
                  <p className="font-sans text-white/50 text-sm italic">{ex.dont}</p>
                </div>
                <div className="bg-[#54B6BF]/10 border border-[#54B6BF]/30 p-4">
                  <span className="font-sans text-[10px] text-[#54B6BF] uppercase tracking-widest block mb-2">✓ Use Instead</span>
                  <p className="font-sans text-white text-sm">{ex.do}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 8: APPLICATION ──────────────────────────────────────── */}
      <section id="application" className="py-24 px-8 md:px-16 lg:px-24">
        <div className="max-w-5xl mx-auto">
          <p className="section-label mb-3">08 — Application</p>
          <h2 className="font-serif text-[#0D2123] text-4xl md:text-5xl mb-4" style={{ fontWeight: 600 }}>
            Design in Action
          </h2>
          <p className="font-sans text-gray-600 max-w-2xl mb-16 text-sm leading-relaxed">
            The brand system applied across digital touchpoints — buttons, form elements, cards, and website sections.
          </p>

          {/* Button system */}
          <div className="mb-16">
            <p className="section-label mb-6">Button System</p>
            <div className="flex flex-wrap gap-4 items-center p-8 bg-[#FBFAEF] border border-[#CBE0E3]">
              <button className="btn-primary">Get in Touch</button>
              <button className="btn-outline">View Services</button>
              <button className="btn-teal">Call 24/7</button>
              <button className="btn-primary opacity-40 cursor-not-allowed">Disabled State</button>
            </div>
            <div className="flex flex-wrap gap-4 items-center p-8 bg-[#0D2123]">
              <button className="btn-teal">Get in Touch</button>
              <button style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", padding: "0.75rem 2rem", fontFamily: "'Montserrat', sans-serif", fontWeight: 500, fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", transition: "all 0.3s ease", background: "transparent", color: "rgba(255,255,255,0.8)", border: "1px solid rgba(255,255,255,0.3)" }}>
                View Services
              </button>
            </div>
          </div>

          {/* Service card mockup */}
          <div className="mb-16">
            <p className="section-label mb-6">Service Card</p>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Traditional Funeral", desc: "A full funeral service with burial or cremation, conducted with dignity and personalised to honour your loved one's life.", icon: "✦" },
                { title: "Celebration of Life", desc: "A joyful tribute that focuses on the unique personality, passions, and legacy of the person being remembered.", icon: "✦" },
                { title: "Eco Funeral", desc: "Environmentally conscious services including green burials that have less impact on the environment.", icon: "✦" },
              ].map(card => (
                <div key={card.title} className="border border-[#CBE0E3] p-6 hover:border-[#54B6BF] transition-colors group">
                  <span className="text-[#54B6BF] text-2xl block mb-4">{card.icon}</span>
                  <h3 className="font-serif text-[#0D2123] text-lg mb-3" style={{ fontWeight: 600 }}>
                    {card.title}
                  </h3>
                  <p className="font-sans text-sm text-gray-600 leading-relaxed mb-4">{card.desc}</p>
                  <span className="section-label group-hover:text-[#0D2123] transition-colors">Learn More →</span>
                </div>
              ))}
            </div>
          </div>

          {/* Design tokens reference */}
          <div className="bg-[#0D2123] p-8">
            <p className="section-label text-[#54B6BF] mb-6">Design Token Reference</p>
            <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
              {[
                ["--color-brand-deep-teal", "oklch(0.22 0.03 200)", "#0D2123"],
                ["--color-brand-teal", "oklch(0.68 0.11 215)", "#54B6BF"],
                ["--color-brand-sage", "oklch(0.55 0.08 210)", "#2C6F76"],
                ["--color-brand-mint", "oklch(0.88 0.04 215)", "#CBE0E3"],
                ["--color-brand-warm-white", "oklch(0.98 0.01 95)", "#FBFAEF"],
                ["--color-brand-gold", "oklch(0.55 0.15 55)", "#C16510"],
                ["--font-family-serif", "'Playfair Display', serif", "Headings"],
                ["--font-family-sans", "'Montserrat', sans-serif", "Body / UI"],
                ["--font-family-baskerville", "'Libre Baskerville', serif", "Quotes"],
              ].map(([token, value, note]) => (
                <div key={token} className="flex gap-3 text-white/60 border-b border-white/5 pb-2">
                  <span className="text-[#54B6BF] shrink-0">{token}</span>
                  <span className="text-white/40">{value}</span>
                  <span className="text-white/30 ml-auto shrink-0">{note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="py-12 px-8 md:px-16 border-t border-[#CBE0E3]">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <img src={COMPANY.assets.logoDark} alt="Willow Tree Funerals" className="h-10 object-contain" />
          <p className="font-sans text-xs text-gray-400 text-center">
            © {COMPANY.year} {COMPANY.name} · Brand Guide · Identity Manual
          </p>
          <p className="font-baskerville italic text-[#54B6BF] text-sm">{COMPANY.scripture}</p>
        </div>
      </footer>

    </div>
  );
}
