import React, { useState, useEffect } from 'react';
import { getDepartments, createDepartment, deleteDepartment } from '../services/departmentService';

const Departments = () => {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newDept, setNewDept] = useState('');

    useEffect(() => {
        fetchDepartments();
    }, []);

    const fetchDepartments = async () => {
        try {
            const { data } = await getDepartments();
            setDepartments(data);
        } catch (error) {
            console.error('Failed to fetch departments', error);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (e) => {
        e.preventDefault();
        if (!newDept.trim()) return;
        try {
            await createDepartment({ name: newDept });
            setNewDept('');
            fetchDepartments();
        } catch (error) {
            alert(error.response?.data?.error || 'Failed to add department');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this department?')) return;
        try {
            await deleteDepartment(id);
            fetchDepartments();
        } catch (error) {
            alert('Failed to delete department');
        }
    };

    return (
        <div className="animate-fade-in space-y-6 max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Departments Management</h1>
                    <p className="text-slate-400">Add or remove departments for students.</p>
                </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl">
                <form onSubmit={handleAdd} className="flex gap-4 mb-8">
                    <input
                        type="text"
                        value={newDept}
                        onChange={(e) => setNewDept(e.target.value)}
                        placeholder="New Department Name (e.g. MECH)"
                        className="flex-1 bg-slate-800/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <button type="submit" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-xl shadow-lg shadow-blue-500/20 transition-all font-medium whitespace-nowrap">
                        Add Department
                    </button>
                </form>

                {loading ? (
                    <div className="text-center text-slate-400 py-8">Loading departments...</div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {departments.map(dept => (
                            <div key={dept._id} className="bg-white/5 border border-white/10 p-4 rounded-xl flex justify-between items-center group hover:bg-white/10 transition-colors">
                                <span className="font-semibold text-slate-200">{dept.name}</span>
                                <button
                                    onClick={() => handleDelete(dept._id)}
                                    className="text-slate-500 hover:text-red-400 bg-black/20 hover:bg-red-500/10 p-2 rounded-lg transition-all"
                                    title="Delete Department"
                                >
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                        {departments.length === 0 && (
                            <div className="col-span-full text-center text-slate-500 py-8">No departments found. Add one above.</div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Departments;
