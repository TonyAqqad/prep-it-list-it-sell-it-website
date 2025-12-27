import { Icon } from "@/components/ui";
import { company } from "@/content/company";

interface TrustIndicatorProps {
  icon: string;
  text: string;
}

function TrustIndicator({ icon, text }: TrustIndicatorProps) {
  return (
    <div className="flex items-center gap-2 text-small text-white/70">
      <Icon name={icon} size="sm" className="text-gold" />
      <span>{text}</span>
    </div>
  );
}

export function TrustIndicators() {
  const indicators = [
    { icon: "verified_user", text: "Licensed & Insured" },
    { icon: "family_restroom", text: `Family-Owned Since ${company.founded}` },
    { icon: "schedule", text: "Response in 1-24 Hours" },
  ];

  return (
    <div className="flex flex-wrap justify-center lg:justify-start gap-x-6 gap-y-2">
      {indicators.map((indicator) => (
        <TrustIndicator key={indicator.icon} {...indicator} />
      ))}
    </div>
  );
}
