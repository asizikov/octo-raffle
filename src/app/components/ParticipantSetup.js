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
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Set Up Your OctoRaffle
      </h2>
      
      <div className="mb-6 flex justify-center">
        <div className="w-32 h-32 text-center">
          {/* Octocat icon */}
          <div className="relative mx-auto mt-2">
            <Image src="/octo-raffle/octocat.png" alt="Octocat" width={96} height={96} className="w-24 h-24" />
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="participantCount" className="block mb-2 text-sm font-medium text-gray-700">
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-bold text-black [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
            />
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          <p className="mt-2 text-sm text-gray-600">
            Enter a number between 2 and as many participants as you need.
          </p>
        </div>
        
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-lg"
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
          className="w-full px-6 py-3 mt-2 bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-lg"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          disabled={false}
        >
          Upload Participants List (CSV/XLSX)
        </button>
      </form>
      </div>
      {/* Show table if CSV participants exist */}
      {csvParticipants && (
        <div className="flex-1 max-w-lg w-full">
          <h3 className="text-lg font-bold mb-2 text-gray-800">Participants List</h3>
          <ParticipantTable participants={csvParticipants} />
        </div>
      )}
    </div>
  );
};

export default ParticipantSetup;
