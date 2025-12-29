import { GoogleMapsEmbed } from "@next/third-parties/google";
import { Icon } from "./Icon";

interface LocationMapProps {
  /** Location query for the map (address or place name) */
  query: string;
  /** Optional height in pixels */
  height?: number;
  /** Optional zoom level (1-20) */
  zoom?: number;
  /** Optional additional CSS classes */
  className?: string;
  /** Show "Open in Google Maps" link below map */
  showLink?: boolean;
}

/**
 * Google Maps embed component for displaying a location.
 * Uses the Maps Embed API via @next/third-parties for optimal performance.
 */
export function LocationMap({
  query,
  height = 400,
  zoom = 12,
  className = "",
  showLink = true,
}: LocationMapProps) {
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  if (!apiKey) {
    return (
      <div
        className={`bg-gray-100 flex items-center justify-center rounded-lg ${className}`}
        style={{ height }}
      >
        <p className="text-gray-500">Map unavailable</p>
      </div>
    );
  }

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;

  return (
    <div className={className}>
      <div className="rounded-lg overflow-hidden shadow-lg">
        <GoogleMapsEmbed
          apiKey={apiKey}
          height={height}
          width="100%"
          mode="place"
          q={query}
          zoom={String(zoom)}
        />
      </div>
      {showLink && (
        <div className="mt-4 text-center">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-gold hover:text-gold/80 hover:underline transition-colors font-medium"
          >
            <Icon name="open_in_new" size="sm" />
            Open in Google Maps
          </a>
        </div>
      )}
    </div>
  );
}
