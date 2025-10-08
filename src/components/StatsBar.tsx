import React from 'react';

interface StatsBarProps {
  correctAnswers: number;
  totalAnswers: number;
  timeElapsed: number; // in seconds
}

const StatsBar: React.FC<StatsBarProps> = ({ correctAnswers, totalAnswers, timeElapsed }) => {
  const accuracy = totalAnswers > 0 ? (correctAnswers / totalAnswers) * 100 : 0;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-xs font-semibold text-gray-700">Stats</h2>
        <span className="text-[11px] text-gray-400">{timeElapsed}s</span>
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">Correct</div>
          <div className="mt-0.5 text-xl font-bold text-emerald-600">{correctAnswers}</div>
        </div>
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">Total</div>
          <div className="mt-0.5 text-xl font-bold text-gray-900">{totalAnswers}</div>
        </div>
        <div className="text-center">
          <div className="text-[11px] uppercase tracking-wide text-gray-500">Accuracy</div>
          <div className="mt-0.5 text-xl font-bold text-indigo-600">{accuracy.toFixed(0)}%</div>
        </div>
      </div>

      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px] text-gray-500">
          <span>Accuracy</span>
          <span>{accuracy.toFixed(1)}%</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-gray-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-indigo-500 transition-all"
            style={{ width: `${Math.min(100, Math.max(0, accuracy))}%` }}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Number(accuracy.toFixed(0))}
            role="progressbar"
          />
        </div>
      </div>
    </div>
  );
};

export default StatsBar;