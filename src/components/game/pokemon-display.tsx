"use client";

import Image from "next/image";
import type { Pokemon } from "@/lib/types";

interface Props {
  pokemon: Pokemon;
  pokemonKey: number;
}

export function PokemonDisplay({ pokemon, pokemonKey }: Props) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Pokemon image with glow */}
      <div className="relative">
        <div className="absolute -inset-6 rounded-full bg-gradient-to-br from-blue-400/15 to-purple-400/15 blur-2xl" />
        <div
          key={pokemonKey}
          className="relative h-48 w-48 animate-pokemon-enter"
        >
          <Image
            src={pokemon.spriteUrl}
            alt={pokemon.nameJa}
            fill
            className="object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.15)]"
            priority
          />
        </div>
      </div>

      {/* Pokemon name display */}
      <div className="rounded-2xl bg-white/80 px-8 py-3 shadow-sm backdrop-blur-sm border border-gray-100">
        <p className="text-3xl font-bold tracking-wider text-gray-800">
          {pokemon.nameJa}
        </p>
      </div>
      <p className="text-sm font-medium text-gray-400 tracking-wide">
        {pokemon.nameRomaji}
      </p>
    </div>
  );
}
