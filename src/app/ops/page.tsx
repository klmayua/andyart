'use client';

import UnifiedShell from '@/components/ops/UnifiedShell';

export default function OpsIndexPage() {
  return (
    <UnifiedShell>
      <div className="p-6">
        <h1 className="font-serif text-3xl font-bold text-andy-black">Operations Command</h1>
        <p className="text-sm text-andy-bronze mt-1">Central command center for all operational modules</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/ops/crm" className="bg-[#FAF8F3] rounded-xl border border-black/[0.06] p-5 hover:border-andy-gold/20 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all">
            <h3 className="font-medium text-andy-black">CRM Dashboard</h3>
            <p className="text-xs text-andy-bronze mt-1">Customer relationship management</p>
          </a>
        </div>
      </div>
    </UnifiedShell>
  );
}