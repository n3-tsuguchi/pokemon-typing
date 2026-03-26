"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { POKEMON_DATA } from "@/lib/pokemon-data";
import { POKEMON_DATA_GEN2 } from "@/lib/pokemon-data-gen2";
import { POKEMON_DATA_GEN3 } from "@/lib/pokemon-data-gen3";
import { GENERATIONS } from "@/lib/generations";
import { getCaughtIds } from "@/lib/pokedex";
import type { Pokemon } from "@/lib/types";

const ALL_POKEMON: Pokemon[] = [
  ...POKEMON_DATA,
  ...POKEMON_DATA_GEN2,
  ...POKEMON_DATA_GEN3,
];

interface Props {
  selectedGen: number | null;
}

export function PokedexGrid({ selectedGen }: Props) {
  const [caughtIds, setCaughtIds] = useState<Set<number>>(new Set());

  useEffect(() => {
    setCaughtIds(getCaughtIds());
  }, []);

  const filteredPokemon = useMemo(() => {
    if (selectedGen === null) return ALL_POKEMON;
    const gen = GENERATIONS.find((g) => g.id === selectedGen);
    if (!gen) return ALL_POKEMON;
    return ALL_POKEMON.filter((p) => p.id >= gen.range[0] && p.id <= gen.range[1]);
  }, [selectedGen]);

  const caughtCount = useMemo(() => {
    return filteredPokemon.filter((p) => caughtIds.has(p.id)).length;
  }, [filteredPokemon, caughtIds]);

  const totalCount = filteredPokemon.length;
  const percentage = totalCount > 0 ? Math.round((caughtCount / totalCount) * 100) : 0;

  return (
    <div>
      {/* Progress bar */}
      <div className="mb-5 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-700">
            {caughtCount} / {totalCount} 匹ゲット
          </span>
          <span className={`text-sm font-bold ${
            percentage === 100 ? "text-yellow-500" : percentage >= 50 ? "text-blue-500" : "text-gray-400"
          }`}>
            {percentage}%
          </span>
        </div>
        <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full transition-all duration-500 ${
              percentage === 100
                ? "bg-gradient-to-r from-yellow-400 to-amber-400"
                : "bg-gradient-to-r from-blue-400 to-blue-500"
            }`}
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 sm:gap-3">
        {filteredPokemon.map((pokemon) => {
          const caught = caughtIds.has(pokemon.id);
          return (
            <div
              key={pokemon.id}
              className={`group relative rounded-2xl border p-1.5 sm:p-2 text-center transition-all ${
                caught
                  ? "border-gray-100 bg-white shadow-sm hover:shadow-md hover:border-blue-200"
                  : "border-gray-100 bg-gray-50"
              }`}
            >
              <div className="relative mx-auto h-12 w-12 sm:h-16 sm:w-16">
                <Image
                  src={pokemon.spriteUrl}
                  alt={caught ? pokemon.nameJa : "???"}
                  fill
                  sizes="64px"
                  className={`object-contain transition-all ${
                    caught ? "" : "brightness-0 opacity-20"
                  }`}
                />
              </div>
              <p className={`mt-1 text-[9px] sm:text-[10px] font-medium truncate ${
                caught ? "text-gray-700" : "text-gray-300"
              }`}>
                {caught ? pokemon.nameJa : "???"}
              </p>
              <p className="text-[8px] sm:text-[9px] text-gray-300">
                {String(pokemon.id).padStart(3, "0")}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
