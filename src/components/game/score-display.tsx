"use client";

interface Props {
  score: number;
  totalAttempts: number;
}

export function ScoreDisplay({ score, totalAttempts }: Props) {
  return (
    <div className="flex gap-6 text-lg">
      <div className="text-center">
        <p className="text-sm text-gray-500">正解数</p>
        <p className="text-2xl font-bold text-green-600">{score}</p>
      </div>
      <div className="text-center">
        <p className="text-sm text-gray-500">回答数</p>
        <p className="text-2xl font-bold text-gray-700">{totalAttempts}</p>
      </div>
    </div>
  );
}
