'use client';

import { useSurfaceGuard } from '@/hooks/useSurfaceGuard';

const items = [
  'Private viewing slots available',
  'Corporate leasing now open',
  'Featured artist spotlight',
  'New collection released',
  'Experience dates released',
  'Collector preview open',
];

const itemColors = [
  '#C6A66B',
  '#D7CEC1',
  '#88A087',
  '#B48A72',
  '#C8B4A3',
  '#A8BAC5',
];

export default function Ticker() {
  const { isPublicSurface } = useSurfaceGuard();
  if (!isPublicSurface) return null;

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden flex items-center"
      style={{
        height: '52px',
        background: 'rgba(13,11,9,.96)',
        borderBottom: '1px solid rgba(198,166,107,.12)',
      }}
    >
      <div className="animate-marquee whitespace-nowrap flex items-center" style={{ paddingInline: '40px' }}>
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((text, idx) => (
              <span
                key={`${i}-${text}`}
                className="flex items-center shrink-0 leading-none"
                style={{
                  fontSize: '14px',
                  fontWeight: 550,
                  letterSpacing: '0.02em',
                  color: itemColors[idx],
                  marginRight: '72px',
                }}
              >
                <span
                  className="text-[10px]"
                  style={{
                    color: 'rgba(255,255,255,.25)',
                    marginRight: '34px',
                  }}
                >
                  &bull;
                </span>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
