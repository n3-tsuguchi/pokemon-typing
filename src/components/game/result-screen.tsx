"use client";

interface Props {
  score: number;
  totalAttempts: number;
  bestStreak: number;
}

function getRank(score: number): { label: string; emoji: string; color: string; bg: string } {
  if (score >= 40) return { label: "チャンピオン", emoji: "\uD83C\uDFC6", color: "text-yellow-600", bg: "from-yellow-400 to-amber-500" };
  if (score >= 30) return { label: "エリートトレーナー", emoji: "\u2B50", color: "text-purple-600", bg: "from-purple-400 to-pink-500" };
  if (score >= 20) return { label: "ベテラントレーナー", emoji: "\uD83D\uDD25", color: "text-orange-600", bg: "from-orange-400 to-red-500" };
  if (score >= 10) return { label: "ポケモントレーナー", emoji: "\uD83C\uDF1F", color: "text-blue-600", bg: "from-blue-400 to-cyan-500" };
  return { label: "はじめてのタイピング", emoji: "\uD83C\uDF31", color: "text-green-600", bg: "from-green-400 to-emerald-500" };
}

export function ResultScreen({ score, totalAttempts, bestStreak }: Props) {
  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
  const rank = getRank(score);

  return (
    <div className="flex min-h-[calc(100vh-56px)] items-center justify-center px-4 py-6">
      <div className="animate-result-reveal w-full max-w-md">
        {/* Result Card */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-2xl shadow-gray-200/50 border border-gray-100">
          {/* Header gradient */}
          <div className={`bg-gradient-to-r ${rank.bg} px-6 py-5 sm:px-8 sm:py-6 text-center text-white`}>
            <p className="text-4xl sm:text-5xl mb-2">{rank.emoji}</p>
            <h2 className="text-xl sm:text-2xl font-bold mb-1">結果発表</h2>
            <p className="text-xs sm:text-sm font-medium opacity-90">{rank.label}</p>
          </div>

          <div className="px-5 py-5 sm:px-8 sm:py-6">
            {/* Main score */}
            <div className="mb-5 sm:mb-6 text-center">
              <p className="text-sm font-medium text-gray-400 mb-1">正解数</p>
              <p className="text-5xl sm:text-6xl font-extrabold bg-gradient-to-r from-green-500 to-emerald-500 bg-clip-text text-transparent">
                {score}
              </p>
            </div>

            {/* Stats grid */}
            <div className="mb-5 sm:mb-6 grid grid-cols-3 gap-2 sm:gap-3">
              <div className="rounded-2xl bg-gray-50 p-2.5 sm:p-3 text-center">
                <p className="text-[10px] sm:text-xs text-gray-400 mb-0.5 sm:mb-1">回答数</p>
                <p className="text-lg sm:text-xl font-bold text-gray-700">{totalAttempts}</p>
              </div>
              <div className="rounded-2xl bg-blue-50 p-2.5 sm:p-3 text-center">
                <p className="text-[10px] sm:text-xs text-blue-400 mb-0.5 sm:mb-1">正答率</p>
                <p className="text-lg sm:text-xl font-bold text-blue-600">{accuracy}%</p>
              </div>
              <div className="rounded-2xl bg-orange-50 p-2.5 sm:p-3 text-center">
                <p className="text-[10px] sm:text-xs text-orange-400 mb-0.5 sm:mb-1">最大連続</p>
                <p className="text-lg sm:text-xl font-bold text-orange-600">{bestStreak}</p>
              </div>
            </div>

            {/* Actions */}
            <a
              href="/game"
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-red-500 to-red-600 px-6 py-3 sm:py-3.5 font-bold text-white shadow-lg shadow-red-500/20 transition-all hover:shadow-xl hover:brightness-110 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182" />
              </svg>
              もう一度プレイ
            </a>
            <a
              href="/records"
              className="mt-2.5 sm:mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-6 py-2.5 sm:py-3 font-medium text-gray-600 transition-all hover:bg-gray-50 hover:border-gray-300"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
              </svg>
              記録を見る
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
