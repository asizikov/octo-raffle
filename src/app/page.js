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

  // Start the raffle with the given number of participants
  const handleStartRaffle = (participantList) => {
    setParticipants(participantList);
    setRaffleStarted(true);
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24 pb-8">
      <header className="fixed top-0 left-0 right-0 bg-gray-900 text-white py-4 shadow-md z-50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Octocat icon */}
            <img src="/octocat.png" alt="Octocat" className="w-10 h-10" />
            <h1 className="text-2xl font-bold">Octocat Raffle</h1>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
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
          <div className="mt-8">
            <ParticipantSetup onStartRaffle={handleStartRaffle} />
          </div>
        ) : (
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {participants.length > 0 ? (
              <>
                <div className="flex-1">
                  <div className="bg-white rounded-lg shadow-lg p-8 mb-6">
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">
                        Prize Wheel
                      </h3>
                      <div className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                        Participants: {participants.length}
                      </div>
                    </div>
                    <PrizeWheel 
                      participants={participants} 
                      onSelectWinner={handleSelectWinner}
                    />
                  </div>
                </div>
                <div className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px] max-h-[600px] overflow-y-auto sticky top-28">
                  <h3 className="text-lg font-bold mb-2 text-gray-800">Participants List</h3>
                  <ParticipantTable participants={participants} />
                </div>
              </>
            ) : (
              <div className="text-center py-10 bg-white rounded-lg shadow-lg max-w-md mx-auto">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">All participants have been selected!</h2>
                <button
                  onClick={() => setRaffleStarted(false)}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg shadow hover:from-blue-700 hover:to-purple-700 transition-colors"
                >
                  Start New Raffle
                </button>
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
  );
}
