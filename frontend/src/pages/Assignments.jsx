import React, { useState, useEffect } from 'react';
import { getAssignments, submitAssignment } from '../services/assignmentService';
import { useAuth0 } from '@auth0/auth0-react';

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth0();

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const { data } = await getAssignments();
      setAssignments(data);
    } catch (error) {
      console.error('Failed to fetch assignments', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (assignmentId, file) => {
    if (!file) return;
    const formData = new FormData();
    formData.append('assignmentId', assignmentId);
    formData.append('file', file);
    try {
      await submitAssignment(formData);
      alert('Assignment submitted successfully!');
    } catch (error) {
      alert('Failed to submit assignment');
    }
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Assignments</h1>
          <p className="text-slate-400">Manage and submit your course work.</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          New Assignment
        </button>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading assignments...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {assignments.length > 0 ? assignments.map(a => (
            <div key={a._id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{a.title}</h2>
                  <span className="px-3 py-1 bg-red-500/10 text-red-400 text-xs font-medium rounded-full border border-red-500/20">
                    Due: {new Date(a.deadline).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-slate-400 text-sm mb-6">{a.description}</p>
              </div>

              <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                <label className="cursor-pointer bg-white/5 hover:bg-white/10 text-slate-300 text-sm font-medium px-4 py-2 rounded-xl border border-white/10 transition-all">
                  <span>Upload Work</span>
                  <input type="file" className="hidden" onChange={(e) => handleFileUpload(a._id, e.target.files[0])} />
                </label>
                <button className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                  View Details &rarr;
                </button>
              </div>
            </div>
          )) : (
            <div className="col-span-full glass-panel p-12 flex flex-col items-center justify-center text-center rounded-2xl border-dashed border-2 border-slate-700">
              <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 className="text-lg font-medium text-white mb-1">No Active Assignments</h3>
              <p className="text-slate-400 text-sm">You're all caught up for now!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Assignments;
