export default function Prescriptions() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Prescriptions</h1>
        <p className="text-slate-400">Manage and generate patient prescriptions.</p>
      </div>
      <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center text-center border-dashed border-2 border-slate-700/50">
        <div className="w-16 h-16 bg-brand-500/10 text-brand-400 rounded-full flex items-center justify-center mb-4">
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-white mb-2">No prescriptions yet</h3>
        <p className="text-slate-400 mb-6 max-w-sm">You haven't generated any prescriptions today. Select a patient to start generating an AI-assisted prescription.</p>
        <button className="px-6 py-2.5 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/20">
          Create New Prescription
        </button>
      </div>
    </div>
  );
}
