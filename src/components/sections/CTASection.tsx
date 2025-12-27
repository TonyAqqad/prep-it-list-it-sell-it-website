import { Icon } from "@/components/ui";
import { company } from "@/content/company";

interface CTASectionProps {
  heading?: string;
  subheading?: string;
}

export function CTASection({
  heading = "Ready to Get Started?",
  subheading = "One call. Everything handled. Let's get your home market-ready.",
}: CTASectionProps) {
  return (
    <section className="py-2xl bg-navy-dark">
      <div className="container-section text-center">
        <h2 className="section-heading mb-md">{heading}</h2>
        <p className="section-subheading mx-auto mb-xl">{subheading}</p>

        <div className="flex flex-col sm:flex-row justify-center gap-lg">
          {/* Phone Card */}
          <a
            href={`tel:${company.contact.phone.officeRaw}`}
            className="card card-gold p-lg flex items-center gap-md hover:scale-105 transition-transform"
          >
            <div className="icon-container">
              <Icon name="call" size="lg" />
            </div>
            <div className="text-left">
              <div className="text-small text-white/60">Call Bryan Now</div>
              <div className="text-title text-gold">{company.contact.phone.office}</div>
            </div>
          </a>

          {/* Email Card */}
          <a
            href={`mailto:${company.contact.email}`}
            className="card card-gold p-lg flex items-center gap-md hover:scale-105 transition-transform"
          >
            <div className="icon-container">
              <Icon name="mail" size="lg" />
            </div>
            <div className="text-left">
              <div className="text-small text-white/60">Email Us</div>
              <div className="text-lead text-gold">{company.contact.email}</div>
            </div>
          </a>
        </div>

        <p className="mt-lg text-small text-white/50">
          We respond within 1-24 hours. Your call goes directly to Bryan.
        </p>
      </div>
    </section>
  );
}
