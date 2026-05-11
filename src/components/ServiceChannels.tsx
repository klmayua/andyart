'use client';

import { useAppStore } from '@/stores/useAppStore';
import { MessageCircle, Phone, Calendar } from 'lucide-react';

const WA_NUMBER = '2348002649278';

function buildServiceMessage(serviceName: string): string {
  const msg = `Hello AndyArt, I'm interested in your ${serviceName} service.`;
  return encodeURIComponent(msg);
}

const channels = [
  { icon: MessageCircle, label: 'Circle Chat', desc: 'Instant concierge', action: 'chat' as const },
  { icon: Phone, label: 'WhatsApp', desc: '+234 800 ANDY ART', href: `https://wa.me/${WA_NUMBER}?text=${buildServiceMessage('general concierge')}` },
  { icon: Calendar, label: 'Callback', desc: 'Schedule a call', href: '/consult' },
];

export default function ServiceChannels() {
  const openChat = useAppStore((s) => s.openChat);

  return (
    <div className="grid grid-cols-3 gap-4 mb-12">
      {channels.map((ch) => {
        const content = (
          <>
            <ch.icon size={20} className="mx-auto mb-2 text-andy-bronze" />
            <p className="text-sm font-semibold text-andy-black">{ch.label}</p>
            <p className="text-xs text-andy-bronze">{ch.desc}</p>
          </>
        );

        if (ch.action === 'chat') {
          return (
            <button
              key={ch.label}
              onClick={openChat}
              className="bg-white rounded-xl p-5 border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all text-center cursor-pointer"
            >
              {content}
            </button>
          );
        }

        return (
          <a
            key={ch.label}
            href={ch.href}
            target={ch.href.startsWith('http') ? '_blank' : undefined}
            rel={ch.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            className="bg-white rounded-xl p-5 border border-andy-stone/30 hover:border-andy-gold/30 hover:shadow-premium transition-all text-center"
          >
            {content}
          </a>
        );
      })}
    </div>
  );
}
