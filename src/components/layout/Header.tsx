"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "./MobileMenu";
import { HashLink } from "@/components/ui/HashLink";

interface HeaderProps {
  navLinks: { label: string; href: string }[];
  ctaButton: { label: string; href: string };
  phone: string;
  phoneRaw: string;
}

export default function Header({ navLinks, ctaButton, phone, phoneRaw }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
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

            {/* Desktop Navigation */}
            <nav aria-label="Main navigation" className="hidden md:flex items-center gap-2 lg:gap-6">
              {navLinks.map((link) =>
                link.href.startsWith("/#") ? (
                  <HashLink
                    key={link.href}
                    href={link.href}
                    className="min-h-[44px] flex items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </HashLink>
                ) : (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="min-h-[44px] flex items-center px-3 text-sm font-medium text-white/80 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
              <Link href={ctaButton.href} className="btn btn-primary text-sm">
                {ctaButton.label}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden min-h-[44px] min-w-[44px] flex items-center justify-center text-white"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu-panel"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        ctaButton={ctaButton}
        phone={phone}
        phoneRaw={phoneRaw}
      />
    </>
  );
}
