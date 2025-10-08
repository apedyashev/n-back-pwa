import React from 'react';

interface ControlsProps {
  onStart: () => void;
  onStop: () => void;
  isRunning: boolean;
}

const Controls: React.FC<ControlsProps> = ({ onStart, onStop, isRunning }) => {
  return (
    <div className="flex justify-center items-center">
      <button
        onClick={isRunning ? onStop : onStart}
        className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-sm transition-all focus:outline-none focus:ring-4 ${
          isRunning
            ? 'bg-rose-500 hover:bg-rose-600 focus:ring-rose-300'
            : 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-300'
        }`}
      >
        {isRunning ? 'Stop' : 'Start'}
      </button>
    </div>
  );
};

export default Controls;