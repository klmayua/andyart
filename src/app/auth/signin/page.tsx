'use client';

import Link from 'next/link';
import { 
  Building2, Users, CreditCard, TrendingUp, Briefcase,
  Palette, BarChart3, FileText, ShoppingBag, Crown
} from 'lucide-react';

const directAccessCards = [
  { path: '/enterprise', label: 'Executive Operations', icon: Building2, desc: 'Platform overview & KPIs' },
  { path: '/ops', label: 'Operations Dashboard', icon: TrendingUp, desc: 'All ops modules' },
  { path: '/ops/crm', label: 'CRM Dashboard', icon: Users, desc: 'Customer relationship management' },
  { path: '/ops/crm/leads', label: 'Lead Management', icon: FileText, desc: 'Prospect tracking & conversion' },
  { path: '/ops/crm/pipeline', label: 'Sales Pipeline', icon: Briefcase, desc: 'Deal flow & forecasting' },
  { path: '/ops/crm/subscribers', label: 'Subscribers', icon: Users, desc: 'Newsletter & communications' },
  { path: '/ops/crm/insights', label: 'CRM Insights', icon: BarChart3, desc: 'Analytics & reporting' },
  { path: '/ops/concierge', label: 'Concierge Hub', icon: Crown, desc: 'VIP services & bookings' },
  { path: '/ops/concierge/bookings', label: 'Viewing Bookings', icon: Briefcase, desc: 'Scheduled gallery visits' },
  { path: '/ops/concierge/vip', label: 'VIP Clients', icon: Crown, desc: 'High-value collector profiles' },
  { path: '/ops/concierge/requests', label: 'Service Requests', icon: FileText, desc: 'Concierge inquiries' },
  { path: '/ops/concierge/commissions', label: 'Commissions', icon: Palette, desc: 'Bespoke artwork requests' },
  { path: '/ops/concierge/corporate', label: 'Corporate', icon: Building2, desc: 'Business partnerships' },
  { path: '/ops/payments', label: 'Payments Center', icon: CreditCard, desc: 'Financial operations' },
  { path: '/ops/payments/invoices', label: 'Invoices', icon: FileText, desc: 'Billing & receivables' },
  { path: '/ops/payments/escrow', label: 'Escrow', icon: CreditCard, desc: 'Secured transactions' },
  { path: '/ops/payments/settlements', label: 'Settlements', icon: CreditCard, desc: 'Payout processing' },
  { path: '/collector', label: 'Collector Portal', icon: ShoppingBag, desc: 'Collector dashboard' },
  { path: '/artists/portal', label: 'Artist Portal', icon: Palette, desc: 'Artist dashboard' },
];

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-[#0D0C0A] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-andy-gold rounded-2xl flex items-center justify-center mx-auto mb-6">
            <span className="text-[#0D0C0A] font-serif font-bold text-2xl">AA</span>
          </div>
          <h1 className="font-serif text-3xl font-bold text-[#FFFDF9] mb-2">
            Institutional Access
          </h1>
          <p className="text-andy-bronze text-sm max-w-md mx-auto">
            Access operational workspaces and private cultural systems.
          </p>
        </div>

        <div className="bg-[#171614] border border-[#FFFDF9]/10 rounded-2xl p-8 max-w-md mx-auto mb-10">
          <h2 className="text-[#FFFDF9] font-medium text-sm mb-4">Sign In (Visual Only)</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#FFFDF9] mb-1.5">Email</label>
              <input type="email" disabled className="w-full px-4 py-2.5 bg-[#0D0C0A]/50 border border-[#FFFDF9]/10 rounded-lg text-[#FFFDF9]/50 cursor-not-allowed" placeholder="email@andyart.house" />
            </div>
            <div>
              <label className="block text-sm font-medium text-[#FFFDF9] mb-1.5">Password</label>
              <input type="password" disabled className="w-full px-4 py-2.5 bg-[#0D0C0A]/50 border border-[#FFFDF9]/10 rounded-lg text-[#FFFDF9]/50 cursor-not-allowed" placeholder="Enter password" />
            </div>
            <button disabled className="w-full bg-[#FFFDF9]/10 text-[#FFFDF9]/30 py-3 rounded-lg font-medium cursor-not-allowed text-sm">
              Sign In
            </button>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-[#FFFDF9] font-medium text-lg mb-4 text-center">Direct Access - Click to Navigate</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {directAccessCards.map((card) => (
              <Link
                key={card.path}
                href={card.path}
                className="flex items-center gap-3 p-4 bg-[#171614] border border-[#FFFDF9]/10 rounded-xl hover:border-andy-gold/30 transition-all group"
              >
                <div className="w-10 h-10 rounded-lg bg-andy-gold/10 flex items-center justify-center">
                  <card.icon size={18} className="text-andy-gold" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[#FFFDF9] font-medium text-sm">{card.label}</p>
                  <p className="text-andy-bronze text-xs truncate">{card.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Link href="/" className="text-andy-bronze hover:text-[#FFFDF9] text-sm transition-colors">
            &larr; Return to public site
          </Link>
        </div>
      </div>
    </div>
  );
}