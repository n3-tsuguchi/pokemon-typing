"use client";

interface Props {
  score: number;
  totalAttempts: number;
}

export function ResultModal({ score, totalAttempts }: Props) {
  const accuracy =
    totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="mx-4 w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl">
        <h2 className="mb-6 text-2xl font-bold text-gray-900">結果発表</h2>
        <div className="mb-6 space-y-3">
          <div className="rounded-lg bg-green-50 p-3">
            <p className="text-sm text-green-700">正解数</p>
            <p className="text-4xl font-bold text-green-600">{score}</p>
          </div>
          <div className="flex gap-3">
            <div className="flex-1 rounded-lg bg-gray-50 p-3">
              <p className="text-sm text-gray-500">回答数</p>
              <p className="text-xl font-bold text-gray-700">
                {totalAttempts}
              </p>
            </div>
            <div className="flex-1 rounded-lg bg-blue-50 p-3">
              <p className="text-sm text-blue-700">正答率</p>
              <p className="text-xl font-bold text-blue-600">{accuracy}%</p>
            </div>
          </div>
        </div>
        <a
          href="/game?start=1"
          className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
        >
          もう一度プレイ
        </a>
      </div>
    </div>
  );
}
