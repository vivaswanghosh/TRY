import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getQuiz, startQuizAttempt, submitQuizAttempt, autoSubmitQuizAttempt } from '../services/quizService';

const TakeQuiz = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quiz, setQuiz] = useState(null);
    const [attemptId, setAttemptId] = useState(null);
    const [answers, setAnswers] = useState([]);
    const [status, setStatus] = useState('loading'); // loading, starting, taking, submitted, auto-submitted
    const [error, setError] = useState(null);
    const isSubmittingRef = useRef(false);

    useEffect(() => {
        fetchQuizInfo();
    }, [id]);

    useEffect(() => {
        // Add anti-cheat listeners when the test starts
        if (status === 'taking') {
            const handleVisibilityChange = () => {
                if (document.hidden && !isSubmittingRef.current) {
                    handleAutoSubmit('You switched tabs! The test has been automatically submitted and flagged.');
                }
            };

            const handleWindowBlur = () => {
                if (!isSubmittingRef.current) {
                    handleAutoSubmit('You lost focus of the window! The test has been automatically submitted and flagged.');
                }
            };

            document.addEventListener('visibilitychange', handleVisibilityChange);
            window.addEventListener('blur', handleWindowBlur);

            return () => {
                document.removeEventListener('visibilitychange', handleVisibilityChange);
                window.removeEventListener('blur', handleWindowBlur);
            };
        }
    }, [status, attemptId]);

    const fetchQuizInfo = async () => {
        try {
            const { data } = await getQuiz(id);
            setQuiz(data);
            setStatus('starting');
        } catch (err) {
            setError('Failed to load quiz');
            setStatus('error');
        }
    };

    const handleStart = async () => {
        try {
            const { data } = await startQuizAttempt(id);
            setAttemptId(data._id);
            setStatus('taking');
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to start quiz');
            setStatus('error');
        }
    };

    const handleAutoSubmit = async (reasonMsg) => {
        isSubmittingRef.current = true;
        try {
            await autoSubmitQuizAttempt(attemptId, { answers });
            setStatus('auto-submitted');
            alert(reasonMsg);
        } catch (err) {
            console.error('Auto-submit failed', err);
            // Still set status to stop the test locally
            setStatus('auto-submitted');
            alert(reasonMsg);
        }
    };

    const handleNormalSubmit = async () => {
        if (!window.confirm('Are you sure you want to submit?')) return;
        isSubmittingRef.current = true;
        try {
            await submitQuizAttempt(attemptId, { answers });
            setStatus('submitted');
            alert('Quiz submitted successfully!');
        } catch (err) {
            console.error('Submit failed', err);
            alert('Failed to submit quiz.');
            isSubmittingRef.current = false;
        }
    };

    const handleOptionSelect = (questionId, option) => {
        setAnswers(prev => {
            const existing = prev.find(a => a.questionId === questionId);
            if (existing) {
                return prev.map(a => a.questionId === questionId ? { ...a, selectedOption: option } : a);
            }
            return [...prev, { questionId, selectedOption: option }];
        });
    };

    if (status === 'loading') return <div className="text-white">Loading...</div>;
    if (status === 'error') return <div className="text-red-400">{error}</div>;

    if (status === 'starting') {
        return (
            <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto mt-10 text-center animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-4">{quiz.title}</h1>
                <p className="text-slate-400 mb-6">{quiz.description}</p>
                <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-xl mb-6 text-left">
                    <h3 className="text-red-400 font-bold mb-2">⚠️ Anti-Cheat Active</h3>
                    <p className="text-sm text-red-300">
                        Do not switch tabs, minimize the window, or click outside the browser once the test starts.
                        Doing so will immediately auto-submit your test and flag your attempt.
                    </p>
                </div>
                <button onClick={handleStart} className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-medium shadow-lg shadow-blue-500/20 transition-all">
                    Start Test Now
                </button>
            </div>
        );
    }

    if (status === 'submitted' || status === 'auto-submitted') {
        return (
            <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto mt-10 text-center animate-fade-in">
                <h1 className="text-3xl font-bold text-white mb-4">Test {status === 'auto-submitted' ? 'Auto-Submitted' : 'Submitted'}</h1>
                {status === 'auto-submitted' && (
                    <p className="text-red-400 font-medium mb-4">Your test was flagged for suspicious activity (tab switching/blur).</p>
                )}
                <button onClick={() => navigate('/quizzes')} className="mt-4 px-6 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all">
                    Return to Quizzes
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
            <div className="flex justify-between items-center glass-panel p-4 rounded-xl sticky top-4 z-10 shadow-xl">
                <h1 className="text-xl font-bold text-white">{quiz.title}</h1>
                <button onClick={handleNormalSubmit} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl shadow-lg shadow-blue-500/20 transition-all">
                    Submit Test
                </button>
            </div>

            <div className="space-y-6">
                {quiz.questions?.map((q, idx) => {
                    const selected = answers.find(a => a.questionId === q._id)?.selectedOption;
                    return (
                        <div key={q._id} className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-lg font-medium text-white mb-4">{idx + 1}. {q.questionText}</h3>
                            <div className="space-y-3">
                                {q.options?.map(opt => (
                                    <label key={opt} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all ${selected === opt ? 'bg-blue-600/20 border-blue-500/50' : 'bg-white/5 border-white/10 hover:bg-white/10'}`}>
                                        <input
                                            type="radio"
                                            name={`question-${q._id}`}
                                            value={opt}
                                            checked={selected === opt}
                                            onChange={() => handleOptionSelect(q._id, opt)}
                                            className="hidden"
                                        />
                                        <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${selected === opt ? 'border-blue-400' : 'border-slate-500'}`}>
                                            {selected === opt && <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />}
                                        </div>
                                        <span className="text-slate-200">{opt}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default TakeQuiz;
