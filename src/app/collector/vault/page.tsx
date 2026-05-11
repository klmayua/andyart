'use client';

import { useMemo, useState } from 'react';
import { Lock, FileText, Download, Search, FileCheck, Receipt, History, TrendingUp, Shield, FileSpreadsheet } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { getVault, getVaultByDocumentType } from '@/lib/collector';
import type { DocumentType } from '@/types/collector';

function useCurrentCollectorId() {
  const { user } = useAuth();
  return useMemo(() => {
    if (!user) return null;
    const all = (() => { try { return JSON.parse(localStorage.getItem('andyart_collector_profiles') || '[]'); } catch { return []; } })();
    const byEmail = all.find((c: any) => c.email.toLowerCase() === user.email.toLowerCase());
    return byEmail?.id || 'col-001';
  }, [user]);
}

const DOC_ICONS: Record<DocumentType, typeof FileText> = {
  certificate: FileCheck,
  invoice: Receipt,
  provenance: History,
  valuation: TrendingUp,
  insurance: Shield,
  appraisal: FileSpreadsheet,
  agreement: FileText,
};

const DOC_LABELS: Record<DocumentType, string> = {
  certificate: 'Certificates',
  invoice: 'Invoices',
  provenance: 'Provenance',
  valuation: 'Valuations',
  insurance: 'Insurance',
  appraisal: 'Appraisals',
  agreement: 'Agreements',
};

const DOC_COLORS: Record<DocumentType, string> = {
  certificate: 'text-andy-gold',
  invoice: 'text-blue-600',
  provenance: 'text-purple-600',
  valuation: 'text-green-600',
  insurance: 'text-red-500',
  appraisal: 'text-cyan-600',
  agreement: 'text-gray-600',
};

export default function CollectorVaultPage() {
  const collectorId = useCurrentCollectorId();
  const vault = useMemo(() => collectorId ? getVault(collectorId) : { collectorId: '', documents: [], totalDocuments: 0, lastUpdated: '' }, [collectorId]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<DocumentType | 'all'>('all');

  const filtered = vault.documents.filter((d) => {
    const matchesSearch = d.title.toLowerCase().includes(search.toLowerCase()) ||
      (d.artworkTitle?.toLowerCase() || '').includes(search.toLowerCase());
    const matchesFilter = filter === 'all' || d.type === filter;
    return matchesSearch && matchesFilter;
  });

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const d of vault.documents) { c[d.type] = (c[d.type] || 0) + 1; }
    return c;
  }, [vault]);

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-andy-black rounded-xl flex items-center justify-center">
            <Lock size={18} className="text-andy-gold" />
          </div>
          <div>
            <h1 className="font-serif text-2xl font-bold text-andy-black">Digital Vault</h1>
            <p className="text-xs text-andy-bronze">{vault.totalDocuments} documents · Last updated {vault.lastUpdated ? new Date(vault.lastUpdated).toLocaleDateString() : '—'}</p>
          </div>
        </div>
      </div>

      {/* Type Filters */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setFilter('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === 'all' ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}
        >
          All ({vault.totalDocuments})
        </button>
        {(Object.keys(DOC_LABELS) as DocumentType[]).map((type) => (
          <button
            key={type}
            onClick={() => setFilter(type)}
            className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${filter === type ? 'bg-andy-gold text-andy-black' : 'bg-white text-andy-bronze border border-andy-stone/20'}`}
          >
            {DOC_LABELS[type]} ({counts[type] || 0})
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="relative mb-4">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-andy-bronze" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search documents..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40"
        />
      </div>

      {/* Documents */}
      <div className="space-y-3">
        {filtered.map((doc) => {
          const Icon = DOC_ICONS[doc.type];
          return (
            <div key={doc.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5 flex items-start gap-4">
              <div className="w-10 h-10 bg-andy-stone/5 rounded-xl flex items-center justify-center flex-shrink-0">
                <Icon size={18} className={DOC_COLORS[doc.type]} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <p className="text-sm font-semibold text-andy-black">{doc.title}</p>
                    {doc.artworkTitle && <p className="text-xs text-andy-bronze/60">{doc.artworkTitle}</p>}
                  </div>
                  <button className="flex items-center gap-1 text-xs text-andy-gold hover:underline">
                    <Download size={12} /> PDF
                  </button>
                </div>
                <div className="flex items-center gap-3 text-xs text-andy-bronze">
                  <span className={`font-medium ${DOC_COLORS[doc.type]}`}>{DOC_LABELS[doc.type]}</span>
                  <span>· {new Date(doc.uploadedAt).toLocaleDateString()}</span>
                  {doc.size && <span>· {(doc.size / 1024 / 1024).toFixed(1)} MB</span>}
                </div>
                {doc.description && <p className="text-xs text-andy-bronze/50 mt-1">{doc.description}</p>}
              </div>
            </div>
          );
        })}
        {filtered.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-andy-stone/20">
            <Lock size={32} className="text-andy-stone/30 mx-auto mb-3" />
            <p className="text-sm text-andy-bronze/40">No documents found</p>
          </div>
        )}
      </div>
    </div>
  );
}