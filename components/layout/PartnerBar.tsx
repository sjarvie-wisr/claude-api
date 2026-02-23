'use client';
import { usePartner, type Partner } from '@/context/PartnerContext';

const BUTTONS: { label: string; value: Partner }[] = [
  { label: 'All Partners', value: 'all' },
  { label: 'Broker Network', value: 'broker' },
  { label: 'Referrer', value: 'referrer' },
];

const HINTS: Record<Partner, string> = {
  all: '',
  broker: 'Showing broker-specific notes only',
  referrer: 'Showing referrer-specific notes only',
};

export function PartnerBar() {
  const { partner, setPartner } = usePartner();
  return (
    <div className="bg-white border-b border-slate-200 px-6 py-2.5 flex items-center gap-3 text-sm text-slate-500">
      <span>Viewing docs as:</span>
      <div className="flex bg-slate-100 rounded-lg p-0.5 gap-0.5">
        {BUTTONS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setPartner(value)}
            className={`px-4 py-1 rounded-md text-[13px] font-medium transition-all cursor-pointer ${
              partner === value
                ? 'bg-white text-navy shadow-sm'
                : 'text-slate-500 hover:text-navy'
            }`}
          >
            {label}
          </button>
        ))}
      </div>
      {HINTS[partner] && (
        <span className="text-slate-400 text-xs ml-2">{HINTS[partner]}</span>
      )}
    </div>
  );
}
