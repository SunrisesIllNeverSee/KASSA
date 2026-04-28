type BadgeVariant = "gold" | "green" | "red" | "blue" | "gray" | "dark";

const variantStyles: Record<BadgeVariant, string> = {
  gold: "bg-gold/15 text-gold border-gold/30",
  green: "bg-verdigris/15 text-verdigris border-verdigris/30",
  red: "bg-terracotta/15 text-terracotta border-terracotta/30",
  blue: "bg-slate/15 text-slate border-slate/30",
  gray: "bg-driftwood/15 text-driftwood border-driftwood/30",
  dark: "bg-obsidian text-bone border-obsidian",
};

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

export default function Badge({
  variant = "gray",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 text-[11px] font-medium uppercase tracking-wider border rounded ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
