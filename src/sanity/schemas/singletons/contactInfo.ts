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
    }),
    defineField({
      name: "phoneOfficeRaw",
      title: "Office Phone (Raw)",
      type: "string",
      description: "Phone number without formatting for tel: links",
    }),
    defineField({
      name: "phoneDirect",
      title: "Direct Phone",
      type: "string",
    }),
    defineField({
      name: "phoneDirectRaw",
      title: "Direct Phone (Raw)",
      type: "string",
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
    }),
    defineField({
      name: "responseTime",
      title: "Response Time",
      type: "string",
      description: 'e.g., "1-24 hours"',
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        { name: "street", title: "Street", type: "string" },
        { name: "city", title: "City", type: "string" },
        { name: "state", title: "State", type: "string" },
        { name: "zip", title: "ZIP", type: "string" },
        { name: "formatted", title: "Formatted Address", type: "string" },
        { name: "googleMapsUrl", title: "Google Maps URL", type: "url" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Contact Information" };
    },
  },
});
