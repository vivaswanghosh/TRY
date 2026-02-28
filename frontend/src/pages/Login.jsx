import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Navigate } from 'react-router-dom';
import { isAuthConfigured } from '../auth/authConfig';

const Login = () => {
  const { isAuthenticated, loginWithRedirect } = useAuth0();

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-[calc(100vh-72px)] flex items-center justify-center p-6 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black relative overflow-hidden">
      {/* Abstract background shapes */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="w-full max-w-md animate-slide-up relative z-10">
        <div className="glass-panel p-10 rounded-3xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
          <div className="text-center mb-10">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/25 mx-auto mb-6 transform transition-transform hover:scale-110 duration-300">
              <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5" />
              </svg>
            </div>
            <h1 className="text-3xl font-extrabold text-white mb-3">Welcome to <span className="gradient-text block mt-1">Smart Academic</span></h1>
            <p className="text-slate-400 font-medium tracking-wide">Your intelligent campus gateway</p>
          </div>

          <div className="space-y-6">
            {!isAuthConfigured ? (
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-4 text-center">
                <p className="text-orange-400 text-sm font-medium">Auth0 is not fully configured.</p>
                <p className="text-slate-400 text-xs mt-1">Please check your configuration files.</p>
              </div>
            ) : (
              <button
                onClick={() => loginWithRedirect()}
                className="w-full py-3.5 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl font-bold tracking-wide shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0f172a]"
              >
                Sign In to Platform &rarr;
              </button>
            )}

            <div className="relative flex items-center justify-center my-6">
              <div className="border-t border-white/10 w-full"></div>
              <span className="bg-[#1e293b] px-4 text-xs font-semibold text-slate-500 uppercase tracking-widest absolute">Or</span>
            </div>

            <p className="text-center text-sm text-slate-400">
              Don't have an account? <button className="text-blue-400 font-medium hover:text-blue-300 hover:underline transition-all">Contact IT Support</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
