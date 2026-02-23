'use client';
import { useState } from 'react';
import { PartnerProvider } from '@/context/PartnerContext';
import { TopNav } from './TopNav';
import { SearchBar } from './SearchBar';
import { PartnerBar } from './PartnerBar';
import { Sidebar } from './Sidebar';

export function Shell({ children }: { children: React.ReactNode }) {
  const [search, setSearch] = useState('');
  return (
    <PartnerProvider>
      <div className="flex flex-col min-h-screen">
        <TopNav />
        <SearchBar value={search} onChange={setSearch} />
        <PartnerBar />
        <div className="flex flex-1 min-h-0">
          <Sidebar search={search} />
          <main className="flex-1 overflow-y-auto p-8 max-w-[900px]">
            {children}
          </main>
        </div>
      </div>
    </PartnerProvider>
  );
}
