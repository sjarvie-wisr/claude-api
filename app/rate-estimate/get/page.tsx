import { SectionHeader } from '@/components/ui/SectionHeader';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { StatusRow } from '@/components/ui/StatusRow';
import { PartnerNote } from '@/components/ui/PartnerNote';
import { RE_GET_STATUSES } from '@/lib/content/rate-estimate';
import { API_VERSION } from '@/lib/config';

export default function RateEstimateGetPage() {
  return (
    <>
      <SectionHeader
        title={<><span className="text-green-700 bg-green-100 text-sm font-bold px-2.5 py-1 rounded mr-2">GET</span> Rate Estimate Status</>}
        description="Poll this endpoint to get the outcome of a rate estimate. Wait 5 seconds after the initial POST, then poll every 500ms until a definitive status is returned."
      />

      <EndpointCard method="GET" path={`/apply/${API_VERSION}/application/{wisrApplicationId}/rateEstimate`} />

      <table className="w-full border-collapse text-[13px] my-3">
        <thead>
          <tr>
            <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">Performance</th>
            <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">Average</th>
            <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">95th Percentile</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <td className="px-3 py-2">Total processing time</td>
            <td className="px-3 py-2">&lt; 7,000ms</td>
            <td className="px-3 py-2">&lt; 11,000ms</td>
          </tr>
          <tr>
            <td className="px-3 py-2">Bureau response time</td>
            <td className="px-3 py-2">~6,100ms</td>
            <td className="px-3 py-2">~10,000ms</td>
          </tr>
        </tbody>
      </table>

      <hr className="border-slate-200 my-7" />
      <h3 className="text-[15px] font-semibold mb-3">Status Outcomes</h3>
      <div className="flex flex-col gap-2">
        {RE_GET_STATUSES.map((s) => (
          <StatusRow key={s.name} {...s} />
        ))}
      </div>

      <PartnerNote type="referrer">
        <strong>Referrers:</strong> A successful response includes an{' '}
        <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">applyUrl</code>. Direct your customer to this URL to complete their application on wisr.com.au — no PUT/POST application calls needed from your side.
      </PartnerNote>
    </>
  );
}
