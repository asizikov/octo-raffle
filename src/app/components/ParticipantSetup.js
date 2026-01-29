'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import * as XLSX from 'xlsx';
import ParticipantTable from './ParticipantTable';
import { parseCSVData, parseXLSXData } from '../utils/fileParser';

const ParticipantSetup = ({ onStartRaffle }) => {
  const [participantCount, setParticipantCount] = useState(2);
  const [error, setError] = useState('');
  const [csvParticipants, setCsvParticipants] = useState(null); // [{id, name}]
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (participantCount < 2) {
      setError('Please enter at least 2 participants');
      return;
    }
    // Create an array of participant objects from 1 to participantCount
    const participants = Array.from({ length: participantCount }, (_, i) => ({
      id: String(i + 1),
      name: `Participant ${i + 1}`
    }));
    setCsvParticipants(null); // clear CSV if manual
    onStartRaffle(participants);
  };

  // File upload handler for both CSV and XLSX
  const handleFileUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;

    const fileExtension = file.name.split('.').pop().toLowerCase();
    
    if (fileExtension === 'csv') {
      handleCSVFile(file);
    } else if (fileExtension === 'xlsx' || fileExtension === 'xls') {
      handleXLSXFile(file);
    } else {
      setError('Please upload a CSV or XLSX file.');
    }
  };

  // CSV file handler
  const handleCSVFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        const { participants, error: parseError } = parseCSVData(text);
        if (parseError) {
          setError(parseError);
          return;
        }
        setCsvParticipants(participants);
        onStartRaffle(participants, true);
      } catch {
        setError('Failed to parse CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
  };

  // XLSX file handler using SheetJS
  const handleXLSXFile = (file) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const data = new Uint8Array(event.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet name
        const firstSheetName = workbook.SheetNames[0];
        if (!firstSheetName) {
          setError('The Excel file appears to be empty or has no worksheets.');
          return;
        }
        
        // Get the worksheet
        const worksheet = workbook.Sheets[firstSheetName];
        
        // Convert worksheet to JSON array (this handles all cell types automatically)
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { 
          header: 1, // Use array format for header
          defval: '', // Default value for empty cells
          raw: false // Convert values to strings
        });
        
        const { participants, error: parseError } = parseXLSXData(jsonData);
        if (parseError) {
          setError(parseError);
          return;
        }
        setCsvParticipants(participants);
        onStartRaffle(participants, true);
        
      } catch {
        setError('Failed to read Excel file. The file may be corrupted, password-protected, or in an unsupported format. Please try saving it as a new Excel file or converting to CSV format.');
      }
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="max-w-md w-full bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 p-8 border border-white/80">
      <h2 className="text-xl font-semibold mb-6 text-center text-slate-800">
        Set Up Your Raffle
      </h2>
      
      <div className="mb-8 flex justify-center">
        <div className="w-28 h-28 flex items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200/50">
          <Image src="/octo-raffle/octocat.png" alt="Octocat" width={80} height={80} className="w-20 h-20" />
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-5">
        <div>
          <label htmlFor="participantCount" className="block mb-2 text-sm font-medium text-slate-600">
            Number of Participants
          </label>
          <div className="relative">
            <input
              type="number"
              id="participantCount"
              min="2"
              value={participantCount}
              onChange={(e) => {
                const value = parseInt(e.target.value);
                setParticipantCount(value);
                if (value >= 2) {
                  setError('');
                }
              }}
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-400 text-center text-lg font-semibold text-slate-700 transition-all duration-200 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-500 font-medium">{error}</p>}
          <p className="mt-2 text-xs text-slate-500">
            Enter a number between 2 and as many participants as you need.
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transition-all duration-200 font-semibold text-sm"
        >
          Start Raffle
        </button>

        {/* Upload Participants List (CSV/XLSX) Button */}
        <input
          type="file"
          accept=".csv,.xlsx,.xls,text/csv,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileUpload}
        />
        <button
          type="button"
          className="w-full px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-white rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-xl hover:shadow-emerald-500/30 transition-all duration-200 font-semibold text-sm flex items-center justify-center gap-2"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          disabled={false}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload Participants (CSV/XLSX)
        </button>
      </form>
      </div>
      {/* Show table if CSV participants exist */}
      {csvParticipants && (
        <div className="flex-1 max-w-lg w-full">
          <h3 className="text-sm font-semibold mb-3 text-slate-700 uppercase tracking-wide">Participants List</h3>
          <ParticipantTable participants={csvParticipants} />
        </div>
      )}
    </div>
  );
};

export default ParticipantSetup;
