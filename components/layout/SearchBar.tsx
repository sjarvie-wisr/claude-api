'use client';

export function SearchBar({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="bg-navy px-6 pb-3.5 border-b border-white/[0.08]">
      <div className="max-w-[620px] relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/50 text-base select-none">⌕</span>
        <input
          type="text"
          placeholder="Search endpoints, parameters, status codes…"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/10 border border-white/20 text-white placeholder-white/50 py-2 pl-10 pr-4 rounded-lg text-sm outline-none transition-all focus:bg-white/15 focus:border-teal"
        />
      </div>
    </div>
  );
}
