import React, { useState, useEffect } from 'react';
import { getRoutine } from '../services/routineService';
import { getSwapRequests, respondSwapRequest } from '../services/swapService';
import ContentFilter from '../components/ContentFilter';

const Routine = () => {
  const [routine, setRoutine] = useState(null);
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('timetable');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (filters = {}) => {
    setLoading(true);
    try {
      const [rtnRes, swapRes] = await Promise.all([
        getRoutine('Fall 2023', filters.department, filters.year),
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

  const handleSwapRespond = async (id, status) => {
    try {
      await respondSwapRequest(id, { status });
      fetchData(); // refresh the data after a response
      alert(`Swap request ${status.toLowerCase()}`);
    } catch (err) {
      console.error(err);
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
          <button
            onClick={() => setActiveTab('timetable')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium flex-1 text-center transition-all ${activeTab === 'timetable'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-inner'
                : 'text-slate-400 hover:text-white border border-transparent'
              }`}
          >
            Weekly Timetable
          </button>
          <button
            onClick={() => setActiveTab('swaps')}
            className={`px-4 py-1.5 rounded-lg text-sm font-medium flex-1 text-center transition-all ${activeTab === 'swaps'
                ? 'bg-blue-600/20 text-blue-400 border border-blue-500/20 shadow-inner'
                : 'text-slate-400 hover:text-white border border-transparent'
              }`}
          >
            Swap Requests
          </button>
        </div>
      </div>

      <ContentFilter onFilterChange={fetchData} />

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading routine data...</div>
      ) : activeTab === 'timetable' ? (
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
                    {days.map((day) => {
                      // Real app implementation would map through `routine.entries`
                      if (!routine) {
                        return (
                          <td key={`${day}-${time}`} className="px-2 py-2 text-center border-r border-white/5 last:border-0 relative">
                            <div className="mx-1 h-full min-h-[80px] bg-white/[0.02] rounded-xl border border-dashed border-white/10 flex items-center justify-center text-slate-600 text-xs">
                              No Routine
                            </div>
                          </td>
                        );
                      }

                      // Preserving the layout provided in the initial design template
                      const isBreak = time === '01:00 PM';
                      const hasClass = routine?.entries?.length > 0 && !isBreak && (Math.random() > 0.5);
                      const isCancelled = hasClass && Math.random() > 0.8;

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
                              <span className="font-semibold text-sm mb-1 text-white">{isCancelled ? 'Cancelled' : `Class`}</span>
                              <span className="text-xs opacity-80">Room TBA</span>

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
      ) : (
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Pending Swap Requests</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {swaps.length > 0 ? swaps.map((swap) => (
              <div key={swap._id} className="glass-panel p-5 rounded-2xl border border-orange-500/20 flex justify-between items-center group hover:border-orange-500/40 transition-colors">
                <div className="flex gap-4 items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 p-0.5">
                    <div className="w-full h-full rounded-full bg-[#1e293b] flex items-center justify-center border-2 border-transparent">
                      <span className="text-orange-400 font-bold">{swap.fromTeacher?.name?.[0] || 'T'}</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-white font-medium">{swap.fromTeacher?.name || 'Unknown Teacher'} requested a swap</p>
                    <p className="text-sm text-slate-400 mt-0.5">{new Date(swap.date).toLocaleDateString()}</p>
                    <p className="text-xs text-orange-400 mt-1 font-semibold">{swap.status}</p>
                  </div>
                </div>
                {swap.status === 'Pending' && (
                  <div className="flex gap-2">
                    <button onClick={() => handleSwapRespond(swap._id, 'Accepted')} className="text-emerald-400 bg-emerald-400/10 hover:bg-emerald-400/20 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Accept</button>
                    <button onClick={() => handleSwapRespond(swap._id, 'Rejected')} className="text-slate-400 hover:text-white px-3 py-1.5 rounded-lg text-sm font-medium transition-colors">Decline</button>
                  </div>
                )}
              </div>
            )) : (
              <div className="col-span-full glass-panel p-12 flex flex-col items-center justify-center text-center rounded-2xl border-dashed border-2 border-slate-700">
                <h3 className="text-lg font-medium text-white mb-1">No Swap Requests</h3>
                <p className="text-slate-400 text-sm">You have no pending swap requests at this time.</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Routine;
