'use client';
import { useState } from 'react';

export interface CodeTab {
  id: string;
  label: string;
  content: string; // may contain hl-* span HTML
}

export function CodeBlock({ tabs }: { tabs: CodeTab[] }) {
  const [activeId, setActiveId] = useState(tabs[0]?.id ?? '');
  const [copied, setCopied] = useState(false);

  const active = tabs.find((t) => t.id === activeId) ?? tabs[0];

  function handleCopy() {
    // Strip HTML tags to get plain text
    const div = document.createElement('div');
    div.innerHTML = active.content;
    navigator.clipboard.writeText(div.textContent?.trim() ?? '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="rounded-lg overflow-hidden my-3 text-[13px]">
      {tabs.length > 1 && (
        <div className="flex bg-[#253447] px-2 pt-1.5 gap-0.5">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveId(tab.id)}
              className={`px-3.5 py-1.5 rounded-t-md text-xs font-semibold cursor-pointer transition-all ${
                activeId === tab.id
                  ? 'bg-code-bg text-white'
                  : 'text-white/50 hover:text-white/80'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
      <div className="bg-code-bg px-5 py-5 overflow-x-auto relative">
        <button
          onClick={handleCopy}
          className={`absolute top-3 right-3 text-[11px] px-2.5 py-1 rounded border-none cursor-pointer transition-all ${
            copied
              ? 'bg-teal text-white'
              : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
          }`}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <pre
          className="text-slate-200 leading-relaxed font-mono whitespace-pre"
          dangerouslySetInnerHTML={{ __html: active.content }}
        />
      </div>
    </div>
  );
}
