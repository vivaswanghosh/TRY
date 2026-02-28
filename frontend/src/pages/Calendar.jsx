import React, { useState, useEffect } from 'react';
import { getCalendar, updateCalendar } from '../services/calendarService';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const { data } = await getCalendar();
      setEvents(data);
    } catch (error) {
      console.error('Failed to fetch calendar', error);
    } finally {
      setLoading(false);
    }
  };

  const currentMonthDays = new Array(30).fill(null).map((_, i) => i + 1);
  const startDayOffset = 3; // Mocking starting day of week for the grid

  const getEventForDay = (day) => {
    // Basic mock mapping for UI presentation
    return events.find(e => new Date(e.date).getDate() === day);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Smart Calendar</h1>
          <p className="text-slate-400">Track exams, holidays, and important academic dates.</p>
        </div>
        <button className="bg-white/5 border border-white/10 hover:bg-white/10 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          Add Event
        </button>
      </div>

      <div className="glass-panel p-6 rounded-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">November 2023</h2>
          <div className="flex gap-2">
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-4 mb-4">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
            <div key={day} className="text-center text-sm font-semibold text-slate-400 uppercase tracking-wider">{day}</div>
          ))}
        </div>

        {loading ? (
          <div className="py-20 text-center text-slate-400">Loading calendar events...</div>
        ) : (
          <div className="grid grid-cols-7 gap-2 lg:gap-4">
            {new Array(startDayOffset).fill(null).map((_, i) => (
              <div key={`empty-${i}`} className="h-24 rounded-xl bg-transparent border border-transparent"></div>
            ))}
            {currentMonthDays.map(day => {
              const event = getEventForDay(day);
              return (
                <div key={day} className={`h-24 md:h-32 rounded-xl p-2 md:p-3 flex flex-col transition-all border ${event ? 'bg-indigo-500/10 border-indigo-500/30 hover:border-indigo-400' : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'}`}>
                  <span className={`text-sm font-medium ${event ? 'text-indigo-400' : 'text-slate-400'} mb-1`}>{day}</span>
                  {event && (
                    <div className="mt-1 flex-1 overflow-hidden">
                      <div className={`text-xs px-2 py-1 rounded w-full truncate ${event.type === 'Exam' ? 'bg-red-500/20 text-red-300 border border-red-500/30' :
                          event.type === 'Holiday' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                            'bg-blue-500/20 text-blue-300 border border-blue-500/30'
                        }`}>
                        {event.description || event.type}
                      </div>
                    </div>
                  )}
                  {!event && Math.random() > 0.8 && (
                    <div className="mt-1 flex-1 overflow-hidden opacity-50">
                      <div className="text-[10px] text-slate-500 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-500"></div> Regular Classes
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        {[
          { color: 'bg-red-500/20 text-red-400 border-red-500/30', label: 'Examinations' },
          { color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30', label: 'Holidays' },
          { color: 'bg-blue-500/20 text-blue-400 border-blue-500/30', label: 'Student Leaves' },
        ].map((legend, i) => (
          <div key={i} className="glass-panel p-4 rounded-xl flex items-center gap-3">
            <div className={`w-4 h-4 rounded border ${legend.color}`}></div>
            <span className="text-slate-300 font-medium text-sm">{legend.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
