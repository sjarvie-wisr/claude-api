'use client';
import { usePartner } from '@/context/PartnerContext';

interface PartnerNoteProps {
  type: 'broker' | 'referrer';
  children: React.ReactNode;
}

export function PartnerNote({ type, children }: PartnerNoteProps) {
  const { partner } = usePartner();
  if (partner !== 'all' && partner !== type) return null;

  if (type === 'broker') {
    return (
      <div className="flex gap-2.5 rounded-lg px-4 py-3 my-3.5 text-[13px] bg-amber-50 border border-amber-200 text-amber-900">
        <span className="text-base flex-shrink-0">🏢</span>
        <div>{children}</div>
      </div>
    );
  }

  return (
    <div className="flex gap-2.5 rounded-lg px-4 py-3 my-3.5 text-[13px] bg-blue-50 border border-blue-200 text-blue-900">
      <span className="text-base flex-shrink-0">🔗</span>
      <div>{children}</div>
    </div>
  );
}
