import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { isAuthConfigured } from '../auth/authConfig';

const Navbar = () => {
  const { isAuthenticated, loginWithRedirect, logout, user } = useAuth0();

  return (
    <nav className="h-[72px] sticky top-0 z-50 glass-panel border-b border-white/10 px-6 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-3 animate-fade-in">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
          <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0v6m0-6l-9-5m9 5l9-5" />
          </svg>
        </div>
        <h1 className="text-xl font-bold tracking-tight gradient-text">Smart Academic</h1>
      </div>

      <div className="flex items-center gap-6">
        {isAuthConfigured && isAuthenticated && user && (
          <div className="hidden md:flex items-center gap-3 bg-white/5 rounded-full px-4 py-1.5 border border-white/5 animate-fade-in">
            <img src={user.picture} alt="Avatar" className="w-8 h-8 rounded-full border-2 border-primary/50" />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-slate-200 leading-tight">{user.name}</span>
              <span className="text-xs text-slate-400 leading-tight">{user.email}</span>
            </div>
          </div>
        )}

        {isAuthConfigured && (
          isAuthenticated ? (
            <button
              onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
              className="px-5 py-2 rounded-xl text-sm font-medium text-slate-300 bg-white/5 hover:bg-white/10 hover:text-white border border-white/10 transition-all duration-200"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => loginWithRedirect()}
              className="px-5 py-2 rounded-xl text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-500/25 transition-all duration-200 transform hover:-translate-y-0.5"
            >
              Login / Register
            </button>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
