import Image from "next/image";
import { company } from "@/content/company";
import { services } from "@/content/services";
import { testimonials } from "@/content/testimonials";
import { Icon, SectionDivider } from "@/components/ui";
import { TrustIndicators, CTASection } from "@/components/sections";

export default function HomePage() {
  return (
    <div className="relative overflow-x-hidden">
      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 z-[1] pattern-overlay opacity-50" />

        {/* Gold accent glow - hidden on mobile to prevent overflow */}
        <div className="absolute top-1/4 right-0 z-[2] w-48 h-48 sm:w-64 sm:h-64 md:w-96 md:h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 z-[2] w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 bg-gold/5 rounded-full blur-3xl" />

        <div className="relative z-10 container-section">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Badge */}
              <div className="flex justify-center lg:justify-start mb-6">
                <span className="badge badge-gold">
                  Family-Owned | Santa Clarita Valley
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-6 leading-tight">
                The Small Fixes That Add{" "}
                <span className="text-gold-gradient">Thousands to Your Sale Price</span>
              </h1>

              {/* Tagline */}
              <p className="text-xl sm:text-2xl text-gold font-display italic mb-6">
                Small Jobs. Big Return.
              </p>

              {/* Description */}
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                You have enough on your plate. We handle the painting, repairs, cleaning, and curb appeal — so your home shows its best and you get the offers you deserve. Your neighbors are watching; let&apos;s give them something to talk about.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <a href={`tel:${company.contact.phone.officeRaw}`} className="btn btn-primary text-lg px-8">
                  <Icon name="call" size="sm" />
                  Call Bryan Now
                </a>
                <a href="/get-quote" className="btn btn-secondary text-lg px-8">
                  Get YOUR Free Quote
                </a>
              </div>

              {/* Trust indicators */}
              <TrustIndicators />
            </div>

            {/* Hero Image / Logo Display */}
            <div className="relative hidden lg:block">
              <div className="relative bg-navy-light rounded-2xl p-8 border border-gold/20 shadow-elevated">
                {/* Decorative corner accents */}
                <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-gold rounded-tl-2xl" />
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-gold rounded-tr-2xl" />
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-gold rounded-bl-2xl" />
                <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-gold rounded-br-2xl" />

                <Image
                  src="/logo/2.png"
                  alt="Prep It List It Sell It - Small Jobs = Big Return"
                  width={500}
                  height={300}
                  className="w-full h-auto"
                  priority
                />

                {/* Floating stat cards */}
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-elevated">
                  <div className="text-3xl font-bold text-navy">{company.founded}</div>
                  <div className="text-sm text-navy/60">Founded</div>
                </div>
                <div className="absolute -top-6 -right-6 bg-gold rounded-xl p-4 shadow-gold">
                  <div className="text-3xl font-bold text-navy">24hr</div>
                  <div className="text-sm text-navy/80">Response</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-bounce">
            <span className="material-symbols-outlined text-4xl text-gold/60">
              keyboard_arrow_down
            </span>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          VALUE PROPOSITION BAR
          ============================================ */}
      <section className="relative bg-gold py-6 overflow-hidden">
        <div className="container-section">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-12 text-navy font-semibold">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">home</span>
              <span>Sell Homes Faster</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-navy/30 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">payments</span>
              <span>Get More Money</span>
            </div>
            <div className="hidden sm:block w-2 h-2 bg-navy/30 rounded-full" />
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined">sentiment_satisfied</span>
              <span>Less Stress</span>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          SERVICES SECTION
          ============================================ */}
      <section id="services" className="relative py-20 sm:py-28 bg-background-light">
        <div className="container-section">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="badge badge-gold mb-4">Our Services</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy mb-4">
              Home Prep Services
            </h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              One call delivers access to a full spectrum of home improvement services.
              First impressions count — highlight your home&apos;s best features.
            </p>
          </div>

          {/* Services grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="service-card group"
              >
                {/* Icon */}
                <div className="icon-container mb-4 group-hover:scale-110 transition-transform">
                  <span className="material-symbols-outlined text-2xl">
                    {service.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-navy mb-2">
                  {service.shortTitle}
                </h3>
                <p className="text-navy/60 text-sm mb-4 line-clamp-2">
                  {service.description}
                </p>

                {/* Features preview */}
                <ul className="space-y-1.5">
                  {service.features.slice(0, 2).map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-sm text-navy/70">
                      <span className="material-symbols-outlined text-gold text-sm">check</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <a href="#contact" className="btn btn-gold-outline">
              Get a Free Quote
              <span className="material-symbols-outlined">arrow_forward</span>
            </a>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          HOW IT WORKS SECTION
          ============================================ */}
      <section id="process" className="relative py-20 sm:py-28 bg-navy pattern-overlay">
        <div className="relative z-10 container-section">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="badge badge-gold mb-4">Simple Process</span>
            <h2 className="section-heading mb-4">
              Save Time. Increase Value.
            </h2>
            <p className="section-subheading mx-auto">
              Here&apos;s how we make getting your home market-ready stress-free.
            </p>
          </div>

          {/* Steps */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "1",
                title: "Schedule",
                description: "Book a free property consultation online or by phone.",
                icon: "calendar_month",
              },
              {
                step: "2",
                title: "Get Estimate",
                description: "Receive a detailed estimate within 24 hours tailored to your needs.",
                icon: "description",
              },
              {
                step: "3",
                title: "We Work",
                description: "Work typically begins within 3 days of acceptance.",
                icon: "construction",
              },
              {
                step: "4",
                title: "You Sell",
                description: "We handle it all — less stress, increased marketability.",
                icon: "sell",
              },
            ].map((item, idx) => (
              <div key={idx} className="text-center group">
                {/* Step number */}
                <div className="flex justify-center mb-6">
                  <div className="step-number group-hover:scale-110 transition-transform">
                    {item.step}
                  </div>
                </div>

                {/* Icon */}
                <div className="flex justify-center mb-4">
                  <span className="material-symbols-outlined text-4xl text-gold/60">
                    {item.icon}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/60 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          WHY TRUST US SECTION
          ============================================ */}
      <section className="relative py-20 sm:py-28 bg-navy-dark">
        <div className="container-section">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <span className="badge badge-gold mb-4">Why Choose Us</span>
              <h2 className="section-heading mb-6">
                Why Trust Prep It List It Sell It?
              </h2>
              <p className="text-white/70 text-lg mb-8">
                Selling your home is already a stressful and emotional process.
                You&apos;re under pressure to make important decisions quickly — especially
                when it comes to one of your biggest assets: your home. We are committed
                to earning your 5-star review.
              </p>

              {/* Trust points */}
              <div className="space-y-4">
                {[
                  { icon: "family_restroom", text: "Family-owned and operated since " + company.founded },
                  { icon: "verified_user", text: "Licensed and fully insured" },
                  { icon: "speed", text: "Response within " + company.contact.responseTime },
                  { icon: "handshake", text: "Single point of contact from start to finish" },
                  { icon: "location_on", text: "Local to Santa Clarita Valley" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-gold">{item.icon}</span>
                    </div>
                    <span className="text-white/80">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Stats card */}
            <div className="bg-navy-light rounded-2xl p-8 border border-gold/20">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center p-6 bg-navy rounded-xl">
                  <div className="text-4xl font-bold text-gold mb-1">{company.founded}</div>
                  <div className="text-sm text-white/60">Family-Owned Since</div>
                </div>
                <div className="text-center p-6 bg-navy rounded-xl">
                  <div className="text-4xl font-bold text-gold mb-1">1-24</div>
                  <div className="text-sm text-white/60">Hour Response</div>
                </div>
                <div className="text-center p-6 bg-navy rounded-xl">
                  <div className="flex items-center justify-center gap-0.5 mb-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className="material-symbols-outlined text-2xl text-gold"
                        style={{ fontVariationSettings: '"FILL" 1' }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <div className="text-sm text-white/60">5-Star Reviews</div>
                </div>
                <div className="text-center p-6 bg-navy rounded-xl">
                  <div className="text-4xl font-bold text-gold mb-1">100%</div>
                  <div className="text-sm text-white/60">Satisfaction Goal</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          TESTIMONIALS SECTION
          ============================================ */}
      <section id="testimonials" className="relative py-20 sm:py-28 bg-background-light">
        <div className="container-section">
          {/* Section header */}
          <div className="text-center mb-16">
            <span className="badge badge-gold mb-4">Testimonials</span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-navy mb-4">
              What Clients Say
            </h2>
            <p className="text-lg text-navy/60 max-w-2xl mx-auto">
              Real reviews from homeowners in the Santa Clarita Valley.
            </p>
          </div>

          {/* Testimonials grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-6 shadow-card hover:shadow-elevated transition-shadow"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-4">
                  {[...Array(testimonial.rating)].map((_, idx) => (
                    <span
                      key={idx}
                      className="material-symbols-outlined text-gold text-xl"
                      style={{ fontVariationSettings: '"FILL" 1' }}
                    >
                      star
                    </span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-navy/80 mb-6 leading-relaxed">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-navy/10">
                  <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-gold">person</span>
                  </div>
                  <div>
                    <div className="font-semibold text-navy">{testimonial.author}</div>
                    <div className="text-sm text-navy/50">{testimonial.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          CTA / CONTACT SECTION
          ============================================ */}
      <section id="contact" className="relative py-20 sm:py-28 bg-navy pattern-overlay">
        <div className="relative z-10 container-section">
          <div className="max-w-4xl mx-auto">
            {/* Section header */}
            <div className="text-center mb-12">
              <h2 className="section-heading mb-4">
                Ready to Get Started?
              </h2>
              <p className="section-subheading mx-auto">
                Get a free consultation and estimate. We&apos;ll help you create a plan
                that fits your timeline and budget.
              </p>
            </div>

            {/* Contact options */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {/* Phone CTA */}
              <a
                href={`tel:${company.contact.phone.officeRaw}`}
                className="bg-gold rounded-2xl p-8 text-center hover:bg-gold-light transition-colors group"
              >
                <span className="material-symbols-outlined text-5xl text-navy mb-4 group-hover:scale-110 transition-transform inline-block">
                  call
                </span>
                <div className="text-sm font-semibold text-navy/70 uppercase tracking-wide mb-1">
                  Call Us Now
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-navy">
                  {company.contact.phone.office}
                </div>
              </a>

              {/* Email CTA */}
              <a
                href={`mailto:${company.contact.email}`}
                className="bg-navy-light border border-gold/30 rounded-2xl p-8 text-center hover:border-gold transition-colors group"
              >
                <span className="material-symbols-outlined text-5xl text-gold mb-4 group-hover:scale-110 transition-transform inline-block">
                  mail
                </span>
                <div className="text-sm font-semibold text-white/70 uppercase tracking-wide mb-1">
                  Email Us
                </div>
                <div className="text-xl sm:text-2xl font-bold text-white break-all">
                  {company.contact.email}
                </div>
              </a>
            </div>

            {/* Service area */}
            <div className="text-center">
              <p className="text-white/60 mb-2">Proudly serving</p>
              <p className="text-gold font-semibold">
                {company.serviceAreas.filter(a => a.primary).map(a => a.name).join(" • ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* ============================================
          CTA SECTION
          ============================================ */}
      <CTASection />

    </div>
  );
}
