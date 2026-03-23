"use client";

import { useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

/**
 * Versão segura para hidratação: no SSR / 1º render no cliente devolve sempre `false`,
 * depois aplica a preferência real do sistema. Evita mismatch servidor vs cliente com `useReducedMotion()`.
 */
export function useClientReducedMotion(): boolean {
  const [mounted, setMounted] = useState(false);
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return false;
  return Boolean(prefersReduced);
}
