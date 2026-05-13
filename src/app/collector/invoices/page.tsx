'use client';

import { useMemo, useState } from 'react';
import { Receipt, Download, Search, Send, FileText } from 'lucide-react';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getInvoices } from '@/lib/payment';
import { INVOICE_STATUS_LABELS, INVOICE_STATUS_COLORS } from '@/types/payment';
import type { InvoiceStatus } from '@/types/payment';

export default function CollectorInvoicesPage() {
  const collectorId = useCurrentCollectorId();
  const invoices = useMemo(() => collectorId ? getInvoices({ collectorId }) : [], [collectorId]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<InvoiceStatus | 'all'>('all');

  const filtered = invoices.filter((i) => {
    const matchesSearch = i.invoiceNumber.toLowerCase().includes(search.toLowerCase()) ||
      (i.artworkTitle?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || i.status === filter;
    return matchesSearch && matchesFilter;
  });

  const totalUnpaid = invoices.filter((i) => i.status === 'sent' || i.status === 'viewed' || i.status === 'overdue').reduce((s, i) => s + i.total, 0);

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <h1 className="font-serif text-2xl font-bold text-andy-black mb-6">My Invoices</h1>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{invoices.length}</p>
          <p className="text-xs text-andy-bronze">Total Invoices</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">${(totalUnpaid / 1000).toFixed(0)}k</p>
          <p className="text-xs text-andy-bronze">Unpaid Balance</p>
        </div>
        <div className="bg-white rounded-xl border border-andy-stone/10 p-4 text-center">
          <p className="text-lg font-bold text-andy-black">{invoices.filter((i) => i.status === 'overdue').length}</p>
          <p className="text-xs text-andy-bronze">Overdue</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        {(['all', 'sent', 'viewed', 'paid', 'overdue'] as const).map((s) => (
          <button key={s} onClick={() => setFilter(s)} className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === s ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}>
            {s === 'all' ? 'All' : INVOICE_STATUS_LABELS[s]}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search invoices..." className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
      </div>

      {/* Invoices */}
      <div className="space-y-3">
        {filtered.map((inv) => (
          <div key={inv.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-andy-stone/5 rounded-xl flex items-center justify-center">
                  <Receipt size={18} className="text-andy-gold" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-andy-black">{inv.invoiceNumber}</p>
                  <p className="text-xs text-andy-bronze/60">{inv.artworkTitle || 'General'} · Issued {new Date(inv.issuedDate).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-andy-black">${(inv.total / 1000).toFixed(0)}k {inv.currency}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full ${INVOICE_STATUS_COLORS[inv.status]}`}>{INVOICE_STATUS_LABELS[inv.status]}</span>
              </div>
            </div>

            <div className="bg-andy-stone/5 rounded-xl p-3 mb-3">
              <table className="w-full text-xs">
                <tbody>
                  {inv.lineItems.map((li, idx) => (
                    <tr key={idx} className="border-b border-andy-stone/10 last:border-0">
                      <td className="py-1.5 text-andy-bronze">{li.description}</td>
                      <td className="py-1.5 text-right text-andy-black">${(li.total / 1000).toFixed(li.total >= 1000 ? 0 : 1)}k</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t border-andy-stone/20">
                    <td className="py-2 text-andy-bronze font-medium">Total</td>
                    <td className="py-2 text-right text-andy-black font-bold">${(inv.total / 1000).toFixed(0)}k {inv.currency}</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="flex items-center justify-between text-xs text-andy-bronze">
              <span>Due: {new Date(inv.dueDate).toLocaleDateString()}</span>
              <div className="flex gap-2">
                {inv.status !== 'paid' && (
                  <button className="px-3 py-1.5 bg-andy-gold text-andy-black rounded-lg font-medium hover:bg-andy-gold/80 transition-all">
                    Pay Now
                  </button>
                )}
                <button className="flex items-center gap-1 px-3 py-1.5 border border-andy-stone/20 rounded-lg hover:bg-andy-stone/5 transition-all">
                  <Download size={12} /> PDF
                </button>
              </div>
            </div>
          </div>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-andy-stone/20">
            <FileText size={32} className="text-andy-stone/30 mx-auto mb-3" />
            <p className="text-sm text-andy-bronze/40">No invoices found</p>
          </div>
        )}
      </div>
    </div>
  );
}