"use client";

import { useEffect } from "react";

function isTypingInField(target: EventTarget | null): boolean {
  if (!target || !(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return true;
  if (target.isContentEditable) return true;
  return false;
}

export interface ShortcutGateFlags {
  hasMountedVector: boolean;
  canContinue: boolean;
  canPause: boolean;
  canRestart: boolean;
  canPrev: boolean;
  canNext: boolean;
}

export interface UseAppKeyboardShortcutsParams extends ShortcutGateFlags {
  shortcutsOpen: boolean;
  setShortcutsOpen: (open: boolean) => void;
  onExecute: () => void;
  onPause: () => void;
  onContinue: () => void;
  onRestartExecution: () => void;
  onResetAll: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Atalhos quando o foco NÃO está em campo de texto/select:
 * ? / Shift+/ — abrir painel | F1 | Ctrl+/ — abrir painel
 * Esc — fechar painel (com painel aberto)
 * E — Executar | P — Pausar | C — Continuar
 * ← / → — passo anterior / próximo
 * R — Reiniciar execução | Shift+R — Reiniciar tudo
 */
export function useAppKeyboardShortcuts({
  shortcutsOpen,
  setShortcutsOpen,
  hasMountedVector,
  canContinue,
  canPause,
  canRestart,
  canPrev,
  canNext,
  onExecute,
  onPause,
  onContinue,
  onRestartExecution,
  onResetAll,
  onNext,
  onPrev
}: UseAppKeyboardShortcutsParams) {
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;

      if (shortcutsOpen) {
        if (e.key === "Escape") {
          e.preventDefault();
          setShortcutsOpen(false);
        }
        return;
      }

      if (isTypingInField(e.target)) return;

      if (e.shiftKey && e.key.toLowerCase() === "r") {
        e.preventDefault();
        onResetAll();
        return;
      }

      if (e.key === "?" || (e.key === "/" && e.shiftKey)) {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      if (e.key === "F1") {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      if (e.ctrlKey && (e.key === "/" || e.code === "Slash")) {
        e.preventDefault();
        setShortcutsOpen(true);
        return;
      }

      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;

      switch (k) {
        case "e":
          if (hasMountedVector) {
            e.preventDefault();
            onExecute();
          }
          break;
        case "p":
          if (canPause) {
            e.preventDefault();
            onPause();
          }
          break;
        case "c":
          if (canContinue) {
            e.preventDefault();
            onContinue();
          }
          break;
        case "r":
          if (canRestart) {
            e.preventDefault();
            onRestartExecution();
          }
          break;
        case "ArrowLeft":
          if (canPrev) {
            e.preventDefault();
            onPrev();
          }
          break;
        case "ArrowRight":
          if (canNext) {
            e.preventDefault();
            onNext();
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    shortcutsOpen,
    setShortcutsOpen,
    hasMountedVector,
    canContinue,
    canPause,
    canRestart,
    canPrev,
    canNext,
    onExecute,
    onPause,
    onContinue,
    onRestartExecution,
    onResetAll,
    onNext,
    onPrev
  ]);
}
