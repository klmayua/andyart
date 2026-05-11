'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

type ModalType = 'inquiry' | 'reserve' | 'privateViewing' | 'commission' | 'concierge' | 'rsvp' | null;

interface ModalState {
  type: Exclude<ModalType, null>;
  isOpen: boolean;
  data: Record<string, unknown>;
}

interface ConversionContextValue {
  openInquiry: (data: Record<string, unknown>) => void;
  openReserve: (data: Record<string, unknown>) => void;
  openPrivateViewing: (data: Record<string, unknown>) => void;
  openCommission: (data: Record<string, unknown>) => void;
  openConcierge: (data?: Record<string, unknown>) => void;
  openRSVP: (data: Record<string, unknown>) => void;
  close: () => void;
  modal: ModalState | null;
}

const ConversionContext = createContext<ConversionContextValue | null>(null);

export function ConversionModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ModalState | null>(null);

  const open = useCallback((type: ModalState['type'], data: Record<string, unknown> = {}) => {
    setModal({ type, isOpen: true, data });
  }, []);

  const close = useCallback(() => setModal(null), []);

  return (
    <ConversionContext.Provider
      value={{
        openInquiry: (data) => open('inquiry', data),
        openReserve: (data) => open('reserve', data),
        openPrivateViewing: (data) => open('privateViewing', data),
        openCommission: (data) => open('commission', data ?? {}),
        openConcierge: (data) => open('concierge', data ?? {}),
        openRSVP: (data) => open('rsvp', data),
        close,
        modal,
      }}
    >
      {children}
    </ConversionContext.Provider>
  );
}

export function useConversionModal() {
  const ctx = useContext(ConversionContext);
  if (!ctx) throw new Error('useConversionModal must be used within ConversionModalProvider');
  return ctx;
}
