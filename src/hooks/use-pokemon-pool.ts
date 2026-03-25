"use client";

import { useMemo } from "react";
import { POKEMON_DATA } from "@/lib/pokemon-data";
import type { Pokemon } from "@/lib/types";

// Lazy imports for gen 2 & 3
let gen2Data: Pokemon[] | null = null;
let gen3Data: Pokemon[] | null = null;

function getGen2(): Pokemon[] {
  if (!gen2Data) {
    gen2Data = require("@/lib/pokemon-data-gen2").POKEMON_DATA_GEN2;
  }
  return gen2Data!;
}

function getGen3(): Pokemon[] {
  if (!gen3Data) {
    gen3Data = require("@/lib/pokemon-data-gen3").POKEMON_DATA_GEN3;
  }
  return gen3Data!;
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function getPokemonByGens(selectedGens: number[]): Pokemon[] {
  let pool: Pokemon[] = [];
  if (selectedGens.includes(1)) pool = pool.concat(POKEMON_DATA);
  if (selectedGens.includes(2)) pool = pool.concat(getGen2());
  if (selectedGens.includes(3)) pool = pool.concat(getGen3());
  return pool;
}

export function usePokemonPool(selectedGens: number[] = [1]) {
  const pokemon = useMemo(() => {
    const pool = getPokemonByGens(selectedGens);
    return shuffle(pool);
  }, [selectedGens.join(",")]);

  return { pokemon, loading: false, error: null };
}
