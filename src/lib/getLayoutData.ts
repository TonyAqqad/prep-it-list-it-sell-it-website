import { sanityFetch } from "@/sanity/lib/fetch";
import { layoutDataQuery } from "@/sanity/lib/queries";
import { company } from "@/content/company";
import { featuredServices } from "@/content/services";

// Types for Sanity response
interface SanityLayoutData {
  siteSettings: {
    companyName: string;
    shortName: string;
    tagline: string;
    description: string;
    founded: number;
    credentials: { licensed: boolean; insured: boolean; bonded: boolean };
    serviceAreas: { name: string; primary: boolean }[];
  } | null;
  contactInfo: {
    phoneOffice: string;
    phoneOfficeRaw: string;
    phoneDirect: string;
    phoneDirectRaw: string;
    email: string;
    responseTime: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      formatted: string;
      googleMapsUrl: string;
    };
  } | null;
  navigation: {
    mainNav: { label: string; href: string }[];
    ctaButton: { label: string; href: string };
  } | null;
  footer: {
    quickLinks: { label: string; href: string }[];
    copyrightText: string;
  } | null;
  services: {
    _id: string;
    title: string;
    shortTitle: string;
    slug: string;
  }[] | null;
}

// Default nav links (fallback)
const defaultNavLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

const defaultCtaButton = { label: "Get Free Quote", href: "/get-quote" };

// Types for the returned layout data
export interface LayoutData {
  navigation: {
    mainNav: { label: string; href: string }[];
    ctaButton: { label: string; href: string };
  };
  contactInfo: {
    phoneOffice: string;
    phoneOfficeRaw: string;
    phoneDirect: string;
    phoneDirectRaw: string;
    email: string;
    address: {
      street: string;
      city: string;
      state: string;
      zip: string;
      formatted: string;
      googleMapsUrl: string;
    };
  };
  siteSettings: {
    companyName: string;
    description: string;
    credentials: { licensed: boolean; insured: boolean; bonded: boolean };
  };
  footer: {
    quickLinks: { label: string; href: string }[];
    copyrightText: string;
  };
  services: {
    _id: string;
    title: string;
    shortTitle: string;
    slug: string;
    href: string;
  }[];
}

export async function getLayoutData(): Promise<LayoutData> {
  const data = await sanityFetch<SanityLayoutData>(layoutDataQuery);

  // Return with fallbacks for each section
  return {
    navigation: {
      mainNav: data?.navigation?.mainNav || defaultNavLinks,
      ctaButton: data?.navigation?.ctaButton || defaultCtaButton,
    },
    contactInfo: {
      phoneOffice: data?.contactInfo?.phoneOffice || company.contact.phone.office,
      phoneOfficeRaw: data?.contactInfo?.phoneOfficeRaw || company.contact.phone.officeRaw,
      phoneDirect: data?.contactInfo?.phoneDirect || company.contact.phone.direct,
      phoneDirectRaw: data?.contactInfo?.phoneDirectRaw || company.contact.phone.directRaw,
      email: data?.contactInfo?.email || company.contact.email,
      address: data?.contactInfo?.address || company.address,
    },
    siteSettings: {
      companyName: data?.siteSettings?.companyName || company.name,
      description: data?.siteSettings?.description || company.description,
      credentials: data?.siteSettings?.credentials || company.credentials,
    },
    footer: {
      quickLinks: data?.footer?.quickLinks || defaultNavLinks,
      copyrightText: data?.footer?.copyrightText || `© {year} {company}. All rights reserved.`,
    },
    services: data?.services?.map((s) => ({
      _id: s._id,
      title: s.title,
      shortTitle: s.shortTitle,
      slug: s.slug,
      href: `/services/${s.slug}`,
    })) || featuredServices.map((s) => ({
      _id: s.id,
      title: s.title,
      shortTitle: s.shortTitle,
      slug: s.id,
      href: s.href,
    })),
  };
}
