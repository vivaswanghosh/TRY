import React, { useEffect, useState } from 'react';
import { getHealth } from '../services/healthService';
import { useAuth0 } from '@auth0/auth0-react';

const Dashboard = () => {
  const { user } = useAuth0();
  const [status, setStatus] = useState('loading');

  useEffect(() => {
    getHealth()
      .then(res => setStatus(res.data.ok ? 'Operational' : 'Error'))
      .catch(() => setStatus('Offline'));
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {user?.given_name || 'Student'}! 👋</h1>
        <p className="text-slate-400">Here's what's happening in your academic world today.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Metric Cards */}
        {[
          { label: 'Upcoming Deadlines', value: '3', color: 'from-orange-500 to-red-500', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
          { label: 'Unread Notifications', value: '12', color: 'from-blue-500 to-indigo-500', icon: 'M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9' },
          { label: 'Books Borrowed', value: '5', color: 'from-emerald-500 to-teal-500', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253' },
          { label: 'System Status', value: status, color: status === 'Operational' ? 'from-green-500 to-emerald-500' : 'from-gray-500 to-slate-500', icon: 'M5 13l4 4L19 7' }
        ].map((metric, i) => (
          <div key={i} className="glass-panel p-6 rounded-2xl flex items-center gap-5 transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20">
            <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br ${metric.color} shadow-lg`}>
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={metric.icon} />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400 mb-1">{metric.label}</p>
              <p className="text-2xl font-bold text-white">{metric.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Today's Schedule</h2>
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="flex gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                <div className="w-16 flex flex-col justify-center items-center font-medium text-slate-300 border-r border-white/10 pr-4">
                  <span>0{i + 8}:00</span>
                  <span className="text-xs text-slate-500">AM</span>
                </div>
                <div>
                  <h3 className="text-white font-medium">Advanced Algorithms</h3>
                  <p className="text-sm text-slate-400 mt-1">Room 40{i} • Prof. Smith</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 border-b border-white/10 pb-4">Recent Activity</h2>
          <div className="space-y-5">
            {[
              { title: 'Assignment Graded', desc: 'Data Structures HW3 - 95/100', time: '2h ago', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-green-400' },
              { title: 'New Book Added', desc: 'Introduction to Computation', time: '5h ago', icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253', color: 'text-blue-400' },
              { title: 'Class Cancelled', desc: 'Physics 101 moved to tomorrow', time: '1d ago', icon: 'M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z', color: 'text-red-400' },
            ].map((act, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="mt-1">
                  <svg className={`w-5 h-5 ${act.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={act.icon} />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="text-slate-200 text-sm font-medium">{act.title}</h4>
                  <p className="text-slate-400 text-sm mt-0.5">{act.desc}</p>
                </div>
                <span className="text-xs font-medium text-slate-500">{act.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
