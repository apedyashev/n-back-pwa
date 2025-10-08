import React from 'react';

interface DisplayProps {
  currentItem: string;
  onTap?: () => void;
  disabled?: boolean;
}

const Display: React.FC<DisplayProps> = ({ currentItem, onTap, disabled }) => {
  return (
    <div className="w-full grid place-items-center">
      <button
        type="button"
        onClick={onTap}
        disabled={disabled}
        className={`w-[min(90vw,45vh)] sm:w-[min(60vw,50vh)] aspect-square rounded-2xl border border-gray-300 bg-gradient-to-b from-white via-gray-50 to-gray-100 shadow-xl shadow-gray-200/70 flex items-center justify-center transition-all duration-150 hover:shadow-2xl hover:shadow-gray-300/70 active:translate-y-[1px] active:scale-95 focus:outline-none focus:ring-4 focus:ring-indigo-200 ${
          disabled ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        }`}
        aria-label="Tap when it matches N-back"
      >
        <span className="text-[18vw] sm:text-7xl font-extrabold tracking-widest text-indigo-700 select-none leading-none">
          {currentItem || '•'}
        </span>
      </button>
    </div>
  );
};

export default Display;