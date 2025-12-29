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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortName",
      title: "Short Name",
      type: "string",
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "founded",
      title: "Year Founded",
      type: "number",
    }),
    defineField({
      name: "credentials",
      title: "Credentials",
      type: "object",
      fields: [
        { name: "licensed", title: "Licensed", type: "boolean" },
        { name: "insured", title: "Insured", type: "boolean" },
        { name: "bonded", title: "Bonded", type: "boolean" },
      ],
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", title: "Area Name", type: "string" },
            { name: "primary", title: "Primary Area", type: "boolean" },
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
