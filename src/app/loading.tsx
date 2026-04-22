
export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-12 h-12">
          <div className="absolute inset-0 rounded-full border border-accent/20" />
          <div className="absolute inset-0 rounded-full border border-t-accent animate-spin" style={{borderTopColor:"#4DFFD2"}} />
        </div>
        <span className="font-mono text-xs text-white/30 tracking-widest">LOADING</span>
      </div>
    </div>
  );
}
