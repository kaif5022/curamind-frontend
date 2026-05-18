import React, { useRef, useState } from 'react';
import { X, Printer, Download, FileText } from 'lucide-react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';
import axios from '../utils/axiosConfig';

export default function PrescriptionGenerator({ patient, onClose }) {
  const printRef = useRef(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const getImgUrl = (path) => path.startsWith('http') ? path : `${axios.defaults.baseURL.replace('/api', '')}${path}`;

  if (!patient) return null;

  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;
    
    try {
      setIsGenerating(true);
      // Give DOM time to update state if needed, and images to stabilize
      await new Promise(resolve => setTimeout(resolve, 500)); 

      const canvas = await html2canvas(element, { 
        scale: 2,
        useCORS: true,
        allowTaint: true,
        logging: true
      });
      const data = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Prescription_${patient.fullName.replace(/\s+/g, '_')}_${patient.slipNumber || 'doc'}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center p-4 bg-black/80 backdrop-blur-sm overflow-y-auto print:bg-white print:p-0">
      <div className="w-full max-w-4xl mt-8 mb-8 print:mt-0 print:mb-0 print:w-full print:max-w-none">
        
        {/* Actions Bar - Hidden on print */}
        <div className="flex flex-col sm:flex-row justify-between items-center bg-dark-900 border border-slate-700 p-4 rounded-xl mb-4 shadow-xl print:hidden gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/20 text-brand-400 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Prescription Preview</h2>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-colors">
              <Printer className="w-4 h-4" /> Print
            </button>
            <button disabled={isGenerating} onClick={handleDownloadPdf} className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors shadow-lg shadow-brand-500/20 disabled:opacity-50">
              <Download className="w-4 h-4" /> {isGenerating ? 'Generating...' : 'Download PDF'}
            </button>
            <div className="w-px h-8 bg-slate-700 mx-1 hidden sm:block"></div>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Prescription A4 Container */}
        <div 
          ref={printRef} 
          className="bg-white w-[210mm] min-h-[297mm] mx-auto p-[20mm] shadow-2xl relative text-slate-900 print:w-full print:h-auto print:min-h-full print:p-8 print:shadow-none print:m-0 box-border"
        >
          
          {/* Header */}
          <div className="border-b-2 border-brand-500 pb-6 mb-6 flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-brand-600 mb-1">CuraMind AI Clinic</h1>
              <p className="text-slate-800 font-bold text-lg">Dr. Specialist</p>
              <p className="text-slate-600 text-sm">Consultant Physician & Healthcare Expert</p>
            </div>
            <div className="text-right text-sm text-slate-600 space-y-1">
              <p className="font-medium text-slate-800">Contact Details</p>
              <p>123 Health Avenue, Medical District</p>
              <p>Phone: +1 234 567 8900</p>
              <p>Email: contact@curamind.clinic</p>
            </div>
          </div>

          {/* Patient Info Grid */}
          <div className="bg-slate-50 rounded-lg p-5 mb-8 border border-slate-200">
            <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm">
              <div className="space-y-3">
                <p className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-600">Patient Name:</span> 
                  <span className="font-bold text-slate-900">{patient.fullName}</span>
                </p>
                <p className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-600">Age / Gender:</span> 
                  <span className="text-slate-900">{patient.age} Yrs / {patient.gender}</span>
                </p>
                <p className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-600">Mobile:</span> 
                  <span className="text-slate-900">{patient.mobileNumber}</span>
                </p>
              </div>
              <div className="space-y-3">
                <p className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-600">Date:</span> 
                  <span className="text-slate-900">{new Date(patient.visitDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                </p>
                <p className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-600">Slip No:</span> 
                  <span className="text-slate-900">{patient.slipNumber || 'N/A'}</span>
                </p>
                <p className="flex justify-between border-b border-slate-200 pb-1">
                  <span className="font-semibold text-slate-600">Visit No:</span> 
                  <span className="text-slate-900">{patient.patientVisitNumber || '1'}</span>
                </p>
              </div>
            </div>
            
            {/* Display Patient Photo if available */}
            {patient.photos && patient.photos.length > 0 && (
              <div className="mt-4 pt-4 border-t border-slate-200">
                <p className="font-semibold text-slate-600 text-xs uppercase tracking-wider mb-2">Patient Photo</p>
                <img 
                  src={getImgUrl(patient.photos[0])} 
                  alt="Patient" 
                  crossOrigin="anonymous"
                  className="h-24 w-24 object-cover rounded border border-slate-300"
                />
              </div>
            )}
          </div>

          {/* Rx Symbol */}
          <div className="mb-6 text-4xl font-serif text-brand-600">
            ℞
          </div>

          {/* Medical Details */}
          <div className="space-y-8 min-h-[350px]">
            {patient.symptoms && (
              <div>
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 uppercase text-sm tracking-wider">Symptoms / Chief Complaints</h3>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{patient.symptoms}</p>
              </div>
            )}
            
            {patient.diagnosis && (
              <div>
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 uppercase text-sm tracking-wider">Diagnosis</h3>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed font-medium">{patient.diagnosis}</p>
              </div>
            )}

            {(patient.medicines || patient.prescription) && (
              <div>
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 uppercase text-sm tracking-wider">Medicines & Prescription</h3>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{patient.medicines || patient.prescription}</p>
              </div>
            )}

            {patient.doctorNotes && (
              <div>
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 uppercase text-sm tracking-wider">Advice / Special Instructions</h3>
                <p className="text-slate-700 whitespace-pre-wrap leading-relaxed">{patient.doctorNotes}</p>
              </div>
            )}

            {/* Display Prescription Slips if available */}
            {patient.slips && patient.slips.length > 0 && (
              <div className="pt-4 page-break-inside-avoid">
                <h3 className="font-bold text-slate-800 border-b border-slate-200 pb-2 mb-3 uppercase text-sm tracking-wider">Attached Clinical Documents</h3>
                <div className="flex gap-4 flex-wrap">
                  {patient.slips.map((slip, i) => (
                    <img 
                      key={i}
                      src={getImgUrl(slip)} 
                      alt={`Document ${i+1}`} 
                      crossOrigin="anonymous"
                      className="h-48 w-auto object-contain rounded border border-slate-300"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Spacer to push footer down if content is short */}
          <div className="flex-grow"></div>

          {/* Footer - Positioned absolutely at the bottom for PDF layout, relative for print if multi-page */}
          <div className="mt-20 print:mt-auto pt-8 border-t-2 border-brand-100">
            <div className="flex justify-between items-end">
              <div>
                {patient.followUpDate && (
                  <p className="text-slate-700 font-medium bg-brand-50 px-4 py-2 rounded-lg border border-brand-100 inline-block">
                    Next Follow-up: <span className="font-bold text-brand-700">{new Date(patient.followUpDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </p>
                )}
                <p className="text-xs text-slate-400 mt-6 font-medium">Generated securely by CuraMind AI Management System</p>
              </div>
              <div className="text-center">
                <div className="w-40 border-b-2 border-slate-800 mb-2 border-dashed"></div>
                <p className="font-bold text-slate-800">Doctor's Signature</p>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Global styles specifically for hiding UI elements during print */}
      <style dangerouslySetInnerHTML={{__html: `
        @media print {
          body > :not(.fixed) {
            display: none !important;
          }
          .fixed {
            position: relative !important;
            box-shadow: none !important;
            background: white !important;
            overflow: visible !important;
          }
          ::-webkit-scrollbar {
              display: none;
          }
          @page {
            size: A4;
            margin: 0;
          }
        }
      `}} />
    </div>
  );
}
