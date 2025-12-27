import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { company } from "@/content/company";
import { Breadcrumbs, SectionDivider, Icon, Card } from "@/components/ui";
import { CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: `Home Prep Services | ${company.name}`,
  description:
    "Complete home preparation services for sellers in Santa Clarita Valley. Painting, repairs, cleaning, staging, and more. One call delivers everything you need.",
  openGraph: {
    title: `Home Prep Services | ${company.name}`,
    description:
      "Complete home preparation services for sellers in Santa Clarita Valley. Painting, repairs, cleaning, staging, and more.",
    type: "website",
  },
};

export default function ServicesPage() {
  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services" },
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
            <span className="badge badge-gold mb-6">Our Services</span>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Complete Home Prep{" "}
              <span className="text-gold-gradient">Services</span>
            </h1>

            <p className="text-xl text-white/70 mb-8">
              One call delivers access to a full spectrum of home improvement
              services. We handle everything so you can focus on what matters
              most - selling your home for top dollar.
            </p>

            <a
              href={`tel:${company.contact.phone.officeRaw}`}
              className="btn btn-primary"
            >
              <Icon name="call" size="sm" />
              Call for Free Quote
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Services Grid Section */}
      <section className="py-20 sm:py-28 bg-background-light">
        <div className="container-section">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy mb-4">
              What We Offer
            </h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Every service is designed to help your home sell faster and for
              more money. Click any service to learn more.
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <Link
                key={service.id}
                href={service.href}
                className="group block"
              >
                <Card
                  variant="light"
                  padding="none"
                  className="h-full overflow-hidden hover:shadow-elevated transition-shadow"
                >
                  {/* Image */}
                  {service.image && (
                    <div className="relative h-40 overflow-hidden">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/60 to-transparent" />

                      {/* Icon overlay */}
                      <div className="absolute bottom-3 left-3">
                        <div className="w-10 h-10 rounded-lg bg-gold flex items-center justify-center">
                          <Icon
                            name={service.icon}
                            size="sm"
                            className="text-navy"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="text-lg font-bold text-navy mb-2 group-hover:text-gold transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-navy/60 text-sm mb-4 line-clamp-2">
                      {service.description}
                    </p>

                    {/* Features preview */}
                    <ul className="space-y-1.5 mb-4">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li
                          key={idx}
                          className="flex items-center gap-2 text-sm text-navy/70"
                        >
                          <Icon
                            name="check"
                            size="sm"
                            className="text-gold flex-shrink-0"
                          />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Learn more link */}
                    <div className="flex items-center gap-1 text-gold font-medium text-sm group-hover:gap-2 transition-all">
                      <span>Learn More</span>
                      <Icon name="arrow_forward" size="sm" />
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Why One Call Section */}
      <section className="py-20 sm:py-28 bg-navy pattern-overlay">
        <div className="relative z-10 container-section">
          <div className="text-center mb-16">
            <span className="badge badge-gold mb-4">Simplified Process</span>
            <h2 className="section-heading mb-4">
              One Call. Everything Handled.
            </h2>
            <p className="section-subheading mx-auto">
              No need to coordinate multiple contractors. We manage every aspect
              of getting your home market-ready.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: "call",
                title: "One Point of Contact",
                description:
                  "Work directly with Bryan from start to finish. No handoffs, no confusion.",
              },
              {
                icon: "handyman",
                title: "Complete Services",
                description:
                  "From painting to repairs to staging - we handle it all under one roof.",
              },
              {
                icon: "schedule",
                title: "Fast Turnaround",
                description:
                  "We understand selling timelines. Work typically begins within 3 days.",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center">
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

      <SectionDivider />

      {/* CTA Section */}
      <CTASection
        heading="Ready to Get Your Home Market-Ready?"
        subheading="Get a free consultation and estimate. We respond within 1-24 hours."
      />
    </div>
  );
}
