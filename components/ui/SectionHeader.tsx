export function SectionHeader({
  title,
  description,
  tags,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  tags?: { label: string; variant: 'version' | 'updated' }[];
}) {
  return (
    <div className="mb-6">
      {tags && tags.length > 0 && (
        <div className="mb-2 flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag.label}
              className={
                tag.variant === 'version'
                  ? 'inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-semibold bg-green-50 text-green-800 border border-green-200'
                  : 'inline-flex items-center text-xs px-2.5 py-0.5 rounded-full font-semibold bg-blue-50 text-blue-800 border border-blue-200'
              }
            >
              {tag.label}
            </span>
          ))}
        </div>
      )}
      <h1 className="text-[26px] font-bold text-navy mb-1.5 flex items-center gap-2">{title}</h1>
      {description && (
        <p className="text-slate-500 text-[15px] leading-relaxed">{description}</p>
      )}
    </div>
  );
}
