import { defineField, defineType } from "sanity";

export default defineType({
  name: "servicesGrid",
  title: "Services Grid Section",
  type: "object",
  fields: [
    defineField({ name: "badge", title: "Badge Text", type: "string" }),
    defineField({ name: "heading", title: "Heading", type: "string" }),
    defineField({ name: "subheading", title: "Subheading", type: "text", rows: 2 }),
    defineField({ name: "showAllServices", title: "Show All Services", type: "boolean", initialValue: true }),
    defineField({
      name: "selectedServices",
      title: "Selected Services",
      type: "array",
      of: [{ type: "reference", to: [{ type: "service" }] }],
      hidden: ({ parent }) => parent?.showAllServices,
    }),
    defineField({ name: "ctaLabel", title: "CTA Label", type: "string" }),
    defineField({ name: "ctaHref", title: "CTA Link", type: "string" }),
  ],
  preview: {
    prepare() {
      return { title: "Services Grid", subtitle: "Service Cards" };
    },
  },
});
