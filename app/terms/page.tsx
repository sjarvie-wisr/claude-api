import { SectionHeader } from '@/components/ui/SectionHeader';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { API_VERSION } from '@/lib/config';

export default function TermsPage() {
  return (
    <>
      <SectionHeader
        title={<><span className="text-green-700 bg-green-100 text-sm font-bold px-2.5 py-1 rounded mr-2">GET</span> Terms &amp; Conditions</>}
        description="Always fetch T&C content from this endpoint to ensure you're presenting the latest version to customers — never hardcode the text."
      />

      <EndpointCard method="GET" path={`/apply/${API_VERSION}/terms`} />

      <p className="mt-4 text-[13px] text-slate-600 leading-relaxed">
        The endpoint returns content for all four declaration fields required on both rate estimate and application draft
        requests:{' '}
        {['meetsEligibility', 'privacyConsent', 'accessSeekerCreditReportConsent', 'electronicCommunicationConsent'].map(
          (f, i, arr) => (
            <>
              <code key={f} className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">{f}</code>
              {i < arr.length - 1 ? ', ' : '.'}
            </>
          )
        )}
      </p>
    </>
  );
}
