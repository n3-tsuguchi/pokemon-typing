"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { getUserScores } from "@/lib/firestore";
import type { GameScore } from "@/lib/types";

export function RecordsTable() {
  const { user } = useAuth();
  const [scores, setScores] = useState<GameScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getUserScores(user.uid)
      .then(setScores)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [user]);

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
      </div>
    );
  }

  if (scores.length === 0) {
    return (
      <p className="py-12 text-center text-gray-500">
        まだ記録がありません。ゲームをプレイしてみましょう！
      </p>
    );
  }

  const bestScore = Math.max(...scores.map((s) => s.score));

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-gray-200 text-sm text-gray-500">
            <th className="px-4 py-3 font-medium">#</th>
            <th className="px-4 py-3 font-medium">正解数</th>
            <th className="px-4 py-3 font-medium">回答数</th>
            <th className="px-4 py-3 font-medium">正答率</th>
            <th className="px-4 py-3 font-medium">日時</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((score, i) => (
            <tr
              key={i}
              className={`border-b border-gray-100 ${
                score.score === bestScore ? "bg-yellow-50" : ""
              }`}
            >
              <td className="px-4 py-3 text-gray-500">{i + 1}</td>
              <td className="px-4 py-3 font-bold text-green-600">
                {score.score}
                {score.score === bestScore && (
                  <span className="ml-1 text-xs text-yellow-600">BEST</span>
                )}
              </td>
              <td className="px-4 py-3 text-gray-700">{score.totalAttempts}</td>
              <td className="px-4 py-3 text-gray-700">{score.accuracy}%</td>
              <td className="px-4 py-3 text-sm text-gray-500">
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
