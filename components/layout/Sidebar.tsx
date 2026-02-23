'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { NAV_SECTIONS } from '@/lib/content/navigation';
import { MethodBadge } from '@/components/ui/MethodBadge';

export function Sidebar({ search }: { search: string }) {
  const pathname = usePathname();
  const q = search.toLowerCase();

  return (
    <aside className="w-[260px] bg-white border-r border-slate-200 overflow-y-auto flex-shrink-0 sticky top-14 max-h-[calc(100vh-56px)]">
      {NAV_SECTIONS.map((section) => {
        const visibleItems = section.items.filter(
          (item) => !q || item.label.toLowerCase().includes(q)
        );
        if (visibleItems.length === 0) return null;
        return (
          <div key={section.group} className="py-2">
            <div className="text-[11px] font-bold text-slate-400 tracking-[.08em] uppercase px-5 py-2">
              {section.group}
            </div>
            {visibleItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-2 px-5 py-[7px] text-[13.5px] border-l-[3px] transition-all ${
                    active
                      ? 'bg-teal-light text-teal-dark border-teal font-semibold'
                      : 'text-slate-600 border-transparent hover:bg-teal-light hover:text-navy'
                  }`}
                >
                  {item.method ? (
                    <MethodBadge method={item.method} />
                  ) : (
                    <span>{item.icon}</span>
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>
        );
      })}
    </aside>
  );
}
