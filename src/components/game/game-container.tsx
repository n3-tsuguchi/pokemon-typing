"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePokemonPool } from "@/hooks/use-pokemon-pool";
import { useAuth } from "@/lib/auth-context";
import { saveScore } from "@/lib/firestore";
import { PokemonDisplay } from "./pokemon-display";
import { TypingInput } from "./typing-input";
import { TimerBar } from "./timer-bar";
import { ScoreDisplay } from "./score-display";

const GAME_DURATION = 60;

export function GameContainer() {
  const { user } = useAuth();
  const { pokemon } = usePokemonPool();

  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start timer immediately on mount
  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearTimer();
          setFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return clearTimer;
  }, [clearTimer]);

  // Save score when finished
  useEffect(() => {
    if (finished && user && !savedRef.current) {
      savedRef.current = true;
      const accuracy =
        totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
      saveScore(user.uid, score, totalAttempts, accuracy);
    }
  }, [finished, user, score, totalAttempts]);

  const handleCorrect = useCallback(() => {
    setScore((s) => s + 1);
    setTotalAttempts((t) => t + 1);
    setCurrentIndex((i) => i + 1);
  }, []);

  const currentPokemon =
    pokemon.length > 0 ? pokemon[currentIndex % pokemon.length] : null;

  return (
    <div className="flex min-h-[60vh] flex-col items-center gap-6 py-8">
      <TimerBar timeLeft={timeLeft} />
      <ScoreDisplay score={score} totalAttempts={totalAttempts} />

      {!finished && currentPokemon && (
        <>
          <PokemonDisplay pokemon={currentPokemon} />
          <TypingInput
            targetName={currentPokemon.nameJa}
            onCorrect={handleCorrect}
            disabled={finished}
          />
        </>
      )}

      {finished && (
        <div className="w-full max-w-sm rounded-2xl bg-white p-8 text-center shadow-xl border">
          <h2 className="mb-6 text-2xl font-bold text-gray-900">結果発表</h2>
          <div className="mb-6 space-y-3">
            <div className="rounded-lg bg-green-50 p-3">
              <p className="text-sm text-green-700">正解数</p>
              <p className="text-4xl font-bold text-green-600">{score}</p>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 rounded-lg bg-gray-50 p-3">
                <p className="text-sm text-gray-500">回答数</p>
                <p className="text-xl font-bold text-gray-700">{totalAttempts}</p>
              </div>
              <div className="flex-1 rounded-lg bg-blue-50 p-3">
                <p className="text-sm text-blue-700">正答率</p>
                <p className="text-xl font-bold text-blue-600">
                  {totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0}%
                </p>
              </div>
            </div>
          </div>
          <a
            href="/game"
            className="block w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            もう一度プレイ
          </a>
          <a
            href="/records"
            className="block mt-3 text-sm text-gray-500 hover:text-gray-700"
          >
            記録を見る
          </a>
        </div>
      )}
    </div>
  );
}
