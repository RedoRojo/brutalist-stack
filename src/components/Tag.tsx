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
            ? "bg-blue-600 text-white"
            : "bg-neutral-100 text-neutral-800 border border-neutral-200 hover:border-blue-400"
        }
      `}
    >
      {children}
    </span>
  );
}

