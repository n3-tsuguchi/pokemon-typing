"use client";

import { useState } from "react";
import { POKEMON_DATA } from "@/lib/pokemon-data";
import type { Pokemon } from "@/lib/types";

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function usePokemonPool() {
  const [pokemon, setPokemon] = useState<Pokemon[]>(() => shuffle(POKEMON_DATA));

  const reshuffle = () => {
    setPokemon(shuffle(POKEMON_DATA));
  };

  return { pokemon, loading: false, error: null, reshuffle };
}
