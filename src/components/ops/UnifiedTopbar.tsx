'use client';

import { Bell, LogOut, ChevronDown, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UnifiedTopbar({ opsType }: { opsType: 'crm' | 'concierge' }) {
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    router.push('/auth/signin');
  };

  return (
    <div className="h-16 bg-white border-b border-andy-stone/10 px-6 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 bg-andy-gold rounded-lg flex items-center justify-center">
          <span className="text-andy-black font-bold text-xs">{opsType === 'crm' ? 'CRM' : 'CC'}</span>
        </div>
        <div>
          <p className="text-xs text-andy-bronze uppercase tracking-wider">AndyArt</p>
          <p className="text-xs font-semibold text-andy-black">{opsType === 'crm' ? 'CRM' : 'Concierge'}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="p-2.5 rounded-xl hover:bg-andy-stone/10 transition-colors">
          <Search size={18} className="text-andy-bronze" />
        </button>

        <button className="relative p-2.5 rounded-xl hover:bg-andy-stone/10 transition-colors">
          <Bell size={18} className="text-andy-bronze" />
        </button>

        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-andy-stone/10 transition-colors"
          >
            <div className="w-8 h-8 bg-andy-black text-andy-gold rounded-full flex items-center justify-center text-xs font-bold">
              D
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-andy-black">Demo User</p>
              <p className="text-[10px] text-andy-bronze/60">Demo Mode</p>
            </div>
            <ChevronDown size={14} className="text-andy-bronze" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-andy-stone/20 shadow-premium z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-andy-stone/10">
                <p className="text-sm font-semibold text-andy-black">Demo User</p>
                <p className="text-xs text-andy-bronze">demo@andyart.house</p>
              </div>
              <div className="py-1">
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-andy-wine hover:bg-andy-stone/5 transition-colors"
                >
                  <LogOut size={14} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {(showNotifs || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
      )}
    </div>
  );
}