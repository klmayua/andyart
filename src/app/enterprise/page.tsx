'use client';

import Link from 'next/link';
import { 
  Building2, Users, CreditCard, TrendingUp, Briefcase,
  ShoppingBag, Award, FileText, Palette, BarChart3,
  ChevronRight, Building, Lock, Shield
} from 'lucide-react';

const systems = [
  {
    category: 'EXECUTIVE OPERATIONS',
    icon: Building2,
    color: 'text-amber-500',
    bgColor: 'bg-amber-500/10',
    borderColor: 'border-amber-500/20',
    routes: [
      { path: '/ops', label: 'Executive Dashboard', desc: 'Platform overview & KPIs' },
      { path: '/ops/crm', label: 'CRM Dashboard', desc: 'Customer relationship management' },
      { path: '/ops/concierge', label: 'Concierge Hub', desc: 'VIP services & bookings' },
      { path: '/ops/payments', label: 'Payments Center', desc: 'Financial operations' },
    ]
  },
  {
    category: 'RELATIONSHIP MANAGEMENT',
    icon: Users,
    color: 'text-blue-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/20',
    routes: [
      { path: '/ops/crm/leads', label: 'Lead Management', desc: 'Prospect tracking & conversion' },
      { path: '/ops/crm/pipeline', label: 'Sales Pipeline', desc: 'Deal flow & forecasting' },
      { path: '/ops/crm/subscribers', label: 'Subscribers', desc: 'Newsletter & communications' },
      { path: '/ops/crm/insights', label: 'CRM Insights', desc: 'Analytics & reporting' },
    ]
  },
  {
    category: 'CONCIERGE & VIP SERVICES',
    icon: Briefcase,
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-500/10',
    borderColor: 'border-indigo-500/20',
    routes: [
      { path: '/ops/concierge/bookings', label: 'Viewing Bookings', desc: 'Scheduled gallery visits' },
      { path: '/ops/concierge/vip', label: 'VIP Clients', desc: 'High-value collector profiles' },
      { path: '/ops/concierge/requests', label: 'Service Requests', desc: 'Concierge inquiries' },
      { path: '/ops/concierge/commissions', label: 'Commissions', desc: 'Bespoke artwork requests' },
      { path: '/ops/concierge/corporate', label: 'Corporate', desc: 'Business partnerships' },
    ]
  },
  {
    category: 'FINANCE & SETTLEMENTS',
    icon: CreditCard,
    color: 'text-emerald-500',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/20',
    routes: [
      { path: '/ops/payments/invoices', label: 'Invoices', desc: 'Billing & receivables' },
      { path: '/ops/payments/escrow', label: 'Escrow', desc: 'Secured transactions' },
      { path: '/ops/payments/settlements', label: 'Settlements', desc: 'Payout processing' },
      { path: '/ops/executive', label: 'Financial Overview', desc: 'Executive summary' },
    ]
  },
  {
    category: 'COLLECTOR OPERATIONS',
    icon: ShoppingBag,
    color: 'text-purple-500',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/20',
    routes: [
      { path: '/collector', label: 'Collector Portal', desc: 'Collector dashboard' },
      { path: '/collector/collection', label: 'Collections', desc: 'Artwork management' },
      { path: '/collector/acquisitions', label: 'Acquisitions', desc: 'Purchase history' },
      { path: '/collector/payments', label: 'Payments', desc: 'Payment history' },
      { path: '/collector/vault', label: 'Vault', desc: 'Secure storage & certificates' },
    ]
  },
  {
    category: 'ARTIST OPERATIONS',
    icon: Palette,
    color: 'text-rose-500',
    bgColor: 'bg-rose-500/10',
    borderColor: 'border-rose-500/20',
    routes: [
      { path: '/artists/portal', label: 'Artist Portal', desc: 'Artist dashboard' },
      { path: '/artists/inventory', label: 'Inventory', desc: 'Artwork catalog' },
      { path: '/artists/consignments', label: 'Consignments', desc: 'Consignment agreements' },
      { path: '/artists/exhibitions', label: 'Exhibitions', desc: 'Showcase events' },
      { path: '/artists/payouts', label: 'Payouts', desc: 'Artist compensation' },
      { path: '/artists/analytics', label: 'Analytics', desc: 'Performance metrics' },
    ]
  },
  {
    category: 'ARTIST MANAGEMENT',
    icon: BarChart3,
    color: 'text-orange-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/20',
    routes: [
      { path: '/ops/artists', label: 'Artist Management', desc: 'Admin artist oversight' },
    ]
  },
];

export default function EnterprisePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1816] to-[#252220] text-[#F7F2E8]">
      <div className="max-w-7xl mx-auto pt-12 pb-8 px-8">
        <div className="mb-12">
          <div className="flex items-center gap-5 mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-[#C6A66B] to-[#A78345] rounded-2xl flex items-center justify-center shadow-lg">
              <Building2 className="w-8 h-8 text-[#171614]" />
            </div>
            <div>
              <h1 className="text-4xl font-serif font-bold tracking-tight text-[#F7F2E8]">Enterprise Operations</h1>
              <p className="text-[#A78345] text-sm mt-1">AndyArt Cultural House — Backend Ecosystem</p>
            </div>
          </div>
          <p className="text-[#D7CEC1] max-w-2xl text-base leading-relaxed">
            Complete operational access to all enterprise systems. Select any module below to navigate directly to that system's interface.
          </p>
        </div>

        <div className="grid gap-8">
          {systems.map((system) => (
            <div key={system.category} className={`bg-[#1E1C1A] rounded-2xl p-6 border ${system.borderColor}`}>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-10 h-10 rounded-xl ${system.bgColor} flex items-center justify-center`}>
                  <system.icon className={`w-5 h-5 ${system.color}`} />
                </div>
                <h2 className="text-sm font-semibold tracking-wider text-[#D7CEC1]">{system.category}</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
                {system.routes.map((route) => (
                  <Link
                    key={route.path}
                    href={route.path}
                    className="group flex items-start justify-between p-4 bg-[#252320]/80 hover:bg-[#2A2826] rounded-xl border border-[#333] hover:border-[#C6A66B]/40 transition-all"
                  >
                    <div>
                      <span className="text-sm font-medium text-[#F7F2E8] block mb-1">{route.label}</span>
                      <span className="text-xs text-[#A78345]">{route.desc}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-[#C6A66B] opacity-0 group-hover:opacity-100 transition-opacity mt-1 flex-shrink-0" />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 p-6 bg-[#1E1C1A] rounded-2xl border border-[#333]">
          <div className="flex items-center gap-3 mb-3">
            <Shield className="w-5 h-5 text-[#C6A66B]" />
            <span className="text-sm font-medium text-[#D7CEC1]">Access Notice</span>
          </div>
          <p className="text-sm text-[#A78345] leading-relaxed">
            This is the institutional operational access layer. Demo mode is enabled - all protected routes are accessible. 
            Navigation returns here via the browser back button.
          </p>
        </div>

        <div className="mt-6 text-center">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm text-[#A78345] hover:text-[#C6A66B] transition-colors"
          >
            <span>Return to public homepage</span>
          </Link>
        </div>
      </div>
    </div>
  );
}