'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[GlobalError]', error.message, error.stack);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ background: '#F7F2E8', margin: 0, minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'system-ui, sans-serif' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: 24 }}>
          <div style={{ width: 64, height: 64, background: '#171614', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#C6A66B" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h1 style={{ fontSize: 20, fontWeight: 700, color: '#171614', marginBottom: 8 }}>Platform Error</h1>
          <p style={{ fontSize: 14, color: '#A78345', marginBottom: 24, lineHeight: 1.6 }}>
            {error.message || 'An unexpected error occurred. This has been logged.'}
          </p>
          {process.env.NODE_ENV === 'development' && error.stack && (
            <pre style={{ textAlign: 'left', fontSize: 11, background: '#171614', color: '#F7F2E8', padding: 16, borderRadius: 8, overflow: 'auto', maxHeight: 200, marginBottom: 24 }}>
              {error.stack}
            </pre>
          )}
          {error.digest && (
            <p style={{ fontSize: 11, color: '#D7CEC1', marginBottom: 24 }}>Ref: {error.digest}</p>
          )}
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
            <button
              onClick={reset}
              style={{ padding: '10px 24px', background: '#C6A66B', color: '#171614', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}
            >
              Reload Platform
            </button>
            <a
              href="/"
              style={{ padding: '10px 24px', background: 'transparent', color: '#A78345', border: '1px solid #D7CEC1', borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center' }}
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}