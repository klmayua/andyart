'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { MoreHorizontal, X, ExternalLink } from 'lucide-react';

export default function FloatingFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const store = useAppStore();
  const openChat = store?.openChat ?? (() => {});

  const links = [
    { label: 'Profile', href: '/profile', external: false },
    { label: 'Email: hello@andyart.gallery', href: 'mailto:hello@andyart.gallery', external: true },
    { label: 'Instagram: @andyart', href: 'https://instagram.com/andyart', external: true },
    { label: 'LinkedIn: /company/andyart', href: 'https://linkedin.com/company/andyart', external: true },
    { label: 'Book consultation', href: '/consult', external: false },
    { label: 'Become partner', href: '/partners/apply', external: false },
    { label: 'Event RSVP', href: '/events', external: false },
    {
      label: 'Chat with Andy',
      href: '#',
      external: false,
      onClick: () => {
        openChat?.();
        setIsOpen(false);
      },
    },
    { label: 'Terms', href: '/legal/terms', external: false },
    { label: 'Privacy', href: '/legal/privacy', external: false },
  ];

  return (
    <div className="fixed bottom-[90px] right-4 md:bottom-16 md:right-6 z-40">
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-72 bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/30 overflow-hidden mb-2">
          <ul className="py-2 max-h-[300px] overflow-y-auto">
            {links.map((link, index) => (
              <li key={index}>
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="w-full px-4 py-2.5 text-left text-sm text-text-primary hover:bg-accent transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="block px-4 py-2.5 text-sm text-text-primary hover:bg-accent transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={14} className="ml-2 text-text-secondary inline" />}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 bg-white/90 backdrop-blur-xl rounded-full shadow-lg border border-white/30 flex items-center justify-center hover:bg-white transition-all"
        aria-label="Info menu"
      >
        {isOpen ? <X size={18} className="text-primary" /> : <MoreHorizontal size={18} className="text-primary" />}
      </button>
    </div>
  );
}
