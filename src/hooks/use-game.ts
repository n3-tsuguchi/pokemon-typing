"use client";

import { useReducer, useEffect, useCallback, useRef } from "react";
import type { GameState, GameAction } from "@/lib/types";

const GAME_DURATION = 60;

const initialState: GameState = {
  phase: "idle",
  score: 0,
  totalAttempts: 0,
  timeLeft: GAME_DURATION,
  currentPokemonIndex: 0,
};

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START":
      return {
        ...initialState,
        phase: "playing",
        timeLeft: GAME_DURATION,
      };
    case "TICK":
      if (state.timeLeft <= 1) {
        return { ...state, timeLeft: 0, phase: "finished" };
      }
      return { ...state, timeLeft: state.timeLeft - 1 };
    case "CORRECT":
      return {
        ...state,
        score: state.score + 1,
        totalAttempts: state.totalAttempts + 1,
        currentPokemonIndex: state.currentPokemonIndex + 1,
      };
    case "SKIP":
      return {
        ...state,
        totalAttempts: state.totalAttempts + 1,
        currentPokemonIndex: state.currentPokemonIndex + 1,
      };
    case "FINISH":
      return { ...state, phase: "finished" };
    default:
      return state;
  }
}

export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const start = useCallback(() => {
    clearTimer();
    dispatch({ type: "START" });
  }, [clearTimer]);

  useEffect(() => {
    if (state.phase === "playing") {
      timerRef.current = setInterval(() => {
        dispatch({ type: "TICK" });
      }, 1000);
    } else {
      clearTimer();
    }
    return clearTimer;
  }, [state.phase, clearTimer]);

  const correct = useCallback(() => dispatch({ type: "CORRECT" }), []);
  const skip = useCallback(() => dispatch({ type: "SKIP" }), []);

  return { state, start, correct, skip };
}
