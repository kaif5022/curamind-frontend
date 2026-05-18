import { useState } from 'react';
import { Bot, Sparkles, AlertTriangle, CheckCircle, Activity, ChevronRight } from 'lucide-react';
import axios from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export default function AIAssistant() {
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!symptoms.trim()) {
      toast.error('Please enter some symptoms to analyze.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data } = await axios.post('/ai/symptoms', { symptoms });
      setResult(data);
      toast.success('Analysis complete!');
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to analyze symptoms. Please try again.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyColor = (level) => {
    switch (level?.toLowerCase()) {
      case 'low': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/20';
      case 'medium': return 'text-amber-400 bg-amber-500/10 border-amber-500/20';
      case 'high': return 'text-orange-400 bg-orange-500/10 border-orange-500/20';
      case 'critical': return 'text-red-400 bg-red-500/10 border-red-500/20';
      default: return 'text-slate-400 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <Bot className="w-6 h-6 text-brand-400" />
          AI Symptom Assistant
        </h1>
        <p className="text-slate-400">Powered by Google Gemini to analyze symptoms and suggest possible conditions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Input Form Section */}
        <div className="glass p-6 rounded-2xl border border-slate-700/50 shadow-xl h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">Enter Symptoms</h2>
          </div>
          
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div>
              <label className="text-sm font-medium text-slate-300 mb-2 block ml-1">
                Patient Symptoms
              </label>
              <textarea 
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g. Patient has been experiencing high fever (102°F), dry cough, and extreme fatigue for the past 3 days..."
                className="w-full h-40 px-4 py-3 bg-dark-900 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none transition-colors"
              />
            </div>

            <button 
              type="submit"
              disabled={loading || !symptoms.trim()}
              className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Analyzing with AI...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5" /> Analyze Symptoms
                </>
              )}
            </button>
          </form>

          <div className="mt-6 p-4 bg-blue-500/5 border border-blue-500/10 rounded-xl">
            <h3 className="text-sm font-bold text-blue-400 mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" /> Tips for best results:
            </h3>
            <ul className="text-xs text-slate-400 space-y-2 list-disc list-inside">
              <li>Include symptom duration (e.g., "for 3 days")</li>
              <li>Mention severity or pain levels</li>
              <li>Include any relevant patient history if applicable</li>
            </ul>
          </div>
        </div>

        {/* Results Section */}
        <div className="glass p-6 rounded-2xl border border-slate-700/50 shadow-xl min-h-[500px] flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Bot className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">AI Analysis Results</h2>
          </div>

          {!result && !loading && (
            <div className="flex-grow flex flex-col items-center justify-center text-center px-6">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 border border-slate-700/50 shadow-inner">
                <Sparkles className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium">Enter symptoms on the left to receive AI-powered clinical insights.</p>
            </div>
          )}

          {loading && (
            <div className="flex-grow flex flex-col items-center justify-center space-y-4">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-brand-500/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                <Sparkles className="w-6 h-6 text-brand-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-brand-400 font-medium animate-pulse">Gemini AI is thinking...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-6 flex-grow animate-fade-in">
              
              <div className="flex items-center justify-between p-4 bg-dark-800 rounded-xl border border-slate-700/50">
                <span className="font-semibold text-slate-300">Triage Urgency:</span>
                <span className={`px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wider ${getUrgencyColor(result.urgencyLevel)}`}>
                  {result.urgencyLevel}
                </span>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-brand-400" /> Possible Conditions
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.possibleConditions?.map((condition, idx) => (
                    <span key={idx} className="px-3 py-1.5 bg-dark-800 text-brand-300 border border-brand-500/20 rounded-lg text-sm">
                      {condition}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400" /> Recommended Precautions
                </h3>
                <ul className="space-y-2">
                  {result.recommendedPrecautions?.map((precaution, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                      <ChevronRight className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                      {precaution}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-bold text-slate-300 mb-3 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-blue-400" /> Suggested Next Steps
                </h3>
                <ul className="space-y-2">
                  {result.suggestedNextSteps?.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-slate-400">
                      <ChevronRight className="w-4 h-4 text-slate-600 mt-0.5 shrink-0" />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-auto pt-4 border-t border-slate-700/50">
                <div className="flex gap-3 p-4 bg-amber-500/5 border border-amber-500/10 rounded-xl text-amber-200/80 text-xs">
                  <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400/80" />
                  <p>{result.disclaimer}</p>
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
