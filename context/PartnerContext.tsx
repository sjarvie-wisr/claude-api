'use client';
import { createContext, useContext, useState } from 'react';

export type Partner = 'all' | 'broker' | 'referrer';

interface PartnerContextValue {
  partner: Partner;
  setPartner: (p: Partner) => void;
}

const PartnerContext = createContext<PartnerContextValue>({
  partner: 'all',
  setPartner: () => {},
});

export function PartnerProvider({ children }: { children: React.ReactNode }) {
  const [partner, setPartner] = useState<Partner>('all');
  return (
    <PartnerContext.Provider value={{ partner, setPartner }}>
      {children}
    </PartnerContext.Provider>
  );
}

export function usePartner() {
  return useContext(PartnerContext);
}
