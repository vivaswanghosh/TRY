import React, { useState, useEffect } from 'react';
import { getNotifications } from '../services/notificationService';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const { data } = await getNotifications();
      // using dummy data if empty to show the UI
      setNotifications(data.length ? data : dummyNotifications);
    } catch (error) {
      console.error('Failed to fetch notifications', error);
      setNotifications(dummyNotifications);
    } finally {
      setLoading(false);
    }
  };

  const dummyNotifications = [
    { _id: 1, message: 'Your assignment "Data Structures HW" was graded.', read: false, createdAt: new Date(Date.now() - 3600000).toISOString(), type: 'grade' },
    { _id: 2, message: 'Class cancelled Tomorrow 10:00 AM (Physics).', read: false, createdAt: new Date(Date.now() - 86400000).toISOString(), type: 'alert' },
    { _id: 3, message: 'New book "Advanced Algorithms" added to E-Library.', read: true, createdAt: new Date(Date.now() - 172800000).toISOString(), type: 'info' },
    { _id: 4, message: 'System maintenance scheduled for weekend.', read: true, createdAt: new Date(Date.now() - 259200000).toISOString(), type: 'system' }
  ];

  const getIconForType = (type) => {
    switch (type) {
      case 'grade': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />;
      case 'alert': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />;
      case 'info': return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />;
      default: return <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />;
    }
  };

  const getColorForType = (type) => {
    switch (type) {
      case 'grade': return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20';
      case 'alert': return 'text-red-400 bg-red-400/10 border-red-400/20';
      case 'info': return 'text-blue-400 bg-blue-400/10 border-blue-400/20';
      default: return 'text-slate-400 bg-slate-400/10 border-slate-400/20';
    }
  };

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Notifications <span className="ml-2 inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-600 text-sm font-medium text-white shadow-lg shadow-blue-500/30">2</span></h1>
          <p className="text-slate-400">Activity alerts, messages, and system updates.</p>
        </div>
        <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">Mark all as read</button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="text-center text-slate-400 py-12">Loading notifications...</div>
        ) : (
          notifications.map(note => (
            <div key={note._id} className={`glass-panel p-5 rounded-2xl flex items-start gap-5 transition-all duration-300 border ${note.read ? 'border-white/5 opacity-70' : 'border-blue-500/30 shadow-lg shadow-blue-500/5'}`}>
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center border flex-shrink-0 ${getColorForType(note.type || 'info')}`}>
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {getIconForType(note.type || 'info')}
                </svg>
              </div>
              <div className="flex-1 mt-1">
                <div className="flex justify-between items-start mb-1">
                  <p className={`text-base ${note.read ? 'text-slate-300' : 'text-white font-medium'}`}>{note.message}</p>
                  <span className="text-xs font-medium text-slate-500 whitespace-nowrap ml-4">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                {!note.read && <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">New</span>}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;
