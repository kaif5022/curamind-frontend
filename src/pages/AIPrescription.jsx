import { useState, useRef } from 'react';
import { Bot, Sparkles, FileText, Download, Printer, Activity, Pill, AlertTriangle, CheckCircle, ChevronRight } from 'lucide-react';
import axios from '../utils/axiosConfig';
import toast from 'react-hot-toast';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export default function AIPrescription() {
  const [formData, setFormData] = useState({ symptoms: '', diagnosis: '', age: '', gender: '' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const prescriptionRef = useRef(null);

  const handleAnalyze = async (e) => {
    e.preventDefault();
    if (!formData.symptoms.trim() || !formData.diagnosis.trim()) {
      toast.error('Symptoms and diagnosis are required.');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const { data } = await axios.post('/ai/prescription', formData);
      setResult(data);
      toast.success('Prescription generated!');
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to generate prescription.';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!prescriptionRef.current) return;
    
    try {
      const canvas = await html2canvas(prescriptionRef.current, { scale: 2, useCORS: true });
      const imgData = canvas.toDataURL('image/jpeg', 1.0);
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`AI_Prescription_${new Date().getTime()}.pdf`);
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-6xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1 flex items-center gap-2">
          <FileText className="w-6 h-6 text-brand-400" />
          AI Prescription Generator
        </h1>
        <p className="text-slate-400">Generate professional medical prescriptions instantly using Gemini AI.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Form Section */}
        <div className="lg:col-span-5 glass p-6 rounded-2xl border border-slate-700/50 shadow-xl h-fit">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">Clinical Data</h2>
          </div>
          
          <form onSubmit={handleAnalyze} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1 block">Patient Age</label>
                <input type="number" value={formData.age} onChange={(e) => setFormData({...formData, age: e.target.value})} placeholder="e.g. 34" className="w-full px-4 py-2 bg-dark-900 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-300 mb-1 block">Gender</label>
                <select value={formData.gender} onChange={(e) => setFormData({...formData, gender: e.target.value})} className="w-full px-4 py-2 bg-dark-900 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500">
                  <option value="">Select</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">Symptoms *</label>
              <textarea value={formData.symptoms} onChange={(e) => setFormData({...formData, symptoms: e.target.value})} placeholder="Fever, dry cough, fatigue..." className="w-full h-24 px-4 py-3 bg-dark-900 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none" required />
            </div>

            <div>
              <label className="text-sm font-medium text-slate-300 mb-1 block">Diagnosis *</label>
              <textarea value={formData.diagnosis} onChange={(e) => setFormData({...formData, diagnosis: e.target.value})} placeholder="Viral Pharyngitis" className="w-full h-20 px-4 py-3 bg-dark-900 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none" required />
            </div>

            <button type="submit" disabled={loading} className="w-full py-3 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium flex items-center justify-center gap-2 transition-all shadow-lg shadow-brand-500/20 disabled:opacity-50">
              {loading ? <><div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> Generating...</> : <><Sparkles className="w-5 h-5" /> Generate Prescription</>}
            </button>
          </form>
        </div>

        {/* Results Section */}
        <div className="lg:col-span-7 flex flex-col">
          {!result && !loading && (
            <div className="glass p-6 rounded-2xl border border-slate-700/50 shadow-xl flex-grow flex flex-col items-center justify-center text-center">
              <div className="w-16 h-16 bg-dark-800 rounded-full flex items-center justify-center mb-4 border border-slate-700/50">
                <FileText className="w-8 h-8 text-slate-500" />
              </div>
              <p className="text-slate-400 font-medium">Enter clinical data to generate an AI prescription draft.</p>
            </div>
          )}

          {loading && (
            <div className="glass p-6 rounded-2xl border border-slate-700/50 shadow-xl flex-grow flex flex-col items-center justify-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-brand-500/30 rounded-full"></div>
                <div className="absolute top-0 left-0 w-16 h-16 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
                <Sparkles className="w-6 h-6 text-brand-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </div>
              <p className="text-brand-400 font-medium mt-4 animate-pulse">Drafting medical prescription...</p>
            </div>
          )}

          {result && !loading && (
            <div className="space-y-4 animate-fade-in">
              <div className="flex gap-4 justify-end no-print">
                <button onClick={handleDownload} className="px-4 py-2 bg-dark-800 hover:bg-dark-700 border border-slate-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg">
                  <Download className="w-4 h-4" /> Download PDF
                </button>
                <button onClick={handlePrint} className="px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium flex items-center gap-2 transition-colors shadow-lg shadow-brand-500/20">
                  <Printer className="w-4 h-4" /> Print
                </button>
              </div>

              {/* PDF Container */}
              <div ref={prescriptionRef} className="bg-white text-black p-8 sm:p-12 min-h-[842px] max-w-[595px] mx-auto shadow-2xl print:shadow-none print:p-0">
                {/* Header */}
                <div className="border-b-2 border-brand-500 pb-6 mb-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-3xl font-bold text-slate-800 mb-1">CuraMind Clinic</h1>
                      <p className="text-slate-500 font-medium">Dr. AI Assistant</p>
                      <p className="text-slate-500 text-sm mt-2">123 Health Ave, Medical District</p>
                      <p className="text-slate-500 text-sm">Contact: +1 234 567 8900</p>
                    </div>
                    <div className="text-right">
                      <div className="w-16 h-16 bg-brand-50 rounded-2xl flex items-center justify-center ml-auto border border-brand-100">
                        <Activity className="w-8 h-8 text-brand-500" />
                      </div>
                      <p className="text-sm font-medium text-slate-600 mt-2">Date: {new Date().toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {/* Patient Info */}
                <div className="flex gap-8 mb-8 text-sm border-b border-slate-200 pb-4">
                  <p><span className="font-semibold text-slate-500">Age:</span> {formData.age || 'N/A'}</p>
                  <p><span className="font-semibold text-slate-500">Gender:</span> {formData.gender || 'N/A'}</p>
                  <p><span className="font-semibold text-slate-500">Diagnosis:</span> <span className="font-bold">{formData.diagnosis}</span></p>
                </div>

                {/* Medicines */}
                <div className="mb-8">
                  <div className="flex items-center gap-2 mb-4 text-brand-600 font-bold text-xl">
                    <span className="text-2xl">Rx</span> Medicines
                  </div>
                  <div className="space-y-4">
                    {result.medicines?.map((med, idx) => (
                      <div key={idx} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-slate-800 flex items-center gap-2">
                            <Pill className="w-4 h-4 text-brand-500" /> {med.name}
                          </h4>
                          <span className="text-sm font-semibold text-slate-600 bg-white px-2 py-1 rounded border border-slate-200">{med.duration}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-1"><span className="font-medium">Dosage:</span> {med.dosage} ({med.frequency})</p>
                        <p className="text-sm text-slate-500 italic">Instructions: {med.instructions}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom Info Grid */}
                <div className="grid grid-cols-2 gap-6 mb-8">
                  <div>
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500" /> Diet & Care
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {result.dietaryAdvice?.map((advice, i) => <li key={`diet-${i}`}>• {advice}</li>)}
                      {result.generalCare?.map((care, i) => <li key={`care-${i}`}>• {care}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-700 mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-amber-500" /> Precautions
                    </h4>
                    <ul className="text-sm text-slate-600 space-y-1">
                      {result.precautions?.map((prec, i) => <li key={`prec-${i}`}>• {prec}</li>)}
                    </ul>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-12 pt-6 border-t-2 border-slate-100 flex justify-between items-end">
                  <div>
                    <p className="text-sm font-bold text-slate-700 mb-1">Follow-up</p>
                    <p className="text-sm text-slate-500">{result.followUp}</p>
                  </div>
                  <div className="text-center">
                    <div className="w-32 border-b-2 border-slate-800 mb-2"></div>
                    <p className="text-sm font-bold text-slate-800">Doctor's Signature</p>
                  </div>
                </div>

                <div className="mt-8 text-center text-xs text-slate-400 pt-4 border-t border-slate-100">
                  Disclaimer: This is an AI-generated draft prescription. Must be reviewed and signed by a licensed medical practitioner.
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
