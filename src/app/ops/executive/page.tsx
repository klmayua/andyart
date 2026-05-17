'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  TrendingUp, Users, Crown, CreditCard, Shield, Calendar,
  ArrowRight, Activity, AlertCircle, CheckCircle, Clock,
  GitBranch, MessageSquare, Heart,
} from 'lucide-react';
import { getPaymentStats } from '@/lib/payment';
import { getAllCollectors } from '@/lib/collector';
import { getAllRequests, getAllViewings, getAllCommissions } from '@/lib/concierge';
import { getAllLeads } from '@/lib/leadCapture';
import { getActivityFeed, getActivityStats } from '@/lib/activity';

export default function ExecutiveDashboardPage() {
  const [paymentStats, setPaymentStats] = useState({ totalVolume: 0, pendingVolume: 0, escrowBalance: 0, activeReservations: 0, completedPayments: 0, overdueInvoices: 0, escrowDisputed: 0, escrowFunded: 0, pendingSettlements: 0 });
  const [collectors, setCollectors] = useState([] as any[]);
  const [leads, setLeads] = useState([] as any[]);
  const [requests, setRequests] = useState([] as any[]);
  const [viewings, setViewings] = useState([] as any[]);
  const [commissions, setCommissions] = useState([] as any[]);
  const [activities, setActivities] = useState([] as any[]);
  const [activityStats, setActivityStats] = useState({ todayEvents: 0, criticalCount: 0, warningCount: 0, successCount: 0 });

  useEffect(() => {
    setPaymentStats(getPaymentStats());
    setCollectors(getAllCollectors());
    setLeads(getAllLeads());
    setRequests(getAllRequests());
    setViewings(getAllViewings());
    setCommissions(getAllCommissions());
    setActivities(getActivityFeed(20));
    setActivityStats(getActivityStats());
  }, []);

  const vipLeads = leads.filter((l) => l.temperature === 'vip_priority').length;
  const hotLeads = leads.filter((l) => l.temperature === 'hot').length;
  const totalPipelineValue = leads.reduce((s, l) => {
    if (l.budgetBand === '100000_plus') return s + 100000;
    if (l.budgetBand === '25000_100000') return s + 62500;
    if (l.budgetBand === '5000_25000') return s + 15000;
    if (l.budgetBand === '1000_5000') return s + 3000;
    return s;
  }, 0);

  const urgentRequests = requests.filter((r) => r.priority === 'executive' || r.priority === 'vip').length;
  const todayViewings = viewings.filter((v) => new Date(v.date).toDateString() === new Date().toDateString()).length;
  const activeCommissions = commissions.filter((c) => c.status === 'in_progress' || c.status === 'artist_matching').length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-[#F5EBDD]">Executive Command</h1>
          <p className="text-sm text-[#B9A48A] mt-1">Operational overview and system intelligence</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#7B6854]">
          <Activity size={14} className="text-[#C89B4F]" />
          <span>{activityStats.todayEvents} events today</span>
        </div>
      </div>

      {/* Revenue Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `$${(paymentStats.totalVolume / 1000).toFixed(0)}k`, sub: `${paymentStats.completedPayments} transactions`, icon: TrendingUp, href: '/ops/payments', accent: true },
          { label: 'Pending Volume', value: `$${(paymentStats.pendingVolume / 1000).toFixed(0)}k`, sub: 'In pipeline', icon: CreditCard, href: '/ops/payments/invoices' },
          { label: 'Escrow Balance', value: `$${(paymentStats.escrowBalance / 1000).toFixed(0)}k`, sub: `${paymentStats.escrowFunded} funded cases`, icon: Shield, href: '/ops/payments/escrow' },
          { label: 'Active Reservations', value: paymentStats.activeReservations, sub: 'Deposit held', icon: Heart, href: '/ops/payments' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className={`bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-xl border border-[rgba(214,170,92,0.10)] backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.02)] hover:border-[rgba(214,170,92,0.18)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all group ${kpi.accent ? 'border-t border-t-[rgba(214,170,92,0.4)]' : ''}`}>
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={18} className="text-[#C89B4F]" />
              <ArrowRight size={14} className="text-[#B9A48A]/40 group-hover:text-[#C89B4F] transition-colors" />
            </div>
            <p className="text-3xl font-bold text-[#FFF3DF] tracking-tight">{kpi.value}</p>
            <p className="text-[11px] text-[#B9A48A] mt-1 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-xs text-[#B9A48A]/50">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      {/* Collector & Pipeline Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Collectors', value: collectors.length, sub: 'Registered', icon: Users, href: '/ops/crm' },
          { label: 'VIP Leads', value: vipLeads, sub: `${hotLeads} hot`, icon: Crown, href: '/ops/crm/leads' },
          { label: 'Pipeline Value', value: `$${(totalPipelineValue / 1000).toFixed(0)}k`, sub: `${leads.length} total leads`, icon: GitBranch, href: '/ops/crm/pipeline' },
          { label: 'Concierge', value: urgentRequests, sub: `${activeCommissions} active commissions`, icon: MessageSquare, href: '/ops/concierge/requests' },
        ].map((kpi) => (
          <Link key={kpi.label} href={kpi.href} className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-xl border border-[rgba(214,170,92,0.10)] backdrop-blur-md p-5 shadow-[0_4px_20px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.02)] hover:border-[rgba(214,170,92,0.18)] hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all group">
            <div className="flex items-center justify-between mb-3">
              <kpi.icon size={18} className="text-[#C89B4F]" />
              <ArrowRight size={14} className="text-[#B9A48A]/40 group-hover:text-[#C89B4F] transition-colors" />
            </div>
            <p className="text-2xl font-bold text-[#FFF3DF] tracking-tight">{kpi.value}</p>
            <p className="text-[11px] text-[#B9A48A] mt-1 uppercase tracking-wide">{kpi.label}</p>
            <p className="text-xs text-[#B9A48A]/50">{kpi.sub}</p>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-[28px] border border-[rgba(214,170,92,0.10)] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.42),0_4px_14px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.02)] overflow-hidden border-t-2 border-t-andy-gold">
          <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.05]">
            <div className="flex items-center gap-2">
              <Activity size={18} className="text-[#C89B4F]" />
              <h2 className="font-serif text-lg font-bold text-[#FFF3DF]">Cross-System Activity</h2>
            </div>
            <span className="text-xs text-[#B9A48A]">{activities.length} recent</span>
          </div>
          <div className="divide-y divide-andy-stone/5 max-h-[480px] overflow-y-auto">
            {activities.map((a) => (
              <div key={a.id} className="flex items-start gap-3 px-6 py-3 hover:bg-andy-stone/5 transition-colors">
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${a.severity === 'critical' ? 'bg-red-500' : a.severity === 'warning' ? 'bg-orange-500' : a.severity === 'success' ? 'bg-green-500' : 'bg-andy-gold'}`} />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#FFF3DF]">{a.title}</span>
                    <span className="text-[10px] text-[#B9A48A]/50 bg-andy-stone/5 px-1.5 py-0.5 rounded">{a.source}</span>
                  </div>
                  <p className="text-xs text-[#B9A48A]/60 truncate">{a.description}</p>
                  <p className="text-[10px] text-[#B9A48A]/40 mt-0.5">{new Date(a.timestamp).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {activities.length === 0 && <div className="px-6 py-12 text-center text-sm text-[#B9A48A]/40">No recent activity</div>}
          </div>
        </div>

        {/* System Health */}
        <div className="space-y-4">
          <div className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-[28px] border border-[rgba(214,170,92,0.10)] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.42),0_4px_14px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.02)] p-6">
            <h2 className="font-serif text-base font-bold text-[#FFF3DF] mb-4">System Health</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B9A48A]">CRM</span>
                <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B9A48A]">Concierge</span>
                <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B9A48A]">Payments</span>
                <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B9A48A]">Collector Accounts</span>
                <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Healthy</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#B9A48A]">Auth</span>
                <span className="flex items-center gap-1 text-xs text-green-600"><CheckCircle size={12} /> Healthy</span>
              </div>
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-[28px] border border-[rgba(214,170,92,0.10)] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.42),0_4px_14px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.02)] p-6">
            <h2 className="font-serif text-base font-bold text-[#FFF3DF] mb-4">Alerts</h2>
            <div className="space-y-2">
              {paymentStats.overdueInvoices > 0 && (
                <div className="flex items-start gap-2 p-2.5 bg-red-50 rounded-xl border border-red-100">
                  <AlertCircle size={14} className="text-red-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-red-700">{paymentStats.overdueInvoices} overdue invoices</p>
                    <p className="text-[10px] text-red-500">Requires follow-up</p>
                  </div>
                </div>
              )}
              {paymentStats.escrowDisputed > 0 && (
                <div className="flex items-start gap-2 p-2.5 bg-orange-50 rounded-xl border border-orange-100">
                  <AlertCircle size={14} className="text-orange-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-orange-700">{paymentStats.escrowDisputed} disputed escrow</p>
                    <p className="text-[10px] text-orange-500">Review needed</p>
                  </div>
                </div>
              )}
              {vipLeads > 0 && (
                <div className="flex items-start gap-2 p-2.5 bg-andy-gold/5 rounded-xl border border-andy-gold/20">
                  <Crown size={14} className="text-[#C89B4F] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-[#FFF3DF]">{vipLeads} VIP leads active</p>
                    <p className="text-[10px] text-[#B9A48A]">Priority outreach</p>
                  </div>
                </div>
              )}
              {urgentRequests > 0 && (
                <div className="flex items-start gap-2 p-2.5 bg-blue-50 rounded-xl border border-blue-100">
                  <Clock size={14} className="text-blue-500 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-xs font-medium text-blue-700">{urgentRequests} urgent concierge requests</p>
                    <p className="text-[10px] text-blue-500">Awaiting assignment</p>
                  </div>
                </div>
              )}
              {paymentStats.overdueInvoices === 0 && paymentStats.escrowDisputed === 0 && vipLeads === 0 && urgentRequests === 0 && (
                <div className="text-center py-4 text-sm text-[#B9A48A]/40">All systems green</div>
              )}
            </div>
          </div>

          <div className="bg-[linear-gradient(180deg,rgba(34,29,25,0.88)_0%,rgba(24,20,18,0.96)_100%)] rounded-[28px] border border-[rgba(214,170,92,0.10)] backdrop-blur-md shadow-[0_12px_40px_rgba(0,0,0,0.42),0_4px_14px_rgba(0,0,0,0.24),inset_0_1px_0_rgba(255,255,255,0.02)] p-6">
            <h2 className="font-serif text-base font-bold text-[#FFF3DF] mb-4">Quick Links</h2>
            <div className="space-y-1">
              <Link href="/ops/crm/leads" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#B9A48A] hover:bg-andy-stone/5 hover:text-[#FFF3DF] transition-all"><Users size={12} /> Lead Table</Link>
              <Link href="/ops/concierge/requests" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#B9A48A] hover:bg-andy-stone/5 hover:text-[#FFF3DF] transition-all"><MessageSquare size={12} /> Requests</Link>
              <Link href="/ops/payments/invoices" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#B9A48A] hover:bg-andy-stone/5 hover:text-[#FFF3DF] transition-all"><CreditCard size={12} /> Invoices</Link>
              <Link href="/ops/payments/escrow" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#B9A48A] hover:bg-andy-stone/5 hover:text-[#FFF3DF] transition-all"><Shield size={12} /> Escrow</Link>
              <Link href="/ops/concierge/bookings" className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-[#B9A48A] hover:bg-andy-stone/5 hover:text-[#FFF3DF] transition-all"><Calendar size={12} /> Viewings</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}