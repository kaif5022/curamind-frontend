export default function Appointments() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Appointments</h1>
          <p className="text-slate-400">Schedule and manage your clinic appointments.</p>
        </div>
        <button className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/20">
          Book Appointment
        </button>
      </div>
      <div className="glass p-8 rounded-2xl border border-slate-700/50">
        <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
          {/* Calendar Header Simulation */}
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center font-medium text-slate-400 text-sm py-2">
              {day}
            </div>
          ))}
          {/* Calendar Grid Simulation */}
          {Array.from({ length: 35 }).map((_, i) => (
            <div key={i} className={`h-24 rounded-xl border border-slate-700/30 p-2 ${i === 15 ? 'bg-brand-500/10 border-brand-500/50' : 'hover:bg-slate-800/30'} transition-colors cursor-pointer`}>
              <span className={`text-sm font-medium ${i === 15 ? 'text-brand-400' : 'text-slate-500'}`}>
                {(i % 31) + 1}
              </span>
              {i === 15 && (
                <div className="mt-2 text-xs bg-brand-500 text-white px-2 py-1 rounded truncate">
                  10:00 AM - John Doe
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
