import { SectionHeader } from '@/components/ui/SectionHeader';
import { ReqBadge } from '@/components/ui/ReqBadge';
import { PartnerNote } from '@/components/ui/PartnerNote';
import { SUPPORT_EMAIL } from '@/lib/config';

const AUTH_HEADERS = [
  {
    header: 'subscription-key',
    level: 'required' as const,
    description: 'Your unique API key. Keep secret — never commit to Git or expose client-side.',
  },
  {
    header: 'partner-company-id',
    level: 'required' as const,
    description: 'Identifies the firm submitting on behalf of a customer.',
  },
  {
    header: 'partner-id',
    level: 'conditional' as const,
    description: 'Identifies the individual broker. Only required when submitting on behalf of a specific broker.',
  },
];

export default function AuthPage() {
  return (
    <>
      <SectionHeader
        title="🔑 Authentication"
        description="All API calls require three header values. Add them to every request."
      />

      <table className="w-full border-collapse text-[13px] my-3">
        <thead>
          <tr>
            {['Header (case-sensitive)', 'Required', 'Description'].map((h) => (
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
          {AUTH_HEADERS.map((row) => (
            <tr key={row.header} className="border-b border-slate-100">
              <td className="px-3 py-2 align-top">
                <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">
                  {row.header}
                </code>
              </td>
              <td className="px-3 py-2 align-top">
                <ReqBadge level={row.level} />
              </td>
              <td className="px-3 py-2 align-top text-slate-600">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <PartnerNote type="broker">
        <strong>Broker Networks:</strong> You will always need to include a{' '}
        <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">partner-id</code> in addition to the{' '}
        <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">partner-company-id</code>. Each broker
        in your network has their own <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">partner-id</code>.
      </PartnerNote>

      <PartnerNote type="referrer">
        <strong>Referrers:</strong> You do <em>not</em> need to include a{' '}
        <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">partner-id</code>. Your{' '}
        <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">partner-company-id</code> is configured
        for referral-type submissions.
      </PartnerNote>

      <hr className="border-slate-200 my-7" />

      <h3 className="text-[15px] font-semibold mb-2">Hierarchy</h3>
      <p className="text-[13px] text-slate-600 leading-relaxed">
        One API Key → many{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">partner-company-id</code>
        s → many{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">partner-id</code>
        s. All three must be validly related — mismatches return{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">400 Bad Request</code>.
      </p>
      <p className="mt-3 text-[13px]">
        Request credentials:{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal">
          {SUPPORT_EMAIL}
        </a>
      </p>
    </>
  );
}
