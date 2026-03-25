import type { GameScore } from "./types";

const SCORES_KEY = "pokemon-typing-scores";

function getStoredScores(): GameScore[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(SCORES_KEY);
    if (!raw) return [];
    const scores = JSON.parse(raw);
    return scores.map((s: GameScore & { timestamp: string }) => ({
      ...s,
      timestamp: new Date(s.timestamp),
    }));
  } catch {
    return [];
  }
}

export async function saveScore(
  userId: string,
  score: number,
  totalAttempts: number,
  accuracy: number
) {
  const scores = getStoredScores();
  scores.unshift({
    userId,
    score,
    totalAttempts,
    accuracy,
    timestamp: new Date(),
  });
  localStorage.setItem(SCORES_KEY, JSON.stringify(scores));
}

export async function getUserScores(userId: string): Promise<GameScore[]> {
  const scores = getStoredScores();
  return scores.filter((s) => s.userId === userId);
}
