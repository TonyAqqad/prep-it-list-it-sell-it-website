/**
 * Prep It List It Sell It - Brand Logo Component
 *
 * Variants:
 * - wordmark: Full stacked text blocks (default)
 * - icon: House icon only
 * - inline: Horizontal text layout
 * - stacked: Vertical stacked blocks
 *
 * The logo uses the signature zine-style aesthetic with
 * rotated blocks and bold typography.
 */

import { type FC } from "react";

interface LogoProps {
  variant?: "wordmark" | "icon" | "inline" | "stacked";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  showIcon?: boolean;
}

const sizeMap = {
  sm: { wordmark: "h-8", icon: "h-8 w-8", text: "text-xs" },
  md: { wordmark: "h-10", icon: "h-10 w-10", text: "text-sm" },
  lg: { wordmark: "h-12", icon: "h-12 w-12", text: "text-base" },
  xl: { wordmark: "h-16", icon: "h-16 w-16", text: "text-lg" },
};

export const Logo: FC<LogoProps> = ({
  variant = "wordmark",
  size = "md",
  className = "",
  showIcon = true,
}) => {
  const sizes = sizeMap[size];

  // Icon-only variant
  if (variant === "icon") {
    return (
      <div className={`${sizes.icon} ${className}`}>
        <LogoIcon />
      </div>
    );
  }

  // Inline text variant
  if (variant === "inline") {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {showIcon && (
          <div className={sizes.icon}>
            <LogoIcon />
          </div>
        )}
        <span
          className={`font-display font-black tracking-tight text-white ${sizes.text}`}
        >
          PREP IT{" "}
          <span className="text-primary">LIST IT</span>{" "}
          SELL IT
        </span>
      </div>
    );
  }

  // Stacked variant (vertical blocks)
  if (variant === "stacked") {
    return (
      <div className={`flex items-start gap-3 ${className}`}>
        {showIcon && (
          <div className={sizes.icon}>
            <LogoIcon />
          </div>
        )}
        <div className="flex flex-col gap-1">
          <LogoBlockPrepIt size={size} />
          <LogoBlockListIt size={size} />
          <LogoBlockSellIt size={size} />
        </div>
      </div>
    );
  }

  // Default: Wordmark with staggered blocks
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative flex items-center">
        {/* Staggered text blocks */}
        <div className="flex flex-col -space-y-1">
          <div style={{ transform: "rotate(-3deg)" }}>
            <LogoBlockPrepIt size={size} />
          </div>
          <div
            style={{ transform: "rotate(2deg) translateX(8px)" }}
          >
            <LogoBlockListIt size={size} variant="outline" />
          </div>
          <div style={{ transform: "rotate(-4deg)" }}>
            <LogoBlockSellIt size={size} />
          </div>
        </div>

        {/* House icon */}
        {showIcon && (
          <div
            className={`${sizes.icon} ml-4`}
            style={{ transform: "rotate(-6deg)" }}
          >
            <LogoIcon />
          </div>
        )}
      </div>
    </div>
  );
};

// ============================================
// Sub-components: Individual logo blocks
// ============================================

interface BlockProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "solid" | "outline";
}

const blockSizes = {
  sm: "px-2 py-0.5 text-[10px]",
  md: "px-3 py-1 text-xs",
  lg: "px-4 py-1.5 text-sm",
  xl: "px-5 py-2 text-base",
};

export const LogoBlockPrepIt: FC<BlockProps> = ({
  size = "md",
  variant = "solid",
}) => {
  const baseClasses = `inline-block font-display font-black uppercase tracking-wide ${blockSizes[size]}`;

  if (variant === "outline") {
    return (
      <span
        className={`${baseClasses} bg-transparent border-2 border-primary text-primary`}
      >
        PREP IT
      </span>
    );
  }

  return (
    <span
      className={`${baseClasses} bg-primary text-background-dark border-2 border-background-dark`}
      style={{ boxShadow: "3px 3px 0 0 rgba(0,0,0,0.2)" }}
    >
      PREP IT
    </span>
  );
};

