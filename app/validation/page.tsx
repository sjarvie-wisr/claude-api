import { SectionHeader } from '@/components/ui/SectionHeader';
import { VALIDATION_RULES } from '@/lib/content/reference';

export default function ValidationPage() {
  return (
    <>
      <SectionHeader
        title="✅ Validation Guide"
        description="Key validation rules to be aware of when constructing requests."
      />

      <table className="w-full border-collapse text-[13px] my-3">
        <thead>
          <tr>
            {['Field', 'Rule'].map((h) => (
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
          {VALIDATION_RULES.map((row) => (
            <tr key={row.field} className="border-b border-slate-100">
              <td className="px-3 py-2 align-top">
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">
                  {row.field}
                </code>
              </td>
              <td
                className="px-3 py-2 align-top text-slate-600"
                dangerouslySetInnerHTML={{ __html: row.rule }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
