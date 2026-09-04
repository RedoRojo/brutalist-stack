interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "accent";
}

export default function Tag({ children, variant = "default" }: TagProps) {
  return (
    <span
      className={`
        px-2.5 py-1 text-xs font-mono rounded-md font-medium tracking-tight inline-block transition-colors
        ${
          variant === "accent"
            ? "bg-[var(--accent)] text-white"
            : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent)] hover:text-[var(--accent)]"
        }
      `}
    >
      {children}
    </span>
  );
}

