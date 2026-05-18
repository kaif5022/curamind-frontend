import { useState, useEffect } from 'react';
import { Plus, Calendar, Clock, Edit2, Trash2, CheckCircle, AlertCircle, Filter } from 'lucide-react';
import AppointmentForm from '../components/AppointmentForm';
import axios from '../utils/axiosConfig';
import toast from 'react-hot-toast';

export default function Appointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [appointmentToEdit, setAppointmentToEdit] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get('/appointments');
      setAppointments(data);
    } catch (error) {
      toast.error('Failed to fetch appointments');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await axios.delete(`/appointments/${id}`);
        toast.success('Appointment deleted successfully');
        fetchAppointments();
      } catch (error) {
        toast.error('Failed to delete appointment');
      }
    }
  };

  const openEditForm = (appointment) => {
    setAppointmentToEdit(appointment);
    setIsFormOpen(true);
  };

  const handleOpenForm = () => {
    setAppointmentToEdit(null);
    setIsFormOpen(true);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'Scheduled':
        return <span className="px-3 py-1 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-full text-xs font-medium">Scheduled</span>;
      case 'Completed':
        return <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full text-xs font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3"/> Completed</span>;
      case 'Cancelled':
        return <span className="px-3 py-1 bg-red-500/10 text-red-400 border border-red-500/20 rounded-full text-xs font-medium flex items-center gap-1"><AlertCircle className="w-3 h-3"/> Cancelled</span>;
      default:
        return null;
    }
  };

  const filteredAppointments = filterStatus === 'All' 
    ? appointments 
    : appointments.filter(a => a.status === filterStatus);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Appointments</h1>
          <p className="text-slate-400">Schedule and manage your clinic visits.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center bg-dark-800 border border-slate-700 rounded-xl p-1">
            {['All', 'Scheduled', 'Completed', 'Cancelled'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  filterStatus === status 
                    ? 'bg-slate-700 text-white shadow-sm' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
          <button 
            onClick={handleOpenForm}
            className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-all shadow-lg shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" /> Book
          </button>
        </div>
      </div>

      {/* Appointment Cards */}
      {loading ? (
        <div className="flex justify-center py-20">
          <div className="w-8 h-8 border-4 border-brand-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : filteredAppointments.length === 0 ? (
        <div className="glass flex flex-col items-center justify-center py-20 rounded-2xl border border-slate-700/50">
          <div className="p-4 bg-dark-800 rounded-full mb-4">
            <Calendar className="w-8 h-8 text-slate-500" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">No appointments found</h3>
          <p className="text-slate-400 mb-6">You don't have any {filterStatus !== 'All' ? filterStatus.toLowerCase() : ''} appointments.</p>
          <button 
            onClick={handleOpenForm}
            className="px-6 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors"
          >
            Book Appointment
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAppointments.map((apt) => (
            <div key={apt._id} className="glass p-6 rounded-2xl border border-slate-700/50 hover:border-slate-600 transition-colors flex flex-col h-full">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-dark-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <span className="font-bold text-brand-400">{apt.patientName.charAt(0)}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-white leading-tight">{apt.patientName}</h3>
                    <p className="text-xs text-slate-400">Dr. {apt.doctorName}</p>
                  </div>
                </div>
                {getStatusBadge(apt.status)}
              </div>
              
              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-dark-800/50 p-2 rounded-lg border border-slate-700/50">
                  <Calendar className="w-4 h-4 text-brand-400" />
                  {new Date(apt.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-300 bg-dark-800/50 p-2 rounded-lg border border-slate-700/50">
                  <Clock className="w-4 h-4 text-blue-400" />
                  {apt.appointmentTime}
                </div>
                {apt.reason && (
                  <p className="text-sm text-slate-400 pt-2 border-t border-slate-700/50">
                    <span className="font-medium text-slate-300">Reason:</span> {apt.reason}
                  </p>
                )}
              </div>

              <div className="flex justify-between pt-4 border-t border-slate-700/50">
                <button 
                  onClick={() => openEditForm(apt)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <Edit2 className="w-4 h-4" /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(apt._id)}
                  className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Appointment Form Modal */}
      <AppointmentForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        fetchAppointments={fetchAppointments}
        appointmentToEdit={appointmentToEdit}
      />
    </div>
  );
}
