import Link from "next/link";
import type { BreadcrumbList, WithContext } from "schema-dts";
import { JsonLd } from "@/components/seo/JsonLd";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  const schema: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href && { item: `https://prepitlistitsellit.com${item.href}` }),
    })),
  };

  return (
    <>
      <JsonLd data={schema} />
      <nav aria-label="Breadcrumb" className="py-md">
        <ol className="flex items-center gap-2 text-small text-white/60">
          {items.map((item, index) => (
            <li key={item.href || item.label} className="flex items-center gap-2">
              {index > 0 && (
                <span className="material-symbols-outlined text-gold/50" style={{ fontSize: '16px' }}>
                  chevron_right
                </span>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-gold transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-white/80">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
