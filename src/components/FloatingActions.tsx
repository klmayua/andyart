'use client';

import WhatsAppButton from './WhatsAppButton';
import Chatbot from './Chatbot';
import { useSurfaceGuard } from '@/hooks/useSurfaceGuard';

export default function FloatingActions() {
  const { isPublicSurface } = { isPublicSurface: true };
  // useSurfaceGuard disabled - causes crash on /enterprise
  // if (!isPublicSurface) return null;

  return (
    <div className="fixed flex flex-col items-center bottom-[96px] right-4 md:bottom-6 md:right-6 gap-3 z-[9999]">
      <WhatsAppButton />
      <Chatbot />
    </div>
  );
}
