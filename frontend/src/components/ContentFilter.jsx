import React, { useState, useEffect } from 'react';
import { getDepartments } from '../services/departmentService';

const ContentFilter = ({ onFilterChange }) => {
    const [departments, setDepartments] = useState([]);
    const [selectedDepartment, setSelectedDepartment] = useState('');
    const [selectedYear, setSelectedYear] = useState('All');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const { data } = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error('Failed to fetch departments for filter', error);
            // hardcode Fallback if no backend connection
            setDepartments([{ _id: 'cse_fallback', name: 'CSE' }, { _id: 'ece_fallback', name: 'ECE' }]);
        }
    };

    const handleApply = () => {
        onFilterChange({
            department: selectedDepartment || undefined,
            year: selectedYear !== 'All' ? selectedYear : undefined
        });
    };

    const handleClear = () => {
        setSelectedDepartment('');
        setSelectedYear('All');
        onFilterChange({});
    };

    return (
        <div className="bg-slate-800/50 border border-white/10 rounded-2xl p-4 flex flex-col md:flex-row items-end md:items-center gap-4 mb-6">
            <div className="flex-1 w-full flex flex-col sm:flex-row gap-4">
                <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Department Limit</label>
                    <select
                        value={selectedDepartment}
                        onChange={e => setSelectedDepartment(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                        <option value="">All Departments</option>
                        {departments?.length > 0 ? departments.map(dept => (
                            <option key={dept._id} value={dept._id}>{dept.name}</option>
                        )) : (
                            // Hardcoded mapping default fallbacks
                            <>
                                <option value="cse">CSE</option>
                                <option value="ece">ECE</option>
                            </>
                        )}
                    </select>
                </div>
                <div className="flex-1">
                    <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Year Limit</label>
                    <select
                        value={selectedYear}
                        onChange={e => setSelectedYear(e.target.value)}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-blue-500 transition-colors appearance-none"
                    >
                        <option value="All">All Years</option>
                        <option value="1st year">1st year</option>
                        <option value="2nd year">2nd year</option>
                        <option value="3rd year">3rd year</option>
                        <option value="4th year">4th year</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto mt-4 md:mt-0 pt-6">
                <button
                    onClick={handleClear}
                    className="flex-1 md:flex-none px-4 py-2.5 text-sm bg-slate-700 hover:bg-slate-600 text-white rounded-xl transition-all font-medium"
                >
                    Clear
                </button>
                <button
                    onClick={handleApply}
                    className="flex-1 md:flex-none px-6 py-2.5 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 transition-all font-medium"
                >
                    Apply Filter
                </button>
            </div>
        </div>
    );
};

export default ContentFilter;
