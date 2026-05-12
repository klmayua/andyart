'use client';

import { useEffect } from 'react';

export default function ErrorBoundary({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F2E8]">
      <div className="text-center max-w-md mx-auto px-6">
        <h2 className="font-serif text-xl font-bold text-andy-black mb-2">Something went wrong</h2>
        <p className="text-sm text-andy-bronze mb-4">{error.message || 'An unexpected error occurred.'}</p>
        <button
          onClick={reset}
          className="px-4 py-2 bg-andy-gold text-white text-xs font-medium rounded-xl hover:bg-andy-bronze transition-colors"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
