'use client';

import { MessageCircle } from 'lucide-react';
import { useState, useCallback } from 'react';

interface WhatsAppMessageOptions {
  artworkTitle?: string;
  artistName?: string;
  price?: number | null;
  eventTitle?: string;
  eventDate?: string;
  serviceInterest?: string;
  url?: string;
}

function buildWhatsAppMessage(opts: WhatsAppMessageOptions): string {
  const base = 'Hello AndyArt,';
  const lines: string[] = [base];

  if (opts.artworkTitle) {
    lines.push(`I'm interested in: ${opts.artworkTitle}`);
    if (opts.artistName) lines.push(`Artist: ${opts.artistName}`);
    if (opts.price) lines.push(`Price: $${opts.price.toLocaleString()}`);
  }

  if (opts.eventTitle) {
    lines.push(`I'd like to know more about: ${opts.eventTitle}`);
    if (opts.eventDate) lines.push(`Date: ${opts.eventDate}`);
  }

  if (opts.serviceInterest) {
    lines.push(`Service inquiry: ${opts.serviceInterest}`);
  }

  if (!opts.artworkTitle && !opts.eventTitle && !opts.serviceInterest) {
    lines.push('I would like to speak with your concierge team.');
  }

  lines.push('');
  const pageUrl = typeof window !== 'undefined' ? window.location.href : opts.url || 'andyart.gallery';
  lines.push(`Page: ${pageUrl}`);

  return encodeURIComponent(lines.join('\n'));
}

export default function WhatsAppButton() {
  const [showTooltip, setShowTooltip] = useState(false);

  const whatsappBase = process.env.NEXT_PUBLIC_WHATSAPP_URL || 'https://wa.me/2348002649278';

  const openWhatsApp = useCallback((opts: WhatsAppMessageOptions = {}) => {
    const url = opts.url
      ? `${whatsappBase}?text=${buildWhatsAppMessage({ ...opts, url: opts.url })}`
      : `${whatsappBase}?text=${buildWhatsAppMessage(opts)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }, [whatsappBase]);

  return (
    <WhatsAppButtonStandalone
      showTooltip={showTooltip}
      onShowTooltip={setShowTooltip}
      onOpen={() => openWhatsApp({ url: typeof window !== 'undefined' ? window.location.href : '' })}
    />
  );
}

interface WhatsAppButtonStandaloneProps {
  showTooltip: boolean;
  onShowTooltip: (v: boolean) => void;
  onOpen: () => void;
  messageOptions?: WhatsAppMessageOptions;
}

export function WhatsAppButtonStandalone({ showTooltip, onShowTooltip, onOpen, messageOptions }: WhatsAppButtonStandaloneProps) {
  return (
    <div
      className="relative"
      onMouseEnter={() => onShowTooltip(true)}
      onMouseLeave={() => onShowTooltip(false)}
    >
      {showTooltip && (
        <div
          className="absolute right-[68px] top-1/2 -translate-y-1/2 whitespace-nowrap px-4 py-2 rounded-xl text-sm font-medium"
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
      <button
        onClick={onOpen}
        aria-label="Open WhatsApp concierge chat"
        className="flex items-center justify-center transition-transform duration-200 hover:scale-[1.06] active:scale-[0.97]"
        style={{
          width: '56px',
          height: '56px',
          borderRadius: '999px',
          background: '#25D366',
          border: '1px solid rgba(255,255,255,.28)',
          boxShadow: '0 12px 32px rgba(37,211,102,.35), 0 0 0 8px rgba(37,211,102,.08)',
        }}
      >
        <MessageCircle size={28} style={{ color: 'white' }} />
      </button>
    </div>
  );
}
