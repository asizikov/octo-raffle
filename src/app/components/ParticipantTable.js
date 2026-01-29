'use client';

export default function ParticipantTable({ participants }) {
  if (!participants || participants.length === 0) return null;

  return (
    <div className="h-full flex flex-col border rounded-lg bg-white shadow-md overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200 flex flex-col h-full">
        <thead className="bg-gray-50 flex-shrink-0">
          <tr className="flex">
            <th className="flex-1 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="flex-1 px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200 flex-1 overflow-y-auto">
          {participants.map((p) => (
            <tr key={p.id} className="flex">
              <td className="flex-1 px-4 py-2 whitespace-nowrap text-sm text-gray-700">{p.id}</td>
              <td className="flex-1 px-4 py-2 whitespace-nowrap text-sm text-gray-700">{p.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
