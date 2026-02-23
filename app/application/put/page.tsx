import { SectionHeader } from '@/components/ui/SectionHeader';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { ParamTable } from '@/components/ui/ParamTable';
import { PartnerNote } from '@/components/ui/PartnerNote';
import { APP_PUT_PARAMS } from '@/lib/content/application';
import { API_VERSION } from '@/lib/config';

export default function ApplicationPutPage() {
  return (
    <>
      <SectionHeader
        title={<><span className="text-amber-700 bg-amber-100 text-sm font-bold px-2.5 py-1 rounded mr-2">PUT</span> Save Application Draft</>}
        description={<>Save all full application data following a successful rate estimate where <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">allowApplication: true</code>. You can PUT multiple times progressively — the last PUT overwrites the full dataset.</>}
      />

      <EndpointCard method="PUT" path={`/apply/${API_VERSION}/application/{wisrApplicationId}`} />

      <p className="text-[13px] text-slate-500 my-3">
        ⚠️ Do not omit fields from the rate estimate — the PUT replaces the entire dataset. Any omitted field reverts to blank/default.
      </p>

      <h3 className="text-[15px] font-semibold mb-3">New Fields</h3>
      <ParamTable params={APP_PUT_PARAMS} />

      <PartnerNote type="broker">
        <strong>Broker Networks:</strong> Use{' '}
        <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">loanAdditionalNotes</code> to pass notes to the Wisr assessor. Set{' '}
        <code className="bg-amber-100 px-1 py-0.5 rounded text-xs">useESignatureContract: false</code> if you prefer PDF contracts sent directly to the broker.
      </PartnerNote>
    </>
  );
}
