/**
 * AccreditationBar — Trust signal strip
 * Displays ASIC registration, Cert IV, Google rating, and independence badge.
 * Used below the Nav on the homepage and key service pages.
 */

import { ShieldCheck, Award, Star, Heart } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    label: "ASIC Registered",
    sub: "Funeral Home",
  },
  {
    icon: Award,
    label: "Cert IV Funeral Services",
    sub: "Qualified Director",
  },
  {
    icon: Star,
    label: "5.0 Google Rating",
    sub: "47+ Verified Reviews",
  },
  {
    icon: Heart,
    label: "Independently Owned",
    sub: "Not Corporate-Owned",
  },
];

export default function AccreditationBar() {
  return (
    <div className="bg-white border-b border-brand-light-blue/60 py-3">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {badges.map(({ icon: Icon, label, sub }) => (
            <div key={label} className="flex items-center gap-2">
              <Icon size={14} className="text-brand-royal shrink-0" />
              <span className="text-brand-navy text-xs font-semibold">{label}</span>
              <span className="hidden sm:inline text-brand-navy/40 text-xs">·</span>
              <span className="hidden sm:inline text-brand-navy/75 text-xs">{sub}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
