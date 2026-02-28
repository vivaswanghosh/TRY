import React from 'react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', icon: 'home', label: 'Dashboard' },
  { path: '/assignments', icon: 'document-text', label: 'Assignments' },
  { path: '/elibrary', icon: 'book-open', label: 'E-Library' },
  { path: '/routine', icon: 'table', label: 'Routine & Swaps' },
  { path: '/calendar', icon: 'calendar', label: 'Calendar' },
  { path: '/notifications', icon: 'bell', label: 'Notifications' },
];

const getIcon = (name) => {
  switch (name) {
    case 'home': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />;
    case 'document-text': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />;
    case 'book-open': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />;
    case 'table': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />;
    case 'calendar': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />;
    case 'bell': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />;
    default: return null;
  }
};

const Sidebar = () => {
  return (
    <aside className="w-64 glass-panel border-r border-white/5 flex-shrink-0 animate-slide-up">
      <div className="p-4 h-full overflow-y-auto">
        <ul className="space-y-2 mt-4">
          {navItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${isActive
                    ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-inner'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-white/5'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <svg
                      className={`w-5 h-5 transition-transform duration-300 group-hover:scale-110 ${isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300'
                        }`}
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      {getIcon(item.icon)}
                    </svg>
                    <span className="font-medium text-sm">{item.label}</span>
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
