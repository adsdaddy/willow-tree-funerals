/**
 * WILLOW TREE FUNERALS — Company Constants
 * Single source of truth for all company data.
 * Import this everywhere — never hardcode contact details in components.
 */

export const COMPANY = {
  name: "Willow Tree Funerals",
  legalName: "Willow Tree Funerals",
  tagline: "You Focus On Healing. We'll Take Care Of The Rest.",
  scripture: "John 14:1-3",
  phone: "02 8776 1667",
  phoneHref: "tel:+61287761667",
  whatsapp: "https://wa.me/61287761667?text=Hi%20Bruce%2C%20I%20need%20help%20with%20a%20funeral%20arrangement.",
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
    facebook: "https://www.facebook.com/willowtreefunerals",
    instagram: "https://www.instagram.com/willowtreefunerals",
  },
  assets: {
    logoDark:  "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/logo-dark_ecaf2959.png",
    logoWhite: "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/logo-white_d76e5415.png",
    bruceHeadshot:           "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-headshot_18cf3f17.png",
    brucePodium:             "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/bruce-podium_d5ec753d.png",
    churchService:           "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/church-service_a28d78fe.png",
    fiveStars:               "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/five-stars_07e1c638.png",
    cremationUrn:            "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/cremation-urn_877b24e3.png",
    urnGreenery:             "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/urn-greenery_d7a3ee06.png",
    grandmotherGranddaughter:"https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/grandmother-granddaughter_157c2ea1.png",
    personPhone:             "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/person-phone_01a8551b.png",
    communityDinner:         "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/community-dinner_c327c9ef.png",
    heroBg:                  "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/hero-bg-LSQmgP64pNExBCjB2t9kFG.webp",
    brandPattern:            "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/brand-pattern-VtoB4h6dmR6pqxUAduED4D.webp",
    chapelInterior:          "https://d2xsxph8kpxj0f.cloudfront.net/310519663451841155/mxnFESxuEjBzvxvPzCeyFt/chapel-interior-gyoTcwJ3Xm6vrspnv6UwPg.webp",
  },
} as const;
