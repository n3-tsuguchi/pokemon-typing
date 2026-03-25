"use client";

type Difficulty = "easy" | "normal" | "hard";

interface Props {
  score: number;
  totalAttempts: number;
  bestStreak: number;
  difficulty: Difficulty;
}

const DIFFICULTY_LABEL: Record<Difficulty, { label: string; emoji: string }> = {
  easy:   { label: "かんたん", emoji: "\uD83C\uDF3F" },
  normal: { label: "ふつう",   emoji: "\uD83D\uDD25" },
  hard:   { label: "むずかしい", emoji: "\u26A1" },
};

function getRank(score: number): { label: string; emoji: string; color: string; bg: string } {
  if (score >= 40) return { label: "チャンピオン", emoji: "\uD83C\uDFC6", color: "text-yellow-600", bg: "from-yellow-400 to-amber-500" };
  if (score >= 30) return { label: "エリートトレーナー", emoji: "\u2B50", color: "text-purple-600", bg: "from-purple-400 to-pink-500" };
  if (score >= 20) return { label: "ベテラントレーナー", emoji: "\uD83D\uDD25", color: "text-orange-600", bg: "from-orange-400 to-red-500" };
  if (score >= 10) return { label: "ポケモントレーナー", emoji: "\uD83C\uDF1F", color: "text-blue-600", bg: "from-blue-400 to-cyan-500" };
  return { label: "はじめてのタイピング", emoji: "\uD83C\uDF31", color: "text-green-600", bg: "from-green-400 to-emerald-500" };
}

export function ResultScreen({ score, totalAttempts, bestStreak, difficulty }: Props) {
  const accuracy = totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
  const rank = getRank(score);
  const diffInfo = DIFFICULTY_LABEL[difficulty];

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
            <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-white/20 px-3 py-0.5 text-xs font-medium">
              <span>{diffInfo.emoji}</span>
              <span>{diffInfo.label}</span>
            </div>
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

            {/* Share buttons */}
            <div className="mb-4 flex gap-2">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`ポケモンタイピングで${score}匹正解したよ！${rank.emoji}（${diffInfo.label}・正答率${accuracy}%・最大${bestStreak}連続）\n\n#ポケモンタイピング`)}&url=${encodeURIComponent("https://pokemon-typing-green.vercel.app")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-black px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800 active:scale-[0.98]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
                Xでシェア
              </a>
              <a
                href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent("https://pokemon-typing-green.vercel.app")}&text=${encodeURIComponent(`ポケモンタイピングで${score}匹正解！${rank.emoji}（${diffInfo.label}・正答率${accuracy}%）`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-2 rounded-2xl bg-[#06C755] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#05b34c] active:scale-[0.98]"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63h2.386c.349 0 .63.285.63.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
                </svg>
                LINEでシェア
              </a>
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
