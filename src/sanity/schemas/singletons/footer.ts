import { defineField, defineType } from "sanity";

export default defineType({
  name: "footer",
  title: "Footer",
  type: "document",
  fields: [
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "label", title: "Label", type: "string" },
            { name: "href", title: "Link", type: "string" },
          ],
        },
      ],
    }),
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: "Use {year} for dynamic year, {company} for company name",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer" };
    },
  },
});
