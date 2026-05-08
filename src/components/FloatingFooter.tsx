'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { MoreHorizontal, X, ExternalLink } from 'lucide-react';

export default function FloatingFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const store = useAppStore();
  const openChat = store?.openChat ?? (() => {});

  const links = [
    { label: 'Account', href: '/profile', external: false },
    { label: 'Email: hello@andyart.gallery', href: 'mailto:hello@andyart.gallery', external: true },
    { label: 'Instagram: @andyart', href: 'https://instagram.com/andyart', external: true },
    { label: 'LinkedIn: /company/andyart', href: 'https://linkedin.com/company/andyart', external: true },
    { label: 'Book Private Viewing', href: '/consult', external: false },
    { label: 'Corporate Curation', href: '/spaces', external: false },
    { label: 'Join Circle', href: '/circle', external: false },
    {
      label: 'Concierge Chat',
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
        <div className="absolute bottom-14 right-0 w-72 bg-white/95 backdrop-blur-xl rounded-xl shadow-premium border border-andy-stone/30 overflow-hidden mb-2">
          <div className="px-4 py-3 border-b border-andy-stone/20">
            <p className="font-serif text-sm font-semibold text-andy-black">Quick Links</p>
          </div>
          <ul className="py-2 max-h-[300px] overflow-y-auto">
            {links.map((link, index) => (
              <li key={index}>
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="w-full px-4 py-2.5 text-left text-sm text-andy-black hover:bg-andy-stone/30 transition-colors"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="block px-4 py-2.5 text-sm text-andy-black hover:bg-andy-stone/30 transition-colors"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={14} className="ml-2 text-andy-bronze inline" />}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-11 h-11 bg-white/95 backdrop-blur-xl rounded-full shadow-premium border border-andy-stone/30 flex items-center justify-center hover:bg-andy-stone/20 transition-all"
        aria-label="Info menu"
      >
        {isOpen ? <X size={18} className="text-andy-black" /> : <MoreHorizontal size={18} className="text-andy-black" />}
      </button>
    </div>
  );
}
