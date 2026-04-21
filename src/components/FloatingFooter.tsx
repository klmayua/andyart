'use client';

import { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { MoreHorizontal, X, ExternalLink } from 'lucide-react';

export default function FloatingFooter() {
  const [isOpen, setIsOpen] = useState(false);
  const { openChat } = useAppStore();

  const links = [
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
        openChat();
        setIsOpen(false);
      },
    },
    { label: 'Terms', href: '/legal/terms', external: false },
    { label: 'Privacy', href: '/legal/privacy', external: false },
  ];

  return (
    <div className="fixed bottom-20 right-4 md:bottom-8 md:right-8 z-40">
      {isOpen && (
        <div className="absolute bottom-14 right-0 w-72 bg-surface rounded-md shadow-large border border-border-light overflow-hidden">
          <ul className="py-2">
            {links.map((link, index) => (
              <li key={index}>
                {link.onClick ? (
                  <button
                    onClick={link.onClick}
                    className="w-full px-4 py-3 text-left text-sm text-text-primary hover:bg-background transition-colors flex items-center justify-between"
                  >
                    {link.label}
                  </button>
                ) : (
                  <a
                    href={link.href}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="block px-4 py-3 text-sm text-text-primary hover:bg-background transition-colors flex items-center justify-between"
                  >
                    {link.label}
                    {link.external && <ExternalLink size={14} className="ml-2 text-text-secondary" />}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 bg-primary rounded-full shadow-large flex items-center justify-center text-surface hover:bg-text-primary transition-colors"
        aria-label="Info menu"
      >
        {isOpen ? <X size={20} /> : <MoreHorizontal size={20} />}
      </button>
    </div>
  );
}
