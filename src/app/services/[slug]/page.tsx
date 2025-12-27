import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { services } from "@/content/services";
import { company } from "@/content/company";
import { ServiceSchema } from "@/components/seo";
import { Breadcrumbs, SectionDivider, Icon, Card } from "@/components/ui";
import { CTASection } from "@/components/sections";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return services.map((service) => ({
    slug: service.id,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  return {
    title: `${service.title} | ${company.name}`,
    description: service.description,
    openGraph: {
      title: `${service.title} | ${company.name}`,
      description: service.description,
      type: "website",
      ...(service.image && { images: [service.image] }),
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = services.find((s) => s.id === slug);

  if (!service) {
    notFound();
  }

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: service.shortTitle },
  ];

  return (
    <div className="relative">
      {/* JSON-LD Schema */}
      <ServiceSchema
        name={service.title}
        description={service.description}
        slug={service.id}
        image={service.image}
      />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gold accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />

        <div className="relative z-10 container-section">
          <Breadcrumbs items={breadcrumbItems} />

          <div className="grid lg:grid-cols-2 gap-12 items-center mt-8">
            {/* Content */}
            <div>
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gold/10 border border-gold/30 mb-6">
                <Icon name={service.icon} size="lg" className="text-gold" />
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
                {service.title}
              </h1>

              <p className="text-xl text-white/70 mb-8 max-w-xl">
                {service.description}
              </p>

              {/* CTA */}
              <div className="flex flex-wrap gap-4">
                <a
                  href={`tel:${company.contact.phone.officeRaw}`}
                  className="btn btn-primary"
                >
                  <Icon name="call" size="sm" />
                  Call for Free Quote
                </a>
                <Link href="/services" className="btn btn-secondary">
                  View All Services
                </Link>
              </div>
            </div>

            {/* Image */}
            {service.image && (
              <div className="relative hidden lg:block">
                <div className="relative rounded-2xl overflow-hidden border border-gold/20 shadow-elevated">
                  <Image
                    src={service.image}
                    alt={service.title}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  {/* Decorative overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
                </div>

                {/* Floating badge */}
                <div className="absolute -bottom-4 -right-4 bg-gold rounded-xl px-4 py-2 shadow-gold">
                  <div className="text-sm font-semibold text-navy">
                    Free Estimates
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* What's Included Section */}
      <section className="py-20 sm:py-28 bg-background-light">
        <div className="container-section">
          <div className="text-center mb-16">
            <span className="badge badge-gold mb-4">What We Do</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy mb-4">
              What&apos;s Included
            </h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Our {service.shortTitle.toLowerCase()} service includes everything
              you need to get your home ready for listing.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {service.features.map((feature, idx) => (
              <Card key={idx} variant="light" padding="lg" className="text-center">
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                    <Icon name="check_circle" size="md" className="text-gold" filled />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-navy">{feature}</h3>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Why Choose Us Section */}
      <section className="py-20 sm:py-28 bg-navy pattern-overlay">
        <div className="relative z-10 container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="badge badge-gold mb-4">Why Choose Us</span>
              <h2 className="section-heading mb-6">
                Professional {service.shortTitle} You Can Trust
              </h2>
              <p className="text-white/70 text-lg mb-8">
                When you hire Prep It List It Sell It for your{" "}
                {service.shortTitle.toLowerCase()} needs, you get a family-owned
                team that cares about your home as much as you do. We focus on
                quality workmanship that helps your home sell faster and for
                more money.
              </p>

              <div className="space-y-4">
                {[
                  {
                    icon: "schedule",
                    text: `Response within ${company.contact.responseTime}`,
                  },
                  {
                    icon: "handshake",
                    text: "Single point of contact - work with Bryan directly",
                  },
                  {
                    icon: "verified_user",
                    text: "Licensed and fully insured",
                  },
                  {
                    icon: "location_on",
                    text: "Local to Santa Clarita Valley",
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <Icon name={item.icon} className="text-gold" />
                    </div>
                    <span className="text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats */}
            <div className="bg-navy-light rounded-2xl p-8 border border-gold/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-navy rounded-xl">
                  <div className="text-4xl font-bold text-gold mb-1">
                    {company.founded}
                  </div>
                  <div className="text-sm text-white/60">Family-Owned Since</div>
                </div>
                <div className="text-center p-6 bg-navy rounded-xl">
                  <div className="text-4xl font-bold text-gold mb-1">1-24</div>
                  <div className="text-sm text-white/60">Hour Response</div>
                </div>
                <div className="text-center p-6 bg-navy rounded-xl col-span-2">
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Icon
                        key={star}
                        name="star"
                        size="md"
                        className="text-gold"
                        filled
                      />
                    ))}
                  </div>
                  <div className="text-sm text-white/60">
                    5-Star Customer Reviews
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <CTASection
        heading={`Ready for ${service.shortTitle} Help?`}
        subheading={`Get a free estimate for your ${service.shortTitle.toLowerCase()} project. One call, everything handled.`}
      />
    </div>
  );
}
