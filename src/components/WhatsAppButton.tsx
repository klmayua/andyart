'use client';

import { MessageCircle } from 'lucide-react';
import { useState } from 'react';

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappUrl = process.env.NEXT_PUBLIC_WHATSAPP_URL || '#';

  const handleClick = (e: React.MouseEvent) => {
    if (whatsappUrl === '#') {
      e.preventDefault();
      alert('WhatsApp concierge coming soon. Please email hello@andyart.gallery');
    }
  };

  return (
    <div
      className="fixed z-[1200]"
      style={{
        right: '24px',
        bottom: '108px',
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {/* Tooltip */}
      {showTooltip && (
        <div
          className="absolute right-[72px] top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium"
          style={{
            background: 'rgba(255,255,255,.88)',
            backdropFilter: 'blur(18px) saturate(150%)',
            WebkitBackdropFilter: 'blur(18px) saturate(150%)',
            border: '1px solid rgba(255,255,255,.65)',
            boxShadow: '0 8px 24px rgba(0,0,0,.08)',
            color: '#171410',
          }}
        >
          Chat with Concierge
        </div>
      )}

      {/* Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        aria-label="Open WhatsApp concierge chat"
        className="flex items-center justify-center transition-transform duration-200 hover:scale-[1.06] active:scale-[0.97]"
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '999px',
          background: '#25D366',
          border: '1px solid rgba(255,255,255,.28)',
          boxShadow: '0 12px 32px rgba(37,211,102,.35), 0 0 0 8px rgba(37,211,102,.08)',
        }}
      >
        <MessageCircle size={28} style={{ color: 'white' }} />
      </a>
    </div>
  );
}
