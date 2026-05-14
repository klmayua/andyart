'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  LayoutDashboard, Users, Palette, CreditCard, Star, 
  Crown, ShoppingBag, Award, Calendar, Heart, Lock,
  FileText, TrendingUp, Briefcase, Shield, Eye,
  ChevronRight, Home, Menu, Power, PowerOff
} from 'lucide-react';

const sections = [
  {
    title: 'PUBLIC SURFACES',
    icon: Eye,
    color: 'text-green-600',
    bgColor: 'bg-green-50',
    routes: [
      { path: '/', label: 'Home', badge: 'Public' },
      { path: '/gallery', label: 'Gallery', badge: 'Public' },
      { path: '/artists', label: 'Artists', badge: 'Public' },
      { path: '/events', label: 'Events', badge: 'Public' },
      { path: '/journal', label: 'Journal', badge: 'Public' },
      { path: '/services', label: 'Services', badge: 'Public' },
      { path: '/spaces', label: 'Spaces', badge: 'Public' },
      { path: '/circle', label: 'Circle', badge: 'Public' },
      { path: '/viewing-rooms', label: 'Viewing Rooms', badge: 'Public' },
      { path: '/partners', label: 'Partners', badge: 'Public' },
      { path: '/consult', label: 'Consult', badge: 'Public' },
      { path: '/checkout', label: 'Checkout', badge: 'Public' },
    ]
  },
  {
    title: 'COLLECTOR PORTAL',
    icon: Crown,
    color: 'text-amber-600',
    bgColor: 'bg-amber-50',
    routes: [
      { path: '/collector', label: 'Dashboard', badge: 'Auth' },
      { path: '/collector/profile', label: 'Profile', badge: 'Auth' },
      { path: '/collector/collection', label: 'Collection', badge: 'Auth' },
      { path: '/collector/acquisitions', label: 'Acquisitions', badge: 'Auth' },
      { path: '/collector/certificates', label: 'Certificates', badge: 'Auth' },
      { path: '/collector/viewings', label: 'Viewings', badge: 'Auth' },
      { path: '/collector/wishlist', label: 'Wishlist', badge: 'Auth' },
      { path: '/collector/vault', label: 'Vault', badge: 'Auth' },
      { path: '/collector/payments', label: 'Payments', badge: 'Auth' },
      { path: '/collector/invoices', label: 'Invoices', badge: 'Auth' },
      { path: '/collector/transactions', label: 'Transactions', badge: 'Auth' },
    ]
  },
  {
    title: 'ARTIST PORTAL',
    icon: Palette,
    color: 'text-purple-600',
    bgColor: 'bg-purple-50',
    routes: [
      { path: '/artists/portal', label: 'Portal', badge: 'Auth' },
      { path: '/artists/profile', label: 'Profile', badge: 'Auth' },
      { path: '/artists/inventory', label: 'Inventory', badge: 'Auth' },
      { path: '/artists/consignments', label: 'Consignments', badge: 'Auth' },
      { path: '/artists/exhibitions', label: 'Exhibitions', badge: 'Auth' },
      { path: '/artists/payouts', label: 'Payouts', badge: 'Auth' },
      { path: '/artists/analytics', label: 'Analytics', badge: 'Auth' },
    ]
  },
  {
    title: 'OPS - CRM',
    icon: Users,
    color: 'text-blue-600',
    bgColor: 'bg-blue-50',
    routes: [
      { path: '/ops/crm', label: 'CRM Dashboard', badge: 'Auth' },
      { path: '/ops/crm/leads', label: 'Leads', badge: 'Auth' },
      { path: '/ops/crm/pipeline', label: 'Pipeline', badge: 'Auth' },
      { path: '/ops/crm/insights', label: 'Insights', badge: 'Auth' },
      { path: '/ops/crm/subscribers', label: 'Subscribers', badge: 'Auth' },
    ]
  },
  {
    title: 'OPS - CONCIERGE',
    icon: Briefcase,
    color: 'text-indigo-600',
    bgColor: 'bg-indigo-50',
    routes: [
      { path: '/ops/concierge', label: 'Concierge Dashboard', badge: 'Auth' },
      { path: '/ops/concierge/bookings', label: 'Bookings', badge: 'Auth' },
      { path: '/ops/concierge/vip', label: 'VIP', badge: 'Auth' },
      { path: '/ops/concierge/requests', label: 'Requests', badge: 'Auth' },
      { path: '/ops/concierge/commissions', label: 'Commissions', badge: 'Auth' },
      { path: '/ops/concierge/corporate', label: 'Corporate', badge: 'Auth' },
    ]
  },
  {
    title: 'OPS - PAYMENTS',
    icon: CreditCard,
    color: 'text-emerald-600',
    bgColor: 'bg-emerald-50',
    routes: [
      { path: '/ops/payments', label: 'Payments Dashboard', badge: 'Auth' },
      { path: '/ops/payments/escrow', label: 'Escrow', badge: 'Auth' },
      { path: '/ops/payments/invoices', label: 'Invoices', badge: 'Auth' },
      { path: '/ops/payments/settlements', label: 'Settlements', badge: 'Auth' },
    ]
  },
  {
    title: 'OPS - EXECUTIVE',
    icon: TrendingUp,
    color: 'text-rose-600',
    bgColor: 'bg-rose-50',
    routes: [
      { path: '/ops/executive', label: 'Executive Dashboard', badge: 'Auth' },
      { path: '/ops/artists', label: 'Artist Management', badge: 'Auth' },
    ]
  },
  {
    title: 'AUTH PAGES',
    icon: Shield,
    color: 'text-slate-600',
    bgColor: 'bg-slate-50',
    routes: [
      { path: '/auth/signin', label: 'Sign In', badge: 'Public' },
    ]
  },
];

