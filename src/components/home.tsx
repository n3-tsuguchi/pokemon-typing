"use client";

import Image from "next/image";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export default function HomePage() {
  const { user, loading } = useAuth();

  return (
    <div className="flex min-h-[80vh] flex-col items-center justify-center px-4">
      <div className="max-w-lg text-center">
        <div className="relative mx-auto mb-6 h-48 w-48">
          <Image
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
            alt="ピカチュウ"
            fill
            className="object-contain"
            priority
          />
        </div>
        <h1 className="mb-4 text-5xl font-bold text-gray-900">
          ポケモンタイピング
        </h1>
        <p className="mb-8 text-lg text-gray-600">
          初代151匹のポケモンの名前を60秒でどれだけタイプできるか挑戦しよう！
        </p>
        {loading ? (
          <div className="h-12" />
        ) : user ? (
          <Link
            href="/game"
            className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-blue-700"
          >
            ゲームをプレイ
          </Link>
        ) : (
          <Link
            href="/login"
            className="inline-block rounded-lg bg-blue-600 px-8 py-4 text-lg font-medium text-white transition hover:bg-blue-700"
          >
            ログインして始める
          </Link>
        )}
      </div>
    </div>
  );
}
