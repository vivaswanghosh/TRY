import React, { useState, useEffect, useRef } from 'react';
import { getBooks, uploadBook } from '../services/libraryService';

const ELibrary = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const { data } = await getBooks();
      setBooks(data);
    } catch (error) {
      console.error('Failed to fetch books', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const title = prompt("Enter book title:");
    if (!title) return;

    const formData = new FormData();
    formData.append('title', title);
    formData.append('file', file);

    try {
      await uploadBook(formData);
      alert('Book uploaded successfully!');
      fetchBooks();
    } catch (error) {
      alert('Failed to upload book');
    }
  };

  const filteredBooks = books.filter(b => b.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">E-Library</h1>
          <p className="text-slate-400">Access and upload course materials, books, and resources.</p>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative w-full md:w-64">
            <input
              type="text"
              placeholder="Search books..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2 pl-10 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
            />
            <svg className="w-4 h-4 text-slate-400 absolute left-3 top-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <button
            onClick={handleUploadClick}
            className="flex-shrink-0 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
            <span className="hidden sm:inline">Upload</span>
          </button>
          <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept=".pdf,.epub" />
        </div>
      </div>

      {loading ? (
        <div className="text-center text-slate-400 py-12">Loading library...</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.length > 0 ? filteredBooks.map(book => (
            <div key={book._id} className="glass-panel p-5 rounded-2xl flex flex-col group hover:-translate-y-1 transition-transform duration-300">
              <div className="bg-gradient-to-br from-indigo-500/20 to-purple-500/20 h-40 rounded-xl mb-4 flex items-center justify-center border border-white/5 group-hover:border-indigo-500/30 transition-colors">
                <svg className="w-16 h-16 text-indigo-400/50 group-hover:text-indigo-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-white font-medium text-lg leading-tight mb-1 truncate" title={book.title}>{book.title}</h3>
              <p className="text-slate-400 text-xs mb-4">Added {new Date(book.uploadDate).toLocaleDateString()}</p>

              <div className="mt-auto flex justify-between items-center pt-3 border-t border-white/5">
                <span className="text-xs font-medium text-slate-500 bg-white/5 px-2 py-1 rounded">PDF</span>
                <a href={`http://localhost:5000/uploads/books/${book.filename}`} target="_blank" rel="noopener noreferrer" className="text-indigo-400 hover:text-indigo-300 text-sm font-medium flex items-center gap-1 transition-colors">
                  Open
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                </a>
              </div>
            </div>
          )) : (
            <div className="col-span-full py-12 text-center text-slate-400">
              No books found matching your criteria.
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ELibrary;
