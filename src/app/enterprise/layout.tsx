'use client';

import { usePathname } from 'next/navigation';

export default function EnterpriseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#171614]">
      {children}
    </div>
  );
}