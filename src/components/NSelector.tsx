import React from 'react';

interface NSelectorProps {
  n: number;
  setN: (value: number) => void;
}

const NSelector: React.FC<NSelectorProps> = ({ n, setN }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setN(Number(event.target.value));
  };

  return (
    <div className="flex-1 w-full flex flex-col items-start gap-2 rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
      <label htmlFor="n-slider" className="text-sm font-medium text-gray-600">
        N-Back: {n}
      </label>
      <input
        id="n-slider"
        type="range"
        min={1}
        max={5}
        step={1}
        value={n}
        onChange={handleChange}
        className="w-full accent-indigo-600"
        list="n-ticks"
        aria-valuemin={1}
        aria-valuemax={5}
        aria-valuenow={n}
        aria-label="N-Back"
      />
      <datalist id="n-ticks">
        <option value="1" label="1" />
        <option value="2" label="2" />
        <option value="3" label="3" />
        <option value="4" label="4" />
        <option value="5" label="5" />
      </datalist>
    </div>
  );
};

export default NSelector;