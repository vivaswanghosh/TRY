import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { isAuthConfigured } from '../auth/authConfig';
import api from '../services/api';
import { getDepartments } from '../services/userService';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();
  const [localAuth, setLocalAuth] = useState(!!localStorage.getItem('token'));

  const [activeTab, setActiveTab] = useState('Student'); // 'Student', 'Teacher', 'Admin'
  const [departments, setDepartments] = useState([]);

  // Form fields
  const [name, setName] = useState('');
  const [baseEmail, setBaseEmail] = useState(''); // not strictly needed, backend falls back, but good UX
  const [year, setYear] = useState('1st year');
  const [departmentId, setDepartmentId] = useState('');

  useEffect(() => {
    if (activeTab === 'Student') {
      getDepartments().then(res => {
        setDepartments(res.data);
        if (res.data.length > 0 && !departmentId) {
          setDepartmentId(res.data[0]._id);
        }
      }).catch(console.error);
    }
  }, [activeTab]);

  if (isAuthenticated || localAuth) {
    return <Navigate to="/" />;
  }

  const handleMockLogin = async (e) => {
    e.preventDefault();
    try {
      const payload = { role: activeTab };
      if (name) payload.name = name;
      if (baseEmail) payload.email = baseEmail;

      if (activeTab === 'Student') {
        payload.year = year;
        payload.departmentId = departmentId;
      }

      const res = await api.post('/users/mock-login', payload);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setLocalAuth(true);
      window.location.href = '/'; // force reload to update state
    } catch (err) {
      console.error('Mock login failed', err);
      alert('Login failed. Check console for details.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md animate-slide-up relative z-10">
        <div className="glass-panel p-8 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto mb-4 transform transition-transform hover:scale-110 duration-300">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-2">Login</h1>
            <p className="text-slate-400 font-medium tracking-wide">Smart Academic Gateway</p>
          </div>

          <div className="space-y-6">
            {!isAuthConfigured ? (
              <div className="space-y-4">

                {/* Role Tabs */}
                <div className="flex bg-slate-800/50 p-1 rounded-xl border border-white/5">
                  {['Student', 'Teacher', 'Admin'].map(role => (
                    <button
                      key={role}
                      onClick={() => setActiveTab(role)}
                      className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${activeTab === role
                          ? 'bg-blue-600 text-white shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-white/5'
                        }`}
                    >
                      {role}
                    </button>
                  ))}
                </div>

                <form onSubmit={handleMockLogin} className="space-y-4">
                  {/* Common Fields */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Full Name</label>
                    <input
                      type="text"
                      placeholder="e.g. John Doe"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {/* Student Specific Fields */}
                  {activeTab === 'Student' && (
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Year</label>
                        <select
                          value={year}
                          onChange={e => setYear(e.target.value)}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                        >
                          <option value="1st year">1st year</option>
                          <option value="2nd year">2nd year</option>
                          <option value="3rd year">3rd year</option>
                          <option value="4th year">4th year</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Department</label>
                        <select
                          value={departmentId}
                          onChange={e => setDepartmentId(e.target.value)}
                          className="w-full bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                          required
                        >
                          {departments.map(dept => (
                            <option key={dept._id} value={dept._id}>{dept.name}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full mt-4 py-3 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1"
                  >
                    Enter as {activeTab} &rarr;
                  </button>
                </form>
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all flex items-center justify-center gap-2"
              >
                Sign In to Platform &rarr;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
