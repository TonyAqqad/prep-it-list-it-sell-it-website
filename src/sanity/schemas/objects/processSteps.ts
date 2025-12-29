import { defineField, defineType } from "sanity";

export default defineType({
  name: "processSteps",
  title: "Process Steps Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({
      name: "steps",
      title: "Steps",
      type: "array",
      of: [{
        type: "object",
        fields: [
          { name: "step", title: "Step Number", type: "string" },
          { name: "title", title: "Title", type: "string" },
          { name: "description", title: "Description", type: "text" },
          { name: "icon", title: "Icon", type: "string" },
        ],
      }],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Process Steps", subtitle: "How It Works" };
    },
  },
});
