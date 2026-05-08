'use client';

const items = [
  'Private viewing slots available',
  'Corporate leasing now open',
  'Featured artist spotlight',
  'New collection released',
  'Experience dates released',
  'Collector preview open',
];

export default function Ticker() {
  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-[42px] bg-[#0c0c0c] border-b border-[rgba(212,175,106,0.18)] overflow-hidden flex items-center">
      <div className="animate-marquee whitespace-nowrap flex items-center gap-10 px-8">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="flex items-center gap-10">
            {items.map((text) => (
              <span
                key={`${i}-${text}`}
                className="text-[13px] font-medium tracking-[0.04em] text-[#d4af6a] flex items-center gap-3 shrink-0"
              >
                <span className="w-[5px] h-[5px] rounded-full bg-[#d4af6a]/80" />
                {text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
