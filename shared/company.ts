/**
 * WILLOW TREE FUNERALS  -  Company Constants
 * Single source of truth for all company data.
 * Import this everywhere  -  never hardcode contact details in components.
 */

export const COMPANY = {
  name: "Willow Tree Funerals",
  legalName: "Willow Tree Funerals",
  tagline: "You Focus On Healing. We'll Take Care Of The Rest.",
  scripture: "John 14:1-3",
  phone: "02 8776 1667",
  phoneHref: "tel:+61287761667",
  whatsapp: "https://wa.me/61434365520?text=Hi%20Bruce%2C%20I%20need%20help%20with%20a%20funeral%20arrangement.",
  email: "director@willowtreefunerals.com.au",
  address: "118 Durham Street, Hurstville NSW 2220",
  street: "118 Durham Street",
  suburb: "Hurstville",
  city: "Sydney",
  state: "NSW",
  postcode: "2220",
  region: "St George, Sutherland Shire, South West Sydney, Wollongong & the Central Coast",
  locations: [
    {
      name: "Hurstville",
      address: "118 Durham Street, Hurstville NSW 2220",
      suburb: "Hurstville",
      postcode: "2220",
      region: "St George & Sutherland Shire",
      established: 2018,
    },
    {
      name: "Macquarie Links",
      address: "Macquarie Links NSW 2565",
      suburb: "Macquarie Links",
      postcode: "2565",
      region: "South West Sydney",
      established: 2025,
    },
  ],
  director: "Bruce Missen",
  directorTitle: "Managing Director & Founder",
  year: new Date().getFullYear(),
  established: 2018,
  social: {
    facebook: "https://www.facebook.com/profile.php?id=100083040925564",
    instagram: "https://www.instagram.com/willowtreefunerals/",
  },
  assets: {
    logoDark:  "/media/logo-dark_ecaf2959.png",
    logoWhite: "/media/logo-white-v4_3a392b62.webp",
    bruceHeadshot:           "/media/bruce-headshot-v2_c7f0cb68.webp",
    brucePodium:             "/media/bruce-podium_d5ec753d.png",
    churchService:           "/media/church-service_a28d78fe.png",
    fiveStars:               "/media/five-stars_07e1c638.png",
    cremationUrn:            "/media/cremation-urn_877b24e3.png",
    urnGreenery:             "/media/urn-greenery_d7a3ee06.png",
    grandmotherGranddaughter:"/media/grandmother-granddaughter_157c2ea1.png",
    personPhone:             "/media/person-phone_01a8551b.png",
    communityDinner:         "/media/community-dinner_c327c9ef.png",
    heroBg:                  "/media/hero-bg-opt-v2_e04c2bfa.webp",
    brandPattern:            "/media/brand-pattern-VtoB4h6dmR6pqxUAduED4D.webp",
    chapelInterior:          "/media/chapel-interior-gyoTcwJ3Xm6vrspnv6UwPg.webp",
  },
} as const;
