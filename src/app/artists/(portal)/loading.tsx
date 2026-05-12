export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F7F2E8]">
      <div className="text-center">
        <div className="w-10 h-10 border-[3px] border-andy-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-andy-bronze text-xs">Loading...</p>
      </div>
    </div>
  );
}
