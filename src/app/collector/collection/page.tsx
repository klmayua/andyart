'use client';

import { useMemo, useState } from 'react';
import { Layers, Plus, Lock, Globe, Eye } from 'lucide-react';
import EmptyState from '@/components/EmptyState';
import { useCurrentCollectorId } from '@/hooks/useCurrentCollector';
import { getCollections, getAcquisitions, createCollection } from '@/lib/collector';

export default function CollectorCollectionPage() {
  const collectorId = useCurrentCollectorId();
  const collections = useMemo(() => collectorId ? getCollections(collectorId) : [], [collectorId]);
  const acq = useMemo(() => collectorId ? getAcquisitions(collectorId) : [], [collectorId]);
  const [showNew, setShowNew] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');

  if (!collectorId) {
    return <div className="text-center py-20 text-sm text-andy-bronze">Loading...</div>;
  }

  const handleCreate = () => {
    if (!newName.trim()) return;
    createCollection(collectorId, newName, newDesc);
    setNewName(''); setNewDesc(''); setShowNew(false);
    window.location.reload();
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-serif text-2xl font-bold text-andy-black">My Collections</h1>
        <button onClick={() => setShowNew(true)} className="flex items-center gap-2 px-4 py-2 bg-andy-gold text-andy-black rounded-xl text-xs font-semibold hover:bg-andy-gold/80 transition-all">
          <Plus size={14} /> New Collection
        </button>
      </div>

      {showNew && (
        <div className="bg-white rounded-2xl border border-andy-stone/20 p-5 mb-6">
          <h3 className="text-sm font-semibold text-andy-black mb-3">Create Collection</h3>
          <div className="space-y-3">
            <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Collection name" className="w-full px-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
            <input value={newDesc} onChange={(e) => setNewDesc(e.target.value)} placeholder="Description" className="w-full px-4 py-2.5 rounded-xl border border-andy-stone/20 text-sm focus:outline-none focus:ring-2 focus:ring-andy-gold/40" />
            <div className="flex gap-2">
              <button onClick={handleCreate} className="px-4 py-2 bg-andy-gold text-andy-black rounded-xl text-xs font-semibold">Create</button>
              <button onClick={() => setShowNew(false)} className="px-4 py-2 border border-andy-stone/20 rounded-xl text-xs text-andy-bronze">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* All Acquisitions as default collection */}
      <div className="bg-white rounded-2xl border border-andy-stone/20 overflow-hidden mb-6">
        <div className="px-6 py-4 border-b border-andy-stone/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Layers size={18} className="text-andy-gold" />
            <h2 className="font-serif text-lg font-bold text-andy-black">Main Collection</h2>
          </div>
          <span className="text-xs text-andy-bronze">{acq.length} works</span>
        </div>
        <div className="divide-y divide-andy-stone/5">
          {acq.map((a) => (
            <div key={a.id} className="flex items-center justify-between px-6 py-4 hover:bg-andy-stone/5 transition-colors">
              <div>
                <p className="text-sm font-semibold text-andy-black">{a.artworkTitle}</p>
                <p className="text-xs text-andy-bronze/60">{a.artistName} · {new Date(a.acquisitionDate).toLocaleDateString()}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-andy-bronze capitalize">{a.insuranceStatus}</span>
                <span className="text-sm font-bold text-andy-gold">${(a.purchasePrice / 1000).toFixed(0)}k</span>
              </div>
            </div>
          ))}
          {acq.length === 0 && (
            <EmptyState
              icon={Layers}
              title="Your collection is empty"
              description="Begin your collecting journey by exploring our curated works."
              action={{ label: 'Explore Collection', href: '/gallery' }}
            />
          )}
        </div>
      </div>

      {/* Custom Collections */}
      {collections.length > 0 && (
        <div className="grid gap-4">
          {collections.map((col) => (
            <div key={col.id} className="bg-white rounded-2xl border border-andy-stone/20 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  {col.status === 'private' ? <Lock size={16} className="text-andy-bronze" /> : <Globe size={16} className="text-andy-bronze" />}
                  <h3 className="font-serif text-base font-bold text-andy-black">{col.name}</h3>
                </div>
                <span className="text-xs text-andy-bronze">{col.artworks.length} works</span>
              </div>
              <p className="text-xs text-andy-bronze/60 mb-3">{col.description}</p>
              <div className="flex items-center gap-2 text-xs text-andy-bronze">
                <Eye size={12} /> {col.status} · Updated {new Date(col.updatedAt).toLocaleDateString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}