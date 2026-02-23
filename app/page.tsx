import { SectionHeader } from '@/components/ui/SectionHeader';
import { FlowDiagram, type FlowStep } from '@/components/ui/FlowDiagram';
import { EndpointCard } from '@/components/ui/EndpointCard';
import { BASE_URLS, SWAGGER_URLS } from '@/lib/config';

const FLOW_STEPS: FlowStep[] = [
  { num: 1, label: 'POST Rate Estimate', sub: 'Get wisrApplicationId' },
  { num: 2, label: 'Poll GET Status', sub: 'Wait ~7s, poll every 0.5s' },
  { num: 3, label: 'PUT Draft App', sub: 'Save full application' },
  { num: 4, label: 'POST Submit', sub: 'Submit for assessment' },
  { num: 5, label: 'Poll GET Status', sub: 'Track decision' },
];

export default function OverviewPage() {
  return (
    <>
      <SectionHeader
        title="Wisr External API"
        description="Enable your customers to request rate estimates and submit loan applications directly through your platform via the Wisr REST API. JSON over HTTPS, standard HTTP verbs and response codes."
        tags={[
          { label: 'v3', variant: 'version' },
          { label: 'Updated Feb 2026', variant: 'updated' },
        ]}
      />

      <FlowDiagram steps={FLOW_STEPS} />

      <EndpointCard title="Base URLs" description="Sandbox & Production" defaultOpen>
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">Environment</th>
              <th className="text-left px-3 py-2 bg-slate-50 text-slate-500 font-semibold text-xs uppercase tracking-wide border-b border-slate-200">Base URL</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2">Sandbox</td>
              <td className="px-3 py-2"><code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">{BASE_URLS.sandbox}</code></td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2">Production</td>
              <td className="px-3 py-2"><code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">{BASE_URLS.production}</code></td>
            </tr>
            <tr className="border-b border-slate-100">
              <td className="px-3 py-2">Swagger (Sandbox)</td>
              <td className="px-3 py-2"><code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">{SWAGGER_URLS.sandbox}</code></td>
            </tr>
            <tr>
              <td className="px-3 py-2">Swagger (Prod)</td>
              <td className="px-3 py-2"><code className="font-mono text-xs bg-slate-100 px-1.5 py-0.5 rounded text-pink-700">{SWAGGER_URLS.production}</code></td>
            </tr>
          </tbody>
        </table>
      </EndpointCard>
    </>
  );
}
