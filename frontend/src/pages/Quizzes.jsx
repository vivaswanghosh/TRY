import React, { useState, useEffect } from 'react';
import { getQuizzes } from '../services/quizService';
import { Link } from 'react-router-dom';
import ContentFilter from '../components/ContentFilter';

const Quizzes = () => {
    const [quizzes, setQuizzes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchQuizzes();
    }, []);

    const fetchQuizzes = async (filters = {}) => {
        setLoading(true);
        try {
            const { data } = await getQuizzes(filters);
            setQuizzes(data);
        } catch (error) {
            console.error('Failed to fetch quizzes', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="animate-fade-in space-y-6">
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Quizzes & Tests</h1>
                    <p className="text-slate-400">Take tests or manage your created quizzes.</p>
                </div>
                <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                    Create Quiz
                </button>
            </div>

            <ContentFilter onFilterChange={fetchQuizzes} />

            {loading ? (
                <div className="text-center text-slate-400 py-12">Loading quizzes...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {quizzes.length > 0 ? quizzes.map(q => (
                        <div key={q._id} className="glass-panel p-6 rounded-2xl flex flex-col justify-between group hover:border-blue-500/50 transition-colors">
                            <div>
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-xl font-semibold text-white group-hover:text-blue-400 transition-colors">{q.title}</h2>
                                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-medium rounded-full border border-blue-500/20">
                                        {q.durationMinutes} mins
                                    </span>
                                </div>
                                <p className="text-slate-400 text-sm mb-6">{q.description || 'No description provided.'}</p>
                            </div>

                            <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                                <Link to={`/quizzes/${q._id}/take`} className="bg-green-600/20 hover:bg-green-600/30 text-green-400 text-sm font-medium px-4 py-2 rounded-xl border border-green-500/20 transition-all">
                                    Take Test
                                </Link>
                                <Link to={`/quizzes/${q._id}/results`} className="text-blue-400 text-sm font-medium hover:text-blue-300 transition-colors">
                                    View Results &rarr;
                                </Link>
                            </div>
                        </div>
                    )) : (
                        <div className="col-span-full glass-panel p-12 flex flex-col items-center justify-center text-center rounded-2xl border-dashed border-2 border-slate-700">
                            <h3 className="text-lg font-medium text-white mb-1">No Active Quizzes</h3>
                            <p className="text-slate-400 text-sm">Check back later for upcoming tests.</p>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quizzes;
