import type { Param } from '@/lib/content/rate-estimate';
import { ReqBadge } from './ReqBadge';

export function ParamTable({ params }: { params: Param[] }) {
  return (
    <table className="w-full border-collapse text-[13px] my-3">
      <thead>
        <tr>
          {['Field', 'Type', 'Required', 'Notes'].map((h) => (
            <th
              key={h}
              className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200"
            >
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {params.map((p) => (
          <tr key={p.field} className="border-b border-slate-100">
            <td className="px-3 py-2 align-top">
              <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">
                {p.field}
              </code>
            </td>
            <td className="px-3 py-2 align-top text-slate-600">{p.type}</td>
            <td className="px-3 py-2 align-top">
              <ReqBadge level={p.required} />
            </td>
            <td
              className="px-3 py-2 align-top text-slate-600"
              dangerouslySetInnerHTML={{ __html: p.notes }}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
}
