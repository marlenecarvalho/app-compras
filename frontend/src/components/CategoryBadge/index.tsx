'use client';

type Props = {
  name: string;
  color?: string;   // ex: "#22c55e"
  Emoji?: React.ComponentType<{ size?: number; className?: string }>;
  className?: string;
};

export default function CategoryBadge({ name, color = '#3f3f46', Emoji, className = '' }: Props) {
  // fundo translúcido + borda na cor
  const bg = `${color}20`; // 12.5% de opacidade
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-medium ${className}`}
      style={{ backgroundColor: bg, borderColor: color }}
    >
      {Emoji ? <Emoji size={14} className="opacity-90" /> : null}
      <span className="capitalize">{name}</span>
    </span>
  );
}
