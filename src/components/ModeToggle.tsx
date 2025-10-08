import React from 'react';

const ModeToggle: React.FC<{ mode: string; setMode: (mode: string) => void }> = ({ mode, setMode }) => {
    const isLetters = mode === 'letters';

    return (
        <div className="w-full self-start inline-flex flex-col items-start gap-2 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
            <span className="text-sm text-gray-500">Mode</span>
            <div className="inline-flex rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                <button
                    type="button"
                    aria-pressed={isLetters}
                    onClick={() => setMode('letters')}
                    className={`px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                        isLetters ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    Letters
                </button>
                <button
                    type="button"
                    aria-pressed={!isLetters}
                    onClick={() => setMode('shapes')}
                    className={`px-4 py-2 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                        !isLetters ? 'bg-indigo-600 text-white' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                >
                    Shapes
                </button>
            </div>
        </div>
    );
};

export default ModeToggle;