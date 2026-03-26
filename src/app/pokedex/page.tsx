"use client";

import { useState, useMemo } from "react";
import { PokedexGrid } from "@/components/pokedex/pokedex-grid";
import { GENERATIONS } from "@/lib/generations";

export default function PokedexPage() {
  const [selectedGen, setSelectedGen] = useState<number | null>(null);

  return (
    <div className="mx-auto max-w-4xl px-4 py-6 sm:py-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-orange-500 text-white shadow-md">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
          </svg>
        </div>
        <h1 className="text-2xl font-bold text-gray-900">ポケモン図鑑</h1>
      </div>

      {/* Generation filter */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setSelectedGen(null)}
          className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
            selectedGen === null
              ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
              : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
          }`}
        >
          すべて
        </button>
        {GENERATIONS.map((gen) => (
          <button
            key={gen.id}
            onClick={() => setSelectedGen(gen.id)}
            className={`rounded-full px-4 py-1.5 text-xs sm:text-sm font-semibold transition-all active:scale-95 ${
              selectedGen === gen.id
                ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-md"
                : "border border-gray-200 bg-white text-gray-500 hover:bg-gray-50"
            }`}
          >
            {gen.label}
          </button>
        ))}
      </div>

      <PokedexGrid selectedGen={selectedGen} />
    </div>
  );
}
