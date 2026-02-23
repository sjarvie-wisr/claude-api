import { SectionHeader } from '@/components/ui/SectionHeader';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { API_VERSION } from '@/lib/config';

export default function ApplicationPostPage() {
  return (
    <>
      <SectionHeader
        title={<><span className="text-blue-700 bg-blue-100 text-sm font-bold px-2.5 py-1 rounded mr-2">POST</span> Submit Application</>}
        description={<>Submit the application for credit assessment after a successful PUT. Returns <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">202 Accepted</code> — then poll GET application status for the outcome.</>}
      />

      <EndpointCard method="POST" path={`/apply/${API_VERSION}/application/{wisrApplicationId}/submit`} />

      <p className="mt-4 text-[13px] text-slate-600 leading-relaxed">
        The request body should be empty. The{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">wisrApplicationId</code>{' '}
        in the URL identifies the application. Use the same{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">partner-company-id</code>{' '}
        and{' '}
        <code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">partner-id</code>{' '}
        headers as used on the original rate estimate.
      </p>
    </>
  );
}
