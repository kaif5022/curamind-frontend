import { useState, useEffect } from 'react';
import { X, Calendar as CalendarIcon } from 'lucide-react';
import axios from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export default function AppointmentForm({ isOpen, onClose, fetchAppointments, appointmentToEdit }) {
  const [formData, setFormData] = useState({
    patientName: '',
    doctorName: '',
    appointmentDate: '',
    appointmentTime: '',
    reason: '',
    status: 'Scheduled',
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (appointmentToEdit) {
      setFormData({
        patientName: appointmentToEdit.patientName || '',
        doctorName: appointmentToEdit.doctorName || '',
        appointmentDate: appointmentToEdit.appointmentDate ? new Date(appointmentToEdit.appointmentDate).toISOString().split('T')[0] : '',
        appointmentTime: appointmentToEdit.appointmentTime || '',
        reason: appointmentToEdit.reason || '',
        status: appointmentToEdit.status || 'Scheduled',
        notes: appointmentToEdit.notes || ''
      });
    } else {
      setFormData({
        patientName: '', doctorName: '', appointmentDate: '', appointmentTime: '',
        reason: '', status: 'Scheduled', notes: ''
      });
    }
  }, [appointmentToEdit, isOpen]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (appointmentToEdit) {
        await axios.put(`/appointments/${appointmentToEdit._id}`, formData);
        toast.success('Appointment updated successfully!');
      } else {
        await axios.post('/appointments', formData);
        toast.success('Appointment booked successfully!');
      }
      fetchAppointments();
      onClose();
    } catch (err) {
      const msg = err.response?.data?.message || 'Something went wrong';
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="bg-dark-900 border border-slate-700 w-full max-w-2xl rounded-2xl shadow-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-slate-700/50">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-brand-500/20 text-brand-400 rounded-lg">
              <CalendarIcon className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-white">
              {appointmentToEdit ? 'Edit Appointment' : 'Book Appointment'}
            </h2>
          </div>
          <button onClick={onClose} className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Patient Name *</label>
              <input type="text" name="patientName" required value={formData.patientName} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Doctor Name *</label>
              <input type="text" name="doctorName" required value={formData.doctorName} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="Dr. Smith" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Date *</label>
              <input type="date" name="appointmentDate" required value={formData.appointmentDate} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Time *</label>
              <input type="time" name="appointmentTime" required value={formData.appointmentTime} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" />
            </div>
          </div>
          
          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">Reason for Visit</label>
            <input type="text" name="reason" value={formData.reason} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500" placeholder="General checkup, fever, etc." />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className="text-sm text-slate-400 ml-1">Status</label>
              <select name="status" value={formData.status} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500">
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm text-slate-400 ml-1">Internal Notes</label>
            <textarea name="notes" rows="3" value={formData.notes} onChange={handleInputChange} className="w-full px-4 py-2 bg-dark-800 border border-slate-700 rounded-xl text-slate-200 outline-none focus:border-brand-500 resize-none"></textarea>
          </div>

          <div className="flex justify-end gap-4 pt-4 border-t border-slate-700/50">
            <button type="button" onClick={onClose} className="px-6 py-2 bg-transparent border border-slate-600 text-slate-300 hover:bg-slate-800 rounded-xl transition-colors">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="px-6 py-2 bg-brand-500 hover:bg-brand-400 text-white font-medium rounded-xl transition-colors disabled:opacity-50">
              {loading ? 'Saving...' : appointmentToEdit ? 'Update Appointment' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
