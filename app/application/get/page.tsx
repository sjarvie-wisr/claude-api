import { SectionHeader } from '@/components/ui/SectionHeader';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { StatusRow } from '@/components/ui/StatusRow';
import { APP_GET_STATUSES } from '@/lib/content/application';
import { API_VERSION } from '@/lib/config';

export default function ApplicationGetPage() {
  return (
    <>
      <SectionHeader
        title={<><span className="text-green-700 bg-green-100 text-sm font-bold px-2.5 py-1 rounded mr-2">GET</span> Application Status</>}
        description="Poll for the credit decision on a submitted application."
      />

      <EndpointCard method="GET" path={`/apply/${API_VERSION}/application/{wisrApplicationId}/status`} />

      <div className="flex flex-col gap-2 mt-5">
        {APP_GET_STATUSES.map((s) => (
          <StatusRow key={s.name} {...s} />
        ))}
      </div>
    </>
  );
}
