'use client';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">CSV File Format Help</h2>
            <button
              onClick={onClose}
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
                <li><strong>Name</strong> - Participant&apos;s name (or use &quot;Full name&quot;)</li>
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
                <li>If both &quot;Name&quot; and &quot;Full name&quot; columns exist, &quot;Full name&quot; will be used if &quot;Name&quot; is empty</li>
                <li>Empty rows will be ignored</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Got it!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;
