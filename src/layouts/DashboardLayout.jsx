import { useState, useContext } from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { 
  LayoutDashboard, 
  Users, 
  FileText, 
  Calendar, 
  Bot, 
  BarChart, 
  Settings,
  Search,
  Bell,
  Menu,
  X
} from 'lucide-react';

const sidebarItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
  { icon: Users, label: 'Patients', path: '/dashboard/patients' },
  { icon: FileText, label: 'AI Prescription', path: '/dashboard/ai-prescription' },
  { icon: Calendar, label: 'Appointments', path: '/dashboard/appointments' },
  { icon: Bot, label: 'AI Assistant', path: '/dashboard/ai' },
  { icon: BarChart, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: Settings, label: 'Settings', path: '/dashboard/settings' },
];

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex h-screen bg-dark-900 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:static inset-y-0 left-0 z-50 w-64 glass border-r border-slate-700/50 
        transform transition-transform duration-300 ease-in-out lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between h-16 px-6 border-b border-slate-700/50">
          <Link to="/" className="text-xl font-bold gradient-text">CuraMind AI</Link>
          <button className="lg:hidden" onClick={() => setSidebarOpen(false)}>
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>
        
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-4rem)]">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-brand-500/10 text-brand-400' 
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                  }
                `}
              >
                <Icon className={`w-5 h-5 ${isActive ? 'text-brand-400' : ''}`} />
                <span className="font-medium">{item.label}</span>
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute left-0 w-1 h-8 bg-brand-400 rounded-r-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Navbar */}
        <header className="h-16 glass border-b border-slate-700/50 flex items-center justify-between px-6 z-10 sticky top-0">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-slate-800"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5 text-slate-400" />
            </button>
            
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-dark-800 rounded-full border border-slate-700/50 w-64 focus-within:border-brand-500/50 transition-colors">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search patients, appointments..." 
                className="bg-transparent border-none outline-none text-sm text-slate-200 w-full placeholder-slate-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 rounded-full hover:bg-slate-800 transition-colors">
              <Bell className="w-5 h-5 text-slate-400" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-500 rounded-full ring-2 ring-dark-900"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-slate-200">{user?.name || 'Dr. Smith'}</p>
                <button onClick={logout} className="text-xs text-brand-400 hover:text-brand-300">Logout</button>
              </div>
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-brand-400 to-blue-500 p-[2px]">
                <div className="w-full h-full rounded-full border-2 border-dark-900 overflow-hidden bg-dark-800 flex items-center justify-center">
                  <span className="text-xs font-bold text-white">{user?.name?.charAt(0) || 'D'}</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-6 relative">
          <Outlet />
          
          {/* Floating AI Button */}
          <button className="fixed bottom-6 right-6 p-4 bg-brand-500 hover:bg-brand-400 text-white rounded-full shadow-lg shadow-brand-500/20 transition-all hover:scale-105 active:scale-95 z-50 group">
            <Bot className="w-6 h-6" />
            <span className="absolute right-full mr-4 top-1/2 -translate-y-1/2 bg-dark-800 text-sm px-3 py-1.5 rounded-lg border border-slate-700 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
              AI Assistant
            </span>
          </button>
        </main>
      </div>
    </div>
  );
}
