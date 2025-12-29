import Image from "next/image";
import Link from "next/link";
import { company } from "@/content/company";
import { featuredServices } from "@/content/services";

const quickLinks = [
  { label: "Services", href: "/services" },
  { label: "How It Works", href: "/#process" },
  { label: "Reviews", href: "/#testimonials" },
  { label: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
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
            <p className="text-white/60 text-sm mb-4">{company.description}</p>
            <div className="space-y-1 text-sm text-white/50">
              <div>{company.address.formatted}</div>
              {company.credentials.licensed && company.credentials.insured && (
                <div>Licensed & Insured</div>
              )}
            </div>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer navigation">
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              {featuredServices.slice(0, 4).map((service) => (
                <li key={service.id}>
                  <Link
                    href={service.href}
                    className="text-white/60 hover:text-gold transition-colors text-sm"
                  >
                    {service.shortTitle}
                  </Link>
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
  );
}
