'use client';

import UnifiedShell from '@/components/ops/UnifiedShell';

export default function OpsIndexPage() {
  return (
    <UnifiedShell>
      <div className="p-6">
        <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Operations Command</h1>
        <p className="text-sm text-[#B9A48A] mt-1">Central command center for all operational modules</p>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <a href="/ops/crm" className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-xl border border-[rgba(214,170,92,0.10)] p-5 hover:border-[rgba(214,170,92,0.18)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all">
            <h3 className="font-medium text-[#F5EBDD]">CRM Dashboard</h3>
            <p className="text-xs text-[#7B6854] mt-1">Customer relationship management</p>
          </a>
        </div>
      </div>
    </UnifiedShell>
  );
}