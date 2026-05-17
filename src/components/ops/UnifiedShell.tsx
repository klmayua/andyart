'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, GitBranch, UserCheck, BarChart3,
  MessageSquare, Calendar, Palette, Building2, Crown,
  CreditCard, Receipt, Shield, Landmark, TrendingUp,
  Eye, LogOut, ChevronDown, Search, Command, Bell, Plus, X,
} from 'lucide-react';

interface NavSection {
  label: string;
  items: { href: string; label: string; icon: typeof LayoutDashboard }[];
}

const NAV_SECTIONS: NavSection[] = [
  { label: 'Command Center', items: [
    { href: '/ops/executive', label: 'Executive', icon: TrendingUp },
    { href: '/ops/crm', label: 'CRM Overview', icon: LayoutDashboard },
    { href: '/ops/crm/leads', label: 'Leads', icon: Users },
    { href: '/ops/crm/pipeline', label: 'Pipeline', icon: GitBranch },
    { href: '/ops/crm/subscribers', label: 'Subscribers', icon: UserCheck },
    { href: '/ops/crm/insights', label: 'Insights', icon: BarChart3 },
  ]},
  { label: 'Concierge', items: [
    { href: '/ops/concierge', label: 'Concierge Overview', icon: LayoutDashboard },
    { href: '/ops/concierge/requests', label: 'Requests', icon: MessageSquare },
    { href: '/ops/concierge/bookings', label: 'Bookings', icon: Calendar },
    { href: '/ops/concierge/commissions', label: 'Commissions', icon: Palette },
    { href: '/ops/concierge/corporate', label: 'Corporate', icon: Building2 },
    { href: '/ops/concierge/vip', label: 'VIP Clients', icon: Crown },
  ]},
  { label: 'Finance', items: [
    { href: '/ops/payments', label: 'Payments', icon: CreditCard },
    { href: '/ops/payments/invoices', label: 'Invoices', icon: Receipt },
    { href: '/ops/payments/escrow', label: 'Escrow', icon: Shield },
    { href: '/ops/payments/settlements', label: 'Settlements', icon: Landmark },
  ]},
  { label: 'Artists', items: [
    { href: '/ops/artists', label: 'Artist Console', icon: Palette },
  ]},
];

export default function UnifiedShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#F7F2E8] flex">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-0'} bg-[#171614] text-[#FFFDF9] flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden border-r border-[#C6A66B]/20`}>
        <div className="px-5 py-5 border-b border-[#FFFDF9]/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-andy-gold rounded-lg flex items-center justify-center">
              <span className="text-andy-black font-bold text-[10px]">AA</span>
            </div>
            <div>
              <span className="font-serif font-bold text-sm">AndyArt</span>
              <span className="block text-[9px] text-andy-gold tracking-wider uppercase">Operations</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3 space-y-4 overflow-y-auto">
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <p className="px-3.5 text-[10px] text-[#FFFDF9]/30 uppercase tracking-wider mb-1">{section.label}</p>
              <div className="space-y-0.5">
                {section.items.map((item) => {
                  const active = pathname === item.href || (item.href !== '/ops/executive' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all ${
                        active ? 'bg-andy-gold text-andy-black' : 'text-[#FFFDF9]/50 hover:text-[#FFFDF9] hover:bg-[#FFFDF9]/[0.05]'
                      }`}
                    >
                      <item.icon size={15} />
                      <span className="flex-1">{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="px-2.5 py-3 border-t border-[#FFFDF9]/[0.06] space-y-0.5">
          <Link href="/collector" className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#FFFDF9]/40 hover:text-[#FFFDF9]/70 transition-all">
            <Eye size={14} /> Collector Portal
          </Link>
          <Link href="/" className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium text-[#FFFDF9]/40 hover:text-[#FFFDF9]/70 transition-all">
            <Eye size={14} /> View Site
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 bg-[#171614] border-b border-[#C6A66B] px-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-1.5 rounded-lg hover:bg-[#2A2826] transition-colors">
              <Command size={16} className="text-[#A78345]" />
            </button>
            <div className="relative w-[280px]">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A78345]/60" />
              <input
                type="text"
                placeholder="Search collectors, invoices, requests..."
                className="w-full h-8 pl-9 pr-3 bg-[#1E1C1A] rounded-lg text-xs text-[#FFFDF9] placeholder:text-[#FFFDF9]/30 focus:outline-none focus:ring-1 focus:ring-[#C6A66B] border border-[#FFFDF9]/[0.06]"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 px-2 py-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#4ADE80]"></span>
              <span className="text-[10px] text-[#FFFDF9]/40">System Healthy</span>
            </div>
            <div className="relative">
              <button className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-[#C6A66B] text-[#171614] text-xs font-medium hover:bg-[#D4B67A] transition-colors">
                <Plus size={14} />
                Create
                <ChevronDown size={12} />
              </button>
            </div>
            <button className="relative p-1.5 rounded-lg hover:bg-[#2A2826] transition-colors">
              <Bell size={16} className="text-[#A78345]" />
              <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#C6A66B] rounded-full"></span>
            </button>
            <div className="flex items-center gap-2 px-2 py-1 rounded-lg bg-[#1E1C1A] cursor-pointer hover:bg-[#252220] transition-colors">
              <div className="w-6 h-6 bg-[#C6A66B] text-[#171614] rounded-full flex items-center justify-center text-[10px] font-bold">D</div>
              <div className="flex flex-col">
                <span className="text-xs text-[#FFFDF9]">Demo</span>
                <span className="text-[9px] text-[#A78345]">Operations Admin</span>
              </div>
            </div>
          </div>
        </div>

        <main className="flex-1 overflow-auto p-6 lg:p-8 bg-[#F3EFE6]">
          {children}
        </main>
      </div>
    </div>
  );
}