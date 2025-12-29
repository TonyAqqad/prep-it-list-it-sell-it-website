import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({
      name: "companyName",
      title: "Company Name",
      type: "string",
      description: "Your business name as it appears across the site (e.g., 'Prep It List It Sell It Services')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
      description: "Abbreviated name for tight spaces (e.g., 'Prep It List It')",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "A short phrase that appears with your logo (e.g., 'Get Your Home Market-Ready')",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "1-2 sentence description of your business. Used for SEO and social media sharing.",
    }),
    defineField({
      name: "founded",
      title: "Year Founded",
      type: "number",
      description: "The year your business was established (used for trust indicators)",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "object",
      description: "Only enable credentials you can verify. These appear as trust badges on the site.",
      fields: [
        { name: "licensed", title: "Licensed", type: "boolean", description: "Check if you have a valid contractor license" },
        { name: "insured", title: "Insured", type: "boolean", description: "Check if you have liability insurance" },
        { name: "bonded", title: "Bonded", type: "boolean", description: "Check if you have a surety bond" },
      ],
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      description: "Neighborhoods and cities you serve. Primary areas are highlighted on the site.",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Area Name", type: "string", description: "City or neighborhood name (e.g., 'Valencia')" },
            { name: "primary", title: "Primary Area", type: "boolean", description: "Enable for your main service areas" },
          ],
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Site Settings" };
    },
  },
});
