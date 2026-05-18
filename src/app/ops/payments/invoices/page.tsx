'use client';

import { useMemo, useState } from 'react';
import { Receipt, Download, Search, Send } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getInvoices } from '@/lib/payment';
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS } from '@/types/payment';
import type { InvoiceStatus } from '@/types/payment';

export default function OpsInvoicesPage() {
  const invoices = useClientData(() => getInvoices(), []);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all');

  const filtered = invoices.filter((i) => {
    const matchesSearch = i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) || i.collectorName.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || i.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totals = useMemo(() => {
    const paid = invoices.filter((i) => i.status === 'paid').reduce((s, i) => s + i.total, 0);
    const pending = invoices.filter((i) => i.status === 'sent' || i.status === 'viewed').reduce((s, i) => s + i.total, 0);
    const overdue = invoices.filter((i) => i.status === 'overdue').reduce((s, i) => s + i.total, 0);
    return { paid, pending, overdue };
  }, [invoices]);

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Invoices</h1>
        <p className="text-sm text-[#B9A48A] mt-1">Invoice management and payment tracking</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-green-400">${(totals.paid / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#7B6854]">Paid</p>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-blue-400">${(totals.pending / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#7B6854]">Pending</p>
        </div>
        <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[20px] border border-[rgba(214,170,92,0.08)] p-4 text-center shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
          <p className="text-lg font-bold text-red-400">${(totals.overdue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-[#7B6854]">Overdue</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'sent', 'viewed', 'paid', 'overdue'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-[#C89B4F] text-[#0A0A0A]' : 'bg-[rgba(34,29,25,0.88)] text-[#B9A48A] border border-[rgba(214,170,92,0.15)]'}`}>
            {s === 'all' ? 'All' : INVOICE_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7B6854]" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[rgba(214,170,92,0.15)] text-sm bg-[rgba(255,255,255,0.05)] text-[#F5EBDD] placeholder:text-[#7B6854] focus:outline-none focus:ring-2 focus:ring-[#C89B4F]/40" />
      </div>

      <div className="bg-[linear-gradient(180deg,rgba(28,23,20,0.94)_0%,rgba(22,18,16,0.98)_100%)] rounded-[26px] border border-[rgba(214,170,92,0.08)] overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.16)]">
        <div className="px-6 py-4 border-b border-[rgba(214,170,92,0.08)] flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-[#E8D8C2]">All Invoices</h2>
          <span className="text-xs text-[#7B6854]">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-[rgba(255,255,255,0.03)]">
          {filtered.map((i) => (
            <div key={i.id} className="px-6 py-4 hover:bg-[rgba(255,255,255,0.025)] transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Receipt size={16} className="text-[#C89B4F]" />
                  <div>
                    <p className="text-sm font-semibold text-[#F5EBDD]">{i.invoiceNumber}</p>
                    <p className="text-xs text-[#7B6854]">{i.collectorName} · {i.artworkTitle || 'General'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-[#FFF3DF]">${(i.total / 1000).toFixed(0)}k {i.currency}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${INVOICE_STATUS_COLORS[i.status]}`}>{INVOICE_STATUS_LABELS[i.status]}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-[#7B6854]">
                <span>Due: {new Date(i.dueDate).toLocaleDateString()}</span>
                <span>Issued: {new Date(i.issuedDate).toLocaleDateString()}</span>
                <div className="flex gap-2 ml-auto">
                  <button className="flex items-center gap-1 px-2 py-1 border border-[rgba(214,170,92,0.15)] rounded-lg hover:bg-[rgba(214,170,92,0.08)]"><Download size={10} /> PDF</button>
                  {i.status !== 'paid' && <button className="flex items-center gap-1 px-2 py-1 bg-[#C89B4F] text-[#0A0A0A] rounded-lg"><Send size={10} /> Remind</button>}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-[#7B6854]/40">No invoices</div>}
        </div>
      </div>
    </div>
  );
}