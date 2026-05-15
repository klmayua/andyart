export default function TestLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <div className="p-4 border-b">Test Layout</div>
      {children}
    </div>
  );
}