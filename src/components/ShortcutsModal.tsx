"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Keyboard, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

const ROWS: { action: string; keys: string[] }[] = [
  { action: "Abrir este painel de atalhos", keys: ["?"] },
  { action: "Abrir este painel (alternativa)", keys: ["F1"] },
  { action: "Abrir atalhos (alternativa)", keys: ["Ctrl", "/"] },
  { action: "Fechar este painel", keys: ["Esc"] },
  { action: "Executar simulação", keys: ["E"] },
  { action: "Pausar execução automática", keys: ["P"] },
  { action: "Continuar execução automática", keys: ["C"] },
  { action: "Próximo passo", keys: ["→"] },
  { action: "Passo anterior", keys: ["←"] },
  { action: "Reiniciar execução (volta ao primeiro passo)", keys: ["R"] },
  { action: "Reiniciar tudo (dados e simulação)", keys: ["Shift", "R"] }
];

interface ShortcutsModalProps {
  open: boolean;
  onClose: () => void;
}

export function ShortcutsModal({ open, onClose }: ShortcutsModalProps) {
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descId = useId();

  const close = useCallback(() => onClose(), [onClose]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => closeRef.current?.focus(), 0);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const modal =
    mounted && typeof document !== "undefined"
      ? createPortal(
          <AnimatePresence>
            {open && (
              <motion.div
                role="presentation"
                className="fixed inset-0 z-[100] flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <button
                  type="button"
                  aria-label="Fechar atalhos"
                  className="absolute inset-0 bg-slate-950/55 backdrop-blur-md transition hover:bg-slate-950/65"
                  onClick={close}
                />
                <motion.div
                  id="shortcuts-dialog"
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={descId}
                  className="relative z-[101] w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-slate-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                >
                  <div className="border-b border-line bg-gradient-to-r from-secondary/15 via-transparent to-primary/10 px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-secondary/35 bg-secondary/15 text-secondary">
                          <Keyboard size={20} aria-hidden />
                        </span>
                        <div>
                          <h2 id={titleId} className="text-lg font-semibold text-white">
                            Atalhos do teclado
                          </h2>
                          <p id={descId} className="text-xs text-slate-400">
                            Funcionam com o foco fora de campos de texto e listas. No campo de valores do vetor, use os botões ou saia
                            do campo para usar atalhos.
                          </p>
                        </div>
                      </div>
                      <button
                        ref={closeRef}
                        type="button"
                        onClick={close}
                        className="rounded-lg border border-line bg-slate-900/60 p-2 text-slate-300 transition hover:border-primary/40 hover:text-white"
                        aria-label="Fechar"
                      >
                        <X size={18} />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-[min(70vh,520px)] overflow-y-auto px-5 py-4">
                    <ul className="space-y-2 text-sm">
                      {ROWS.map((row) => (
                        <li
                          key={row.action}
                          className="flex flex-col gap-1 rounded-lg border border-line/80 bg-slate-950/50 px-3 py-2 sm:flex-row sm:items-center sm:justify-between"
                        >
                          <span className="text-slate-200">{row.action}</span>
                          <span className="flex flex-shrink-0 flex-wrap items-center gap-1">
                            {row.keys.map((k) => (
                              <kbd
                                key={`${row.action}-${k}`}
                                className="rounded border border-line bg-slate-900 px-2 py-0.5 font-mono text-xs text-primary"
                              >
                                {k}
                              </kbd>
                            ))}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <p className="mt-4 text-xs text-slate-500">
                      Dica: o atalho <kbd className="rounded border border-line bg-slate-900 px-1.5 py-0.5 font-mono text-primary">?</kbd>{" "}
                      costuma ser <kbd className="rounded border border-line bg-slate-900 px-1.5 py-0.5 font-mono text-primary">Shift</kbd> +{" "}
                      <kbd className="rounded border border-line bg-slate-900 px-1.5 py-0.5 font-mono text-primary">/</kbd> em teclados QWERTY.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return modal;
}
