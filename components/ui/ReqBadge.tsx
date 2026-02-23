const colours = {
  required:    'bg-red-100 text-red-800',
  conditional: 'bg-amber-100 text-amber-700',
  optional:    'bg-green-50 text-green-700',
};

const labels = {
  required:    'Required',
  conditional: 'Conditional',
  optional:    'Optional',
};

export function ReqBadge({ level }: { level: 'required' | 'conditional' | 'optional' }) {
  return (
    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${colours[level]}`}>
      {labels[level]}
    </span>
  );
}
