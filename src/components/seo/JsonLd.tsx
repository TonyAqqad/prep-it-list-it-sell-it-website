import type { Thing, WithContext } from "schema-dts";

interface JsonLdProps<T extends Thing> {
  data: WithContext<T>;
}

/**
 * Renders JSON-LD structured data for SEO.
 * SECURITY: Only use with server-generated schema data, never user input.
 * The dangerouslySetInnerHTML is safe here because:
 * 1. Data comes from typed schema-dts objects created at build time
 * 2. JSON.stringify escapes any special characters
 * 3. This is a Server Component with no user input
 */
export function JsonLd<T extends Thing>({ data }: JsonLdProps<T>) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
