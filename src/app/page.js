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
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex flex-col">
      <header className="bg-slate-900/95 backdrop-blur-md text-white py-4 shadow-lg flex-shrink-0 border-b border-slate-700/50">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {/* Octocat icon */}
            <div className="p-1.5 bg-white/10 rounded-xl">
              <Image src="/octo-raffle/octocat.png" alt="Octocat" width={40} height={40} className="w-9 h-9" />
            </div>
            <div>
              <h1 className="text-xl font-semibold tracking-tight">OctoRaffle</h1>
              <p className="text-xs text-slate-400 font-medium">Prize Wheel</p>
            </div>
          </div>
          
          {/* Help button */}
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="flex items-center space-x-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all duration-200 border border-white/10 hover:border-white/20"
            title="File Format Help"
          >
            <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">Help</span>
          </button>
        </div>
      </header>

      <HelpModal isOpen={showHelp} onClose={() => setShowHelp(false)} />

      <div className="flex-1 overflow-hidden flex flex-col">
        <div className="container mx-auto px-4 py-6 flex flex-col h-full">
          <div className="text-center mb-8 flex-shrink-0">
            <p className="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
              {!raffleStarted 
                ? "Set up your raffle by entering the number of participants, then spin the wheel to select a random winner!"
                : <span className="inline-flex items-center gap-2"><span className="inline-flex items-center justify-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-indigo-100 text-indigo-700">{participants.length}</span> participants in the raffle. Spin to find a winner!</span>
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
                    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 p-8 h-full flex items-center justify-center border border-white/80">
                      <PrizeWheel 
                        participants={participants} 
                        onSelectWinner={handleSelectWinner}
                      />
                    </div>
                  </div>
                  {isFileImport && (
                    <div className="w-full md:w-[350px] lg:w-[400px] xl:w-[450px] flex flex-col">
                      <h3 className="text-sm font-semibold mb-3 text-slate-700 uppercase tracking-wide flex-shrink-0">Participants List</h3>
                      <div className="flex-1 min-h-0">
                        <ParticipantTable participants={participants} />
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center py-12 px-8 bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl shadow-slate-200/50 max-w-md border border-white/80">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h2 className="text-xl font-semibold mb-2 text-slate-800">All Done!</h2>
                    <p className="text-slate-500 text-sm mb-6">All participants have been selected</p>
                    <button
                      onClick={() => setRaffleStarted(false)}
                      className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200"
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
