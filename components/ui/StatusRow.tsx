import type { StatusEntry } from '@/lib/content/rate-estimate';

const dotColour: Record<StatusEntry['dot'], string> = {
  success: 'bg-green-500',
  info:    'bg-blue-500',
  warn:    'bg-amber-400',
  error:   'bg-red-500',
};

export function StatusRow({ dot, name, description }: StatusEntry) {
  return (
    <div className="flex items-start gap-3 px-3.5 py-2.5 rounded-lg bg-slate-50 border border-slate-200">
      <div className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${dotColour[dot]}`} />
      <div>
        <div className="font-mono text-xs font-semibold text-navy min-w-[240px]">{name}</div>
        <div
          className="text-[13px] text-slate-600"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </div>
  );
}
