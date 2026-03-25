"use client";

import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="flex min-h-[calc(100vh-56px)] flex-col items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute -bottom-20 -left-20 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute top-1/4 left-1/4 h-40 w-40 rounded-full bg-yellow-400/5 blur-2xl" />
      </div>

      <div className="relative max-w-lg text-center">
        {/* Pikachu */}
        <div className="mx-auto mb-2 flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-yellow-400/20 to-red-400/20 blur-xl" />
            <div className="relative mx-auto h-36 w-36 sm:h-52 sm:w-52 animate-float">
              <Image
                src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
                alt="ピカチュウ"
                fill
                sizes="(max-width: 640px) 144px, 208px"
                className="object-contain drop-shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>

        <h1 className="mb-3 text-3xl sm:text-5xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
            ポケモン
          </span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            タイピング
          </span>
        </h1>

        <p className="mb-3 sm:mb-4 text-xs sm:text-sm font-medium text-gray-400 tracking-widest uppercase">
          Pokemon Typing Challenge
        </p>

        <p className="mb-6 sm:mb-8 text-base sm:text-lg text-gray-500 leading-relaxed">
          初代151匹のポケモンの名前を<br />
          <span className="font-semibold text-gray-700">60秒</span>でどれだけタイプできるか挑戦しよう!
        </p>

        {/* Stats preview */}
        <div className="mb-6 sm:mb-8 flex justify-center gap-3 sm:gap-4">
          <div className="rounded-2xl border border-gray-200 bg-white/70 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-sm shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-red-500">151</p>
            <p className="text-[10px] sm:text-xs text-gray-400">ポケモン</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/70 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-sm shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-blue-500">60<span className="text-sm sm:text-base">秒</span></p>
            <p className="text-[10px] sm:text-xs text-gray-400">制限時間</p>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white/70 px-4 py-2.5 sm:px-5 sm:py-3 backdrop-blur-sm shadow-sm">
            <p className="text-xl sm:text-2xl font-bold text-yellow-500">&#9889;</p>
            <p className="text-[10px] sm:text-xs text-gray-400">タイピング</p>
          </div>
        </div>

        <Link
          href="/game"
          className="group relative inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-red-500 to-red-600 px-8 py-3.5 sm:px-10 sm:py-4 text-base sm:text-lg font-bold text-white shadow-lg shadow-red-500/25 transition-all hover:shadow-xl hover:shadow-red-500/30 hover:brightness-110 active:scale-95"
        >
          <svg className="h-5 w-5 transition-transform group-hover:rotate-12" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
          </svg>
          ゲームスタート
        </Link>
      </div>
    </div>
  );
}