export default function SystemAccessPage() {
  const [demoEnabled, setDemoEnabled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const isDemo = localStorage.getItem('aa_demo_mode') === 'enabled';
    setDemoEnabled(isDemo);
  }, []);

  const toggleDemoMode = () => {
    if (demoEnabled) {
      localStorage.removeItem('aa_demo_mode');
      setDemoEnabled(false);
    } else {
      localStorage.setItem('aa_demo_mode', 'enabled');
      setDemoEnabled(true);
    }
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#171614] text-[#F7F2E8]">
      <div className="max-w-7xl mx-auto p-6 lg:p-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 bg-[#C6A66B] rounded-lg flex items-center justify-center">
                <Menu className="w-5 h-5 text-[#171614]" />
              </div>
              <div>
                <h1 className="text-2xl font-serif font-bold">System Access Hub</h1>
                <p className="text-xs text-[#A78345]">AndyArt Cultural House - Operational Surfaces</p>
              </div>
            </div>
            <button
              onClick={toggleDemoMode}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                demoEnabled 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-[#333] text-[#D7CEC1] hover:bg-[#444]'
              }`}
            >
              {demoEnabled ? <Power className="w-4 h-4" /> : <PowerOff className="w-4 h-4" />}
              {demoEnabled ? 'Demo Mode ON' : 'Enable Demo Mode'}
            </button>
          </div>
          <p className="text-sm text-[#D7CEC1] mt-2">
            {demoEnabled 
              ? '✓ Demo mode enabled - All protected routes are accessible. Click any route card to navigate.'
              : 'Click "Enable Demo Mode" to access protected routes for inspection. Use the browser back button to return here.'}
          </p>
        </div>

        <div className="grid gap-8">
          {sections.map((section) => (
            <div key={section.title} className="bg-[#1E1C1A] rounded-2xl p-5 border border-[#2A2826]">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-9 h-9 rounded-lg ${section.bgColor} flex items-center justify-center`}>
                  <section.icon className={`w-5 h-5 ${section.color}`} />
                </div>
                <h2 className="text-sm font-semibold tracking-wider text-[#D7CEC1]">{section.title}</h2>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-2">
                {section.routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="group flex items-center justify-between px-4 py-3 bg-[#252320] hover:bg-[#2A2826] rounded-xl border border-[#333] hover:border-[#C6A66B]/30 transition-all"
                  >
                    <span className="text-sm text-[#F7F2E8] truncate">{route.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#C6A66B] opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 pt-6 border-t border-[#2A2826]">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-4 py-2 bg-[#C6A66B] text-[#171614] rounded-lg font-medium text-sm hover:bg-[#B8956A] transition-colors"
          >
            <Home className="w-4 h-4" />
            Return to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}