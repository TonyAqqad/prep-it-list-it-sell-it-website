import type { Metadata } from "next";
import { company } from "@/content/company";
import { Breadcrumbs, SectionDivider, Icon, Card } from "@/components/ui";
import { LocationMap } from "@/components/ui/LocationMap";
import { CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: `Contact Us | ${company.name}`,
  description: `Get in touch with ${company.shortName}. Call ${company.contact.phone.office} or email us. We respond within ${company.contact.responseTime}. Serving the Santa Clarita Valley.`,
  openGraph: {
    title: `Contact Us | ${company.name}`,
    description: `Get in touch with ${company.shortName}. Call ${company.contact.phone.office} or email us. We respond within ${company.contact.responseTime}.`,
    type: "website",
  },
};

export default function ContactPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Contact" },
  ];

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gold accent glow - responsive sizes */}
        <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative z-10 container-section">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="text-center mt-8 max-w-3xl mx-auto">
            <span className="badge badge-gold mb-6">Contact Us</span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Get In <span className="text-gold-gradient">Touch</span>
            </h1>

            <p className="text-xl text-white/70 mb-8">
              Ready to get your home market-ready? Reach out today for a free
              consultation. We respond within {company.contact.responseTime}.
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Cards Section */}
      <section className="py-20 sm:py-28 bg-background-light">
        <div className="container-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy mb-4">
              Reach Out Today
            </h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Whether you prefer a quick call or email, we are here to help. Your
              inquiry goes directly to Bryan.
            </p>
          </div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Phone Card */}
            <a
              href={`tel:${company.contact.phone.officeRaw}`}
              aria-label={`Call us at ${company.contact.phone.office}`}
              className="group"
            >
              <Card
                variant="light"
                className="h-full p-8 text-center hover:shadow-elevated transition-all group-hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon name="call" size="lg" className="text-gold" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Call Us</h3>
                <p className="text-navy/60 mb-4">
                  Speak directly with Bryan about your project
                </p>
                <span className="text-2xl font-bold text-gold group-hover:underline">
                  {company.contact.phone.office}
                </span>
              </Card>
            </a>

            {/* Email Card */}
            <a
              href={`mailto:${company.contact.email}`}
              aria-label={`Email us at ${company.contact.email}`}
              className="group"
            >
              <Card
                variant="light"
                className="h-full p-8 text-center hover:shadow-elevated transition-all group-hover:-translate-y-1"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-20 h-20 rounded-2xl bg-gold/10 border border-gold/30 flex items-center justify-center group-hover:bg-gold/20 transition-colors">
                    <Icon name="mail" size="lg" className="text-gold" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-navy mb-2">Email Us</h3>
                <p className="text-navy/60 mb-4">
                  Send us details about your home prep needs
                </p>
                <span className="text-lg font-bold text-gold group-hover:underline break-all">
                  {company.contact.email}
                </span>
              </Card>
            </a>
          </div>

          {/* Response Time Notice */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-3 bg-navy/5 border border-navy/10 rounded-full px-6 py-3">
              <Icon name="schedule" size="sm" className="text-gold" />
              <span className="text-navy/70">
                We respond within{" "}
                <span className="font-semibold text-navy">
                  {company.contact.responseTime}
                </span>
              </span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Service Area Section */}
      <section className="py-20 sm:py-28 bg-navy pattern-overlay">
        <div className="relative z-10 container-section">
          <div className="text-center mb-16">
            <span className="badge badge-gold mb-4">Service Area</span>
            <h2 className="section-heading mb-4">Proudly Serving the Santa Clarita Valley</h2>
            <p className="section-subheading mx-auto">
              Family-owned and locally operated. We know the neighborhoods and
              understand what buyers in this market are looking for.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
            {company.serviceAreas.map((area) => (
              <span
                key={area.name}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  area.primary
                    ? "bg-gold/20 text-gold border border-gold/30"
                    : "bg-white/5 text-white/70 border border-white/10"
                }`}
              >
                {area.name}
              </span>
            ))}
          </div>

          {/* Map */}
          <div className="mt-12 max-w-4xl mx-auto">
            <LocationMap
              query="Santa Clarita Valley, California"
              height={350}
              zoom={10}
              className="border-2 border-gold/20"
            />
          </div>

          {/* Address */}
          <div className="mt-12 text-center">
            <a
              href={company.address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View our location at ${company.address.formatted} on Google Maps`}
              className="inline-flex items-center gap-3 text-white/60 hover:text-gold transition-colors"
            >
              <Icon name="location_on" size="sm" />
              <span>{company.address.formatted}</span>
              <Icon name="open_in_new" size="sm" className="text-gold/60" />
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <CTASection
        heading="Ready to Get Your Home Market-Ready?"
        subheading={`Get a free consultation and estimate. We respond within ${company.contact.responseTime}.`}
      />
    </div>
  );
}
