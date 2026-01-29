'use client';

export default function ParticipantTable({ participants }) {
  if (!participants || participants.length === 0) return null;

  return (
    <div className="h-full flex flex-col rounded-2xl bg-white/70 backdrop-blur-sm shadow-xl shadow-slate-200/50 overflow-hidden border border-white/80">
      <table className="min-w-full divide-y divide-slate-100 flex flex-col h-full">
        <thead className="bg-slate-50/80 flex-shrink-0">
          <tr className="flex">
            <th className="flex-1 px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">ID</th>
            <th className="flex-1 px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-wider">Name</th>
          </tr>
        </thead>
        <tbody className="bg-white/50 divide-y divide-slate-100 flex-1 overflow-y-auto">
          {participants.map((p, index) => (
            <tr key={p.id} className={`flex hover:bg-slate-50/80 transition-colors ${index % 2 === 0 ? 'bg-white/30' : 'bg-slate-50/30'}`}>
              <td className="flex-1 px-4 py-2.5 whitespace-nowrap text-sm text-slate-600 font-medium">{p.id}</td>
              <td className="flex-1 px-4 py-2.5 whitespace-nowrap text-sm text-slate-700">{p.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
