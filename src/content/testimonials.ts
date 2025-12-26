// Testimonials - Real reviews from current website

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  location: string;
  rating: number;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote:
      "From my first call to get a free estimate to the end result, Bryan was right on time, provided me with updates, and went above and beyond by doing extra work with no extra charges. Extremely satisfied!",
    author: "Steve Miles",
    location: "Santa Clarita",
    rating: 5,
    featured: false,
  },
  {
    id: 2,
    quote:
      "We had the exterior of our house painted and couldn't be happier with the results! The experience was smooth and professional. Bryan and his team were fantastic — fast service, outstanding attention to detail. The pricing was very competitive for the quality provided.",
    author: "Dina Atmali",
    location: "Valencia",
    rating: 5,
    featured: true,
  },
  {
    id: 3,
    quote:
      "Super dependable, honest, and excellent work. Bryan and his team are kind and professional; you can depend on them to get the job done at the highest quality while still being affordable and very competitively priced.",
    author: "Marie Brennan",
    location: "Stevenson Ranch",
    rating: 5,
    featured: false,
  },
];

export const featuredTestimonial = testimonials.find((t) => t.featured) || testimonials[0];
