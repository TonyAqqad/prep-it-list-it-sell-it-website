// Services - Inspired by Prep'n Sell service offerings

export interface Service {
  id: string;
  title: string;
  shortTitle: string;
  description: string;
  icon: string; // Material Symbols icon name
  features: string[];
  href: string;
  image?: string;
}

export const services: Service[] = [
  {
    id: "decluttering",
    title: "Decluttering & Junk Removal",
    shortTitle: "Decluttering",
    description:
      "Home clearouts and organizing donations. We help you remove years of accumulated items so your home shows its true potential.",
    icon: "delete_sweep",
    features: [
      "Full home clearouts",
      "Estate cleanouts",
      "Donation coordination",
      "Storage solutions",
    ],
    href: "/services/decluttering",
    image: "https://images.unsplash.com/photo-1618832515490-e181c4794a45?w=600",
  },
  {
    id: "cleaning",
    title: "Cleaning & Deodorizing",
    shortTitle: "Cleaning",
    description:
      "Deep cleaning for tenants or listing-ready preparation. Professional-grade cleaning that makes buyers say 'wow'.",
    icon: "cleaning_services",
    features: [
      "Move-out deep cleaning",
      "Carpet cleaning",
      "Odor elimination",
      "Window cleaning",
    ],
    href: "/services/cleaning",
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600",
  },
  {
    id: "handyman",
    title: "Handyman Repairs",
    shortTitle: "Handyman",
    description:
      "General repairs, fixtures, and maintenance. Fix what's broken before buyers notice and negotiate against you.",
    icon: "construction",
    features: [
      "Drywall patching",
      "Fixture replacement",
      "Door adjustments",
      "General repairs",
    ],
    href: "/services/handyman",
    image: "https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=600",
  },
  {
    id: "flooring",
    title: "Carpet & Flooring",
    shortTitle: "Flooring",
    description:
      "Removal, supply, and installation of new flooring. Nothing transforms a space like fresh floors.",
    icon: "grid_view",
    features: [
      "Carpet installation",
      "Laminate flooring",
      "Vinyl plank",
      "Tile work",
    ],
    href: "/services/flooring",
    image: "https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=600",
  },
  {
    id: "painting",
    title: "Interior & Exterior Painting",
    shortTitle: "Painting",
    description:
      "Walls, trim, ceilings, cabinets, siding, decks, and more. Fresh paint is the #1 ROI improvement for sellers.",
    icon: "format_paint",
    features: [
      "Interior walls & trim",
      "Cabinet refinishing",
      "Exterior painting",
      "Deck staining",
    ],
    href: "/services/painting",
    image: "https://images.unsplash.com/photo-1574359411659-15573a27fd0c?w=600",
  },
  {
    id: "curb-appeal",
    title: "Curb Appeal",
    shortTitle: "Curb Appeal",
    description:
      "Mowing, weeding, mulch, pressure washing. First impressions happen before buyers even step inside.",
    icon: "yard",
    features: [
      "Lawn maintenance",
      "Pressure washing",
      "Mulching & beds",
      "Exterior lighting",
    ],
    href: "/services/curb-appeal",
    image: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600",
  },
  {
    id: "staging",
    title: "Staging & Organizing",
    shortTitle: "Staging",
    description:
      "Prepare the offer magnet with professional staging plans. Help buyers visualize themselves in your home.",
    icon: "chair",
    features: [
      "Staging consultation",
      "Furniture arrangement",
      "Decor placement",
      "Photo-ready prep",
    ],
    href: "/services/staging",
    image: "https://images.unsplash.com/photo-1612031736710-4c6a0ff216af?w=600",
  },
  {
    id: "kitchen-bath",
    title: "Kitchen & Bath Updates",
    shortTitle: "Kitchen & Bath",
    description:
      "Strategic updates that maximize ROI. We focus on impactful changes, not full renovations.",
    icon: "countertops",
    features: [
      "Cabinet hardware",
      "Faucet upgrades",
      "Backsplash refresh",
      "Vanity updates",
    ],
    href: "/services/kitchen-bath",
    image: "https://images.unsplash.com/flagged/photo-1573168710465-7f7da9a23a15?w=600",
  },
];

export const featuredServices = services.slice(0, 6);
