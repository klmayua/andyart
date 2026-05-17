'use client';

import { useState, useMemo, useCallback } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { getAllLeads, updateLeadStatus } from '@/lib/leadCapture';
import type { Lead, LeadStatus } from '@/types/crm';

const STAGES: { key: LeadStatus; label: string; color: string }[] = [
  { key: 'new', label: 'New', color: 'bg-blue-50 border-blue-200' },
  { key: 'qualified', label: 'Qualified', color: 'bg-purple-50 border-purple-200' },
  { key: 'contacted', label: 'Contacted', color: 'bg-yellow-50 border-yellow-200' },
  { key: 'negotiation', label: 'Negotiating', color: 'bg-orange-50 border-orange-200' },
  { key: 'converted', label: 'Converted', color: 'bg-green-50 border-green-200' },
  { key: 'archived', label: 'Archived', color: 'bg-gray-50 border-gray-200' },
];

const TEMPERATURE_COLORS: Record<string, string> = {
  vip_priority: 'bg-andy-gold',
  hot: 'bg-red-500',
  warm: 'bg-orange-500',
  cold: 'bg-blue-400',
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

export default function PipelinePage() {
  const [leads, setLeads] = useState<Lead[]>(getAllLeads());

  const byStage = useMemo(() => {
    const map: Record<string, Lead[]> = {};
    for (const stage of STAGES) map[stage.key] = [];
    for (const lead of leads) {
      if (map[lead.status]) map[lead.status].push(lead);
      else map['new'].push(lead);
    }
    for (const stage of STAGES) {
      map[stage.key].sort((a, b) => b.leadScore - a.leadScore);
    }
    return map;
  }, [leads]);

  const handleMoveLeft = useCallback((leadId: string, currentStage: LeadStatus) => {
    const stageOrder: LeadStatus[] = ['new', 'qualified', 'contacted', 'negotiation', 'converted', 'archived'];
    const idx = stageOrder.indexOf(currentStage);
    if (idx <= 0) return;
    const newStage = stageOrder[idx - 1];
    updateLeadStatus(leadId, newStage);
    setLeads(getAllLeads());
  }, []);

  const handleMoveRight = useCallback((leadId: string, currentStage: LeadStatus) => {
    const stageOrder: LeadStatus[] = ['new', 'qualified', 'contacted', 'negotiation', 'converted', 'archived'];
    const idx = stageOrder.indexOf(currentStage);
    if (idx >= stageOrder.length - 1) return;
    const newStage = stageOrder[idx + 1];
    updateLeadStatus(leadId, newStage);
    setLeads(getAllLeads());
  }, []);

  const totalValue = useMemo(() => {
    return leads.reduce((sum, l) => {
      if (l.budgetBand === '100000_plus') return sum + 100000;
      if (l.budgetBand === '25000_100000') return sum + 62500;
      if (l.budgetBand === '5000_25000') return sum + 15000;
      if (l.budgetBand === '1000_5000') return sum + 3000;
      if (l.budgetBand === 'under_1000') return sum + 500;
      return sum;
    }, 0);
  }, [leads]);

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-3xl font-bold text-andy-black">Pipeline</h1>
          <p className="text-sm text-andy-bronze mt-1">
            Active acquisition opportunities and conversion flow
          </p>
          <p className="text-xs text-andy-bronze/50 mt-1">${totalValue.toLocaleString()} pipeline value · {leads.length} leads</p>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="flex gap-4 overflow-x-auto pb-6">
        {STAGES.map((stage) => {
          const stageLeads = byStage[stage.key] || [];
          const stageValue = stageLeads.reduce((sum, l) => {
            if (l.budgetBand === '100000_plus') return sum + 100000;
            if (l.budgetBand === '25000_100000') return sum + 62500;
            if (l.budgetBand === '5000_25000') return sum + 15000;
            if (l.budgetBand === '1000_5000') return sum + 3000;
            return sum;
          }, 0);

          return (
            <div
              key={stage.key}
              className="flex-shrink-0 w-[280px] rounded-xl bg-[#FAF8F3] border border-black/[0.06] p-4 flex flex-col"
            >
              {/* Stage Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-andy-black text-sm">{stage.label}</h3>
                  <p className="text-xs text-andy-bronze">{stageLeads.length} leads</p>
                </div>
                {stageValue > 0 && (
                  <span className="text-xs font-bold text-andy-gold">${(stageValue / 1000).toFixed(0)}k</span>
                )}
              </div>

              {/* Cards */}
              <div className="space-y-3 flex-1 overflow-y-auto max-h-[calc(100vh-280px)]">
                {stageLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="bg-white rounded-lg border border-black/[0.06] p-4 hover:border-andy-gold/20 hover:shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-all cursor-grab"
                  >
                    {/* Temperature dot + Score */}
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${TEMPERATURE_COLORS[lead.temperature]}`} />
                        <span className="text-xs text-andy-bronze capitalize">{lead.segment.replace('_', ' ')}</span>
                      </div>
                      <span className="text-xs font-bold text-andy-black">{lead.leadScore}</span>
                    </div>

                    {/* Name + Budget */}
                    <p className="font-semibold text-andy-black text-sm mb-1">{lead.profile.fullName}</p>
                    <p className="text-xs text-andy-bronze/70 mb-3">{lead.budgetBand.replace(/_/g, ' ')}</p>

                    {/* Interest */}
                    <p className="text-xs text-andy-bronze mb-3 truncate">{lead.interest.itemTitle || lead.interest.category}</p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] text-andy-bronze/60">{formatDate(lead.createdAt)}</span>
                      <div className="flex items-center gap-1">
                        {stage.key !== 'new' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMoveLeft(lead.id, stage.key); }}
                            className="p-1 rounded hover:bg-andy-stone/20 transition-colors"
                            title="Move left"
                          >
                            <ArrowLeft size={12} className="text-andy-bronze/60" />
                          </button>
                        )}
                        {stage.key !== 'archived' && (
                          <button
                            onClick={(e) => { e.stopPropagation(); handleMoveRight(lead.id, stage.key); }}
                            className="p-1 rounded hover:bg-andy-stone/20 transition-colors"
                            title="Move right"
                          >
                            <ArrowRight size={12} className="text-andy-bronze/60" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
                {stageLeads.length === 0 && (
                  <div className="flex items-center justify-center h-20 text-xs text-andy-bronze/40">
                    No leads
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}