'use client';

import { useEffect } from 'react';
import Sparkles from './Sparkles';

const WinnerAnnouncement = ({ winner, onRemoveWinner }) => {
  // winner: { id, name }
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div className="relative bg-white rounded-lg p-10 text-center max-w-md w-full overflow-hidden">
        {/* Add the sparkles effect */}
        <Sparkles count={40} colors={['#FFD700', '#FFA500', '#FF6347', '#36A2EB']} />
        <h2 className="text-3xl font-bold mb-4 text-blue-600">Winner!</h2>
        <div className="text-6xl font-bold text-blue-600 mb-2">{winner.id}</div>
        {winner.name && (
          <div className="text-xl text-gray-700 mb-4">{winner.name}</div>
        )}
        <button
          onClick={onRemoveWinner}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition-colors"
        >
          Remove the Number
        </button>
      </div>
    </div>
  );
};

export default WinnerAnnouncement;
