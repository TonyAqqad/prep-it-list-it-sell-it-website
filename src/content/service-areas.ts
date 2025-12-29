export interface ServiceArea {
  name: string;
  slug: string;
  description: string;
  zipCodes?: string[];
}

export const serviceAreas: ServiceArea[] = [
  {
    name: "Santa Clarita",
    slug: "santa-clarita",
    description: "Serving all Santa Clarita neighborhoods including Valencia, Saugus, Canyon Country, and Newhall.",
    zipCodes: ["91350", "91351", "91354", "91355", "91381", "91387"],
  },
  {
    name: "Valencia",
    slug: "valencia",
    description: "Master-planned community with diverse housing styles from condos to custom estates.",
    zipCodes: ["91354", "91355", "91381"],
  },
  {
    name: "Saugus",
    slug: "saugus",
    description: "Historic area with established neighborhoods and newer developments.",
    zipCodes: ["91350", "91390"],
  },
  {
    name: "Canyon Country",
    slug: "canyon-country",
    description: "Growing community with a mix of single-family homes and equestrian properties.",
    zipCodes: ["91351", "91387"],
  },
  {
    name: "Newhall",
    slug: "newhall",
    description: "The heart of Santa Clarita with historic Main Street and surrounding residential areas.",
    zipCodes: ["91321", "91381"],
  },
  {
    name: "Stevenson Ranch",
    slug: "stevenson-ranch",
    description: "Upscale planned community known for excellent schools and family-friendly amenities.",
    zipCodes: ["91381"],
  },
  {
    name: "Castaic",
    slug: "castaic",
    description: "Northern gateway to Santa Clarita Valley with lake access and mountain views.",
    zipCodes: ["91384"],
  },
  {
    name: "Agua Dulce",
    slug: "agua-dulce",
    description: "Rural community with ranch properties and custom homes on larger lots.",
    zipCodes: ["91390"],
  },
];

export const serviceAreasIntro = {
  headline: "Proudly Serving the Santa Clarita Valley",
  subheadline: "Local expertise for every neighborhood in our community",
  description: "We know the Santa Clarita Valley because we live here. From Valencia's master-planned communities to Agua Dulce's ranch properties, we understand what buyers are looking for in each unique area.",
};
