interface BadgeProps {
  children: React.ReactNode;
  variant?: "black" | "red" | "white";
}

export default function Badge({ children, variant = "black" }: BadgeProps) {
  const variantClasses = {
    black: "bg-neutral-900 text-white border border-neutral-900",
    red: "bg-crimson text-white border border-crimson",
    white: "bg-white text-crimson border-2 border-dotted border-crimson",
  };

  return (
    <span
      className={`font-mono text-[11px] font-semibold px-2.5 py-0.5 rounded-md inline-flex items-center ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}