export const LogoBlockListIt: FC<BlockProps> = ({
  size = "md",
  variant = "outline",
}) => {
  const baseClasses = `inline-block font-display font-black uppercase tracking-wide ${blockSizes[size]}`;

  if (variant === "solid") {
    return (
      <span
        className={`${baseClasses} bg-primary text-background-dark border-2 border-background-dark`}
        style={{ boxShadow: "3px 3px 0 0 rgba(0,0,0,0.2)" }}
      >
        LIST IT
      </span>
    );
  }

  return (
    <span
      className={`${baseClasses} bg-transparent border-2 border-primary text-primary`}
    >
      LIST IT
    </span>
  );
};

export const LogoBlockSellIt: FC<BlockProps> = ({
  size = "md",
  variant = "solid",
}) => {
  const baseClasses = `inline-block font-display font-black uppercase tracking-wide ${blockSizes[size]}`;

  if (variant === "outline") {
    return (
      <span
        className={`${baseClasses} bg-transparent border-2 border-primary text-primary`}
      >
        SELL IT
      </span>
    );
  }

  return (
    <span
      className={`${baseClasses} bg-primary text-background-dark border-2 border-background-dark`}
      style={{ boxShadow: "3px 3px 0 0 rgba(0,0,0,0.2)" }}
    >
      SELL IT
    </span>
  );
};

// ============================================
// Logo Icon Component (Inline SVG)
// ============================================

export const LogoIcon: FC<{ className?: string }> = ({ className = "" }) => (
  <svg
    viewBox="0 0 80 80"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-full h-full ${className}`}
    aria-hidden="true"
  >
    {/* Main house group - rotated for zine effect */}
    <g transform="rotate(-6, 40, 42)">
      {/* Shadow layer */}
      <g transform="translate(4, 4)" opacity="0.25">
        <rect x="18" y="38" width="44" height="34" fill="#000" />
        <polygon points="40,12 12,42 68,42" fill="#000" />
      </g>

      {/* House body - green */}
      <rect
        x="18"
        y="38"
        width="44"
        height="34"
        fill="#16A34A"
      />
      <rect
        x="18"
        y="38"
        width="44"
        height="34"
        stroke="#0F172A"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Roof - amber */}
      <polygon points="40,12 12,42 68,42" fill="#F59E0B" />
      <polygon
        points="40,12 12,42 68,42"
        stroke="#0F172A"
        strokeWidth="2.5"
        fill="none"
      />

      {/* Door */}
      <rect x="32" y="52" width="16" height="20" fill="#0F172A" />

      {/* Windows */}
      <rect x="22" y="44" width="8" height="8" fill="#0F172A" />
      <rect x="50" y="44" width="8" height="8" fill="#0F172A" />

      {/* Chimney */}
      <rect
        x="52"
        y="18"
        width="8"
        height="16"
        fill="#16A34A"
        stroke="#0F172A"
        strokeWidth="2"
      />
    </g>

    {/* Three small blocks - representing PREP/LIST/SELL */}
    <g transform="translate(2, 2)">
      {/* Block 1 - PREP */}
      <g transform="rotate(-8, 12, 20)">
        <rect x="4" y="14" width="16" height="6" fill="#16A34A" />
        <rect
          x="4"
          y="14"
          width="16"
          height="6"
          stroke="#0F172A"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
      {/* Block 2 - LIST (outline) */}
      <g transform="rotate(4, 12, 28)">
        <rect
          x="6"
          y="22"
          width="14"
          height="6"
          fill="transparent"
          stroke="#16A34A"
          strokeWidth="1.5"
        />
      </g>
      {/* Block 3 - SELL */}
      <g transform="rotate(-5, 12, 36)">
        <rect x="3" y="30" width="16" height="6" fill="#16A34A" />
        <rect
          x="3"
          y="30"
          width="16"
          height="6"
          stroke="#0F172A"
          strokeWidth="1.5"
          fill="none"
        />
      </g>
    </g>
  </svg>
);

export default Logo;
