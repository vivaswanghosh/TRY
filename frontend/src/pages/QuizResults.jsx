import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getQuizAttempts, resetQuizAttempt, getQuiz } from '../services/quizService';

const QuizResults = () => {
    const { id } = useParams();
    const [attempts, setAttempts] = useState([]);
    const [quiz, setQuiz] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchData();
    }, [id]);

    const fetchData = async () => {
        try {
            const qRes = await getQuiz(id);
            setQuiz(qRes.data);
            const aRes = await getQuizAttempts(id);
            setAttempts(aRes.data);
        } catch (error) {
            console.error('Failed to fetch stats', error);
        } finally {
            setLoading(false);
        }
    };

    const handleReset = async (attemptId) => {
        if (!window.confirm('Are you sure you want to reset this attempt? The student will be able to retake the test.')) return;
        try {
            await resetQuizAttempt(attemptId);
            alert('Attempt reset successfully');
            fetchData(); // refresh list
        } catch (error) {
            alert('Failed to reset attempt');
        }
    };

    if (loading) return <div className="text-slate-400 p-8 text-center">Loading results...</div>;

    return (
        <div className="animate-fade-in space-y-6">
            <div className="mb-6 flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Results: {quiz?.title}</h1>
                    <Link to="/quizzes" className="text-blue-400 hover:text-blue-300 transition-colors text-sm">
                        &larr; Back to Quizzes
                    </Link>
                </div>
            </div>

            <div className="glass-panel overflow-hidden rounded-2xl">
                <table className="w-full text-left border-collapse cursor-default">
                    <thead>
                        <tr className="border-b border-white/5 bg-white/5 hidden sm:table-row">
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Student</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Score</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Status</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">Flagged</th>
                            <th className="p-4 text-xs font-semibold text-slate-400 uppercase tracking-wider text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                        {attempts.map(attempt => (
                            <tr key={attempt._id} className="hover:bg-white/5 transition-colors flex flex-col sm:table-row">
                                <td className="p-4">
                                    <div className="font-medium text-white">{attempt.student?.name || 'Unknown User'}</div>
                                    <div className="text-xs text-slate-500">{attempt.student?.email}</div>
                                </td>
                                <td className="p-4 font-medium text-slate-300">
                                    {attempt.score}
                                </td>
                                <td className="p-4">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${attempt.status === 'submitted' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                                            attempt.status === 'auto-submitted' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                                'bg-blue-500/10 text-blue-400 border-blue-500/20'
                                        }`}>
                                        {attempt.status}
                                    </span>
                                </td>
                                <td className="p-4">
                                    {attempt.isFlagged ? (
                                        <div className="text-red-400 flex flex-col">
                                            <span className="font-bold">⚠️ Yes</span>
                                            <span className="text-xs text-red-500/70">{new Date(attempt.flaggedAt).toLocaleTimeString()}</span>
                                        </div>
                                    ) : (
                                        <span className="text-slate-500">No</span>
                                    )}
                                </td>
                                <td className="p-4 text-right">
                                    <button
                                        onClick={() => handleReset(attempt._id)}
                                        className="text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg text-white transition-all shadow-md"
                                    >
                                        Reset Score
                                    </button>
                                </td>
                            </tr>
                        ))}
                        {attempts.length === 0 && (
                            <tr>
                                <td colSpan="5" className="p-8 text-center text-slate-500">No attempts yet.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default QuizResults;
