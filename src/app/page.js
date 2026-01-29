'use client';

import { useState } from 'react';
import Image from 'next/image';
import ParticipantSetup from './components/ParticipantSetup';
import PrizeWheel from './components/PrizeWheel';
import WinnerAnnouncement from './components/WinnerAnnouncement';
import ParticipantTable from './components/ParticipantTable';
import HelpModal from './components/HelpModal';

export default function Home() {
  const [participants, setParticipants] = useState([]);
  const [winner, setWinner] = useState(null);
  const [raffleStarted, setRaffleStarted] = useState(false);
  const [isFileImport, setIsFileImport] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  // Start the raffle with the given number of participants
  const handleStartRaffle = (participantList, fromFile = false) => {
    setParticipants(participantList);
    setRaffleStarted(true);
    setIsFileImport(fromFile);
  };

  // Handle winner selection
  const handleSelectWinner = (winner) => {
    setWinner({ id: winner.id, name: winner.name });
  };

  // Remove the winner from the participants list
  const handleRemoveWinner = () => {
    setParticipants(participants.filter(p => p.id !== winner.id));
    setWinner(null);
  };

  return (
    <div className="h-full bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col">
      <header className="bg-gray-900 text-white py-4 shadow-md flex-shrink-0">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {/* Octocat icon */}
            <Image src="/octo-raffle/octocat.png" alt="Octocat" width={40} height={40} className="w-10 h-10" />
            <h1 className="text-2xl font-bold">OctoRaffle - Prize Wheel</h1>
          </div>
          
          {/* Help button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center space-x-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors duration-200"
            title="File Format Help"
          >
            <span className="text-lg">❓</span>
            <span className="font-medium">Help</span>
          </button>
        </div>
      </header>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="text-center mb-6 flex-shrink-0">
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
                  {isFileImport && (
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
