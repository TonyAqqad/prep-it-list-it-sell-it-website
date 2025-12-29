import { defineField, defineType } from "sanity";

export default defineType({
  name: "service",
  title: "Service",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Service Name",
      type: "string",
      description: "The name of this service (e.g., 'Deep Cleaning', 'Handyman Repairs')",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "shortTitle",
      title: "Short Title",
      type: "string",
      description: "Shorter version for navigation and cards (e.g., 'Deep Clean' instead of 'Deep Cleaning Services')",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      description: "The URL path for this service page. Click 'Generate' to create from title.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "A brief summary (2-3 sentences) shown on the services list page.",
    }),
    defineField({
      name: "icon",
      title: "Icon Name",
      type: "string",
      description: "Material Symbol icon name (e.g., 'cleaning_services', 'handyman'). Find icons at fonts.google.com/icons",
    }),
    defineField({
      name: "image",
      title: "Service Image",
      type: "image",
      options: {
        hotspot: true,
      },
      description: "Photo representing this service. Use the hotspot to set the focal point for cropping.",
    }),
    defineField({
      name: "features",
      title: "Features / What's Included",
      type: "array",
      of: [{ type: "string" }],
      description: "List of what's included in this service (one item per line)",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first. Use 10, 20, 30 to leave room for reordering.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      media: "image",
    },
  },
});
