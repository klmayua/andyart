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
  '#d4af6a',   // heritage gold
  '#d8d2c3',   // warm ivory
  '#8ea67c',   // muted sage
  '#b58b73',   // terracotta bronze
  '#9db6c8',   // soft slate blue
  '#d7b9c8',   // dusty rose accent
];

const emphasisKeywords: Record<string, string> = {
  available: '#e3c27a',
  open: '#8fb28f',
  featured: '#cfa76b',
  private: '#d7d2c6',
  new: '#9dbfd3',
  spotlight: '#d6b4c6',
};

function getItemColor(text: string, index: number): string {
  const lower = text.toLowerCase();
  for (const [keyword, color] of Object.entries(emphasisKeywords)) {
    if (lower.includes(keyword)) return color;
  }
  return itemColors[index % itemColors.length];
}

export default function Ticker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[42px] bg-[#0b0b0b] border-b border-[rgba(212,175,106,0.18)] overflow-hidden flex items-center">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10 px-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-10">
            {items.map((text, idx) => {
              const color = getItemColor(text, idx);
              return (
                <span
                  key={`${i}-${text}`}
                  className="text-[13px] font-medium tracking-[0.03em] flex items-center gap-3 shrink-0"
                  style={{ color }}
                >
                  <span className="text-[#5b5b5b] text-[10px]">&bull;</span>
                  {text}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
