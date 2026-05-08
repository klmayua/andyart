'use client';

const items = [
  'Private viewing slots available',
  'Corporate leasing now open',
  'Featured artist spotlight',
  'New collection released',
  'Experience dates released',
  'Collector preview open',
];

const itemColors = [
  '#C6A66B',   // heritage gold
  '#D7CEC1',   // warm stone
  '#88A087',   // muted sage
  '#B48A72',   // terracotta bronze
  '#C8B4A3',   // warm sand
  '#A8BAC5',   // soft slate blue
];

export default function Ticker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[38px] bg-[rgba(17,15,12,.96)] border-b border-[rgba(198,166,107,0.12)] overflow-hidden flex items-center">
      <div className="animate-marquee whitespace-nowrap flex items-center px-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center">
            {items.map((text, idx) => (
              <span
                key={`${i}-${text}`}
                className="text-[13px] font-medium tracking-[0.02em] leading-none flex items-center shrink-0"
                style={{ color: itemColors[idx] }}
              >
                <span className="text-[rgba(255,255,255,.25)] text-[10px] mx-7">&bull;</span>
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
