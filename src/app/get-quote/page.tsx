import type { Metadata } from "next";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { Breadcrumbs, SectionDivider, Icon, Card } from "@/components/ui";

export const metadata: Metadata = {
  title: `Get Your Free Quote | ${company.name}`,
  description: `Request a free, no-obligation quote for home preparation services in the Santa Clarita Valley. We respond within ${company.contact.responseTime}.`,
  openGraph: {
    title: `Get Your Free Quote | ${company.name}`,
    description: `Request a free, no-obligation quote for home preparation services in the Santa Clarita Valley.`,
    type: "website",
  },
};

export default function GetQuotePage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Get Quote" },
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gold accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative z-10 container-section">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="text-center mt-8 max-w-3xl mx-auto">
            <span className="badge badge-gold mb-6">Free Estimate</span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Get Your Free <span className="text-gold-gradient">Quote</span>
            </h1>

            <p className="text-xl text-white/70 mb-8">
              Tell us about your project and we will get back to you with a
              detailed estimate. No obligation, no pressure.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Quote Form Section */}
      <section className="py-20 sm:py-28 bg-background-light">
        <div className="container-section">
          <div className="max-w-2xl mx-auto">
            <Card variant="light" className="p-8 sm:p-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-navy mb-2">
                  Request Your Quote
                </h2>
                <p className="text-navy/60">
                  Fill out the form below and we will respond within{" "}
                  {company.contact.responseTime}.
                </p>
              </div>

              <form className="space-y-6">
                {/* Honeypot field for spam prevention */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="website">
                    Leave this field empty
                    <input
                      type="text"
                      id="website"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                    />
                  </label>
                </div>

                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="form-label">
                    Name <span className="text-gold">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="Your full name"
                    className="form-input bg-navy/5 border-navy/10 text-navy placeholder-navy/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="form-label">
                    Phone <span className="text-gold">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder="(555) 123-4567"
                    className="form-input bg-navy/5 border-navy/10 text-navy placeholder-navy/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="form-label">
                    Email <span className="text-navy/40">(optional)</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="you@example.com"
                    className="form-input bg-navy/5 border-navy/10 text-navy placeholder-navy/40 focus:border-gold focus:ring-1 focus:ring-gold"
                  />
                </div>

                {/* Service Dropdown */}
                <div>
                  <label htmlFor="service" className="form-label">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    name="service"
                    className="form-input bg-navy/5 border-navy/10 text-navy focus:border-gold focus:ring-1 focus:ring-gold"
                  >
                    <option value="">Select a service...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.title}
                      </option>
                    ))}
                    <option value="multiple">Multiple Services</option>
                    <option value="not-sure">Not Sure - Need Consultation</option>
                  </select>
                </div>

                {/* Message Textarea */}
                <div>
                  <label htmlFor="message" className="form-label">
                    Tell Us About Your Project
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Describe what you need help with, your timeline, or any questions you have..."
                    className="form-input bg-navy/5 border-navy/10 text-navy placeholder-navy/40 focus:border-gold focus:ring-1 focus:ring-gold resize-y"
                  />
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <button
                    type="submit"
                    className="btn btn-primary w-full text-lg"
                  >
                    <Icon name="send" size="sm" />
                    Request My Free Quote
                  </button>
                </div>

                {/* Trust Message */}
                <p className="text-center text-sm text-navy/50">
                  Free consultation. No obligation.
                </p>
              </form>
            </Card>

            {/* Prefer to Call Section */}
            <div className="mt-12 text-center">
              <p className="text-navy/60 mb-4">Prefer to talk? Call us directly:</p>
              <a
                href={`tel:${company.contact.phone.officeRaw}`}
                aria-label={`Call us at ${company.contact.phone.office}`}
                className="inline-flex items-center gap-3 text-gold font-semibold text-xl hover:underline"
              >
                <Icon name="call" size="md" />
                {company.contact.phone.office}
              </a>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Trust Indicators Section */}
      <section className="py-20 sm:py-28 bg-navy pattern-overlay">
        <div className="relative z-10 container-section">
          <div className="text-center mb-16">
            <h2 className="section-heading mb-4">Why Homeowners Choose Us</h2>
            <p className="section-subheading mx-auto">
              Family-owned, locally operated, and committed to your success.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "verified",
                title:
                  company.credentials.licensed && company.credentials.insured
                    ? "Licensed & Insured"
                    : "Professional Service",
                description:
                  "Peace of mind knowing your project is protected and handled by professionals.",
              },
              {
                icon: "schedule",
                title: "Quick Response",
                description: `We respond to every inquiry within ${company.contact.responseTime}. Your time matters.`,
              },
              {
                icon: "handshake",
                title: "No Pressure",
                description:
                  "Get honest advice and transparent pricing. No pushy sales tactics.",
              },
            ].map((item) => (
              <div key={item.icon} className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center">
                    <Icon name={item.icon} size="lg" className="text-gold" />
                  </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/60">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
