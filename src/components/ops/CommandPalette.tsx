'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, X, LayoutDashboard, Users, GitBranch, UserCheck, BarChart3,
  MessageSquare, Calendar, Palette, Building2, Crown, Receipt, Shield, Landmark,
  CreditCard, ArrowLeftRight, FileText, Award, Heart, Lock, Eye,
  Plus, User, AlertCircle, TrendingUp,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  shortcut?: string;
  icon: typeof Search;
  action: () => void;
  category: string;
}

interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandPalette({ open, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedIdx, setSelectedIdx] = useState(0);

  const commands = useMemo<CommandItem[]>(() => {
    const nav = (path: string) => { router.push(path); onClose(); };
    return [
      // Navigation
      { id: 'nav-crm', label: 'CRM Overview', category: 'Navigate', icon: LayoutDashboard, action: () => nav('/ops/crm') },
      { id: 'nav-leads', label: 'Leads Table', category: 'Navigate', icon: Users, action: () => nav('/ops/crm/leads') },
      { id: 'nav-pipeline', label: 'Pipeline Board', category: 'Navigate', icon: GitBranch, action: () => nav('/ops/crm/pipeline') },
      { id: 'nav-subscribers', label: 'Subscribers', category: 'Navigate', icon: UserCheck, action: () => nav('/ops/crm/subscribers') },
      { id: 'nav-insights', label: 'CRM Insights', category: 'Navigate', icon: BarChart3, action: () => nav('/ops/crm/insights') },
      { id: 'nav-concierge', label: 'Concierge Overview', category: 'Navigate', icon: LayoutDashboard, action: () => nav('/ops/concierge') },
      { id: 'nav-requests', label: 'Concierge Requests', category: 'Navigate', icon: MessageSquare, action: () => nav('/ops/concierge/requests') },
      { id: 'nav-bookings', label: 'Bookings', category: 'Navigate', icon: Calendar, action: () => nav('/ops/concierge/bookings') },
      { id: 'nav-commissions', label: 'Commissions', category: 'Navigate', icon: Palette, action: () => nav('/ops/concierge/commissions') },
      { id: 'nav-corporate', label: 'Corporate Projects', category: 'Navigate', icon: Building2, action: () => nav('/ops/concierge/corporate') },
      { id: 'nav-vip', label: 'VIP Clients', category: 'Navigate', icon: Crown, action: () => nav('/ops/concierge/vip') },
      { id: 'nav-payments', label: 'Payments Console', category: 'Navigate', icon: CreditCard, action: () => nav('/ops/payments') },
      { id: 'nav-invoices', label: 'Invoice Management', category: 'Navigate', icon: Receipt, action: () => nav('/ops/payments/invoices') },
      { id: 'nav-escrow', label: 'Escrow Cases', category: 'Navigate', icon: Shield, action: () => nav('/ops/payments/escrow') },
      { id: 'nav-settlements', label: 'Settlements', category: 'Navigate', icon: Landmark, action: () => nav('/ops/payments/settlements') },
      { id: 'nav-executive', label: 'Executive Dashboard', category: 'Navigate', icon: TrendingUp, action: () => nav('/ops/executive') },
      { id: 'nav-collector', label: 'Collector Portal', category: 'Navigate', icon: User, action: () => nav('/collector') },
      { id: 'nav-site', label: 'Public Site', category: 'Navigate', icon: Eye, action: () => nav('/') },
      // Actions
      { id: 'act-invoice', label: 'Create Invoice', category: 'Actions', icon: Plus, action: () => nav('/ops/payments/invoices') },
      { id: 'act-viewing', label: 'Schedule Viewing', category: 'Actions', icon: Calendar, action: () => nav('/ops/concierge/bookings') },
      { id: 'act-concierge', label: 'Trigger Concierge', category: 'Actions', icon: MessageSquare, action: () => nav('/ops/concierge/requests') },
      { id: 'act-alert', label: 'View Alerts', category: 'Actions', icon: AlertCircle, action: () => nav('/ops/executive') },
    ];
  }, [router, onClose]);

  const filtered = useMemo(() => {
    if (!query.trim()) return commands;
    const q = query.toLowerCase();
    return commands.filter((c) => c.label.toLowerCase().includes(q) || c.category.toLowerCase().includes(q));
  }, [commands, query]);

  const grouped = useMemo(() => {
    const g: Record<string, CommandItem[]> = {};
    for (const c of filtered) { (g[c.category] = g[c.category] || []).push(c); }
    return g;
  }, [filtered]);

  useEffect(() => { setSelectedIdx(0); }, [filtered.length]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return; }
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, filtered.length - 1)); return; }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); return; }
      if (e.key === 'Enter' && filtered[selectedIdx]) {
        e.preventDefault();
        filtered[selectedIdx].action();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, filtered, selectedIdx, onClose]);

  if (!open) return null;

  let flatIdx = 0;

  return (
    <div className="fixed inset-0 z-[60] flex items-start justify-center pt-[15vh]" onClick={onClose}>
      <div className="w-full max-w-lg bg-white rounded-2xl border border-andy-stone/20 shadow-premium overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center gap-3 px-4 py-3 border-b border-andy-stone/10">
          <Search size={16} className="text-andy-bronze" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type a command or search..."
            className="flex-1 text-sm text-andy-black placeholder:text-andy-bronze/40 outline-none"
            autoFocus
          />
          <button onClick={onClose} className="p-1.5 text-andy-bronze hover:text-andy-black rounded-lg hover:bg-andy-stone/10"><X size={14} /></button>
        </div>
        <div className="max-h-80 overflow-y-auto">
          {filtered.length === 0 && (
            <div className="py-8 text-center text-sm text-andy-bronze/40">No commands found</div>
          )}
          {Object.entries(grouped).map(([category, items]) => (
            <div key={category}>
              <div className="px-4 py-1.5 text-[10px] font-semibold text-andy-bronze/50 uppercase tracking-wider">{category}</div>
              {items.map((item) => {
                const isSelected = flatIdx === selectedIdx;
                const idx = flatIdx++;
                return (
                  <button
                    key={item.id}
                    onClick={item.action}
                    onMouseEnter={() => setSelectedIdx(idx)}
                    className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${isSelected ? 'bg-andy-gold/5' : 'hover:bg-andy-stone/5'}`}
                  >
                    <item.icon size={14} className="text-andy-bronze flex-shrink-0" />
                    <span className="text-sm text-andy-black">{item.label}</span>
                    {item.shortcut && <span className="ml-auto text-[10px] text-andy-bronze/40 bg-andy-stone/5 px-1.5 py-0.5 rounded">{item.shortcut}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
        <div className="px-4 py-2 border-t border-andy-stone/10 flex items-center justify-between text-[10px] text-andy-bronze/40">
          <span>↑↓ to navigate · Enter to select · Esc to close</span>
          <span>{filtered.length} commands</span>
        </div>
      </div>
    </div>
  );
}