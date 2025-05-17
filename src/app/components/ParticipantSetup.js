'use client';

import { useState, useRef } from 'react';
import ParticipantTable from './ParticipantTable';

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
    // Create an array of numbers from 1 to participantCount
    const participants = Array.from({ length: participantCount }, (_, i) => i + 1);
    setCsvParticipants(null); // clear CSV if manual
    onStartRaffle(participants);
  };

  // CSV upload handler
  const handleCSVUpload = (e) => {
    setError('');
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target.result;
        // Split lines, handle Windows/Mac/Unix line endings
        const lines = text.split(/\r?\n/).filter(Boolean);
        if (lines.length < 2) {
          setError('CSV file must have a header and at least one participant row.');
          return;
        }
        // Validate header (first line)
        const header = lines[0].split(';');
        if (!header.includes('ID') || !header.includes('Name')) {
          setError('CSV header must include at least "ID" and "Name" columns.');
          return;
        }
        // Parse participants (skip header)
        const idxID = header.indexOf('ID');
        const idxName = header.indexOf('Name');
        const idxFullName = header.indexOf('Full name');
        const participants = lines.slice(1)
          .map(line => line.split(';'))
          .filter(cols => cols.length >= header.length && cols[idxID])
          .map(cols => {
            const id = cols[idxID]?.trim();
            let name = cols[idxName]?.trim();
            if ((!name || name === '') && idxFullName !== -1) {
              name = cols[idxFullName]?.trim();
            }
            return { id, name };
          })
          .filter(p => p.id && p.name);
        if (participants.length < 2) {
          setError('CSV must contain at least 2 valid participants.');
          return;
        }
        setCsvParticipants(participants);
        onStartRaffle(participants);
      } catch (err) {
        setError('Failed to parse CSV file. Please check the format.');
      }
    };
    reader.readAsText(file);
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
            <img src="/octocat.png" alt="Octocat" className="w-24 h-24" />
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

        {/* Upload Participants List (CSV) Button */}
        <input
          type="file"
          accept=".csv,text/csv"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleCSVUpload}
        />
        <button
          type="button"
          className="w-full px-6 py-3 mt-2 bg-gradient-to-r from-green-600 to-blue-500 hover:from-green-700 hover:to-blue-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 font-bold text-lg"
          onClick={() => fileInputRef.current && fileInputRef.current.click()}
          disabled={false}
        >
          Upload Participants List (CSV)
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
