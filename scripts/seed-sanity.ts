// scripts/seed-sanity.ts
import * as dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";
import { company } from "../src/content/company";
import { services } from "../src/content/services";
import { testimonials } from "../src/content/testimonials";

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  token: process.env.SANITY_API_WRITE_TOKEN!,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seed() {
  console.log("Seeding Sanity...");

  // Site Settings
  await client.createOrReplace({
    _id: "siteSettings",
    _type: "siteSettings",
    companyName: company.name,
    shortName: company.shortName,
    tagline: company.tagline,
    description: company.description,
    founded: company.founded,
    credentials: company.credentials,
    serviceAreas: company.serviceAreas,
  });
  console.log("✓ Site Settings");

  // Contact Info
  await client.createOrReplace({
    _id: "contactInfo",
    _type: "contactInfo",
    phoneOffice: company.contact.phone.office,
    phoneOfficeRaw: company.contact.phone.officeRaw,
    phoneDirect: company.contact.phone.direct,
    phoneDirectRaw: company.contact.phone.directRaw,
    email: company.contact.email,
    responseTime: company.contact.responseTime,
    address: company.address,
  });
  console.log("✓ Contact Info");

  // Navigation
  await client.createOrReplace({
    _id: "navigation",
    _type: "navigation",
    mainNav: [
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/#process" },
      { label: "Reviews", href: "/#testimonials" },
      { label: "Contact", href: "/contact" },
    ],
    ctaButton: { label: "Get Free Quote", href: "/get-quote" },
  });
  console.log("✓ Navigation");

  // Footer
  await client.createOrReplace({
    _id: "footer",
    _type: "footer",
    quickLinks: [
      { label: "Services", href: "/services" },
      { label: "How It Works", href: "/#process" },
      { label: "Reviews", href: "/#testimonials" },
      { label: "Contact", href: "/contact" },
    ],
    copyrightText: "© {year} {company}. All rights reserved.",
  });
  console.log("✓ Footer");

  // Services
  for (let i = 0; i < services.length; i++) {
    const service = services[i];
    await client.createOrReplace({
      _id: `service-${service.id}`,
      _type: "service",
      title: service.title,
      shortTitle: service.shortTitle,
      slug: { _type: "slug", current: service.id },
      description: service.description,
      icon: service.icon,
      features: service.features,
      order: i,
    });
  }
  console.log(`✓ ${services.length} Services`);

  // Testimonials
  for (let i = 0; i < testimonials.length; i++) {
    const testimonial = testimonials[i];
    await client.createOrReplace({
      _id: `testimonial-${testimonial.id}`,
      _type: "testimonial",
      author: testimonial.author,
      location: testimonial.location,
      quote: testimonial.quote,
      rating: testimonial.rating,
      featured: true,
      order: i,
    });
  }
  console.log(`✓ ${testimonials.length} Testimonials`);

  console.log("\nSeeding complete!");
}

seed().catch(console.error);
