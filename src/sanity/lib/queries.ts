// src/sanity/lib/queries.ts
import { groq } from "next-sanity";

// Singleton queries
export const siteSettingsQuery = groq`*[_type == "siteSettings"][0]{
  companyName,
  shortName,
  tagline,
  description,
  founded,
  credentials,
  serviceAreas
}`;

export const contactInfoQuery = groq`*[_type == "contactInfo"][0]{
  phoneOffice,
  phoneOfficeRaw,
  phoneDirect,
  phoneDirectRaw,
  email,
  responseTime,
  address
}`;

export const navigationQuery = groq`*[_type == "navigation"][0]{
  mainNav,
  ctaButton
}`;

export const footerQuery = groq`*[_type == "footer"][0]{
  quickLinks,
  copyrightText
}`;

// Collection queries
export const allServicesQuery = groq`*[_type == "service"] | order(order asc){
  _id,
  title,
  shortTitle,
  "slug": slug.current,
  description,
  icon,
  features,
  "image": image.asset->url
}`;

export const serviceBySlugQuery = groq`*[_type == "service" && slug.current == $slug][0]{
  _id,
  title,
  shortTitle,
  "slug": slug.current,
  description,
  icon,
  features,
  "image": image.asset->url
}`;

export const featuredTestimonialsQuery = groq`*[_type == "testimonial" && featured == true] | order(order asc){
  _id,
  author,
  location,
  quote,
  rating
}`;

export const allTestimonialsQuery = groq`*[_type == "testimonial"] | order(order asc){
  _id,
  author,
  location,
  quote,
  rating,
  featured
}`;

// Page query with resolved sections
export const pageBySlugQuery = groq`*[_type == "page" && slug.current == $slug][0]{
  title,
  "slug": slug.current,
  seo,
  sections[]{
    _type,
    ...,
    // Resolve service references in servicesGrid
    _type == "servicesGrid" => {
      ...,
      "selectedServices": selectedServices[]->{
        _id,
        title,
        shortTitle,
        "slug": slug.current,
        description,
        icon,
        features,
        "image": image.asset->url
      }
    },
    // Resolve testimonial references
    _type == "testimonialsSection" => {
      ...,
      "selectedTestimonials": selectedTestimonials[]->{
        _id,
        author,
        location,
        quote,
        rating
      }
    }
  }
}`;

// Combined query for layout components
export const layoutDataQuery = groq`{
  "siteSettings": *[_type == "siteSettings"][0]{
    companyName,
    shortName,
    tagline,
    description,
    founded,
    credentials,
    serviceAreas
  },
  "contactInfo": *[_type == "contactInfo"][0]{
    phoneOffice,
    phoneOfficeRaw,
    phoneDirect,
    phoneDirectRaw,
    email,
    responseTime,
    address
  },
  "navigation": *[_type == "navigation"][0]{
    mainNav,
    ctaButton
  },
  "footer": *[_type == "footer"][0]{
    quickLinks,
    copyrightText
  },
  "services": *[_type == "service"] | order(order asc){
    _id,
    title,
    shortTitle,
    "slug": slug.current
  }
}`;
