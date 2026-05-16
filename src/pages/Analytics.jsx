export default function Analytics() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
        <p className="text-slate-400">Deep dive into your clinic's performance metrics.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-medium text-white mb-4">Patient Growth</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-700/50 rounded-xl bg-dark-900/50">
            <span className="text-slate-500 text-sm">Detailed growth charts will appear here</span>
          </div>
        </div>
        <div className="glass p-6 rounded-2xl border border-slate-700/50">
          <h3 className="text-lg font-medium text-white mb-4">Revenue Overview</h3>
          <div className="h-64 flex items-center justify-center border border-dashed border-slate-700/50 rounded-xl bg-dark-900/50">
            <span className="text-slate-500 text-sm">Revenue charts will appear here</span>
          </div>
        </div>
      </div>
    </div>
  );
}
