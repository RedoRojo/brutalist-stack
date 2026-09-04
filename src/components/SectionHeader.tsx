interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
}

export default function SectionHeader({ eyebrow, title, description }: SectionHeaderProps) {
  return (
    <div className="space-y-2 mb-8">
      <span className="font-mono text-xs font-semibold text-[var(--accent)] tracking-wider uppercase block">
        {eyebrow}
      </span>
      <h2 className="text-3xl md:text-4xl font-sans font-bold tracking-tight text-[var(--text-primary)]">
        {title}
      </h2>
      {description && (
        <p className="text-base font-sans text-[var(--text-secondary)] leading-relaxed max-w-2xl mt-3">
          {description}
        </p>
      )}
    </div>
  );
}

