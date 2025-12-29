"use client";

import { useEffect, useRef } from "react";

interface GHLFormContainerProps {
  /** The GHL iframe src URL (e.g., https://api.leadconnectorhq.com/widget/form/YOUR_FORM_ID) */
  formUrl: string;
  /** Optional title above the form */
  title?: string;
  /** Optional description text */
  description?: string;
  /** Optional minimum height in pixels */
  minHeight?: number;
  /** Optional additional CSS classes */
  className?: string;
}

/**
 * Container component for GoHighLevel (GHL) form embeds.
 * Uses a secure iframe approach with the form URL directly.
 */
export function GHLFormContainer({
  formUrl,
  title,
  description,
  minHeight = 500,
  className = "",
}: GHLFormContainerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  // Handle iframe resize messages from GHL if needed
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Only accept messages from GHL domains
      if (!event.origin.includes("leadconnectorhq.com")) return;

      // Handle height adjustment messages if GHL sends them
      if (event.data?.type === "resize" && event.data?.height) {
        if (iframeRef.current) {
          iframeRef.current.style.height = `${event.data.height}px`;
        }
      }
    };

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden ${className}`}>
      {(title || description) && (
        <div className="bg-navy text-white px-6 py-4">
          {title && (
            <h3 className="text-xl font-display font-bold">{title}</h3>
          )}
          {description && (
            <p className="text-gray-300 text-sm mt-1">{description}</p>
          )}
        </div>
      )}
      <div className="p-4 md:p-6">
        <iframe
          ref={iframeRef}
          src={formUrl}
          style={{
            width: "100%",
            minHeight: `${minHeight}px`,
            border: "none",
          }}
          title={title || "Contact Form"}
          loading="lazy"
          allow="geolocation"
        />
      </div>
    </div>
  );
}
