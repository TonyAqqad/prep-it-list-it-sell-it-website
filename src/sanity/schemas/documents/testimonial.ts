import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  fields: [
    defineField({
      name: "author",
      title: "Customer Name",
      type: "string",
      description: "The customer's name (e.g., 'John D.' or 'Sarah M.'). Use first name and last initial for privacy.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "Where the customer is from (e.g., 'Valencia, CA'). Helps with local SEO.",
    }),
    defineField({
      name: "quote",
      title: "Testimonial Quote",
      type: "text",
      rows: 4,
      description: "The customer's review in their own words. Keep it authentic and specific about results.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "rating",
      title: "Star Rating",
      type: "number",
      options: {
        list: [1, 2, 3, 4, 5],
      },
      initialValue: 5,
      description: "Rating from 1-5 stars",
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      description: "Turn on to highlight this review on the homepage. Keep 3-5 featured for best display.",
      initialValue: false,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Featured reviews are shown before non-featured.",
    }),
  ],
  preview: {
    select: {
      title: "author",
      subtitle: "quote",
    },
  },
});
