import { defineField, defineType } from "sanity";

export default defineType({
  name: "trustSection",
  title: "Trust Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
    defineField({
      name: "trustPoints",
      title: "Trust Points",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "icon", title: "Icon", type: "string" },
          { name: "text", title: "Text", type: "string" },
        ],
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Trust Section", subtitle: "Why Choose Us" };
    },
  },
});
