import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonialsSection",
  title: "Testimonials Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({ name: "showFeaturedOnly", title: "Show Featured Only", type: "boolean", initialValue: true }),
    defineField({
      name: "selectedTestimonials",
      title: "Selected Testimonials",
      type: "array",
      of: [{ type: "reference", to: [{ type: "testimonial" }] }],
      hidden: ({ parent }) => parent?.showFeaturedOnly,
    }),
  ],
  preview: {
    prepare() {
      return { title: "Testimonials Section", subtitle: "Customer Reviews" };
    },
  },
});
