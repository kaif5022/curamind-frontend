import { useState, useEffect } from 'react';
import { Users, Calendar as CalendarIcon, CheckCircle, Clock, Activity, TrendingUp } from 'lucide-react';
import axios from '../utils/axiosConfig';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  BarChart, Bar, PieChart, Pie, Cell, Legend 
} from 'recharts';
import toast from 'react-hot-toast';

const COLORS = ['#3b82f6', '#10b981', '#ef4444']; // Blue (Scheduled), Green (Completed), Red (Cancelled)

export default function Dashboard() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({
    summary: {
      totalPatients: 0,
      totalAppointments: 0,
      completedAppointments: 0,
      pendingAppointments: 0
    },
    charts: {
      statusData: [],
      monthlyData: [],
      patientGrowthData: []
    }
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/analytics');
        setData(res.data);
      } catch (error) {
        toast.error('Failed to load analytics dashboard');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-brand-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-slate-400 font-medium">Loading your clinic analytics...</p>
      </div>
    );
  }

  const { summary, charts } = data;

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Analytics Dashboard</h1>
        <p className="text-slate-400">Overview of your clinic's performance and patient metrics.</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard 
          title="Total Patients" 
          value={summary.totalPatients} 
          icon={<Users className="w-6 h-6 text-brand-400" />} 
          colorClass="border-brand-500/20 bg-brand-500/5"
          trend="+12% this month"
        />
        <DashboardCard 
          title="Total Appointments" 
          value={summary.totalAppointments} 
          icon={<CalendarIcon className="w-6 h-6 text-purple-400" />} 
          colorClass="border-purple-500/20 bg-purple-500/5"
        />
        <DashboardCard 
          title="Completed" 
          value={summary.completedAppointments} 
          icon={<CheckCircle className="w-6 h-6 text-emerald-400" />} 
          colorClass="border-emerald-500/20 bg-emerald-500/5"
        />
        <DashboardCard 
          title="Pending" 
          value={summary.pendingAppointments} 
          icon={<Clock className="w-6 h-6 text-amber-400" />} 
          colorClass="border-amber-500/20 bg-amber-500/5"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Patient Growth Line Chart */}
        <div className="glass p-6 rounded-2xl border border-slate-700/50 lg:col-span-2 shadow-lg flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-brand-400" />
            <h2 className="text-lg font-bold text-white">Patient Growth (Last 30 Days)</h2>
          </div>
          <div className="h-[300px] w-full">
            {charts.patientGrowthData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={charts.patientGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="date" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false}
                    minTickGap={20}
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    allowDecimals={false}
                  />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                    itemStyle={{ color: '#60a5fa' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="patients" 
                    name="New Patients"
                    stroke="#3b82f6" 
                    strokeWidth={3} 
                    dot={{ fill: '#1d4ed8', strokeWidth: 2 }} 
                    activeDot={{ r: 6, fill: '#60a5fa' }} 
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">Not enough data to display.</div>
            )}
          </div>
        </div>

        {/* Appointment Status Pie Chart */}
        <div className="glass p-6 rounded-2xl border border-slate-700/50 shadow-lg flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <Activity className="w-5 h-5 text-emerald-400" />
            <h2 className="text-lg font-bold text-white">Appointment Status</h2>
          </div>
          <div className="h-[300px] w-full flex items-center justify-center">
            {charts.statusData.some(d => d.value > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={charts.statusData}
                    cx="50%"
                    cy="45%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {charts.statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend 
                    verticalAlign="bottom" 
                    height={36} 
                    iconType="circle" 
                    wrapperStyle={{ fontSize: '12px', color: '#94a3b8' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 text-sm gap-2">
                <PieChart className="w-8 h-8 opacity-50" />
                No appointment data yet.
              </div>
            )}
          </div>
        </div>

        {/* Monthly Appointments Bar Chart */}
        <div className="glass p-6 rounded-2xl border border-slate-700/50 lg:col-span-3 shadow-lg flex flex-col">
          <div className="flex items-center gap-2 mb-6">
            <CalendarIcon className="w-5 h-5 text-blue-400" />
            <h2 className="text-lg font-bold text-white">Monthly Appointments (Last 6 Months)</h2>
          </div>
          <div className="h-[300px] w-full">
            {charts.monthlyData.some(d => d.appointments > 0) ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={charts.monthlyData} maxBarSize={50}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                  <XAxis 
                    dataKey="name" 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#94a3b8" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    allowDecimals={false}
                  />
                  <RechartsTooltip 
                    cursor={{ fill: '#334155', opacity: 0.4 }}
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem', color: '#f8fafc' }}
                  />
                  <Bar dataKey="appointments" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    {charts.monthlyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={index === charts.monthlyData.length - 1 ? '#60a5fa' : '#3b82f6'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-500 text-sm">Not enough data to display.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, colorClass, trend }) {
  return (
    <div className={`glass p-6 rounded-2xl border ${colorClass} hover:bg-slate-800/30 transition-colors`}>
      <div className="flex justify-between items-start mb-4">
        <div className="p-3 bg-dark-900 rounded-xl shadow-inner border border-slate-700/50">
          {icon}
        </div>
        {trend && (
          <span className="text-xs font-medium text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full border border-emerald-500/20">
            {trend}
          </span>
        )}
      </div>
      <div>
        <h3 className="text-slate-400 text-sm font-medium mb-1">{title}</h3>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
}
