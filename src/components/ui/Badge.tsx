type BadgeVariant = "gold" | "navy" | "outline";

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  gold: "badge-gold",
  navy: "badge-navy",
  outline: "bg-transparent text-gold border border-gold",
};

export function Badge({
  children,
  variant = "gold",
  className = "",
}: BadgeProps) {
  return (
    <span className={`badge ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
