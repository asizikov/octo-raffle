'use client';

import { useEffect } from 'react';

const HelpModal = ({ isOpen, onClose }) => {
  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/50">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-slate-800">File Format Help</h2>
            <button
              onClick={onClose}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors text-xl"
            >
              ×
            </button>
          </div>
          
          <div className="space-y-4 text-slate-600 text-sm">
            <p>To upload a participants list, your file can be in CSV or XLSX (Excel) format and must follow these requirements:</p>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-700">Supported File Formats:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>CSV files (.csv)</strong> - Use semicolon (;) as separator</li>
                <li><strong>Excel files (.xlsx, .xls)</strong> - Standard Excel format</li>
                <li>Both formats should use UTF-8 encoding for special characters</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-700">Required Columns:</h3>
              <ul className="list-disc list-inside space-y-1">
                <li><strong>ID</strong> - Unique identifier for each participant</li>
                <li><strong>Name</strong> - Participant name (or use &quot;Full name&quot;)</li>
              </ul>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-700">Example CSV Content:</h3>
              <pre className="bg-slate-800 text-emerald-400 p-3 rounded-lg text-xs overflow-x-auto font-mono">
ID;Name;Full name
001;John;John Doe
002;Jane;Jane Smith
003;Bob;Bob Johnson
              </pre>
            </div>
            
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
              <h3 className="font-semibold mb-2 text-slate-700">Example Excel Layout:</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100">
                    <tr>
                      <th className="border border-slate-200 px-3 py-1.5 text-left text-xs font-medium text-slate-600">ID</th>
                      <th className="border border-slate-200 px-3 py-1.5 text-left text-xs font-medium text-slate-600">Name</th>
                      <th className="border border-slate-200 px-3 py-1.5 text-left text-xs font-medium text-slate-600">Full name</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="border border-slate-200 px-3 py-1.5 text-xs">001</td>
                      <td className="border border-slate-200 px-3 py-1.5 text-xs">John</td>
                      <td className="border border-slate-200 px-3 py-1.5 text-xs">John Doe</td>
                    </tr>
                    <tr>
                      <td className="border border-slate-200 px-3 py-1.5 text-xs">002</td>
                      <td className="border border-slate-200 px-3 py-1.5 text-xs">Jane</td>
                      <td className="border border-slate-200 px-3 py-1.5 text-xs">Jane Smith</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
              <h3 className="font-semibold text-amber-800 mb-2">Important Notes:</h3>
              <ul className="list-disc list-inside space-y-1 text-amber-700">
                <li>The first row must be the header with column names</li>
                <li>You need at least 2 participants for the raffle</li>
                <li>For CSV files: Use semicolon (;) as separator</li>
                <li>For Excel files: Use the first worksheet</li>
                <li>If both &quot;Name&quot; and &quot;Full name&quot; columns exist, &quot;Full name&quot; will be used if &quot;Name&quot; is empty</li>
                <li>Empty rows will be ignored</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-medium rounded-xl shadow-lg shadow-indigo-500/25 transition-all duration-200"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
