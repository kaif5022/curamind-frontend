import { 
  Users, 
  Calendar, 
  Activity, 
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

const data = [
  { name: 'Mon', patients: 12 },
  { name: 'Tue', patients: 19 },
  { name: 'Wed', patients: 15 },
  { name: 'Thu', patients: 22 },
  { name: 'Fri', patients: 28 },
  { name: 'Sat', patients: 14 },
  { name: 'Sun', patients: 8 },
];

const stats = [
  { label: 'Total Patients', value: '2,845', icon: Users, trend: '+12.5%', isUp: true },
  { label: 'Today Appointments', value: '24', icon: Calendar, trend: '+4.2%', isUp: true },
  { label: 'AI Recommendations', value: '156', icon: Activity, trend: '-2.1%', isUp: false },
  { label: 'Follow-ups Due', value: '18', icon: Clock, trend: '+8.4%', isUp: true },
];

const recentActivity = [
  { id: 1, type: 'appointment', text: 'Dr. Sarah completed consultation with John Doe', time: '10 mins ago', icon: CheckCircle2, color: 'text-brand-400' },
  { id: 2, type: 'ai', text: 'AI generated new prescription for Emma Wilson', time: '1 hour ago', icon: Activity, color: 'text-purple-400' },
  { id: 3, type: 'alert', text: 'High priority follow-up needed for Patient #442', time: '2 hours ago', icon: AlertCircle, color: 'text-rose-400' },
  { id: 4, type: 'appointment', text: 'New appointment booked by Michael Brown', time: '3 hours ago', icon: Calendar, color: 'text-blue-400' },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-1">Welcome back, Dr. Smith</h1>
        <p className="text-slate-400">Here's what's happening in your clinic today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon;
          return (
            <div key={i} className="glass p-6 rounded-2xl hover:bg-dark-800/80 transition-colors">
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 bg-dark-900 rounded-xl">
                  <Icon className="w-6 h-6 text-brand-400" />
                </div>
                <span className={`text-sm font-medium px-2.5 py-1 rounded-full ${stat.isUp ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'}`}>
                  {stat.trend}
                </span>
              </div>
              <h3 className="text-slate-400 text-sm font-medium mb-1">{stat.label}</h3>
              <p className="text-2xl font-bold text-white">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart */}
        <div className="lg:col-span-2 glass p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-white">Patient Activity</h2>
            <select className="bg-dark-900 border border-slate-700 rounded-lg px-3 py-1.5 text-sm text-slate-300 outline-none focus:border-brand-500">
              <option>This Week</option>
              <option>Last Week</option>
              <option>This Month</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2dd4bf" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#2dd4bf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" axisLine={false} tickLine={false} />
                <YAxis stroke="#64748b" axisLine={false} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                  itemStyle={{ color: '#f1f5f9' }}
                />
                <Area type="monotone" dataKey="patients" stroke="#2dd4bf" strokeWidth={3} fillOpacity={1} fill="url(#colorPatients)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Activity Timeline */}
        <div className="glass p-6 rounded-2xl">
          <h2 className="text-lg font-semibold text-white mb-6">Recent Activity</h2>
          <div className="space-y-6">
            {recentActivity.map((activity, i) => {
              const Icon = activity.icon;
              return (
                <div key={activity.id} className="flex gap-4 relative">
                  {i !== recentActivity.length - 1 && (
                    <div className="absolute left-5 top-10 bottom-[-24px] w-px bg-slate-700"></div>
                  )}
                  <div className={`p-2 rounded-full bg-dark-900 border border-slate-700 ${activity.color} shrink-0 self-start z-10`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-200 mb-1 leading-snug">{activity.text}</p>
                    <span className="text-xs text-slate-500">{activity.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
          <button className="w-full mt-6 py-2.5 rounded-xl border border-slate-700 text-sm font-medium text-slate-300 hover:bg-slate-800 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
}
