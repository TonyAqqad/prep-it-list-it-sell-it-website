import { defineField, defineType } from "sanity";

export default defineType({
  name: "ctaSection",
  title: "CTA Section",
  type: "object",
  fields: [
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "primaryCta",
      title: "Primary CTA",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
        { name: "icon", title: "Icon", type: "string" },
      ],
    }),
    defineField({
      name: "secondaryCta",
      title: "Secondary CTA",
      type: "object",
      fields: [
        { name: "label", title: "Label", type: "string" },
        { name: "href", title: "Link", type: "string" },
      ],
    }),
  ],
  preview: {
    select: { title: "heading" },
    prepare({ title }) {
      return { title: title || "CTA Section", subtitle: "Call to Action" };
    },
  },
});
