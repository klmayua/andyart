'use client';

import { Bell, LogOut, Shield, ChevronDown, Search, LayoutDashboard, Users, Palette, MessageSquare, BarChart3, Crown } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'next/navigation';
import type { Notification } from '@/types/auth';
import { getNotifications, markRead, markAllRead, getUnreadCount } from '@/lib/notifications';

export default function UnifiedTopbar({ opsType }: { opsType: 'crm' | 'concierge' }) {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const notifs: Notification[] = user ? getNotifications(user.id) : [];
  const unread = user ? getUnreadCount(user.id) : 0;

  const handleLogout = () => {
    logout();
    router.push('/ops/auth/signin');
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
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => { setShowNotifs(!showNotifs); setShowProfile(false); }}
            className="relative p-2.5 rounded-xl hover:bg-andy-stone/10 transition-colors"
          >
            <Bell size={18} className="text-andy-bronze" />
            {unread > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-andy-gold text-andy-black text-[10px] font-bold rounded-full flex items-center justify-center">
                {unread}
              </span>
            )}
          </button>
          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl border border-andy-stone/20 shadow-premium z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-andy-stone/10 flex items-center justify-between">
                <p className="text-sm font-semibold text-andy-black">Notifications</p>
                {unread > 0 && (
                  <button onClick={() => user && markAllRead(user.id)} className="text-xs text-andy-gold hover:underline">Mark all read</button>
                )}
              </div>
              <div className="max-h-80 overflow-y-auto">
                {notifs.length === 0 ? (
                  <div className="py-8 text-center text-sm text-andy-bronze/50">No notifications</div>
                ) : notifs.slice(0, 8).map((n) => (
                  <div
                    key={n.id}
                    onClick={() => { markRead(n.id); if (n.actionUrl) router.push(n.actionUrl); setShowNotifs(false); }}
                    className={`px-4 py-3 border-b border-andy-stone/5 hover:bg-andy-stone/5 cursor-pointer transition-colors ${!n.read ? 'bg-andy-gold/5' : ''}`}
                  >
                    <p className="text-sm font-medium text-andy-black">{n.title}</p>
                    <p className="text-xs text-andy-bronze mt-0.5 line-clamp-2">{n.message}</p>
                    <p className="text-[10px] text-andy-bronze/50 mt-1">{new Date(n.createdAt).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => { setShowProfile(!showProfile); setShowNotifs(false); }}
            className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-andy-stone/10 transition-colors"
          >
            <div className="w-8 h-8 bg-andy-black text-andy-gold rounded-full flex items-center justify-center text-xs font-bold">
              {user?.name.charAt(0) || 'U'}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-semibold text-andy-black">{user?.name}</p>
              <p className="text-[10px] text-andy-bronze/60 capitalize">{user?.role.replace('_', ' ')}</p>
            </div>
            <ChevronDown size={14} className="text-andy-bronze" />
          </button>
          {showProfile && (
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl border border-andy-stone/20 shadow-premium z-50 overflow-hidden">
              <div className="px-4 py-3 border-b border-andy-stone/10">
                <p className="text-sm font-semibold text-andy-black">{user?.name}</p>
                <p className="text-xs text-andy-bronze">{user?.email}</p>
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

      {/* Click outside to close */}
      {(showNotifs || showProfile) && (
        <div className="fixed inset-0 z-40" onClick={() => { setShowNotifs(false); setShowProfile(false); }} />
      )}
    </div>
  );
}