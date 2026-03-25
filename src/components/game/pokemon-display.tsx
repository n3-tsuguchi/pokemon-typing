"use client";

import Image from "next/image";
import type { Pokemon } from "@/lib/types";

interface Props {
  pokemon: Pokemon;
}

export function PokemonDisplay({ pokemon }: Props) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative h-40 w-40">
        <Image
          src={pokemon.spriteUrl}
          alt={pokemon.nameJa}
          fill
          className="object-contain"
          priority
        />
      </div>
      <p className="text-3xl font-bold tracking-wider text-gray-800">
        {pokemon.nameJa}
      </p>
      <p className="text-lg text-gray-400">
        {pokemon.nameRomaji}
      </p>
    </div>
  );
}
