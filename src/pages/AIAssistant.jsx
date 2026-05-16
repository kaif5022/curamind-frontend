export default function AIAssistant() {
  return (
    <div className="space-y-6 h-full flex flex-col">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">AI Assistant</h1>
        <p className="text-slate-400">Ask medical questions or analyze patient symptoms.</p>
      </div>
      
      <div className="flex-1 glass rounded-2xl border border-slate-700/50 flex flex-col overflow-hidden min-h-[500px]">
        {/* Chat Area */}
        <div className="flex-1 p-6 overflow-y-auto space-y-6">
          <div className="flex gap-4 max-w-3xl">
            <div className="w-10 h-10 rounded-full bg-brand-500/20 flex flex-shrink-0 items-center justify-center text-brand-400">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div className="bg-dark-800 p-4 rounded-2xl rounded-tl-none border border-slate-700/50 text-slate-300 text-sm leading-relaxed">
              Hello Dr. Smith! I am CuraMind AI. How can I assist you with your patients today? You can ask me to analyze symptoms, suggest homeopathic remedies, or summarize patient history.
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-slate-700/50 bg-dark-900/50">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Type your question about symptoms, remedies..." 
              className="w-full pl-4 pr-12 py-4 bg-dark-900 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 transition-colors"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
