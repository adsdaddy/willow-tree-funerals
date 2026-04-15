/**
 * WILLOW TREE FUNERALS — Sticky Mobile CTA Bar
 * OptiCheck Playbook: Sticky bottom CTA bar on mobile — major CRO pattern
 * Appears after user scrolls 200px. Hidden on desktop (lg+).
 * WCAG AA: min 44px touch targets, visible focus ring.
 */

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { Link } from "wouter";
import { COMPANY } from "../../../shared/company";

export default function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 200);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 lg:hidden transition-transform duration-300 ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      role="complementary"
      aria-label="Quick contact"
    >
      <div className="grid grid-cols-2 shadow-2xl">
        <a
          href={COMPANY.phoneHref}
          className="flex items-center justify-center gap-2 bg-brand-royal text-white py-4 text-xs font-sans font-semibold tracking-widest uppercase min-h-[52px] hover:bg-brand-mid-blue transition-colors"
          aria-label={`Call us on ${COMPANY.phone}`}
        >
          <Phone size={16} />
          Call Now
        </a>
        <Link
          href="/contact"
          className="flex items-center justify-center gap-2 bg-brand-gold text-white py-4 text-xs font-sans font-semibold tracking-widest uppercase min-h-[52px] hover:bg-brand-navy transition-colors"
        >
          Arrange a Funeral
        </Link>
      </div>
    </div>
  );
}
