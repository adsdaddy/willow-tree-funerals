/**
 * WILLOW TREE FUNERALS — Local Area SEO Section
 * Purpose: Targets suburb-level keyword clusters for St George & Sutherland Shire
 * SEO: funeral home Kogarah, funeral director Rockdale, funeral services Sutherland Shire, etc.
 */

const serviceAreas = [
  { suburb: "Hurstville", postcode: "2220", desc: "Our home base — serving Hurstville families with 24/7 availability." },
  { suburb: "Kogarah", postcode: "2217", desc: "Compassionate funeral services for Kogarah and surrounding areas." },
  { suburb: "Rockdale", postcode: "2216", desc: "Personalised funerals and cremation services in Rockdale." },
  { suburb: "Bexley", postcode: "2207", desc: "Dignified funeral arrangements for Bexley families." },
  { suburb: "Penshurst", postcode: "2222", desc: "Caring funeral director services for Penshurst residents." },
  { suburb: "Mortdale", postcode: "2223", desc: "Trusted funeral home serving Mortdale and Oatley." },
  { suburb: "Sutherland Shire", postcode: "2232", desc: "Full funeral services across the Sutherland Shire." },
  { suburb: "All of Sydney", postcode: "NSW", desc: "We travel across Sydney to serve families wherever they are." },
];

export default function LocalAreaSEO() {
  return (
    <section className="py-20 px-6 md:px-10" style={{ backgroundColor: "#FBFAEF" }}>
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label mb-3">Service Areas</p>
          <h2
            className="font-serif text-[#0D2123]"
            style={{ fontSize: "clamp(1.75rem, 3vw, 2.5rem)", fontWeight: 600 }}
          >
            Funeral Services Across Sydney's St George &amp; Sutherland Shire
          </h2>
          <p className="font-sans text-gray-600 text-sm mt-4 max-w-2xl mx-auto leading-relaxed">
            Willow Tree Funerals is based in Hurstville and serves families across the entire St George area, Sutherland Shire, and greater Sydney. We come to you — available 24 hours a day, 7 days a week.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-px bg-[#CBE0E3]">
          {serviceAreas.map(area => (
            <div
              key={area.suburb}
              className="bg-[#FBFAEF] hover:bg-white transition-colors p-6 group"
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className="font-serif text-[#0D2123] group-hover:text-[#54B6BF] transition-colors"
                  style={{ fontSize: "1.0625rem", fontWeight: 600 }}
                >
                  {area.suburb}
                </h3>
                <span className="font-sans text-[#54B6BF] text-xs mt-0.5">{area.postcode}</span>
              </div>
              <p className="font-sans text-gray-500 text-xs leading-relaxed">{area.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-[#0D2123] p-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-serif text-white text-lg" style={{ fontWeight: 600 }}>
              Not sure if we cover your area?
            </p>
            <p className="font-sans text-white/50 text-sm mt-1">
              We serve all of Sydney — call us and we will confirm immediately.
            </p>
          </div>
          <a
            href="tel:+61287761667"
            className="btn-teal shrink-0"
          >
            Call 02 8776 1667
          </a>
        </div>
      </div>
    </section>
  );
}
