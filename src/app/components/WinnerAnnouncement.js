'use client';

import Sparkles from './Sparkles';

const WinnerAnnouncement = ({ winner, onRemoveWinner }) => {
  // winner: { id, name }
  return (
    <div className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="relative bg-white/95 backdrop-blur-md rounded-3xl p-12 text-center max-w-md w-full overflow-hidden shadow-2xl border border-white/50">
        {/* Add the sparkles effect */}
        <Sparkles count={40} colors={['#FFD700', '#FFA500', '#FF6347', '#36A2EB']} />
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center shadow-lg shadow-amber-400/30">
          <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <h2 className="text-lg font-semibold mb-3 text-slate-500 uppercase tracking-wide">Winner</h2>
        <div className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent mb-2">{winner.id}</div>
        {winner.name && (
          <div className="text-lg text-slate-600 mb-6 font-medium">{winner.name}</div>
        )}
        <button
          onClick={onRemoveWinner}
          className="px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-sm font-medium rounded-xl shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 hover:from-indigo-500 hover:to-violet-500 transition-all duration-200"
        >
          Remove & Continue
        </button>
      </div>
    </div>
  );
};

export default WinnerAnnouncement;
