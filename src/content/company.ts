// Company Information - Source of Truth for NAP and business details

export const company = {
  name: "Prep It List It Sell It Services",
  shortName: "Prep It List It Sell It",
  tagline: "Small Jobs = Big Return",
  description:
    "Family-owned home improvement services in the Santa Clarita Valley. Licensed & insured. Project-managed improvements for homeowners preparing to sell.",

  contact: {
    phone: {
      office: "(661) 360-9252",
      officeRaw: "+16613609252",
      direct: "(661) 382-7784",
      directRaw: "+16613827784",
    },
    email: "webster_consulting@outlook.com",
    responseTime: "1-24 hours",
  },

  address: {
    street: "25101 The Old Road, Suite 123",
    city: "Stevenson Ranch",
    state: "CA",
    zip: "91381",
    formatted: "25101 The Old Road, Suite 123, Stevenson Ranch, CA 91381",
    googleMapsUrl: "https://www.google.com/maps/place/25101+The+Old+Road,+Stevenson+Ranch,+CA+91381",
  },

  serviceAreas: [
    { name: "Santa Clarita", primary: true },
    { name: "Valencia", primary: true },
    { name: "Stevenson Ranch", primary: true },
    { name: "Newhall", primary: true },
    { name: "Canyon Country", primary: true },
    { name: "Saugus", primary: true },
    { name: "Castaic", primary: false },
  ],

  credentials: {
    licensed: true,
    insured: true,
    bonded: false, // Not confirmed
  },

  founded: 2021,
  ownerName: "Bryan", // Use sparingly

  social: {
    facebook: null,
    instagram: null,
    yelp: null,
    google: null,
  },

  hours: {
    availability: "24/7 Contact",
    note: "Response within 1-24 hours",
  },
} as const;

export type Company = typeof company;
