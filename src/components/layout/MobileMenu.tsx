"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { HashLink } from "@/components/ui/HashLink";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: { label: string; href: string }[];
  ctaButton: { label: string; href: string };
  phone: string;
  phoneRaw: string;
}

export default function MobileMenu({
  isOpen,
  onClose,
  navLinks,
  ctaButton,
  phone,
  phoneRaw,
}: MobileMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  // Focus trap and escape key handling
  useEffect(() => {
    if (!isOpen) return;

    // Focus the close button when menu opens
    closeButtonRef.current?.focus();

    // Handle escape key
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    // Prevent body scroll when menu is open
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] md:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Mobile navigation menu"
      id="mobile-menu-panel"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy/95 backdrop-blur-md"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Menu Panel */}
      <div
        ref={menuRef}
        className="absolute inset-y-0 right-0 w-full max-w-sm bg-navy border-l border-gold/20 shadow-2xl animate-slide-in-right"
      >
        <div className="flex flex-col h-full p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <Image
              src="/logo/2.png"
              alt="Prep It List It Sell It"
              width={150}
              height={44}
              className="h-10 w-auto"
            />
            <button
              ref={closeButtonRef}
              type="button"
              className="min-h-[44px] min-w-[44px] flex items-center justify-center text-white hover:text-gold transition-colors"
              onClick={onClose}
              aria-label="Close menu"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1">
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.href.startsWith("/#") ? (
                    <HashLink
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between min-h-[52px] px-4 text-lg font-medium text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span>{link.label}</span>
                      <span className="material-symbols-outlined text-gold/60">
                        chevron_right
                      </span>
                    </HashLink>
                  ) : (
                    <Link
                      href={link.href}
                      onClick={onClose}
                      className="flex items-center justify-between min-h-[52px] px-4 text-lg font-medium text-white hover:text-gold hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <span>{link.label}</span>
                      <span className="material-symbols-outlined text-gold/60">
                        chevron_right
                      </span>
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA Section */}
          <div className="pt-6 border-t border-gold/20">
            <Link
              href={ctaButton.href}
              onClick={onClose}
              className="btn btn-primary w-full text-lg mb-4"
            >
              {ctaButton.label}
            </Link>
            <a
              href={`tel:${phoneRaw}`}
              className="flex items-center justify-center gap-2 text-gold font-semibold hover:underline"
            >
              <span className="material-symbols-outlined">call</span>
              {phone}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
