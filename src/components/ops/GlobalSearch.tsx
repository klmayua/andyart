'use client';

import { useEffect, useMemo, useState, useRef } from 'react';
import { Search, X, User, Palette, Receipt, MessageSquare, Crown, Shield, Landmark, Calendar, Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getAllCollectors } from '@/lib/collector';
import { getInvoices } from '@/lib/payment';
import { getAllRequests } from '@/lib/concierge';
import { getAllLeads } from '@/lib/leadCapture';

interface SearchResult {
  id: string;
  title: string;
  subtitle: string;
  type: string;
  url: string;
  icon: typeof User;
}

interface GlobalSearchProps {
  open: boolean;
  onClose: () => void;
}

export default function GlobalSearch({ open, onClose }: GlobalSearchProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    const out: SearchResult[] = [];

    try {
      getAllCollectors().forEach((c) => {
        if (c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)) {
          out.push({ id: c.id, title: c.name, subtitle: `Collector · ${c.tier}`, type: 'collector', url: `/collector/profile`, icon: User });
        }
      });
    } catch { /* noop */ }

    try {
      getAllLeads().forEach((l) => {
        if (l.profile.fullName.toLowerCase().includes(q)) {
          out.push({ id: l.id, title: l.profile.fullName, subtitle: `Lead · ${l.temperature}`, type: 'lead', url: `/ops/crm/leads`, icon: Crown });
        }
      });
    } catch { /* noop */ }

    try {
      getInvoices().forEach((i) => {
        if (i.invoiceNumber.toLowerCase().includes(q) || i.collectorName.toLowerCase().includes(q)) {
          out.push({ id: i.id, title: i.invoiceNumber, subtitle: `Invoice · ${i.collectorName}`, type: 'invoice', url: `/ops/payments/invoices`, icon: Receipt });
        }
      });
    } catch { /* noop */ }

    try {
      getAllRequests().forEach((r) => {
        if (r.subject.toLowerCase().includes(q) || r.clientProfile.name.toLowerCase().includes(q)) {
          out.push({ id: r.id, title: r.subject, subtitle: `Request · ${r.clientProfile.name}`, type: 'request', url: `/ops/concierge/requests`, icon: MessageSquare });
        }
      });
    } catch { /* noop */ }

    return out.slice(0, 8);
  }, [query]);

  useEffect(() => { setSelectedIdx(0); }, [results.length]);

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 50); }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, results.length - 1)); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); return; }
      if (e.key === 'Enter' && results[selectedIdx]) {
        e.preventDefault();
        router.push(results[selectedIdx].url);
        onClose();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, results, selectedIdx, router, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl border border-andy-stone/20 shadow-premium overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-andy-stone/10">
          <Search size={16} className="text-andy-bronze" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search collectors, leads, invoices, requests..."
            className="flex-1 text-sm text-andy-black placeholder:text-andy-bronze/40 outline-none"
          />
          <button onClick={onClose} className="p-1.5 text-andy-bronze hover:text-andy-black rounded-lg hover:bg-andy-stone/10"><X size={14} /></button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {results.length === 0 && query.trim() && (
            <div className="py-8 text-center text-sm text-andy-bronze/40">No results found</div>
          )}
          {results.map((r, idx) => (
            <button
              key={r.id}
              onClick={() => { router.push(r.url); onClose(); }}
              className={`w-full flex items-center gap-3 px-4 py-3 text-left transition-colors ${idx === selectedIdx ? 'bg-andy-gold/5' : 'hover:bg-andy-stone/5'}`}
            >
              <div className="w-8 h-8 bg-andy-stone/5 rounded-lg flex items-center justify-center flex-shrink-0">
                <r.icon size={14} className="text-andy-bronze" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-andy-black truncate">{r.title}</p>
                <p className="text-xs text-andy-bronze/60">{r.subtitle}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-andy-stone/10 flex items-center justify-between text-[10px] text-andy-bronze/40">
          <span>↑↓ to navigate · Enter to select · Esc to close</span>
          <span>{results.length} results</span>
        </div>
      </div>
    </div>
  );
}