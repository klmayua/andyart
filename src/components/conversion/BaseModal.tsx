'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  maxWidth?: string;
}

export default function BaseModal({ isOpen, onClose, title, subtitle, children, maxWidth = 'max-w-lg' }: BaseModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-andy-black/50 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className={`relative w-full ${maxWidth} bg-andy-ivory rounded-[28px] shadow-[0_32px_64px_-12px_rgba(23,22,20,0.25)] border border-andy-stone/20 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-7 pt-7 pb-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-andy-black">{title}</h3>
              {subtitle && <p className="text-sm text-andy-bronze mt-1">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-andy-stone/20 flex items-center justify-center hover:bg-andy-stone/40 transition-colors flex-shrink-0"
              aria-label="Close"
            >
              <X size={16} className="text-andy-bronze" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="px-7 pb-7">
          {children}
        </div>
      </div>
    </div>
  );
}
