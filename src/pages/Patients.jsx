import { useState, useEffect } from 'react';
import { Plus, Search, Filter, Edit2, Trash2, FileText, User } from 'lucide-react';
import axios from '../utils/axiosConfig';
import PatientForm from '../components/PatientForm';
import PatientDetailModal from '../components/PatientDetailModal';
import toast from 'react-hot-toast';

export default function Patients() {
  const [patients, setPatients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchDate, setSearchDate] = useState('');
  const [loading, setLoading] = useState(true);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [patientToEdit, setPatientToEdit] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [patientToView, setPatientToView] = useState(null);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`/patients?search=${searchTerm}&date=${searchDate}`);
      setPatients(data);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      fetchPatients();
    }, 300);
    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, searchDate]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this patient record?')) {
      try {
        await axios.delete(`/patients/${id}`);
        toast.success('Patient deleted successfully');
        fetchPatients();
      } catch (error) {
        console.error('Error deleting patient:', error);
        toast.error('Failed to delete patient');
      }
    }
  };

  const openAddForm = () => {
    setPatientToEdit(null);
    setIsFormOpen(true);
  };

  const openEditForm = (patient) => {
    setPatientToEdit(patient);
    setIsFormOpen(true);
  };

  const openDetailView = (patient) => {
    setPatientToView(patient);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white mb-1">Patient Management</h1>
          <p className="text-slate-400">View and manage your patient records.</p>
        </div>
        <button onClick={openAddForm} className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-400 text-white rounded-xl font-medium transition-colors shadow-lg shadow-brand-500/20">
          <Plus className="w-5 h-5" />
          Add Patient
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden flex flex-col">
        {/* Table Toolbar */}
        <div className="p-4 border-b border-slate-700/50 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search by Name, Slip No or ID..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-dark-900 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:border-brand-500 transition-colors"
              />
            </div>
            <div className="relative w-full sm:w-auto">
              <input 
                type="date" 
                value={searchDate}
                onChange={(e) => setSearchDate(e.target.value)}
                className="w-full px-4 py-2 bg-dark-900 border border-slate-700 rounded-xl text-sm text-slate-200 outline-none focus:border-brand-500 transition-colors cursor-pointer"
                title="Filter by Visit Date"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto min-h-[400px]">
          {loading ? (
            <div className="flex justify-center items-center h-64 text-slate-400">Loading patients...</div>
          ) : patients.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-slate-400">No patients found.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-dark-900/50 border-b border-slate-700/50 text-slate-400 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Patient Info</th>
                  <th className="p-4 font-medium">Age/Gender</th>
                  <th className="p-4 font-medium">Mobile</th>
                  <th className="p-4 font-medium">Visit Date</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-700/50">
                {patients.map((patient) => (
                  <tr key={patient._id} className="hover:bg-slate-800/30 transition-colors group">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-dark-800 border border-slate-700 overflow-hidden flex items-center justify-center shrink-0">
                          {patient.photos && patient.photos.length > 0 ? (
                            <img src={patient.photos[0].startsWith('http') ? patient.photos[0] : `${axios.defaults.baseURL.replace('/api', '')}${patient.photos[0]}`} alt={patient.fullName} className="w-full h-full object-cover" />
                          ) : patient.slips && patient.slips.length > 0 ? (
                            <img src={patient.slips[0].startsWith('http') ? patient.slips[0] : `${axios.defaults.baseURL.replace('/api', '')}${patient.slips[0]}`} alt={patient.fullName} className="w-full h-full object-cover" />
                          ) : (
                            <User className="w-5 h-5 text-slate-500" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-slate-200">{patient.fullName}</p>
                          <p className="text-xs text-brand-400 font-medium">{patient.slipNumber}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-slate-300">{patient.age} yrs</p>
                      <p className="text-xs text-slate-500">{patient.gender}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-slate-300">{patient.mobileNumber}</p>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-slate-300">{new Date(patient.visitDate).toLocaleDateString()}</p>
                    </td>
                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => openDetailView(patient)} className="p-1.5 text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 rounded-lg transition-colors" title="View Details">
                          <FileText className="w-4 h-4" />
                        </button>
                        <button onClick={() => openEditForm(patient)} className="p-1.5 text-slate-400 hover:text-blue-400 hover:bg-blue-400/10 rounded-lg transition-colors" title="Edit">
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleDelete(patient._id)} className="p-1.5 text-slate-400 hover:text-rose-400 hover:bg-rose-400/10 rounded-lg transition-colors" title="Delete">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
      
      {/* Add/Edit Form Modal */}
      <PatientForm 
        isOpen={isFormOpen} 
        onClose={() => setIsFormOpen(false)} 
        fetchPatients={fetchPatients}
        patientToEdit={patientToEdit}
      />

      {/* Patient Detail View Modal */}
      {isDetailOpen && (
        <PatientDetailModal 
          patient={patientToView} 
          onClose={() => setIsDetailOpen(false)} 
        />
      )}
    </div>
  );
}
