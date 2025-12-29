import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSection",
  title: "Hero Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "headline", title: "Headline", type: "string" }),
    defineField({ name: "headlineHighlight", title: "Headline Highlight", type: "string", description: "Part of headline to highlight in gold" }),
    defineField({ name: "tagline", title: "Tagline", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
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
    select: { title: "headline" },
    prepare({ title }) {
      return { title: title || "Hero Section", subtitle: "Hero" };
    },
  },
});
