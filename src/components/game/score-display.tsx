"use client";

interface Props {
  score: number;
  totalAttempts: number;
  streak: number;
  showCorrectEffect: boolean;
}

export function ScoreDisplay({ score, totalAttempts, streak, showCorrectEffect }: Props) {
  return (
    <div className="flex items-center justify-center gap-3">
      {/* Score */}
      <div className={`flex items-center gap-2 rounded-2xl border border-green-100 bg-green-50/80 px-5 py-2.5 backdrop-blur-sm ${
        showCorrectEffect ? "animate-score-pop" : ""
      }`}>
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-green-600">正解</p>
          <p className="text-xl font-bold text-green-700 tabular-nums">{score}</p>
        </div>
      </div>

      {/* Attempts */}
      <div className="flex items-center gap-2 rounded-2xl border border-gray-100 bg-white/80 px-5 py-2.5 backdrop-blur-sm">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-400 text-white">
          <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125" />
          </svg>
        </div>
        <div>
          <p className="text-xs font-medium text-gray-500">回答</p>
          <p className="text-xl font-bold text-gray-700 tabular-nums">{totalAttempts}</p>
        </div>
      </div>

      {/* Streak */}
      {streak >= 3 && (
        <div className="animate-badge-pulse flex items-center gap-1.5 rounded-full bg-gradient-to-r from-orange-400 to-yellow-400 px-4 py-2 shadow-lg shadow-orange-400/25">
          <span className="text-lg">&#x1F525;</span>
          <span className="text-sm font-bold text-white">{streak}連続!</span>
        </div>
      )}
    </div>
  );
}
