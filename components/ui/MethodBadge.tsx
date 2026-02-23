import type { Method } from '@/lib/content/navigation';

const colours: Record<Method, string> = {
  GET:  'bg-green-100 text-green-700',
  POST: 'bg-blue-100 text-blue-700',
  PUT:  'bg-amber-100 text-amber-700',
};

export function MethodBadge({ method, size = 'sm' }: { method: Method; size?: 'sm' | 'md' }) {
  const padding = size === 'md' ? 'px-2.5 py-1 text-sm' : 'px-1.5 py-0.5 text-[10px]';
  return (
    <span className={`font-bold rounded ${padding} flex-shrink-0 ${colours[method]}`}>
      {method}
    </span>
  );
}
