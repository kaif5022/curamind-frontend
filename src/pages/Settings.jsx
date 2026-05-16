export default function Settings() {
  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Settings</h1>
        <p className="text-slate-400">Manage your account and clinic preferences.</p>
      </div>
      
      <div className="glass rounded-2xl border border-slate-700/50 overflow-hidden">
        <div className="p-6 border-b border-slate-700/50">
          <h2 className="text-lg font-semibold text-white mb-4">Profile Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Full Name</label>
              <input type="text" defaultValue="Dr. Smith" className="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-brand-500 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
              <input type="email" defaultValue="doctor@clinic.com" className="w-full bg-dark-900 border border-slate-700 rounded-xl px-4 py-2 text-white focus:border-brand-500 outline-none" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Preferences</h2>
          <div className="flex items-center justify-between py-3 border-b border-slate-700/50">
            <div>
              <p className="font-medium text-white">Email Notifications</p>
              <p className="text-sm text-slate-400">Receive daily summary emails.</p>
            </div>
            <button className="w-12 h-6 bg-brand-500 rounded-full relative transition-colors">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
            </button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-white">Dark Mode</p>
              <p className="text-sm text-slate-400">Use dark theme across the application.</p>
            </div>
            <button className="w-12 h-6 bg-brand-500 rounded-full relative transition-colors">
              <span className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></span>
            </button>
          </div>
        </div>
        <div className="p-6 bg-dark-900/50 flex justify-end gap-3 border-t border-slate-700/50">
          <button className="px-4 py-2 text-slate-300 hover:text-white transition-colors">Cancel</button>
          <button className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl shadow-lg shadow-brand-500/20">Save Changes</button>
        </div>
      </div>
    </div>
  );
}
