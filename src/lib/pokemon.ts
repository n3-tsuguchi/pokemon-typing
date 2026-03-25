import type { Pokemon } from "./types";

const CACHE_KEY = "pokemon-data-v1";
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

interface CachedData {
  pokemon: Pokemon[];
  timestamp: number;
}

function getCachedData(): Pokemon[] | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const cached: CachedData = JSON.parse(raw);
    if (Date.now() - cached.timestamp > CACHE_DURATION) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return cached.pokemon;
  } catch {
    return null;
  }
}

function setCachedData(pokemon: Pokemon[]) {
  try {
    const data: CachedData = { pokemon, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch {
    // localStorage might be full
  }
}

async function fetchBatch(ids: number[]): Promise<Pokemon[]> {
  const results = await Promise.all(
    ids.map(async (id) => {
      const res = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${id}`
      );
      if (!res.ok) return null;
      const data = await res.json();
      const jaName = data.names.find(
        (n: { language: { name: string }; name: string }) =>
          n.language.name === "ja-Hrkt"
      );
      if (!jaName) return null;
      return {
        id,
        nameJa: jaName.name,
        nameRomaji: "",
        spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
      } satisfies Pokemon;
    })
  );
  return results.filter((p): p is Pokemon => p !== null);
}

export async function fetchAllPokemon(): Promise<Pokemon[]> {
  const cached = getCachedData();
  if (cached) return cached;

  const allPokemon: Pokemon[] = [];
  const BATCH_SIZE = 20;

  for (let i = 1; i <= 151; i += BATCH_SIZE) {
    const ids = Array.from(
      { length: Math.min(BATCH_SIZE, 152 - i) },
      (_, idx) => i + idx
    );
    const batch = await fetchBatch(ids);
    allPokemon.push(...batch);
  }

  setCachedData(allPokemon);
  return allPokemon;
}
