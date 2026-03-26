const POKEDEX_KEY = "pokemon-typing-pokedex";

function getStoredIds(): Set<number> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(POKEDEX_KEY);
    if (!raw) return new Set();
    return new Set(JSON.parse(raw) as number[]);
  } catch {
    return new Set();
  }
}

function saveIds(ids: Set<number>) {
  localStorage.setItem(POKEDEX_KEY, JSON.stringify([...ids]));
}

/** Register a Pokemon as caught */
export function registerPokemon(id: number) {
  const ids = getStoredIds();
  ids.add(id);
  saveIds(ids);
}

/** Get all caught Pokemon IDs */
export function getCaughtIds(): Set<number> {
  return getStoredIds();
}

/** Get total number of caught Pokemon */
export function getCaughtCount(): number {
  return getStoredIds().size;
}
