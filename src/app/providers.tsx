"use client";

import { AuthProvider } from "@/lib/auth-context";
import { Header } from "@/components/layout/header";
import type { ReactNode } from "react";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <Header />
      <main className="flex-1">{children}</main>
    </AuthProvider>
  );
}
