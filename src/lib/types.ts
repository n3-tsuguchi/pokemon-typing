export interface Pokemon {
  id: number;
  nameJa: string;
  nameRomaji: string;
  spriteUrl: string;
}

export interface GameScore {
  userId: string;
  score: number;
  totalAttempts: number;
  accuracy: number;
  timestamp: Date;
}

export type GamePhase = "idle" | "playing" | "finished";

export interface GameState {
  phase: GamePhase;
  score: number;
  totalAttempts: number;
  timeLeft: number;
  currentPokemonIndex: number;
}

export type GameAction =
  | { type: "START" }
  | { type: "TICK" }
  | { type: "CORRECT" }
  | { type: "SKIP" }
  | { type: "FINISH" };
