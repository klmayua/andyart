'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type ModalType = 'inquiry' | 'reserve' | 'privateViewing' | 'commission' | 'concierge' | 'rsvp';

interface ModalData {
  [key: string]: string | number | boolean | undefined;
}

interface ConversionModal {
  type: ModalType;
  isOpen: boolean;
  data?: ModalData;
}

interface ConversionModalContextValue {
  modal: ConversionModal | null;
  openModal: (type: ModalType, data?: ModalData) => void;
  close: () => void;
}

const ConversionModalContext = createContext<ConversionModalContextValue | null>(null);

export function ConversionModalProvider({ children }: { children: ReactNode }) {
  const [modal, setModal] = useState<ConversionModal | null>(null);

  const openModal = useCallback((type: ModalType, data?: ModalData) => {
    setModal({ type, isOpen: true, data });
  }, []);

  const close = useCallback(() => {
    setModal(null);
  }, []);

  return (
    <ConversionModalContext.Provider value={{ modal, openModal, close }}>
      {children}
    </ConversionModalContext.Provider>
  );
}

export function useConversionModal() {
  const ctx = useContext(ConversionModalContext);
  if (!ctx) throw new Error('useConversionModal must be used within ConversionModalProvider');
  return ctx;
}