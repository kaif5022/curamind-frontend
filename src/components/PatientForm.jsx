import { useState, useEffect } from 'react';
import { X, Upload, Activity } from 'lucide-react';
import axios from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export default function PatientForm({ isOpen, onClose, fetchPatients, patientToEdit }) {
  const [formData, setFormData] = useState({
    slipNumber: '',
    fullName: '',
    age: '',
    gender: 'Male',
    mobileNumber: '',
    address: '',
    bloodGroup: '',
    weight: '',
    height: '',
    symptoms: '',
    diagnosis: '',
    prescription: '',
    medicines: '',
    followUpDate: '',
    doctorNotes: ''
  });

  const [slips, setSlips] = useState([]);
  const [slipPreviews, setSlipPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (patientToEdit) {
      setFormData({
        slipNumber: patientToEdit.slipNumber || '',
        fullName: patientToEdit.fullName || '',
        age: patientToEdit.age || '',
        gender: patientToEdit.gender || 'Male',
        mobileNumber: patientToEdit.mobileNumber || '',
        address: patientToEdit.address || '',
        bloodGroup: patientToEdit.bloodGroup || '',
        weight: patientToEdit.weight || '',
        height: patientToEdit.height || '',
        symptoms: patientToEdit.symptoms || '',
        diagnosis: patientToEdit.diagnosis || '',
        prescription: patientToEdit.prescription || '',
        medicines: patientToEdit.medicines || '',
        followUpDate: patientToEdit.followUpDate ? new Date(patientToEdit.followUpDate).toISOString().split('T')[0] : '',
        doctorNotes: patientToEdit.doctorNotes || ''
      });
      if (patientToEdit.slips) {
        setSlipPreviews(patientToEdit.slips.map(s => `http://127.0.0.1:5000${s}`));
      }
    } else {
      setFormData({
        slipNumber: '', fullName: '', age: '', gender: 'Male', mobileNumber: '',
        address: '', bloodGroup: '', weight: '', height: '',
        symptoms: '', diagnosis: '', prescription: '', medicines: '',
        followUpDate: '', doctorNotes: ''
      });
      setSlips([]);
      setSlipPreviews([]);
    }
  }, [patientToEdit, isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSlipChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 3);
    setSlips(files);
    setSlipPreviews(files.map(file => URL.createObjectURL(file)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }
    slips.forEach(file => data.append('slips', file));

    try {
      if (patientToEdit) {
        await axios.put(`/patients/${patientToEdit._id}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Patient updated successfully!');
      } else {
        await axios.post('/patients', data, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        toast.success('Patient created successfully!');
      }
      fetchPatients();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-dark-900 border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl mt-12 mb-12">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/20 text-brand-400 rounded-lg">
              <Activity className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {patientToEdit ? 'Edit Patient Record' : 'Add New Patient'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && <div className="p-4 bg-red-500/10 text-red-400 m-6 rounded-lg border border-red-500/20">{error}</div>}

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col col-span-1 md:col-span-1">
              <label className="text-sm font-medium text-slate-300 mb-2">Upload Doctor Slip/Notes (Max 3)</label>
              <div className="w-full h-32 rounded-xl border-2 border-dashed border-slate-600 flex flex-col items-center justify-center bg-dark-800 text-slate-400 overflow-hidden relative group shrink-0">
                {slipPreviews.length > 0 ? (
                  <div className="flex gap-2 p-2 overflow-x-auto w-full h-full">
                    {slipPreviews.map((url, i) => (
                      <img key={i} src={url} alt={`Slip ${i+1}`} className="h-full w-24 object-cover rounded-lg border border-slate-700" />
                    ))}
                  </div>
                ) : (
                  <>
                    <Upload className="w-8 h-8 mb-2" />
                    <span className="text-xs">Upload Slip</span>
                  </>
                )}
                <input type="file" multiple accept="image/*" onChange={handleSlipChange} className="absolute inset-0 opacity-0 cursor-pointer" />
              </div>
            </div>

            <div className="flex flex-col col-span-1 md:col-span-2 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm text-slate-400 ml-1">Slip Number (Optional, auto-generated)</label>
                  <input type="text" name="slipNumber" value={formData.slipNumber} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="e.g. SLIP-1001" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400 ml-1">Full Name *</label>
                  <input type="text" name="fullName" required value={formData.fullName} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                  <label className="text-sm text-slate-400 ml-1">Mobile Number *</label>
                  <input type="text" name="mobileNumber" required value={formData.mobileNumber} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="+123456789" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Age *</label>
              <input type="number" name="age" required value={formData.age} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Gender *</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Blood Group</label>
              <input type="text" name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="O+" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Follow Up Date</label>
              <input type="date" name="followUpDate" value={formData.followUpDate} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Weight (kg)</label>
              <input type="number" name="weight" value={formData.weight} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Height (cm)</label>
              <input type="number" name="height" value={formData.height} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
            <div className="space-y-1 sm:col-span-2">
              <label className="text-sm text-slate-400 ml-1">Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">Symptoms</label>
            <textarea name="symptoms" rows="2" value={formData.symptoms} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none"></textarea>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">Diagnosis</label>
            <textarea name="diagnosis" rows="2" value={formData.diagnosis} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none"></textarea>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Prescription</label>
              <textarea name="prescription" rows="3" value={formData.prescription} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none"></textarea>
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Medicines</label>
              <textarea name="medicines" rows="3" value={formData.medicines} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none"></textarea>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">Doctor Notes</label>
            <textarea name="doctorNotes" rows="2" value={formData.doctorNotes} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none"></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700/50">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : patientToEdit ? 'Update Patient' : 'Save Patient'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
