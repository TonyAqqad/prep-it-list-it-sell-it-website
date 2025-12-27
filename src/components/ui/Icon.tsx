interface IconProps {
  name: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  filled?: boolean;
}

const sizeClasses = {
  sm: "text-[20px]",
  md: "text-[24px]",
  lg: "text-[32px]",
};

export function Icon({
  name,
  size = "md",
  className = "",
  filled = false,
}: IconProps) {
  return (
    <span
      className={`material-symbols-outlined ${sizeClasses[size]} ${className}`}
      style={{ fontVariationSettings: filled ? "'FILL' 1" : "'FILL' 0" }}
    >
      {name}
    </span>
  );
}
