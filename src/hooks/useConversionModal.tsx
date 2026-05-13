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
  openInquiry: (data?: ModalData) => void;
  openReserve: (data?: ModalData) => void;
  openPrivateViewing: (data?: ModalData) => void;
  openCommission: (data?: ModalData) => void;
  openConcierge: (data?: ModalData) => void;
  openRSVP: (data?: ModalData) => void;
  closeModal: () => void;
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

  const openInquiry = useCallback((data?: ModalData) => {
    setModal({ type: 'inquiry', isOpen: true, data });
  }, []);

  const openReserve = useCallback((data?: ModalData) => {
    setModal({ type: 'reserve', isOpen: true, data });
  }, []);

  const openPrivateViewing = useCallback((data?: ModalData) => {
    setModal({ type: 'privateViewing', isOpen: true, data });
  }, []);

  const openCommission = useCallback((data?: ModalData) => {
    setModal({ type: 'commission', isOpen: true, data });
  }, []);

  const openConcierge = useCallback((data?: ModalData) => {
    setModal({ type: 'concierge', isOpen: true, data });
  }, []);

  const openRSVP = useCallback((data?: ModalData) => {
    setModal({ type: 'rsvp', isOpen: true, data });
  }, []);

  const value: ConversionModalContextValue = {
    modal,
    openModal,
    close,
    openInquiry,
    openReserve,
    openPrivateViewing,
    openCommission,
    openConcierge,
    openRSVP,
    closeModal: close,
  };

  return (
    <ConversionModalContext.Provider value={value}>
      {children}
    </ConversionModalContext.Provider>
  );
}

export function useConversionModal() {
  const ctx = useContext(ConversionModalContext);
  if (!ctx) throw new Error('useConversionModal must be used within ConversionModalProvider');
  return ctx;
}