import { SectionHeader } from '@/components/ui/SectionHeader';
import { ERRORS_TABLE } from '@/lib/content/reference';
import { SUPPORT_EMAIL } from '@/lib/config';

export default function ErrorsPage() {
  return (
    <>
      <SectionHeader
        title="⚠️ Error Handling"
        description="The API uses standard HTTP status codes. All error responses include a message to help debug the issue."
      />

      <table className="w-full border-collapse text-[13px] my-3">
        <thead>
          <tr>
            {['Code', 'Meaning', 'Common Cause'].map((h) => (
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
          {ERRORS_TABLE.map((row) => (
            <tr key={row.code} className="border-b border-slate-100">
              <td className="px-3 py-2 align-top">
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">{row.code}</code>
              </td>
              <td className="px-3 py-2 align-top text-slate-600">{row.meaning}</td>
              <td className="px-3 py-2 align-top text-slate-600">
                {row.isLink ? (
                  <>
                    Contact{' '}
                    <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal">
                      {SUPPORT_EMAIL}
                    </a>
                  </>
                ) : (
                  row.cause
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="mt-4 text-[13px] text-slate-600 leading-relaxed">
        All requests must be made over <strong>HTTPS</strong>. HTTP calls will fail. Contact{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal">
          {SUPPORT_EMAIL}
        </a>{' '}
        for persistent issues.
      </p>
    </>
  );
}
