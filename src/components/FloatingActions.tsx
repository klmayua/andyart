'use client';

import WhatsAppButton from './WhatsAppButton';
import Chatbot from './Chatbot';

export default function FloatingActions() {
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
