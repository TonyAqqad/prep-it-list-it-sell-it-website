import { defineField, defineType } from "sanity";

export default defineType({
  name: "navigation",
  title: "Navigation",
  type: "document",
  fields: [
    defineField({
      name: "mainNav",
      title: "Main Navigation Links",
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
      name: "ctaButton",
      title: "CTA Button",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Navigation" };
    },
  },
});
