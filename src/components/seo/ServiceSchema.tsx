import type { Service, WithContext } from "schema-dts";
import { company } from "@/content/company";
import { JsonLd } from "./JsonLd";

interface ServiceSchemaProps {
  name: string;
  description: string;
  slug: string;
  image?: string;
}

export function ServiceSchema({ name, description, slug, image }: ServiceSchemaProps) {
  const schema: WithContext<Service> = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `https://prepitlistitsellit.com/services/${slug}`,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: company.name,
      telephone: company.contact.phone.office,
      email: company.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: company.address.street,
        addressLocality: company.address.city,
        addressRegion: company.address.state,
        postalCode: company.address.zip,
        addressCountry: "US",
      },
    },
    areaServed: company.serviceAreas
      .filter((area) => area.primary)
      .map((area) => ({
        "@type": "City" as const,
        name: area.name,
      })),
    ...(image && { image }),
  };

  return <JsonLd data={schema} />;
}
