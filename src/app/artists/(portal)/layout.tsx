'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, User, Layers, ClipboardList, Palette, Calendar, CreditCard, BarChart3, Eye, LogOut, Menu, X,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { seedArtistData } from '@/data/artist.mock';

function isDemoModeActive(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('aa_demo_mode') === 'enabled' && localStorage.getItem('andyart-demo-session') !== null;
}

const navItems = [
  { href: '/artists/portal', label: 'Overview', icon: LayoutDashboard },
  { href: '/artists/profile', label: 'Profile', icon: User },
  { href: '/artists/inventory', label: 'Inventory', icon: Layers },
  { href: '/artists/consignments', label: 'Consignments', icon: ClipboardList },
  { href: '/artists/commissions', label: 'Commissions', icon: Palette },
  { href: '/artists/exhibitions', label: 'Exhibitions', icon: Calendar },
  { href: '/artists/payouts', label: 'Payouts', icon: CreditCard },
  { href: '/artists/analytics', label: 'Analytics', icon: BarChart3 },
];

export default function ArtistPortalLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { isLoading, isAuthenticated, isDemoMode, logout } = useAuth();
  const [authorized, setAuthorized] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      seedArtistData();
    }
  }, []);

  useEffect(() => {
    if (isLoading) return;
    const demoActive = isDemoModeActive();
    if (!isAuthenticated && !isDemoMode && !demoActive) {
      router.push('/auth/signin');
      return;
    }
    setAuthorized(true);
  }, [isLoading, isAuthenticated, isDemoMode, router]);

  if (isLoading || !authorized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F2E8]">
        <div className="text-center">
          <div className="w-10 h-10 border-[3px] border-andy-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
          <p className="text-andy-bronze text-xs">Verifying access...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F2E8] flex">
      {/* Mobile toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md border border-andy-stone/20"
      >
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'w-56' : 'w-0'} lg:w-56 bg-white border-r border-andy-stone/10 flex flex-col flex-shrink-0 transition-all duration-300 overflow-hidden fixed lg:relative z-40 h-full`}>
        <div className="px-5 py-5 border-b border-andy-stone/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-andy-black rounded-lg flex items-center justify-center">
              <span className="text-andy-gold font-bold text-[10px]">AA</span>
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-andy-black">Artist</span>
              <span className="block text-[9px] text-andy-bronze tracking-wider uppercase">Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/artists/portal' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium transition-all ${
                  active
                    ? 'bg-andy-gold/10 text-andy-gold'
                    : 'text-andy-bronze hover:text-andy-black hover:bg-andy-stone/5'
                }`}
              >
                <item.icon size={15} />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="px-2.5 py-3 border-t border-andy-stone/10 space-y-0.5">
          <Link href="/" className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-andy-bronze hover:text-andy-black hover:bg-andy-stone/5 transition-all">
            <Eye size={14} /> View Site
          </Link>
          <button
            onClick={() => { logout(); router.push('/'); }}
            className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-andy-wine hover:bg-andy-stone/5 transition-all w-full text-left"
          >
            <LogOut size={14} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div className="lg:hidden fixed inset-0 bg-black/30 z-30" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
