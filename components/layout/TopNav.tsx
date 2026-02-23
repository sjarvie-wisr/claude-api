'use client';
import Link from 'next/link';

export function TopNav() {
  return (
    <nav className="bg-navy h-14 flex items-center px-6 gap-4 sticky top-0 z-50 shadow-[0_2px_8px_rgba(0,0,0,.25)]">
      <Link href="/" className="flex items-center gap-2.5 text-white font-bold text-lg tracking-tight no-underline">
        <svg width="28" height="34" viewBox="0 0 44 54" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M44 0C44 0 26.4 3.44 22 23.12V54C42.8 48.96 44 25.36 44 21.6V0Z" fill="#323F51"/>
          <path d="M44 0H0C0 0 17.68 3.44 22 23.12C26.4 3.44 44 0 44 0Z" fill="#62C4BB"/>
          <path d="M22 23.12C17.68 3.52 0 0 0 0V21.52C0.08 25.36 1.28 48.96 22 53.92V23.12Z" fill="black"/>
        </svg>
        Wisr <span className="text-teal">Dev Portal</span>
      </Link>
      <span className="ml-2 bg-teal text-white text-[11px] px-2 py-0.5 rounded-full font-semibold">
        v3 · 2026.02.10
      </span>
      <div className="flex-1" />
      <Link href="/legal" className="text-white/70 text-sm px-3 py-1.5 rounded-md hover:text-white hover:bg-white/10 transition-all">
        Changelog
      </Link>
      <Link href="/swagger" className="text-white/70 text-sm px-3 py-1.5 rounded-md hover:text-white hover:bg-white/10 transition-all">
        Swagger ↗
      </Link>
      <a
        href="mailto:apisupport@wisr.com.au"
        className="bg-teal text-white text-sm px-3 py-1.5 rounded-md font-semibold hover:bg-teal-dark transition-all"
      >
        Get API Access
      </a>
    </nav>
  );
}
