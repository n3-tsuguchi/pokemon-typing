"use client";

import Link from "next/link";
import { useAuth } from "@/lib/auth-context";

export function Header() {
  const { user, loading } = useAuth();

  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-bold text-gray-900">
          ポケモンタイピング
        </Link>
        <nav className="flex items-center gap-4">
          {!loading && user && (
            <>
              <Link
                href="/game"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                ゲーム
              </Link>
              <Link
                href="/records"
                className="text-sm font-medium text-gray-600 hover:text-gray-900"
              >
                記録
              </Link>
            </>
          )}
          {!loading && !user && (
            <Link
              href="/login"
              className="text-sm font-medium text-blue-600 hover:text-blue-800"
            >
              ログイン
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
