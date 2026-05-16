'use client';

import WhatsAppButton from './WhatsAppButton';
import Chatbot from './Chatbot';
import { useSurfaceGuard } from '@/hooks/useSurfaceGuard';

export default function FloatingActions() {
  const { isPublicSurface } = { isPublicSurface: true };
  // const { isPublicSurface } = useSurfaceGuard();
  // if (!isPublicSurface) return null;

  return (
    <div
      className="fixed flex flex-col items-center"
      style={{
        right: '24px',
        bottom: '24px',
        gap: '12px',
        zIndex: 9999,
      }}
    >
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}
