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
        <h1 className="font-serif text-2xl font-bold text-andy-black">Invoice Management</h1>
        <p className="text-sm text-andy-bronze mt-1">Billing operations, receivable tracking, and payment reconciliation</p>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-green-600">${(totals.paid / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Paid</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-blue-600">${(totals.pending / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Pending</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-red-500">${(totals.overdue / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Overdue</p>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'sent', 'viewed', 'paid', 'overdue'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}>
            {s === 'all' ? 'All' : INVOICE_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
      </div>

      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="px-6 py-4 border-b border-andy-stone/10 flex items-center justify-between">
          <h2 className="font-serif text-lg font-bold text-andy-black">All Invoices</h2>
          <span className="text-xs text-andy-bronze">{filtered.length} records</span>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {filtered.map((i) => (
            <div key={i.id} className="px-6 py-4 hover:bg-andy-stone/5 transition-colors">
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <Receipt size={16} className="text-andy-gold" />
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{i.invoiceNumber}</p>
                    <p className="text-xs text-andy-bronze/60">{i.collectorName} · {i.artworkTitle || 'General'}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-andy-black">${(i.total / 1000).toFixed(0)}k {i.currency}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${INVOICE_STATUS_COLORS[i.status]}`}>{INVOICE_STATUS_LABELS[i.status]}</span>
                </div>
              </div>
              <div className="flex items-center gap-3 text-xs text-andy-bronze">
                <span>Due: {new Date(i.dueDate).toLocaleDateString()}</span>
                <span>Issued: {new Date(i.issuedDate).toLocaleDateString()}</span>
                <div className="flex gap-2 ml-auto">
                  <button className="flex items-center gap-1 px-2 py-1 border border-andy-stone/20 rounded-lg hover:bg-andy-stone/5"><Download size={10} /> PDF</button>
                  {i.status !== 'paid' && <button className="flex items-center gap-1 px-2 py-1 bg-andy-gold text-andy-black rounded-lg"><Send size={10} /> Remind</button>}
                </div>
              </div>
            </div>
          ))}
          {filtered.length === 0 && <div className="px-6 py-12 text-center text-sm text-andy-bronze/40">No invoices</div>}
        </div>
      </div>
    </div>
  );
}