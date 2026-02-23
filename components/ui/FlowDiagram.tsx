export interface FlowStep {
  num: number;
  label: string;
  sub: string;
}

export function FlowDiagram({ steps }: { steps: FlowStep[] }) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-7 mb-8">
      <h2 className="text-lg font-semibold text-navy mb-5">API Flow — End to End</h2>
      <div className="flex items-center overflow-x-auto pb-1">
        {steps.map((step, i) => (
          <>
            <div key={step.num} className="flex flex-col items-center gap-2 min-w-[120px]">
              <div className="w-9 h-9 rounded-full bg-teal text-white font-bold text-sm flex items-center justify-center">
                {step.num}
              </div>
              <div className="text-xs font-semibold text-navy text-center leading-tight">{step.label}</div>
              <div className="text-[11px] text-slate-500 text-center">{step.sub}</div>
            </div>
            {i < steps.length - 1 && (
              <div className="relative flex-1 h-0.5 bg-teal min-w-6 -mt-6">
                <span className="absolute -right-1.5 -top-2 text-teal text-xs">▶</span>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
