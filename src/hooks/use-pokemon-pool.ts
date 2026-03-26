"use client";

import { useMemo } from "react";
import { POKEMON_DATA } from "@/lib/pokemon-data";
import type { Pokemon } from "@/lib/types";

// Lazy imports for gen 2-9
let gen2Data: Pokemon[] | null = null;
let gen3Data: Pokemon[] | null = null;
let gen4Data: Pokemon[] | null = null;
let gen5Data: Pokemon[] | null = null;
let gen6Data: Pokemon[] | null = null;
let gen7Data: Pokemon[] | null = null;
let gen8Data: Pokemon[] | null = null;
let gen9Data: Pokemon[] | null = null;

function getGenData(gen: number): Pokemon[] {
  switch (gen) {
    case 1: return POKEMON_DATA;
    case 2: return (gen2Data ??= require("@/lib/pokemon-data-gen2").POKEMON_DATA_GEN2);
    case 3: return (gen3Data ??= require("@/lib/pokemon-data-gen3").POKEMON_DATA_GEN3);
    case 4: return (gen4Data ??= require("@/lib/pokemon-data-gen4").POKEMON_DATA_GEN4);
    case 5: return (gen5Data ??= require("@/lib/pokemon-data-gen5").POKEMON_DATA_GEN5);
    case 6: return (gen6Data ??= require("@/lib/pokemon-data-gen6").POKEMON_DATA_GEN6);
    case 7: return (gen7Data ??= require("@/lib/pokemon-data-gen7").POKEMON_DATA_GEN7);
    case 8: return (gen8Data ??= require("@/lib/pokemon-data-gen8").POKEMON_DATA_GEN8);
    case 9: return (gen9Data ??= require("@/lib/pokemon-data-gen9").POKEMON_DATA_GEN9);
    default: return [];
  }
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export function usePokemonPool(selectedGens: number[] = [1]) {
  const pokemon = useMemo(() => {
    let pool: Pokemon[] = [];
    for (const gen of selectedGens) {
      pool = pool.concat(getGenData(gen));
    }
    return shuffle(pool);
  }, [selectedGens.join(",")]);

  return { pokemon, loading: false, error: null };
}
