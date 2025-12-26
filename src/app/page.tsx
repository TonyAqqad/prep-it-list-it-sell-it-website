import Link from "next/link";
import Image from "next/image";
import { company } from "@/content/company";
import { services, featuredServices } from "@/content/services";
import { testimonials } from "@/content/testimonials";

export default function HomePage() {
  return (
    <div className="relative">
      {/* ============================================
          HEADER NAVIGATION
          ============================================ */}
      <header className="fixed top-0 left-0 right-0 z-50 no-print">
        <div className="container-section py-4">
          <div className="backdrop-blur-safe bg-navy/90 border border-gold/20 rounded-xl px-6 py-3 flex items-center justify-between shadow-elevated">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity">
              <Image
                src="/logo/2.png"
                alt="Prep It List It Sell It"
                width={180}
                height={52}
                className="h-10 sm:h-12 w-auto"
                priority
              />
            </Link>

            {/* Navigation */}
            <nav aria-label="Main navigation" className="flex items-center gap-2 sm:gap-6">
              <a
                href="#services"
                className="hidden md:flex min-h-[44px] items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
              >
                Services
              </a>
              <a
                href="#process"
                className="hidden md:flex min-h-[44px] items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
              >
                How It Works
              </a>
              <a
                href="#testimonials"
                className="hidden lg:flex min-h-[44px] items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
              >
                Reviews
              </a>
              <a href="#contact" className="btn btn-primary text-sm">
                Get Free Quote
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* ============================================
          HERO SECTION
          ============================================ */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-dark to-navy" />

        {/* Subtle pattern */}
        <div className="absolute inset-0 pattern-overlay opacity-50" />

        {/* Gold accent glow */}
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gold/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />

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
                Home Prep Services{" "}
                <span className="text-gold-gradient">Made Easy</span>
              </h1>

              {/* Tagline */}
              <p className="text-xl sm:text-2xl text-gold font-display italic mb-6">
                {company.tagline}
              </p>

              {/* Description */}
              <p className="text-lg text-white/70 mb-8 max-w-xl mx-auto lg:mx-0">
                We help homeowners and real estate professionals get market-ready fast.
                Smart fixes, clean execution, and a smoother sale. One call does it all.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
                <a href="#contact" className="btn btn-primary text-lg px-8">
                  <span className="material-symbols-outlined">calendar_month</span>
                  Schedule Consultation
                </a>
                <a
                  href={`tel:${company.contact.phone.officeRaw}`}
                  className="btn btn-outline text-lg px-8"
                >
                  <span className="material-symbols-outlined">call</span>
                  {company.contact.phone.office}
                </a>
              </div>

              {/* Trust indicators */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm text-white/60">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gold text-xl">verified</span>
                  <span>Licensed & Insured</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gold text-xl">schedule</span>
                  <span>Response in {company.contact.responseTime}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-gold text-xl">star</span>
                  <span>5-Star Reviews</span>
                </div>
              </div>
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

      {/* ============================================
          FOOTER
          ============================================ */}
      <footer className="bg-navy-dark py-16">
        <div className="container-section">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            {/* Company info */}
            <div className="sm:col-span-2 lg:col-span-1">
              <Image
                src="/logo/2.png"
                alt="Prep It List It Sell It"
                width={200}
                height={60}
                className="h-12 w-auto mb-4"
              />
              <p className="text-white/60 text-sm mb-4">
                {company.description}
              </p>
              <div className="space-y-1 text-sm text-white/50">
                <div>{company.address.formatted}</div>
                <div>Licensed & Insured</div>
              </div>
            </div>

            {/* Quick links */}
            <div>
              <h3 className="text-white font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                {["Services", "How It Works", "Reviews", "Contact"].map((link) => (
                  <li key={link}>
                    <a
                      href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                      className="text-white/60 hover:text-gold transition-colors text-sm"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h3 className="text-white font-semibold mb-4">Services</h3>
              <ul className="space-y-2">
                {featuredServices.slice(0, 4).map((service) => (
                  <li key={service.id}>
                    <span className="text-white/60 text-sm">{service.shortTitle}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h3 className="text-white font-semibold mb-4">Contact</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <a
                    href={`tel:${company.contact.phone.officeRaw}`}
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Office: {company.contact.phone.office}
                  </a>
                </div>
                <div>
                  <a
                    href={`tel:${company.contact.phone.directRaw}`}
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Direct: {company.contact.phone.direct}
                  </a>
                </div>
                <div>
                  <a
                    href={`mailto:${company.contact.email}`}
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    Email Us
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/10 text-center">
            <p className="text-white/40 text-sm">
              &copy; {new Date().getFullYear()} {company.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* ============================================
          STICKY MOBILE CTA
          ============================================ */}
      <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden no-print pb-safe">
        <div className="bg-navy/95 backdrop-blur-md border-t border-gold/20 px-4 py-3">
          <div className="flex items-center gap-3">
            <a
              href={`tel:${company.contact.phone.officeRaw}`}
              className="flex-1 btn btn-primary justify-center min-h-[48px]"
            >
              <span className="material-symbols-outlined">call</span>
              <span>Call Now</span>
            </a>
            <a
              href="#contact"
              className="flex-1 btn btn-secondary justify-center min-h-[48px]"
            >
              <span className="material-symbols-outlined">mail</span>
              <span>Get Quote</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
