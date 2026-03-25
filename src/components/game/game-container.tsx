"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePokemonPool } from "@/hooks/use-pokemon-pool";
import { saveScore } from "@/lib/firestore";
import { PokemonDisplay } from "./pokemon-display";
import { TypingInput } from "./typing-input";
import { TimerBar } from "./timer-bar";
import { ScoreDisplay } from "./score-display";
import { ResultScreen } from "./result-screen";

const GAME_DURATION = 60;

export function GameContainer() {
  const { pokemon } = usePokemonPool();

  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showCorrectEffect, setShowCorrectEffect] = useState(false);
  const [pokemonKey, setPokemonKey] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedRef = useRef(false);
  const currentIndexRef = useRef(0);
  const pokemonRef = useRef(pokemon);

  // Keep refs in sync
  currentIndexRef.current = currentIndex;
  pokemonRef.current = pokemon;

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  // Start timer when game starts
  useEffect(() => {
    if (!started) return;
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
  }, [started, clearTimer]);

  // Save score when finished
  useEffect(() => {
    if (finished && !savedRef.current) {
      savedRef.current = true;
      const accuracy =
        totalAttempts > 0 ? Math.round((score / totalAttempts) * 100) : 0;
      saveScore(score, totalAttempts, accuracy);
    }
  }, [finished, score, totalAttempts]);

  const handleStart = useCallback(() => {
    // Play a silent audio on user gesture to unlock audio playback
    const audio = new Audio();
    audio.volume = 0;
    audio.play().catch(() => {});
    setStarted(true);
  }, []);

  const handleCorrect = useCallback(() => {
    const pool = pokemonRef.current;
    const idx = currentIndexRef.current;
    const answeredPokemon = pool.length > 0
      ? pool[idx % pool.length]
      : null;

    setScore((s) => s + 1);
    setTotalAttempts((t) => t + 1);
    setCurrentIndex((i) => {
      currentIndexRef.current = i + 1;
      return i + 1;
    });
    setStreak((s) => {
      const newStreak = s + 1;
      setBestStreak((best) => Math.max(best, newStreak));
      return newStreak;
    });
    setShowCorrectEffect(true);
    setPokemonKey((k) => k + 1);
    setTimeout(() => setShowCorrectEffect(false), 400);

    // Cry is now played directly in TypingInput for browser autoplay policy
  }, []);

  const currentPokemon =
    pokemon.length > 0 ? pokemon[currentIndex % pokemon.length] : null;

  // Start screen
  if (!started) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-8">
        <div className="text-center">
          <p className="mb-2 text-6xl">&#x1F3AE;</p>
          <h2 className="mb-2 text-2xl font-bold text-gray-800">準備はいい？</h2>
          <p className="text-gray-500">60秒間でポケモンの名前をタイピング！</p>
        </div>
        <button
          onClick={handleStart}
          className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-12 py-5 text-xl font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 active:scale-95"
        >
          <svg className="h-6 w-6 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          スタート!
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <ResultScreen
        score={score}
        totalAttempts={totalAttempts}
        bestStreak={bestStreak}
      />
    );
  }

  return (
    <div className="relative flex min-h-[80vh] flex-col items-center py-6">
      {/* Correct answer flash overlay */}
      {showCorrectEffect && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-green-400/10 transition-opacity duration-300" />
      )}

      <div className="w-full max-w-lg space-y-5">
        {/* Timer */}
        <TimerBar timeLeft={timeLeft} />

        {/* Score & Streak */}
        <ScoreDisplay score={score} totalAttempts={totalAttempts} streak={streak} showCorrectEffect={showCorrectEffect} />

        {/* Pokemon Display */}
        {currentPokemon && (
          <div className={showCorrectEffect ? "animate-correct" : ""}>
            <PokemonDisplay pokemon={currentPokemon} pokemonKey={pokemonKey} />
          </div>
        )}

        {/* Typing Input */}
        {currentPokemon && (
          <TypingInput
            targetName={currentPokemon.nameJa}
            onCorrect={handleCorrect}
            disabled={finished}
            cryUrl={`https://play.pokemonshowdown.com/audio/cries/${currentPokemon.nameEn}.mp3`}
          />
        )}

        {/* Hint: Pokemon number */}
        {currentPokemon && (
          <p className="text-center text-sm text-gray-300">
            No.{String(currentPokemon.id).padStart(3, "0")}
          </p>
        )}
      </div>
    </div>
  );
}
