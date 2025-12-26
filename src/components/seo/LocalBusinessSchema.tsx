import { company } from "@/content/company";
import type { WithContext, HomeAndConstructionBusiness } from "schema-dts";

/**
 * LocalBusiness JSON-LD Schema Component
 *
 * Outputs structured data for search engines to understand our business.
 * Uses HomeAndConstructionBusiness type (subtype of LocalBusiness) as it's
 * most specific to our home improvement/listing prep services.
 *
 * Server Component - no client-side JavaScript needed.
 */
export default function LocalBusinessSchema() {
  // Build service area array for areaServed
  const serviceAreas = company.serviceAreas.map((area) => ({
    "@type": "City" as const,
    "name": area.name,
    "address": {
      "@type": "PostalAddress" as const,
      "addressRegion": company.address.state,
    },
  }));

  const schema: WithContext<HomeAndConstructionBusiness> = {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    "name": company.name,
    "alternateName": company.shortName,
    "description": company.description,
    "url": "https://prepitlistitsellit.com",
    "logo": "https://prepitlistitsellit.com/logo.png", // Update when logo is added
    "image": "https://prepitlistitsellit.com/og-image.jpg", // Update when OG image is added

    // NAP (Name, Address, Phone)
    "telephone": company.contact.phone.officeRaw,
    "email": company.contact.email,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": company.address.street,
      "addressLocality": company.address.city,
      "addressRegion": company.address.state,
      "postalCode": company.address.zip,
      "addressCountry": "US",
    },

    // Service areas (primary markets in Santa Clarita Valley)
    "areaServed": serviceAreas,

    // Geographic coordinates (Stevenson Ranch office)
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "34.3905", // Approximate - update with exact coords
      "longitude": "-118.5709", // Approximate - update with exact coords
    },

    // Business hours - 24/7 contact availability
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        // 24/7 contact - note explains response within 1-24 hours
      },
    ],

    // Business metadata
    "foundingDate": company.founded.toString(),
    "priceRange": "$$", // Mid-range pricing (update if needed)
  };

  // Add social profiles when available
  if (company.social.facebook) {
    schema.sameAs = [company.social.facebook];
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema, null, 2) }}
    />
  );
}
