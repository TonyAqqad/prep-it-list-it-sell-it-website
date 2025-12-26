/**
 * Prep It List It Sell It - Standalone Logo Icon
 *
 * A simplified component that renders just the house icon.
 * Use this for favicons, avatars, and small icon placements.
 */

import { type FC } from "react";

interface LogoIconProps {
  size?: number | string;
  className?: string;
  /**
   * Color variant for different backgrounds
   * - "default": Green house on transparent (for dark bg)
   * - "mono-light": All white (for dark overlays)
   * - "mono-dark": All dark (for light backgrounds)
   */
  variant?: "default" | "mono-light" | "mono-dark";
}

export const LogoIcon: FC<LogoIconProps> = ({
  size = 40,
  className = "",
  variant = "default",
}) => {
  const colors = {
    default: {
      body: "#16A34A",
      roof: "#F59E0B",
      stroke: "#0F172A",
      details: "#0F172A",
      shadow: "#000",
    },
    "mono-light": {
      body: "#FFFFFF",
      roof: "#FFFFFF",
      stroke: "#FFFFFF",
      details: "#0F172A",
      shadow: "rgba(0,0,0,0.3)",
    },
    "mono-dark": {
      body: "#0F172A",
      roof: "#0F172A",
      stroke: "#0F172A",
      details: "#FFFFFF",
      shadow: "rgba(0,0,0,0.1)",
    },
  };

  const c = colors[variant];

  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      className={className}
      aria-label="Prep It List It Sell It logo"
      role="img"
    >
      {/* Main house group - rotated for zine effect */}
      <g transform="rotate(-6, 40, 42)">
        {/* Shadow layer */}
        <g transform="translate(4, 4)" opacity="0.25">
          <rect x="18" y="38" width="44" height="34" fill={c.shadow} />
          <polygon points="40,12 12,42 68,42" fill={c.shadow} />
        </g>

        {/* House body */}
        <rect x="18" y="38" width="44" height="34" fill={c.body} />
        <rect
          x="18"
          y="38"
          width="44"
          height="34"
          stroke={c.stroke}
          strokeWidth="2.5"
          fill="none"
        />

        {/* Roof */}
        <polygon points="40,12 12,42 68,42" fill={c.roof} />
        <polygon
          points="40,12 12,42 68,42"
          stroke={c.stroke}
          strokeWidth="2.5"
          fill="none"
        />

        {/* Door */}
        <rect x="32" y="52" width="16" height="20" fill={c.details} />

        {/* Windows */}
        <rect x="22" y="44" width="8" height="8" fill={c.details} />
        <rect x="50" y="44" width="8" height="8" fill={c.details} />

        {/* Chimney */}
        <rect
          x="52"
          y="18"
          width="8"
          height="16"
          fill={c.body}
          stroke={c.stroke}
          strokeWidth="2"
        />
      </g>

      {/* Three small blocks - representing PREP/LIST/SELL */}
      <g transform="translate(2, 2)">
        {/* Block 1 - PREP */}
        <g transform="rotate(-8, 12, 20)">
          <rect x="4" y="14" width="16" height="6" fill={c.body} />
          <rect
            x="4"
            y="14"
            width="16"
            height="6"
            stroke={c.stroke}
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
            stroke={c.body}
            strokeWidth="1.5"
          />
        </g>
        {/* Block 3 - SELL */}
        <g transform="rotate(-5, 12, 36)">
          <rect x="3" y="30" width="16" height="6" fill={c.body} />
          <rect
            x="3"
            y="30"
            width="16"
            height="6"
            stroke={c.stroke}
            strokeWidth="1.5"
            fill="none"
          />
        </g>
      </g>
    </svg>
  );
};

export default LogoIcon;
