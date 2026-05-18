import { useState } from 'react';
import { X, Activity, FileText } from 'lucide-react';
import PrescriptionGenerator from './PrescriptionGenerator';
import axios from '../utils/axiosConfig';
import { getImgUrl } from '../utils/getImgUrl';

export default function PatientDetailModal({ patient, onClose }) {
  const [showPrescription, setShowPrescription] = useState(false);

  if (!patient) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-dark-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl mt-12 mb-12">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/20 text-brand-400 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">Patient Record Details</h2>
          </div>
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowPrescription(true)}
              className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-lg transition-colors shadow-lg shadow-brand-500/20 text-sm font-medium"
            >
              <FileText className="w-4 h-4" /> Generate Prescription
            </button>
            <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Header Info */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-4 pb-6 border-b border-slate-700/50">
            <div>
              <h3 className="text-2xl font-bold text-white">{patient.fullName}</h3>
              <p className="text-brand-400 font-medium text-lg">{patient.slipNumber}</p>
            </div>
            <div className="text-right">
              <p className="text-slate-400 text-sm">Visit Date</p>
              <p className="text-slate-200 font-medium">{new Date(patient.visitDate).toLocaleDateString()}</p>
            </div>
          </div>

          {/* Basic Info */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Age/Gender</p>
              <p className="text-slate-200">{patient.age} yrs, {patient.gender}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Mobile</p>
              <p className="text-slate-200">{patient.mobileNumber}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Blood Group</p>
              <p className="text-slate-200">{patient.bloodGroup || 'N/A'}</p>
            </div>
            <div>
              <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Vitals</p>
              <p className="text-slate-200">{patient.weight ? `${patient.weight}kg` : '-'} / {patient.height ? `${patient.height}cm` : '-'}</p>
            </div>
          </div>

          {/* Clinical Info */}
          <div className="space-y-6">
            {patient.symptoms && (
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Symptoms</p>
                <p className="text-slate-200 bg-dark-800 p-3 rounded-xl border border-slate-700">{patient.symptoms}</p>
              </div>
            )}
            {patient.diagnosis && (
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Diagnosis</p>
                <p className="text-slate-200 bg-dark-800 p-3 rounded-xl border border-slate-700">{patient.diagnosis}</p>
              </div>
            )}
            {patient.prescription && (
              <div>
                <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">Prescription</p>
                <p className="text-slate-200 bg-dark-800 p-3 rounded-xl border border-slate-700">{patient.prescription}</p>
              </div>
            )}
          </div>

          {/* Media Galleries */}
          <div className="space-y-8 pt-6 border-t border-slate-700/50">
            {/* Photos */}
            {patient.photos && patient.photos.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Patient Photos</h4>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {patient.photos.map((photo, i) => (
                    <img key={i} src={getImgUrl(photo)} alt="Patient Photo" className="h-48 w-48 object-cover rounded-xl border border-slate-600 shadow-lg" />
                  ))}
                </div>
              </div>
            )}
            
            {/* Slips */}
            {patient.slips && patient.slips.length > 0 && (
              <div>
                <h4 className="text-lg font-bold text-white mb-4">Doctor Slips / Notes Images</h4>
                <div className="flex gap-4 overflow-x-auto pb-4">
                  {patient.slips.map((slip, i) => (
                    <a key={i} href={getImgUrl(slip)} target="_blank" rel="noreferrer">
                      <img src={getImgUrl(slip)} alt="Medical Slip" className="h-64 w-48 object-cover rounded-xl border border-slate-600 shadow-lg hover:opacity-80 transition-opacity" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
          
        </div>
      </div>

      {showPrescription && (
        <PrescriptionGenerator 
          patient={patient} 
          onClose={() => setShowPrescription(false)} 
        />
      )}
    </div>
  );
}
