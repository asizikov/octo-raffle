'use client';

import { useState } from 'react';
import ParticipantSetup from './components/ParticipantSetup';
import PrizeWheel from './components/PrizeWheel';
import WinnerAnnouncement from './components/WinnerAnnouncement';
import ParticipantTable from './components/ParticipantTable';

export default function Home() {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [raffleStarted, setRaffleStarted] = useState(false);
  const [isCsvImport, setIsCsvImport] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Start the raffle with the given number of participants
  const handleStartRaffle = (participantList) => {
    setParticipants(participantList);
    setRaffleStarted(true);
    // Check if the participant list is an array of objects (from CSV)
    if (participantList && participantList.length > 0 && typeof participantList[0] === 'object' && participantList[0] !== null && 'id' in participantList[0]) {
      setIsCsvImport(true);
    } else {
      setIsCsvImport(false);
    }
  };

  // Handle winner selection
  const handleSelectWinner = (winningNumber) => {
    // If winner is an object, show both id and name
    if (typeof winningNumber === 'object' && winningNumber !== null) {
      setWinner({ id: winningNumber.id, name: winningNumber.name });
    } else {
      setWinner({ id: winningNumber, name: undefined });
    }
  };

  // Remove the winner from the participants list
  const handleRemoveWinner = () => {
    setParticipants(participants.filter(p => {
      if (typeof p === 'object' && p !== null) {
        return p.id !== winner.id;
      }
      return p !== winner.id;
    }));
    setWinner(null);
  };

  return (
    <div className="h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-gray-900 text-white py-4 shadow-md flex-shrink-0">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Octocat icon */}
            <img src="/octo-raffle/octocat.png" alt="Octocat" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">OctoRaffle</h1>
          </div>
          
          {/* Help button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            title="CSV Format Help"
          >
            <span className="text-lg">❓</span>
            <span className="font-medium">Help</span>
          </button>
        </div>
      </header>

      {/* Help Modal */}
      {showHelp && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowHelp(false);
            }
          }}
        >
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-800">CSV File Format Help</h2>
                <button
                  onClick={() => setShowHelp(false)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                >
                  ×
                </button>
              </div>
              
              <div className="space-y-4 text-gray-700">
                <p>To upload a participants list, your CSV file must follow these requirements:</p>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">File Format:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Use semicolon (;) as the separator</li>
                    <li>Save the file with .csv extension</li>
                    <li>Use UTF-8 encoding for special characters</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Required Columns:</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li><strong>ID</strong> - Unique identifier for each participant</li>
                    <li><strong>Name</strong> - Participant's name (or use "Full name")</li>
                  </ul>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">Example CSV Content:</h3>
                  <pre className="bg-gray-800 text-green-400 p-3 rounded text-sm overflow-x-auto">
{`ID;Name;Full name
001;John;John Doe
002;Jane;Jane Smith
003;Bob;Bob Johnson`}
                  </pre>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                  <h3 className="font-bold text-yellow-800 mb-2">Important Notes:</h3>
                  <ul className="list-disc list-inside space-y-1 text-yellow-700">
                    <li>The first row must be the header with column names</li>
                    <li>You need at least 2 participants for the raffle</li>
                    <li>If both "Name" and "Full name" columns exist, "Full name" will be used if "Name" is empty</li>
                    <li>Empty rows will be ignored</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowHelp(false)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                  Got it!
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="text-center mb-6 flex-shrink-0">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Prize Wheel
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {!raffleStarted 
                ? "Set up your raffle by entering the number of participants, then spin the wheel to select a random winner!"
                : `${participants.length} participants in the raffle. Spin to find a winner!`
              }
            </p>
          </div>

          {!raffleStarted ? (
            <div className="flex-1 flex items-center justify-center">
              <ParticipantSetup onStartRaffle={handleStartRaffle} />
            </div>
          ) : (
            <div className="flex-1 flex flex-col md:flex-row gap-8 min-h-0">
              {participants.length > 0 ? (
                <>
                  <div className="flex-1 min-w-0">
                    <div className="bg-white rounded-lg shadow-lg p-8 h-full flex items-center justify-center">
                      <PrizeWheel 
                        participants={participants} 
                        onSelectWinner={handleSelectWinner}
                      />
                    </div>
                  </div>
                  {isCsvImport && (
                    <div className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px] flex flex-col">
                      <h3 className="text-lg font-bold mb-2 text-gray-800 flex-shrink-0">Participants List</h3>
                      <div className="flex-1 min-h-0">
                        <ParticipantTable participants={participants} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center py-10 bg-white rounded-lg shadow-lg max-w-md">
                    <h2 className="text-2xl font-bold mb-4 text-gray-800">All participants have been selected!</h2>
                    <button
                      onClick={() => setRaffleStarted(false)}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-colors"
                    >
                      Start New Raffle
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {winner !== null && (
            <WinnerAnnouncement 
              winner={winner} 
              onRemoveWinner={handleRemoveWinner} 
            />
          )}
        </div>
      </div>
    </div>
  );
}
