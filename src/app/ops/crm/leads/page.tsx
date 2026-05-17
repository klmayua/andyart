'use client';

import { useState, useMemo, useCallback } from 'react';
import { Search, Filter, ChevronDown, ChevronUp, ExternalLink, MessageCircle, Calendar, X, Tag } from 'lucide-react';
import { useClientData } from '@/hooks/useClientData';
import { getAllLeads, updateLeadStatus } from '@/lib/leadCapture';
import type { Lead, LeadStatus, LeadTemperature, LeadSegment, LeadSource } from '@/types/crm';

const STATUS_LABELS: Record<LeadStatus, string> = {
  new: 'New',
  qualified: 'Qualified',
  contacted: 'Contacted',
  negotiation: 'Negotiating',
  converted: 'Converted',
  archived: 'Archived',
};

const TEMPERATURE_STYLES: Record<LeadTemperature, { bg: string; dot: string; label: string }> = {
  vip_priority: { bg: 'bg-andy-gold/15', dot: 'bg-andy-gold', label: 'VIP' },
  hot: { bg: 'bg-red-500/10', dot: 'bg-red-500', label: 'Hot' },
  warm: { bg: 'bg-orange-500/10', dot: 'bg-orange-500', label: 'Warm' },
  cold: { bg: 'bg-blue-500/10', dot: 'bg-blue-400', label: 'Cold' },
};

const STATUS_STYLES: Record<LeadStatus, string> = {
  new: 'bg-blue-100 text-blue-800',
  qualified: 'bg-purple-100 text-purple-800',
  contacted: 'bg-yellow-100 text-yellow-800',
  negotiation: 'bg-orange-100 text-orange-800',
  converted: 'bg-green-100 text-green-800',
  archived: 'bg-gray-100 text-gray-500',
};

const SEGMENTS: LeadSegment[] = [
  'collector', 'investor', 'interior_designer', 'corporate', 'hospitality',
  'luxury_buyer', 'art_enthusiast', 'experience_guest', 'commission_client',
];
const SOURCES: LeadSource[] = ['website', 'whatsapp', 'concierge', 'event', 'referral', 'newsletter'];
const TEMPERATURES: LeadTemperature[] = ['vip_priority', 'hot', 'warm', 'cold'];

