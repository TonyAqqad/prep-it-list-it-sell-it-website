import { defineField, defineType } from "sanity";

export default defineType({
  name: "contactInfo",
  title: "Contact Information",
  type: "document",
  fields: [
    defineField({
      name: "phoneOffice",
      title: "Office Phone",
      type: "string",
      description: "Primary business phone with formatting (e.g., '(661) 123-4567')",
    }),
    defineField({
      name: "phoneOfficeRaw",
      title: "Office Phone (Raw)",
      type: "string",
      description: "Same number without formatting for click-to-call links (e.g., '+16611234567')",
    }),
    defineField({
      name: "phoneDirect",
      title: "Direct Phone",
      type: "string",
      description: "Direct line or cell phone with formatting",
    }),
    defineField({
      name: "phoneDirectRaw",
      title: "Direct Phone (Raw)",
      type: "string",
      description: "Direct line without formatting for click-to-call links",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      description: "Main contact email where form submissions are sent",
    }),
    defineField({
      name: "responseTime",
      title: "Response Time",
      type: "string",
      description: "How quickly you respond to inquiries (e.g., '1-24 hours')",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      description: "Your business address (shown in footer and used for local SEO)",
      fields: [
        { name: "street", title: "Street", type: "string", description: "Street address" },
        { name: "city", title: "City", type: "string", description: "City name" },
        { name: "state", title: "State", type: "string", description: "State abbreviation (e.g., 'CA')" },
        { name: "zip", title: "ZIP", type: "string", description: "5-digit ZIP code" },
        { name: "formatted", title: "Formatted Address", type: "string", description: "Full address as one line for display" },
        { name: "googleMapsUrl", title: "Google Maps URL", type: "url", description: "Link to your location on Google Maps" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Information" };
    },
  },
});
