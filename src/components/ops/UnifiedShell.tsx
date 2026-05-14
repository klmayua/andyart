'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, GitBranch, UserCheck, BarChart3,
  MessageSquare, Calendar, Palette, Building2, Crown,
  CreditCard, Receipt, Shield, Landmark, TrendingUp,
  Eye, LogOut, Bell, ChevronDown, Search, Command,
} from 'lucide-react';
import GlobalSearch from './GlobalSearch';
import CommandPalette from './CommandPalette';
import Breadcrumbs from './Breadcrumbs';

interface NavSection {
  label: string;
  items: { href: string; label: string; icon: typeof LayoutDashboard; badge?: number }[];
}

const NAV_SECTIONS: NavSection[] = [
  {
    label: 'Command Center',
    items: [
      { href: '/ops/executive', label: 'Executive', icon: TrendingUp },
      { href: '/ops/crm', label: 'CRM Overview', icon: LayoutDashboard },
      { href: '/ops/crm/leads', label: 'Leads', icon: Users },
      { href: '/ops/crm/pipeline', label: 'Pipeline', icon: GitBranch },
      { href: '/ops/crm/subscribers', label: 'Subscribers', icon: UserCheck },
      { href: '/ops/crm/insights', label: 'Insights', icon: BarChart3 },
    ],
  },
  {
    label: 'Concierge',
    items: [
      { href: '/ops/concierge', label: 'Concierge Overview', icon: LayoutDashboard },
      { href: '/ops/concierge/requests', label: 'Requests', icon: MessageSquare },
      { href: '/ops/concierge/bookings', label: 'Bookings', icon: Calendar },
      { href: '/ops/concierge/commissions', label: 'Commissions', icon: Palette },
      { href: '/ops/concierge/corporate', label: 'Corporate', icon: Building2 },
      { href: '/ops/concierge/vip', label: 'VIP Clients', icon: Crown },
    ],
  },
  {
    label: 'Finance',
    items: [
      { href: '/ops/payments', label: 'Payments', icon: CreditCard },
      { href: '/ops/payments/invoices', label: 'Invoices', icon: Receipt },
      { href: '/ops/payments/escrow', label: 'Escrow', icon: Shield },
      { href: '/ops/payments/settlements', label: 'Settlements', icon: Landmark },
    ],
  },
  {
    label: 'Artists',
    items: [
      { href: '/ops/artists', label: 'Artist Console', icon: Palette },
    ],
  },
];

interface UnifiedShellProps {
  children: React.ReactNode;
}

export default function UnifiedShell({ children }: UnifiedShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [showSearch, setShowSearch] = useState(false);
  const [showCmd, setShowCmd] = useState(false);
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') { e.preventDefault(); setShowCmd(true); }
      if (e.key === '/' && !e.metaKey && !e.ctrlKey) {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') { e.preventDefault(); setShowSearch(true); }
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const handleLogout = () => { router.push('/auth/signin'); };

  return (
    <div className="min-h-screen bg-[#F7F2E8] flex">
      <aside className={`${sidebarOpen ? 'w-60' : 'w-0'} bg-[#171614] text-[#FFFDF9] flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden`}>
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
                      {item.badge ? <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full">{item.badge}</span> : null}
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
        <div className="h-14 bg-white border-b border-andy-stone/10 px-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 rounded-lg hover:bg-andy-stone/10 transition-colors">
              <Command size={16} className="text-andy-bronze" />
            </button>
            <button
              onClick={() => setShowSearch(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-andy-stone/5 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/10 transition-colors"
            >
              <Search size={14} />
              <span>Search...</span>
              <span className="text-[10px] text-andy-bronze/40 bg-white px-1.5 py-0.5 rounded border border-andy-stone/10">/</span>
            </button>
            <button
              onClick={() => setShowCmd(true)}
              className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-andy-stone/5 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/10 transition-colors"
            >
              <Command size={14} />
              <span>Command...</span>
              <span className="text-[10px] text-andy-bronze/40 bg-white px-1.5 py-0.5 rounded border border-andy-stone/10">⌘K</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }} className="relative p-2 rounded-lg hover:bg-andy-stone/10 transition-colors">
              <Bell size={16} className="text-andy-bronze" />
            </button>

            <div className="relative">
              <button onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }} className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-andy-stone/10 transition-colors">
                <div className="w-7 h-7 bg-andy-black text-andy-gold rounded-full flex items-center justify-center text-[10px] font-bold">D</div>
                <ChevronDown size={12} className="text-andy-bronze" />
              </button>
              {showProfile && (
                <div className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-2xl border border-andy-stone/20 shadow-premium z-50 overflow-hidden">
                  <div className="px-3 py-2.5 border-b border-andy-stone/10">
                    <p className="text-xs font-semibold text-andy-black">Demo User</p>
                    <p className="text-[10px] text-andy-bronze">demo@andyart.house</p>
                  </div>
                  <div className="py-1">
                    <button onClick={handleLogout} className="flex items-center gap-2.5 w-full px-3 py-2 text-xs text-andy-wine hover:bg-andy-stone/5 transition-colors"><LogOut size={12} /> Sign Out</button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {(showNotifs || showProfile) && (
            <div className="fixed inset-0 z-40" onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
          )}
        </div>

        <main className="flex-1 overflow-auto p-6 lg:p-8">
          <Breadcrumbs />
          {children}
        </main>
      </div>

      <GlobalSearch open={showSearch} onClose={() => setShowSearch(false)} />
      <CommandPalette open={showCmd} onClose={() => setShowCmd(false)} />
    </div>
  );
}