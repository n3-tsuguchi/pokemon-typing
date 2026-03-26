"use client";

import { useEffect, useRef, useCallback, useState } from "react";
import { usePokemonPool } from "@/hooks/use-pokemon-pool";
import { saveScore, getBestScore } from "@/lib/firestore";
import { GENERATIONS } from "@/lib/generations";
import { playCorrectSE, playTimeUpSE, playCountdownSE } from "@/lib/sounds";
import { registerPokemon } from "@/lib/pokedex";
import { PokemonDisplay } from "./pokemon-display";
import { TypingInput } from "./typing-input";
import { TimerBar } from "./timer-bar";
import { ScoreDisplay } from "./score-display";
import { ResultScreen } from "./result-screen";

type Difficulty = "easy" | "normal" | "hard";

const DIFFICULTY_CONFIG = {
  easy:   { label: "かんたん", duration: 90, emoji: "\uD83C\uDF3F", desc: "90秒", color: "from-green-400 to-emerald-500", border: "border-green-200 hover:border-green-400", bg: "bg-green-50" },
  normal: { label: "ふつう",   duration: 60, emoji: "\uD83D\uDD25", desc: "60秒", color: "from-blue-400 to-blue-500",     border: "border-blue-200 hover:border-blue-400",  bg: "bg-blue-50"  },
  hard:   { label: "むずかしい", duration: 30, emoji: "\u26A1",       desc: "30秒", color: "from-red-400 to-red-500",       border: "border-red-200 hover:border-red-400",   bg: "bg-red-50"   },
} as const;

