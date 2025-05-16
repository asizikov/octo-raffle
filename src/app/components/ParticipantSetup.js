'use client';

import { useState } from 'react';

const ParticipantSetup = ({ onStartRaffle }) => {
  const [participantCount, setParticipantCount] = useState(2);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (participantCount < 2) {
      setError('Please enter at least 2 participants');
      return;
    }
    
    // Create an array of numbers from 1 to participantCount
    const participants = Array.from({ length: participantCount }, (_, i) => i + 1);
    onStartRaffle(participants);
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-lg p-8 border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Set Up Your Octocat Raffle
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
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-center text-lg font-bold [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
      </form>
    </div>
  );
};

export default ParticipantSetup;
