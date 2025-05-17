'use client';

export default function ParticipantTable({ participants }) {
  if (!participants || participants.length === 0) return null;

  // If participants are objects with id/name, use those; else fallback to string/number
  const isObject = typeof participants[0] === 'object' && participants[0] !== null;

  return (
    <div className="overflow-x-auto max-h-[32rem] border rounded-lg bg-white shadow-md">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0 z-10">
          <tr>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {participants.map((p, idx) => (
            <tr key={isObject ? p.id || idx : idx}>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{isObject ? p.id : p}</td>
              <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-700">{isObject ? p.name : p}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