export function GameContainer() {
  const [selectedGens, setSelectedGens] = useState<number[]>([1]);
  const { pokemon } = usePokemonPool(selectedGens);

  const [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [countdown, setCountdown] = useState<number | null>(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showCorrectEffect, setShowCorrectEffect] = useState(false);
  const [pokemonKey, setPokemonKey] = useState(0);
  const [personalBest, setPersonalBest] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const savedRef = useRef(false);
  const currentIndexRef = useRef(0);
  const pokemonRef = useRef(pokemon);
  const durationRef = useRef(60);

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
          playTimeUpSE();
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

  const handleStart = useCallback((diff: Difficulty) => {
    // Play a silent audio on user gesture to unlock audio playback
    const audio = new Audio();
    audio.volume = 0;
    audio.play().catch(() => {});
    setPersonalBest(getBestScore());
    const duration = DIFFICULTY_CONFIG[diff].duration;
    durationRef.current = duration;
    setDifficulty(diff);
    setTimeLeft(duration);

    // Start countdown 3 → 2 → 1 → GO!
    setCountdown(3);
    playCountdownSE();
    let count = 3;
    const interval = setInterval(() => {
      count--;
      if (count > 0) {
        setCountdown(count);
        playCountdownSE();
      } else if (count === 0) {
        setCountdown(0); // "GO!"
        playCountdownSE(true);
      } else {
        clearInterval(interval);
        setCountdown(null);
        setStarted(true);
      }
    }, 700);
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
    playCorrectSE();
    if (answeredPokemon) {
      registerPokemon(answeredPokemon.id);
    }

    // Cry is now played directly in TypingInput for browser autoplay policy
  }, []);

  const handleSkip = useCallback(() => {
    setTotalAttempts((t) => t + 1);
    setCurrentIndex((i) => {
      currentIndexRef.current = i + 1;
      return i + 1;
    });
    setStreak(0);
    setPokemonKey((k) => k + 1);
  }, []);

  const currentPokemon =
    pokemon.length > 0 ? pokemon[currentIndex % pokemon.length] : null;

  // Countdown screen
  if (countdown !== null) {
    return (
      <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4">
        {countdown > 0 ? (
          <p key={countdown} className="animate-countdown-number text-8xl sm:text-9xl font-extrabold bg-gradient-to-b from-gray-700 to-gray-400 bg-clip-text text-transparent">
            {countdown}
          </p>
        ) : (
          <p key="go" className="animate-countdown-number text-6xl sm:text-7xl font-extrabold bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 bg-clip-text text-transparent">
            GO!
          </p>
        )}
      </div>
    );
  }

  // Start screen with difficulty selection
  if (!started) {
    return (
      <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center gap-6 sm:gap-8 px-4">
        <div className="text-center">
          <p className="mb-2 text-5xl sm:text-6xl">&#x1F3AE;</p>
          <h2 className="mb-2 text-xl sm:text-2xl font-bold text-gray-800">準備はいい？</h2>
          <p className="text-sm sm:text-base text-gray-500">世代と難易度を選んでスタート！</p>
        </div>

        {/* Generation selection */}
        <div className="w-full max-w-md">
          <p className="mb-2 text-xs font-semibold text-gray-400 uppercase tracking-wider text-center">世代を選択</p>
          <div className="flex flex-wrap justify-center gap-2">
            {GENERATIONS.map((gen) => {
              const isSelected = selectedGens.includes(gen.id);
              return (
                <button
                  key={gen.id}
                  onClick={() => {
                    setSelectedGens((prev) => {
                      if (isSelected && prev.length > 1) {
                        return prev.filter((g) => g !== gen.id);
                      }
                      if (!isSelected) {
                        return [...prev, gen.id].sort();
                      }
                      return prev;
                    });
                  }}
                  className={`rounded-full px-4 py-2 text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
                    isSelected
                      ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                      : "border border-gray-200 bg-white text-gray-500 hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {gen.label}
                  <span className="ml-1 opacity-70">{gen.region}</span>
                </button>
              );
            })}
          </div>
          <p className="mt-2 text-center text-[10px] sm:text-xs text-gray-300">
            {pokemon.length}匹のポケモン
          </p>
        </div>

        {/* Difficulty selection */}
        <div className="grid grid-cols-3 gap-3 w-full max-w-md">
          {(["easy", "normal", "hard"] as const).map((diff) => {
            const config = DIFFICULTY_CONFIG[diff];
            const isSelected = difficulty === diff;
            return (
              <button
                key={diff}
                onClick={() => setDifficulty(diff)}
                className={`relative rounded-2xl border-2 p-3 sm:p-4 text-center transition-all active:scale-95 ${
                  isSelected
                    ? `${config.border.split(" ")[0]} ${config.bg} shadow-md`
                    : "border-gray-200 bg-white hover:bg-gray-50"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm">
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                    </svg>
                  </div>
                )}
                <p className="text-2xl sm:text-3xl mb-1">{config.emoji}</p>
                <p className="text-xs sm:text-sm font-bold text-gray-800">{config.label}</p>
                <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5">{config.desc}</p>
              </button>
            );
          })}
        </div>

        <button
          onClick={() => handleStart(difficulty)}
          className={`group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r ${DIFFICULTY_CONFIG[difficulty].color} px-10 py-4 sm:px-12 sm:py-5 text-lg sm:text-xl font-bold text-white shadow-lg transition-all hover:shadow-xl hover:brightness-110 active:scale-95`}
        >
          <svg className="h-5 w-5 sm:h-6 sm:w-6 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
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
        difficulty={difficulty}
      />
    );
  }

  return (
    <div className="relative flex flex-col items-center px-4 py-3 sm:py-6">
      {/* Correct answer flash overlay */}
      {showCorrectEffect && (
        <div className="pointer-events-none fixed inset-0 z-50 bg-green-400/10 transition-opacity duration-300" />
      )}

      <div className="w-full max-w-lg space-y-3 sm:space-y-5">
        {/* Timer */}
        <TimerBar timeLeft={timeLeft} duration={durationRef.current} />

        {/* Score & Streak */}
        <ScoreDisplay score={score} totalAttempts={totalAttempts} streak={streak} showCorrectEffect={showCorrectEffect} personalBest={personalBest} />

        {/* Pokemon Display */}
        {currentPokemon && (
          <div className={showCorrectEffect ? "animate-correct" : ""}>
            <PokemonDisplay pokemon={currentPokemon} pokemonKey={pokemonKey} />
          </div>
        )}

        {/* Typing Input + Skip */}
        {currentPokemon && (
          <div className="space-y-2 sm:space-y-3">
            <TypingInput
              targetName={currentPokemon.nameJa}
              targetRomaji={currentPokemon.nameRomaji}
              onCorrect={handleCorrect}
              disabled={finished}
              cryUrl={`https://play.pokemonshowdown.com/audio/cries/${currentPokemon.nameEn}.mp3`}
            />
            <button
              onClick={handleSkip}
              className="flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white py-2.5 text-sm font-semibold text-gray-500 shadow-sm transition hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50 active:scale-[0.98]"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l-7.108 4.061a1.125 1.125 0 0 1-1.683-.977V8.69Z" />
              </svg>
              スキップ
            </button>
          </div>
        )}

        {/* Hint: Pokemon number */}
        {currentPokemon && (
          <p className="text-center text-xs sm:text-sm text-gray-300">
            No.{String(currentPokemon.id).padStart(3, "0")}
          </p>
        )}
      </div>
    </div>
  );
}
