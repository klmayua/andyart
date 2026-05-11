'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, User, Layers, ShoppingBag, Award, Calendar, Heart, Lock, Eye, LogOut, CreditCard, Receipt, ArrowLeftRight,
} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

const navItems = [
  { href: '/collector', label: 'Overview', icon: LayoutDashboard },
  { href: '/collector/profile', label: 'Profile', icon: User },
  { href: '/collector/collection', label: 'Collection', icon: Layers },
  { href: '/collector/acquisitions', label: 'Acquisitions', icon: ShoppingBag },
  { href: '/collector/certificates', label: 'Certificates', icon: Award },
  { href: '/collector/viewings', label: 'Viewings', icon: Calendar },
  { href: '/collector/wishlist', label: 'Wishlist', icon: Heart },
  { href: '/collector/vault', label: 'Vault', icon: Lock },
  { href: '/collector/payments', label: 'Payments', icon: CreditCard },
  { href: '/collector/invoices', label: 'Invoices', icon: Receipt },
  { href: '/collector/transactions', label: 'Transactions', icon: ArrowLeftRight },
];

export default function CollectorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, isLoading, isAuthenticated, logout } = useAuth();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    if (isLoading) return;
    if (!isAuthenticated) {
      router.push('/auth/signin');
      return;
    }
    setAuthorized(true);
  }, [isLoading, isAuthenticated, router]);

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
      {/* Sidebar */}
      <aside className="w-56 bg-white border-r border-andy-stone/10 flex flex-col flex-shrink-0">
        <div className="px-5 py-5 border-b border-andy-stone/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-andy-gold rounded-lg flex items-center justify-center">
              <span className="text-andy-black font-bold text-[10px]">AC</span>
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-andy-black">Collector</span>
              <span className="block text-[9px] text-andy-bronze tracking-wider uppercase">Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3 space-y-0.5">
          {navItems.map((item) => {
            const active = pathname === item.href || (item.href !== '/collector' && pathname.startsWith(item.href));
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

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}