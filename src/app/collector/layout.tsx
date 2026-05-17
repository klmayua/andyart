'use client';

import Link from 'next/link';
import { LayoutDashboard, User, Layers, ShoppingBag, Award, Calendar, Heart, Lock, CreditCard, Receipt, ArrowLeftRight, Eye, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/collector', label: 'Overview', icon: LayoutDashboard },
  { href: '/collector/collection', label: 'Collection', icon: Layers },
  { href: '/collector/acquisitions', label: 'Acquisitions', icon: ShoppingBag },
];

export default function CollectorLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F7F2E8] flex">
      <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-md">
        {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <aside className={`${sidebarOpen ? 'w-56' : 'w-0'} lg:w-56 bg-white border-r border-andy-stone/10 flex flex-col`}>
        <div className="px-5 py-5 border-b border-andy-stone/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-andy-gold rounded-lg flex items-center justify-center">
              <span className="text-andy-black font-bold text-[10px]">AC</span>
            </div>
            <div>
              <span className="font-serif font-bold text-sm text-andy-black">Collector</span>
              <span className="block text-[9px] text-andy-bronze">Portal</span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-2.5 py-3 space-y-0.5">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs font-medium text-andy-bronze hover:text-andy-black hover:bg-andy-stone/5">
              <item.icon size={15} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto p-4 md:p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}