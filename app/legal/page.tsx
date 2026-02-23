import { SectionHeader } from '@/components/ui/SectionHeader';
import { LEGAL_TERMS } from '@/lib/content/reference';

export default function LegalPage() {
  return (
    <>
      <SectionHeader
        title="📋 API Licence Agreement"
        description="The legal terms governing use of the Wisr External API. Last modified 19 April 2023."
      />

      <details className="bg-white border border-slate-200 rounded-xl mb-5 group">
        <summary className="px-5 py-4 cursor-pointer font-semibold text-navy list-none flex items-center gap-2 select-none">
          <span>📋</span>
          View Full Licence Agreement
          <span className="ml-auto text-slate-400 text-lg transition-transform group-open:rotate-90">›</span>
        </summary>
        <div className="px-5 pb-5 text-[13px] text-slate-600 leading-[1.7] max-h-[300px] overflow-y-auto">
          <p>
            This API Licence Agreement is a binding contract between you (&ldquo;the Customer&rdquo;) and Wisr Finance
            Pty Ltd (ABN 39 119 503 221). By accessing or using the API you accept and agree to be legally bound by its
            terms.
          </p>
          <p className="mt-3 font-semibold text-navy">Key Terms:</p>
          <ul className="mt-2 ml-5 space-y-1 list-disc">
            {LEGAL_TERMS.map((term) => (
              <li key={term}>{term}</li>
            ))}
          </ul>
          <p className="mt-3 text-slate-400 text-xs">
            For the full agreement, refer to the original PDF documentation or contact{' '}
            <a href="mailto:contact@wisr.com.au" className="text-teal">
              contact@wisr.com.au
            </a>
            .
          </p>
        </div>
      </details>
    </>
  );
}