export default function LeadsPage() {
  const [search, setSearch] = useState('');
  const [filterSegment, setFilterSegment] = useState<LeadSegment | 'all'>('all');
  const [filterSource, setFilterSource] = useState<LeadSource | 'all'>('all');
  const [filterTemperature, setFilterTemperature] = useState<LeadTemperature | 'all'>('all');
  const [filterStatus, setFilterStatus] = useState<LeadStatus | 'all'>('all');
  const [sortBy, setSortBy] = useState<'score_desc' | 'newest' | 'oldest'>('score_desc');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [noteText, setNoteText] = useState('');

  const allLeads = useClientData(() => getAllLeads(), [], [selectedLead]);

  const filtered = useMemo(() => {
    let result = [...allLeads];
    if (search) {
      const q = search.toLowerCase();
      result = result.filter((l) =>
        l.profile.fullName.toLowerCase().includes(q) ||
        l.profile.email.toLowerCase().includes(q) ||
        l.interest.itemTitle?.toLowerCase().includes(q) ||
        l.profile.country.toLowerCase().includes(q)
      );
    }
    if (filterSegment !== 'all') result = result.filter((l) => l.segment === filterSegment);
    if (filterSource !== 'all') result = result.filter((l) => l.source === filterSource);
    if (filterTemperature !== 'all') result = result.filter((l) => l.temperature === filterTemperature);
    if (filterStatus !== 'all') result = result.filter((l) => l.status === filterStatus);

    switch (sortBy) {
      case 'score_desc': result.sort((a, b) => b.leadScore - a.leadScore); break;
      case 'newest': result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); break;
      case 'oldest': result.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); break;
    }
    return result;
  }, [allLeads, search, filterSegment, filterSource, filterTemperature, filterStatus, sortBy]);

  const handleStatusChange = useCallback((leadId: string, status: LeadStatus) => {
    updateLeadStatus(leadId, status);
    setSelectedLead((prev) => prev ? { ...prev, status } : null);
  }, []);

  const formatDate = (iso: string) => new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-andy-black">Leads</h1>
          <p className="text-sm text-andy-bronze mt-1">Lead management and acquisition tracking</p>
          <p className="text-xs text-andy-bronze/50 mt-1">{filtered.length} of {allLeads.length} leads</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-4 py-2 rounded-full border border-andy-stone/30 bg-white text-sm text-andy-bronze focus:outline-none focus:ring-2 focus:ring-andy-gold/30"
          >
            <option value="score_desc">Score: High → Low</option>
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
          </select>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-[#FAF8F3] rounded-xl border border-black/[0.06] p-4 mb-6 space-y-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze/50" />
            <input
              type="text"
              placeholder="Search by name, email, interest..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-andy-stone/30 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/30 bg-andy-ivory/50"
            />
          </div>
          <select value={filterSegment} onChange={(e) => setFilterSegment(e.target.value as typeof filterSegment)} className="px-3 py-2 rounded-lg border border-andy-stone/30 text-sm bg-white text-andy-bronze focus:outline-none">
            <option value="all">All Segments</option>
            {SEGMENTS.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
          </select>
          <select value={filterSource} onChange={(e) => setFilterSource(e.target.value as typeof filterSource)} className="px-3 py-2 rounded-lg border border-andy-stone/30 text-sm bg-white text-andy-bronze focus:outline-none">
            <option value="all">All Sources</option>
            {SOURCES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
          <select value={filterTemperature} onChange={(e) => setFilterTemperature(e.target.value as typeof filterTemperature)} className="px-3 py-2 rounded-lg border border-andy-stone/30 text-sm bg-white text-andy-bronze focus:outline-none">
            <option value="all">All Temperatures</option>
            {TEMPERATURES.map((t) => <option key={t} value={t}>{t.replace('_', ' ')}</option>)}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value as typeof filterStatus)} className="px-3 py-2 rounded-lg border border-andy-stone/30 text-sm bg-white text-andy-bronze focus:outline-none">
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          {(search || filterSegment !== 'all' || filterSource !== 'all' || filterTemperature !== 'all' || filterStatus !== 'all') && (
            <button
              onClick={() => { setSearch(''); setFilterSegment('all'); setFilterSource('all'); setFilterTemperature('all'); setFilterStatus('all'); }}
              className="flex items-center gap-1 px-3 py-2 rounded-lg text-xs text-andy-bronze hover:bg-andy-stone/20 transition-colors"
            >
              <X size={14} /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-andy-stone/10 bg-andy-stone/5">
                <th className="text-left px-5 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Lead</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Segment</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Interest</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Budget</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Source</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Score</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Status</th>
                <th className="text-left px-4 py-3.5 text-xs font-semibold text-andy-bronze uppercase tracking-wider">Date</th>
                <th className="px-4 py-3.5"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={9} className="text-center py-12 text-andy-bronze/60">No leads match your filters</td></tr>
              ) : filtered.map((lead) => {
                const temp = TEMPERATURE_STYLES[lead.temperature];
                return (
                  <tr key={lead.id} className="border-b border-andy-stone/5 hover:bg-andy-stone/5 transition-colors">
                    <td className="px-5 py-4">
                      <div>
                        <p className="font-semibold text-andy-black">{lead.profile.fullName}</p>
                        <p className="text-xs text-andy-bronze">{lead.profile.email}</p>
                        <p className="text-xs text-andy-bronze/70">{lead.profile.city ? `${lead.profile.city}, ` : ''}{lead.profile.country}</p>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${temp.dot}`} />
                        <span className="text-xs capitalize text-andy-bronze">{lead.segment.replace('_', ' ')}</span>
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-xs text-andy-black max-w-[140px] truncate">{lead.interest.itemTitle || lead.interest.category}</p>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-andy-bronze">{lead.budgetBand.replace(/_/g, ' ')}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-andy-bronze capitalize">{lead.source}</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-12 h-1.5 bg-andy-stone/20 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${lead.leadScore >= 76 ? 'bg-andy-gold' : lead.leadScore >= 50 ? 'bg-green-500' : 'bg-blue-400'}`}
                            style={{ width: `${lead.leadScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold text-andy-black">{lead.leadScore}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <select
                        value={lead.status}
                        onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                        className={`text-xs font-medium px-2.5 py-1 rounded-full border-0 focus:outline-none cursor-pointer ${STATUS_STYLES[lead.status]}`}
                      >
                        {Object.entries(STATUS_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                      </select>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-xs text-andy-bronze/70">{formatDate(lead.createdAt)}</span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelectedLead(lead)}
                        className="p-2 rounded-lg hover:bg-andy-stone/10 transition-colors"
                      >
                        <ExternalLink size={14} className="text-andy-bronze" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Lead Detail Drawer */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelectedLead(null)}>
          <div className="absolute inset-0 bg-andy-black/30 backdrop-blur-sm" />
          <div
            className="relative w-full max-w-lg bg-[#F7F2E8] shadow-premium overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white border-b border-andy-stone/20 px-6 py-4 flex items-center justify-between z-10">
              <div>
                <h2 className="font-serif text-xl font-bold text-andy-black">{selectedLead.profile.fullName}</h2>
                <p className="text-sm text-andy-bronze">{selectedLead.profile.email}</p>
              </div>
              <button onClick={() => setSelectedLead(null)} className="p-2 hover:bg-andy-stone/10 rounded-lg transition-colors">
                <X size={20} className="text-andy-bronze" />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Score + Temperature */}
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Lead Score</p>
                  <div className="flex items-center gap-3">
                    <div className="w-full h-2 bg-andy-stone/20 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-andy-gold rounded-full"
                        style={{ width: `${selectedLead.leadScore}%` }}
                      />
                    </div>
                    <span className="font-bold text-andy-gold text-lg">{selectedLead.leadScore}</span>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-xl text-sm font-semibold ${TEMPERATURE_STYLES[selectedLead.temperature].bg} ${TEMPERATURE_STYLES[selectedLead.temperature].dot.includes('gold') ? 'text-andy-gold' : 'text-red-600'}`}>
                  {TEMPERATURE_STYLES[selectedLead.temperature].label}
                </div>
              </div>

              {/* Profile Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-sm font-medium text-andy-black">{selectedLead.profile.phone || '—'}</p>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Location</p>
                  <p className="text-sm font-medium text-andy-black">{selectedLead.profile.city ? `${selectedLead.profile.city}, ` : ''}{selectedLead.profile.country}</p>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Segment</p>
                  <p className="text-sm font-medium text-andy-black capitalize">{selectedLead.segment.replace('_', ' ')}</p>
                </div>
                <div className="bg-white rounded-xl border border-andy-stone/20 p-4">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-1">Urgency</p>
                  <p className="text-sm font-medium text-andy-black capitalize">{selectedLead.urgency.replace('_', ' ')}</p>
                </div>
              </div>

              {/* Interest */}
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Interest</p>
                <p className="font-semibold text-andy-black">{selectedLead.interest.itemTitle || selectedLead.interest.category}</p>
                <p className="text-sm text-andy-bronze capitalize mt-1">{selectedLead.interest.category} • {selectedLead.interest.itemType}</p>
              </div>

              {/* Notes */}
              {selectedLead.notes && (
                <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                  <p className="text-xs text-andy-bronze uppercase tracking-wider mb-2">Notes</p>
                  <p className="text-sm text-andy-bronze leading-relaxed whitespace-pre-line">{selectedLead.notes}</p>
                </div>
              )}

              {/* Timeline */}
              <div className="bg-white rounded-xl border border-andy-stone/20 p-5">
                <p className="text-xs text-andy-bronze uppercase tracking-wider mb-3">Activity</p>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-andy-gold mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-andy-black">Created</p>
                      <p className="text-xs text-andy-bronze">{formatDate(selectedLead.createdAt)}</p>
                    </div>
                  </div>
                  {selectedLead.lastEngagementAt && selectedLead.lastEngagementAt !== selectedLead.createdAt && (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-andy-bronze/30 mt-1.5 flex-shrink-0" />
                      <div>
                        <p className="text-sm font-medium text-andy-black">Last Engagement</p>
                        <p className="text-xs text-andy-bronze">{formatDate(selectedLead.lastEngagementAt)} ({selectedLead.engagementCount} interactions)</p>
                      </div>
                    </div>
                  )}
                  <div className="flex items-start gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${STATUS_STYLES[selectedLead.status].includes('green') ? 'bg-green-500' : 'bg-blue-400'}`} />
                    <div>
                      <p className="text-sm font-medium text-andy-black">Status</p>
                      <p className="text-xs text-andy-bronze">{STATUS_LABELS[selectedLead.status]}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                {selectedLead.profile.whatsapp && (
                  <a
                    href={`https://wa.me/${selectedLead.profile.whatsapp.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-green-500 text-white py-3 rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors"
                  >
                    <MessageCircle size={16} /> Open WhatsApp
                  </a>
                )}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, 'contacted')}
                    className="flex-1 py-2.5 rounded-xl border border-andy-stone/30 text-sm font-medium text-andy-bronze hover:bg-andy-stone/10 transition-colors"
                  >
                    Mark Contacted
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedLead.id, 'negotiation')}
                    className="flex-1 py-2.5 rounded-xl border border-andy-stone/30 text-sm font-medium text-andy-bronze hover:bg-andy-stone/10 transition-colors"
                  >
                    Move to Negotiation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}