import { SectionHeader } from '@/components/ui/SectionHeader';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { ParamTable } from '@/components/ui/ParamTable';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { PartnerNote } from '@/components/ui/PartnerNote';
import { RE_POST_PARAMS, RE_RESPONSE_JSON } from '@/lib/content/rate-estimate';
import { API_VERSION } from '@/lib/config';

export default function RateEstimatePostPage() {
  return (
    <>
      <SectionHeader
        title={<><span className="text-blue-700 bg-blue-100 text-sm font-bold px-2.5 py-1 rounded mr-2">POST</span> Submit Rate Estimate</>}
        description={<>The starting point for all new loans. Submit applicant data and receive a <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">wisrApplicationId</code> to poll for the outcome.</>}
      />

      <EndpointCard method="POST" path={`/apply/${API_VERSION}/application/rateEstimate`} />

      <table className="w-full border-collapse text-[13px] my-3">
        <thead>
          <tr>
            <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">Performance</th>
            <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">Target</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-slate-100">
            <td className="px-3 py-2">Average response</td>
            <td className="px-3 py-2">&lt; 500ms (acknowledgement only — not the rate estimate outcome)</td>
          </tr>
          <tr>
            <td className="px-3 py-2">95th percentile</td>
            <td className="px-3 py-2">&lt; 2000ms</td>
          </tr>
        </tbody>
      </table>

      <hr className="border-slate-200 my-7" />
      <h3 className="text-[15px] font-semibold mb-3">Key Parameters</h3>
      <ParamTable params={RE_POST_PARAMS} />

      <PartnerNote type="broker">
        <strong>Broker Networks:</strong> You can set a custom <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">brokerFee</code> and{' '}
        <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">rateDiscount</code> (secured loans only). Rate discounts reduce commission proportionally. The loan will appear in the Wisr Broker Portal for follow-up.
      </PartnerNote>

      <PartnerNote type="referrer">
        <strong>Referrers:</strong> After polling the status, you&apos;ll receive an{' '}
        <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">applyUrl</code> to direct the customer to wisr.com.au to complete their application. No{' '}
        <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">brokerFee</code> or{' '}
        <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">rateDiscount</code> applies.
      </PartnerNote>

      <hr className="border-slate-200 my-7" />
      <h3 className="text-[15px] font-semibold mb-2">Response</h3>
      <p className="text-[13px] text-slate-600 mb-2">
        Success: <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">202 Accepted</code> — store the{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">wisrApplicationId</code> immediately, you&apos;ll need it for all subsequent calls.
      </p>
      <CodeBlock tabs={[{ id: 'response', label: 'Response', content: RE_RESPONSE_JSON }]} />
    </>
  );
}
