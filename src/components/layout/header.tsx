"use client";

import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <svg className="h-8 w-8 transition-transform group-hover:scale-110 drop-shadow-md" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="48" fill="#fff" stroke="#333" strokeWidth="4"/>
            <path d="M2 50 A48 48 0 0 1 98 50 Z" fill="#E3350D" stroke="#333" strokeWidth="4"/>
            <rect x="2" y="47" width="96" height="6" fill="#333"/>
            <circle cx="50" cy="50" r="14" fill="#fff" stroke="#333" strokeWidth="4"/>
            <circle cx="50" cy="50" r="8" fill="#fff" stroke="#333" strokeWidth="3"/>
          </svg>
          <span className="text-lg font-bold bg-gradient-to-r from-red-600 to-blue-600 bg-clip-text text-transparent">
            PokeTyping
          </span>
        </Link>
        <nav className="flex items-center gap-1">
          <Link
            href="/game"
            className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            ゲーム
          </Link>
          <Link
            href="/pokedex"
            className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            図鑑
          </Link>
          <Link
            href="/records"
            className="rounded-full px-4 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
          >
            記録
          </Link>
        </nav>
      </div>
    </header>
  );
}
