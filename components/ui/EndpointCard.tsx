'use client';
import { useState } from 'react';
import type { Method } from '@/lib/content/navigation';
import { MethodBadge } from './MethodBadge';

interface EndpointCardProps {
  method?: Method;
  path?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
  defaultOpen?: boolean;
}

export function EndpointCard({
  method,
  path,
  title,
  description,
  children,
  defaultOpen = false,
}: EndpointCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="bg-white border border-slate-200 rounded-xl mb-5 overflow-hidden">
      <div
        className={`flex items-center gap-3 px-5 py-4 ${children ? 'cursor-pointer hover:bg-slate-50 transition-colors' : ''}`}
        onClick={() => children && setOpen((o) => !o)}
      >
        {method && <MethodBadge method={method} size="md" />}
        {path && (
          <span className="font-mono text-sm text-navy font-medium">{path}</span>
        )}
        {title && <span className="font-semibold text-[15px]">{title}</span>}
        {description && (
          <span className="ml-auto text-[13px] text-slate-500">{description}</span>
        )}
        {children && (
          <span className={`ml-auto text-slate-400 transition-transform ${open ? 'rotate-180' : ''}`}>▾</span>
        )}
      </div>
      {children && open && (
        <div className="border-t border-slate-200 px-5 py-5">{children}</div>
      )}
    </div>
  );
}
