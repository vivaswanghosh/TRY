import React, { useState, useEffect } from 'react';
import { getRoutine } from '../services/routineService';
import { getSwapRequests, createSwapRequest } from '../services/swapService';

const Routine = () => {
  const [routine, setRoutine] = useState(null);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [rtnRes, swapRes] = await Promise.all([
        getRoutine('Fall 2023'),
        getSwapRequests()
      ]);
      setRoutine(rtnRes.data);
      setSwaps(swapRes.data);
    } catch (error) {
      console.error('Failed fetching routine data', error);
    } finally {
      setLoading(false);
    }
  };

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeslots = ['09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM'];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Class Routine & Swaps</h1>
          <p className="text-slate-400">View semester schedule and manage teacher swap interactions.</p>
        </div>
        <div className="flex bg-white/5 rounded-xl border border-white/10 p-1">
          <button className="px-4 py-1.5 rounded-lg text-sm font-medium bg-blue-600/20 text-blue-400 border border-blue-500/20 flex-1 text-center shadow-inner">Weekly Timetable</button>
          <button className="px-4 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white flex-1 text-center transition-colors">Swap Requests</button>
        </div>
      </div>

      <div className="glass-panel rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left whitespace-nowrap">
            <thead>
              <tr className="bg-white/[0.02] border-b border-white/10">
                <th className="px-6 py-4 text-slate-400 font-semibold text-sm tracking-wider uppercase">Time</th>
                {days.map(day => (
                  <th key={day} className="px-6 py-4 text-slate-300 font-semibold text-sm tracking-wider uppercase text-center">{day}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {timeslots.map((time, idx) => (
                <tr key={time} className="hover:bg-white/[0.02] transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-slate-400 border-r border-white/5">{time}</td>
                  {days.map((day, dIdx) => {
                    // Mock logic for presentation
                    const isBreak = time === '01:00 PM';
                    const hasClass = !isBreak && (Math.random() > 0.3);
                    const isCancelled = hasClass && Math.random() > 0.9;

                    return (
                      <td key={`${day}-${time}`} className="px-2 py-2 text-center border-r border-white/5 last:border-0 relative group">
                        {isBreak ? (
                          <div className="mx-2 py-3 bg-white/5 rounded-lg text-slate-500 text-xs tracking-widest uppercase font-bold">Lunch Break</div>
                        ) : hasClass ? (
                          <div className={`mx-1 p-3 rounded-xl border flex flex-col justify-center items-center h-full min-h-[80px] transition-all
                            ${isCancelled
                              ? 'bg-red-500/10 border-red-500/20 text-red-400'
                              : 'bg-indigo-500/10 border-indigo-500/20 hover:border-indigo-400 hover:shadow-[0_0_15px_rgba(99,102,241,0.2)]'
                            }
                          `}>
                            <span className="font-semibold text-sm mb-1 text-white">{isCancelled ? 'Cancelled' : `CSE-${100 + idx}${dIdx}`}</span>
                            <span className="text-xs opacity-80">Room {300 + idx}</span>

                            <div className="absolute inset-0 bg-black/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 m-1">
                              <button className="bg-blue-600 hover:bg-blue-500 text-white text-xs px-3 py-1.5 rounded disabled:opacity-50">Swap</button>
                            </div>
                          </div>
                        ) : (
                          <div className="mx-1 h-full min-h-[80px] bg-white/[0.02] rounded-xl border border-dashed border-white/10 flex items-center justify-center text-slate-600 text-xs">
                            Free
                          </div>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Swap Requests Summary View */}
      <h2 className="text-xl font-semibold text-white mt-8 mb-4">Pending Swap Requests</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[1, 2].map(i => (
          <div key={i} className="glass-panel p-5 rounded-2xl border border-orange-500/20 flex justify-between items-center group hover:border-orange-500/40 transition-colors">
            <div className="flex gap-4 items-center">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-0.5">
                <div className="w-full h-full rounded-full bg-[#1e293b] flex items-center justify-center border-2 border-transparent">
                  <span className="text-orange-400 font-bold">JD</span>
                </div>
              </div>
              <div>
                <p className="text-white font-medium">Prof. John Doe requested a swap</p>
                <p className="text-sm text-slate-400 mt-0.5">Tuesday, 10:00 AM (CSE-204)</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Accept</button>
              <button className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Decline</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Routine;
