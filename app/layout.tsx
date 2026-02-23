import type { Metadata } from 'next';
import { Shell } from '@/components/layout/Shell';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Wisr Developer Portal',
  description: 'Wisr External API documentation for partners and brokers',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bg text-navy">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
