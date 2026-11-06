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
    logoDark:  "/media/e3d4908d89a940b13c5f06d0d8f8c4d760f4b2aa956ca672d9357924bbace049.png",
    logoWhite: "/media/f1a11c43f911de7331da947c3fc135364086f2be66fb32de279ae564b4ada425.webp",
    bruceHeadshot:           "/media/5291bdb1c383991c216069420e482003f3d1400c73e28527baabae9ee012d967.webp",
    brucePodium:             "/media/bcf018eada84e6a7939962d537f9c36ad7e8a668d865bc28266a1490b42f715b.png",
    churchService:           "/media/32823dc38b8ba8593fb094317429e93d3e7671cc99b05e135b95e223fb14aeae.png",
    fiveStars:               "/media/399622ef0ed167ff53fbe518604c3cb03dc71f78480017ef5fec5367d40b3400.png",
    cremationUrn:            "/media/10f0553403dfa4879e91b413db3170fa9261fc437b561a9dbf923546f86d31f5.png",
    urnGreenery:             "/media/01cb69e5d4e603edb6d65e5b1e21f1ba1f7500b9009e6b1e5fc91e70fc844863.png",
    grandmotherGranddaughter:"/media/eebc67bb4af1549241c9b62d98a5d3f02f49e8241283fc0c3c6f9ac697e86cc9.png",
    personPhone:             "/media/d75fad48c68c7d0c21d453bf5bfb864a3e5d3c4839d3cea1fed482c956d5ec5e.png",
    communityDinner:         "/media/365161f690009d475ffd5ab5711e3be97c2653ecf93a565805e275aeca5a3e84.png",
    heroBg:                  "/media/51282984064c1a62e32526c5503216cce24c9426474d134edcf7b9be0fc061f0.webp",
    brandPattern:            "/media/61f70a178677f60121b1f3643d4ac61d969a8972620cb752550a43b0db5d675c.webp",
    chapelInterior:          "/media/1d6ec672f709963cd15db13731a5d9ae7b32ba44ee7453f2d3fd1dc487a84fe6.webp",
  },
} as const;
