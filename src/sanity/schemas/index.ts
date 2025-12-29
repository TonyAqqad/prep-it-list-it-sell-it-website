// Singletons
import siteSettings from "./singletons/siteSettings";
import contactInfo from "./singletons/contactInfo";
import navigation from "./singletons/navigation";
import footer from "./singletons/footer";

// Documents
import service from "./documents/service";
import testimonial from "./documents/testimonial";
import page from "./documents/page";

// Objects (page sections)
import heroSection from "./objects/heroSection";
import servicesGrid from "./objects/servicesGrid";
import processSteps from "./objects/processSteps";
import trustSection from "./objects/trustSection";
import testimonialsSection from "./objects/testimonialsSection";
import ctaSection from "./objects/ctaSection";

export const schemaTypes = [
  // Singletons
  siteSettings,
  contactInfo,
  navigation,
  footer,
  // Documents
  service,
  testimonial,
  page,
  // Objects
  heroSection,
  servicesGrid,
  processSteps,
  trustSection,
  testimonialsSection,
  ctaSection,
];
