import Link from 'next/link';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { CodeBlock } from '@/components/ui/CodeBlock';
import { QS_CURL, QS_PYTHON, QS_JS } from '@/lib/content/rate-estimate';
import { SUPPORT_EMAIL } from '@/lib/config';

const CODE_TABS = [
  { id: 'curl',   label: 'cURL',       content: QS_CURL },
  { id: 'python', label: 'Python',     content: QS_PYTHON },
  { id: 'js',     label: 'JavaScript', content: QS_JS },
];

const STEPS = [
  {
    num: 1,
    title: 'Get your credentials',
    body: (
      <>
        You need an <strong>API key</strong>, <strong>partner-company-id</strong>, and optionally a{' '}
        <strong>partner-id</strong> (required for broker networks). Email{' '}
        <a href={`mailto:${SUPPORT_EMAIL}`} className="text-teal">{SUPPORT_EMAIL}</a> to request access.
      </>
    ),
    cta: { label: 'Read Auth Guide →', href: '/auth' },
  },
  {
    num: 2,
    title: 'Configure your first request',
    body: (
      <>
        Set the base URL to the sandbox and add your credentials as headers. Then POST to{' '}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">/apply/v3/application/rateEstimate</code>
      </>
    ),
  },
  {
    num: 3,
    title: 'Send the test request',
    body: (
      <>
        Use the sample body below. A{' '}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">202 Accepted</code> with a{' '}
        <code className="bg-slate-100 px-1.5 py-0.5 rounded text-xs">wisrApplicationId</code> means
        you&apos;re connected!
      </>
    ),
  },
];

export default function QuickstartPage() {
  return (
    <>
      <SectionHeader title="⚡ Quickstart Guide" description="Make your first successful API call in 3 steps." />

      {STEPS.map((step) => (
        <div key={step.num} className="flex gap-4 px-4 py-4 bg-white border border-slate-200 rounded-xl mb-3">
          <div className="w-8 h-8 rounded-full bg-navy text-white font-bold text-sm flex items-center justify-center flex-shrink-0">
            {step.num}
          </div>
          <div>
            <h3 className="text-[15px] font-semibold mb-1">{step.title}</h3>
            <p className="text-[13px] text-slate-500 leading-relaxed">{step.body}</p>
            {step.cta && (
              <Link
                href={step.cta.href}
                className="inline-block mt-2 px-3.5 py-1.5 border border-teal text-teal rounded-md text-xs font-semibold hover:bg-teal-light transition-colors"
              >
                {step.cta.label}
              </Link>
            )}
          </div>
        </div>
      ))}

      <CodeBlock tabs={CODE_TABS} />
    </>
  );
}
