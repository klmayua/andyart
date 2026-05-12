export default function InlineLoader({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-8 h-8 border-[3px] border-andy-gold border-t-transparent rounded-full animate-spin mb-3" />
      <p className="text-andy-bronze text-sm">{label}</p>
    </div>
  );
}
