type CardVariant = "dark" | "light" | "elevated";

interface CardProps {
  children: React.ReactNode;
  variant?: CardVariant;
  className?: string;
  padding?: "none" | "sm" | "md" | "lg";
}

const variantClasses: Record<CardVariant, string> = {
  dark: "card bg-navy-light border border-gold/20 overflow-hidden",
  light: "bg-white text-navy rounded-2xl overflow-hidden",
  elevated: "card card-gold overflow-hidden",
};

const paddingClasses = {
  none: "",
  sm: "p-sm",
  md: "p-md",
  lg: "p-lg",
};

export function Card({
  children,
  variant = "dark",
  className = "",
  padding = "lg",
}: CardProps) {
  return (
    <div className={`${variantClasses[variant]} ${paddingClasses[padding]} ${className}`}>
      {children}
    </div>
  );
}
