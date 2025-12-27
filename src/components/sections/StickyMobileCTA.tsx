import { Icon } from "@/components/ui";
import { company } from "@/content/company";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden safe-area-inset-bottom no-print">
      <div className="bg-navy-dark/95 backdrop-blur-safe border-t border-gold/20 px-4 py-3">
        <div className="flex gap-3">
          <a
            href={`tel:${company.contact.phone.officeRaw}`}
            className="btn btn-primary flex-1 justify-center"
          >
            <Icon name="call" size="sm" />
            Call Now
          </a>
          <a
            href="/get-quote"
            className="btn btn-secondary flex-1 justify-center"
          >
            <Icon name="edit_note" size="sm" />
            Get Quote
          </a>
        </div>
      </div>
    </div>
  );
}
