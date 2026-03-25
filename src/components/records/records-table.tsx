"use client";

import { useEffect, useState } from "react";
import { getScores } from "@/lib/firestore";
import type { GameScore } from "@/lib/types";

function getRankEmoji(score: number): string {
  if (score >= 40) return "\uD83C\uDFC6";
  if (score >= 30) return "\u2B50";
  if (score >= 20) return "\uD83D\uDD25";
  if (score >= 10) return "\uD83C\uDF1F";
  return "\uD83C\uDF31";
}

export function RecordsTable() {
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getScores()
      .then(setScores)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="pokeball-spinner" />
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <div className="rounded-3xl border border-gray-100 bg-white p-12 text-center shadow-sm">
        <p className="text-4xl mb-3">&#x1F3AE;</p>
        <p className="text-gray-500 mb-4">
          まだ記録がありません
        </p>
        <a
          href="/game"
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-110"
        >
          ゲームをプレイ
        </a>
      </div>
    );
  }

  const bestScore = Math.max(...scores.map((s) => s.score));

  return (
    <div className="overflow-hidden rounded-3xl border border-gray-100 bg-white shadow-sm">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/80">
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">#</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">正解数</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">回答数</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">正答率</th>
            <th className="px-5 py-3.5 text-xs font-semibold uppercase tracking-wider text-gray-400">日時</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => (
            <tr
              key={i}
              className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${
                score.score === bestScore ? "bg-yellow-50/50" : ""
              }`}
            >
              <td className="px-5 py-4 text-sm text-gray-400">{i + 1}</td>
              <td className="px-5 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-green-600 tabular-nums">{score.score}</span>
                  {score.score === bestScore && (
                    <span className="rounded-full bg-gradient-to-r from-yellow-400 to-amber-400 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm">
                      BEST
                    </span>
                  )}
                  <span>{getRankEmoji(score.score)}</span>
                </div>
              </td>
              <td className="px-5 py-4 text-sm font-medium text-gray-600 tabular-nums">{score.totalAttempts}</td>
              <td className="px-5 py-4">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                  score.accuracy >= 90
                    ? "bg-green-100 text-green-700"
                    : score.accuracy >= 70
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600"
                }`}>
                  {score.accuracy}%
                </span>
              </td>
              <td className="px-5 py-4 text-sm text-gray-400">
                {score.timestamp.toLocaleDateString("ja-JP", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
