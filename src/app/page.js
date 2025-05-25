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
        </div>
      </header>

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
