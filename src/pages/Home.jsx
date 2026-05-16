import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Bot, 
  Users, 
  Mic, 
  Clock, 
  FileSignature, 
  Video, 
  Globe2, 
  Cloud,
  ChevronRight,
  Activity,
  CheckCircle2,
  Star
} from 'lucide-react';

const features = [
  { icon: Bot, title: 'AI Repertorization', desc: 'Smart symptom analysis using advanced AI trained on vast homeopathic materia medica.' },
  { icon: Users, title: 'Patient Records', desc: 'Comprehensive digital health records with visual timelines and treatment history.' },
  { icon: Mic, title: 'Voice Notes', desc: 'Dictate consultation notes seamlessly with our medical-grade speech-to-text AI.' },
  { icon: Clock, title: 'Follow-up Tracking', desc: 'Automated reminders and progress tracking for chronic cases.' },
  { icon: FileSignature, title: 'Smart Prescription', desc: 'Generate accurate prescriptions with dosage instructions in seconds.' },
  { icon: Video, title: 'Teleconsultation', desc: 'Built-in secure video calling for remote patient consultations.' },
  { icon: Globe2, title: 'Multi-language', desc: 'Support for multiple regional languages for wider patient reach.' },
  { icon: Cloud, title: 'Cloud Storage', desc: 'Secure, encrypted cloud backup of all your critical clinic data.' },
];

