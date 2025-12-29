import type { Metadata } from "next";
import { serviceAreas, serviceAreasIntro } from "@/content/service-areas";
import { Breadcrumbs, SectionDivider, Card } from "@/components/ui";
import { CTASection } from "@/components/sections";

export const metadata: Metadata = {
  title: "Service Areas | Santa Clarita Valley Home Prep Services",
  description:
    "Prep It List It Sell It serves Santa Clarita, Valencia, Saugus, Canyon Country, Newhall, Stevenson Ranch, Castaic, and Agua Dulce. Local home improvement for listing prep.",
  openGraph: {
    title: "Service Areas | Prep It List It Sell It",
    description:
      "Serving all Santa Clarita Valley neighborhoods with professional home prep services.",
  },
};

export default function ServiceAreasPage() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative pt-32 pb-16 bg-gradient-to-br from-navy via-navy-dark to-navy overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gold accent glow - responsive sizes */}
        <div className="absolute top-1/4 right-0 w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative z-10 container-section">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />

          <div className="text-center mt-8 max-w-3xl mx-auto">
            <span className="badge badge-gold mb-6">Service Areas</span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
              Proudly Serving the{" "}
              <span className="text-gold-gradient">Santa Clarita Valley</span>
            </h1>

            <p className="text-lg sm:text-xl text-white/70 mb-8">
              {serviceAreasIntro.description}
            </p>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Areas Grid */}
      <section className="py-16 sm:py-20 md:py-28 bg-background-light">
        <div className="container-section">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-display font-bold text-navy mb-4">
              Neighborhoods We Serve
            </h2>
            <p className="text-base sm:text-lg text-navy/60 max-w-2xl mx-auto">
              From Valencia to Agua Dulce, we know what buyers in each area are looking for.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {serviceAreas.map((area) => (
              <Card
                key={area.slug}
                variant="light"
                className="p-4 sm:p-6 hover:shadow-elevated transition-all hover:-translate-y-1"
              >
                <h3 className="text-xl sm:text-2xl font-display font-bold text-navy mb-2 sm:mb-3">
                  {area.name}
                </h3>
                <p className="text-sm sm:text-base text-gray-700 mb-3 sm:mb-4">{area.description}</p>
                {area.zipCodes && (
                  <p className="text-xs sm:text-sm text-gray-500 break-words">
                    ZIP codes: {area.zipCodes.join(", ")}
                  </p>
                )}
              </Card>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* CTA Section */}
      <CTASection
        heading="Ready to Prep Your Home?"
        subheading="Whether you're in Valencia or Agua Dulce, we'll help get your home market-ready. Get a free consultation today."
      />
    </main>
  );
}