const pricing = [
  { name: 'Starter', price: '$29', desc: 'Perfect for new practitioners', features: ['Up to 500 patients', 'Basic AI analysis', 'Email support', 'Secure backup'] },
  { name: 'Professional', price: '$79', desc: 'Ideal for established clinics', features: ['Unlimited patients', 'Advanced AI repertorization', 'Voice notes', 'Priority support'], popular: true },
  { name: 'Enterprise', price: 'Custom', desc: 'For multi-doctor hospitals', features: ['Multiple accounts', 'Custom integrations', 'API access', '24/7 dedicated support'] },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-dark-900 text-slate-200 selection:bg-brand-500/30">
      {/* Navbar */}
      <nav className="fixed w-full z-50 glass border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-brand-500 rounded-xl">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold gradient-text">CuraMind AI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#features" className="hover:text-brand-400 transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-brand-400 transition-colors">How it Works</a>
            <a href="#pricing" className="hover:text-brand-400 transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-sm font-medium text-slate-300 hover:text-white transition-colors">Log In</Link>
            <Link to="/login" className="px-5 py-2.5 bg-brand-500 hover:bg-brand-400 text-white text-sm font-medium rounded-xl transition-all shadow-lg shadow-brand-500/20">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-40 pb-20 px-6 relative overflow-hidden">
          {/* Background Gradients */}
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-500/20 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-500/30 bg-brand-500/10 text-brand-400 text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-500"></span>
              </span>
              v2.0 is now live with Advanced AI
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight"
            >
              AI-Powered Homeopathic <br />
              <span className="gradient-text">Patient Management</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              Revolutionize your clinic with smart AI repertorization, seamless patient records, and intelligent prescriptions built for modern homeopaths.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/login" className="px-8 py-4 bg-white text-dark-900 hover:bg-slate-100 font-semibold rounded-xl transition-all flex items-center gap-2">
                Start Free Trial
                <ChevronRight className="w-5 h-5" />
              </Link>
              <button className="px-8 py-4 bg-dark-800 border border-slate-700 hover:bg-dark-700 text-white font-semibold rounded-xl transition-all flex items-center gap-2">
                Book a Demo
              </button>
            </motion.div>

            {/* Dashboard Mockup */}
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-20 relative mx-auto max-w-5xl"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent z-10"></div>
              <div className="glass rounded-2xl md:rounded-[2rem] p-2 md:p-4 border border-slate-700/50 shadow-2xl relative overflow-hidden group">
                <img 
                  src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=2000&q=80" 
                  alt="Dashboard Preview" 
                  className="rounded-xl md:rounded-2xl opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
                {/* Overlay UI elements to make it look like our dashboard */}
                <div className="absolute top-8 left-8 right-8 bottom-8 rounded-xl border border-slate-700/50 bg-dark-900/90 backdrop-blur-sm p-6 hidden md:block">
                  <div className="flex gap-6 h-full">
                    <div className="w-48 border-r border-slate-700/50 space-y-4 pr-6">
                      <div className="h-8 w-32 bg-slate-800 rounded animate-pulse"></div>
                      <div className="space-y-2 mt-8">
                        {[1,2,3,4,5].map(i => <div key={i} className="h-10 w-full bg-slate-800 rounded-lg animate-pulse"></div>)}
                      </div>
                    </div>
                    <div className="flex-1 space-y-6">
                      <div className="flex justify-between">
                        <div className="h-8 w-48 bg-slate-800 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-slate-800 rounded-full animate-pulse"></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        {[1,2,3].map(i => <div key={i} className="h-24 bg-slate-800 rounded-xl animate-pulse"></div>)}
                      </div>
                      <div className="h-64 bg-slate-800 rounded-xl animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-24 px-6 bg-dark-800/50 border-y border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Everything you need to run your clinic</h2>
              <p className="text-slate-400 max-w-2xl mx-auto">Powerful features designed specifically for homeopathic practitioners to streamline workflows and improve patient care.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, i) => {
                const Icon = feature.icon;
                return (
                  <div key={i} className="glass p-6 rounded-2xl hover:-translate-y-1 transition-transform duration-300">
                    <div className="w-12 h-12 bg-brand-500/10 rounded-xl flex items-center justify-center mb-4 border border-brand-500/20">
                      <Icon className="w-6 h-6 text-brand-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-sm text-slate-400 leading-relaxed">{feature.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="py-24 px-6 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Intelligent Workflow</h2>
              <p className="text-slate-400">From patient entry to prescription in 3 simple steps.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
              <div className="hidden md:block absolute top-1/2 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-brand-500/0 via-brand-500/50 to-brand-500/0 -translate-y-1/2 z-0"></div>
              
              {[
                { step: '01', title: 'Add Patient', desc: 'Quickly input patient details and medical history into the secure digital record.' },
                { step: '02', title: 'AI Analyzes Symptoms', desc: 'Our AI cross-references symptoms with vast homeopathic materia medica.' },
                { step: '03', title: 'Generate Prescription', desc: 'Review AI suggestions and generate a smart, formatted prescription instantly.' }
              ].map((item, i) => (
                <div key={i} className="relative z-10 glass p-8 rounded-3xl text-center">
                  <div className="w-16 h-16 bg-dark-900 border-2 border-brand-500 rounded-full flex items-center justify-center text-xl font-bold text-brand-400 mx-auto mb-6 shadow-[0_0_30px_rgba(45,212,191,0.2)]">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-slate-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing */}
        <section id="pricing" className="py-24 px-6 bg-dark-800/50 border-t border-slate-800">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Simple, transparent pricing</h2>
              <p className="text-slate-400">Choose the plan that best fits your clinic's needs.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {pricing.map((plan, i) => (
                <div key={i} className={`glass rounded-3xl p-8 relative ${plan.popular ? 'border-brand-500 shadow-2xl shadow-brand-500/10 scale-105 z-10' : ''}`}>
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}
                  <h3 className="text-xl font-semibold text-white mb-2">{plan.name}</h3>
                  <p className="text-slate-400 text-sm mb-6">{plan.desc}</p>
                  <div className="mb-8">
                    <span className="text-4xl font-bold text-white">{plan.price}</span>
                    {plan.price !== 'Custom' && <span className="text-slate-400">/month</span>}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, j) => (
                      <li key={j} className="flex items-center gap-3 text-slate-300">
                        <CheckCircle2 className="w-5 h-5 text-brand-400 shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full py-3 rounded-xl font-semibold transition-colors ${plan.popular ? 'bg-brand-500 hover:bg-brand-400 text-white' : 'bg-dark-900 border border-slate-700 hover:bg-slate-800 text-white'}`}>
                    {plan.price === 'Custom' ? 'Contact Sales' : 'Get Started'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-dark-900 pt-16 pb-8 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Activity className="w-6 h-6 text-brand-500" />
              <span className="text-xl font-bold text-white">CuraMind AI</span>
            </div>
            <p className="text-slate-400 max-w-sm">Empowering homeopathic practitioners with state-of-the-art AI technology to provide better, faster patient care.</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Security</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Changelog</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><a href="#" className="hover:text-brand-400 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-brand-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>© {new Date().getFullYear()} CuraMind AI. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            <a href="#" className="hover:text-white transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
