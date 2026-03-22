"use client";

import { AnimatePresence, motion } from "framer-motion";
import { BookOpen, X } from "lucide-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

export function VectorIntroModal() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();
  const descriptionId = useId();

  const close = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => triggerRef.current?.focus());
  }, []);

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

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

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
                  aria-label="Fechar explicação"
                  className="absolute inset-0 bg-slate-950/55 backdrop-blur-md transition hover:bg-slate-950/65"
                  onClick={close}
                />
                <motion.div
                  role="dialog"
                  aria-modal="true"
                  aria-labelledby={titleId}
                  aria-describedby={descriptionId}
                  className="relative z-[101] w-full max-w-lg overflow-hidden rounded-2xl border border-line bg-slate-950/90 shadow-[0_24px_80px_rgba(0,0,0,0.55)] backdrop-blur-xl"
                  initial={{ opacity: 0, y: 16, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 12, scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                >
                  <div className="border-b border-line bg-gradient-to-r from-primary/10 via-transparent to-accent/10 px-5 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/30 bg-primary/15 text-primary">
                          <BookOpen size={20} aria-hidden />
                        </span>
                        <div>
                          <h2 id={titleId} className="text-lg font-semibold text-white">
                            O que é um vetor?
                          </h2>
                          <p id={descriptionId} className="text-xs text-slate-400">
                            Uma explicação bem direta para quem está começando.
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

                  <div className="max-h-[min(70vh,560px)] space-y-5 overflow-y-auto px-5 py-5 text-sm leading-relaxed text-slate-200">
                    <section className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-primary">Em poucas palavras</h3>
                      <p>
                        Um <strong className="text-white">vetor</strong> (também chamado de <em>array</em>) é uma forma de
                        guardar <strong className="text-white">vários valores</strong> em sequência, usando{" "}
                        <strong className="text-white">uma variável</strong> com{" "}
                        <strong className="text-white">posições numeradas</strong> chamadas <strong className="text-white">índices</strong>.
                      </p>
                      <p className="text-slate-300">
                        O índice quase sempre começa em <span className="font-mono text-accent">0</span>: o primeiro elemento é o
                        índice <span className="font-mono text-accent">0</span>, o segundo é o{" "}
                        <span className="font-mono text-accent">1</span>, e assim por diante.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-accent">Analogia do dia a dia</h3>
                      <p>
                        Pense em uma <strong className="text-white">fileira de gavetas numeradas</strong> na parede: gaveta{" "}
                        <span className="font-mono text-primary">0</span>, gaveta <span className="font-mono text-primary">1</span>, gaveta{" "}
                        <span className="font-mono text-primary">2</span>…
                      </p>
                      <p className="text-slate-300">
                        Você não precisa inventar um nome diferente para cada coisa guardada — você só diz{" "}
                        <strong className="text-white">qual gaveta</strong> quer abrir. No código, isso é bem parecido: o vetor é a
                        fileira e o <strong className="text-white">índice</strong> é o número da gaveta.
                      </p>
                    </section>

                    <section className="space-y-2">
                      <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-400">Exemplo simples (Portugol)</h3>
                      <pre className="overflow-x-auto rounded-xl border border-line bg-slate-950/80 p-3 font-mono text-xs text-slate-100 shadow-inner">
{`programa {
  funcao inicio() {
    inteiro notas[3]
    notas[0] <- 8
    notas[1] <- 9
    notas[2] <- 7
    escreva(notas[1])  // exibe 9
  }
}`}
                      </pre>
                      <p className="text-xs text-slate-400">
                        Aqui existem <strong className="text-slate-200">3 posições</strong> (índices <span className="font-mono">0</span>,{" "}
                        <span className="font-mono">1</span> e <span className="font-mono">2</span>). A linha com{" "}
                        <span className="font-mono text-accent">escreva(notas[1])</span> mostra o valor da{" "}
                        <strong className="text-slate-200">segunda</strong> posição.
                      </p>
                    </section>

                    <p className="rounded-xl border border-primary/20 bg-primary/5 px-3 py-2 text-xs text-slate-300">
                      Dica: nesta aplicação, você pode executar passo a passo e ver o “raio-x” — qual linha roda, qual índice está
                      ativo e qual valor foi lido naquele momento.
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )
      : null;

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center gap-2 rounded-lg border border-line bg-slate-900/60 px-3 py-2 text-sm text-slate-100 transition hover:border-primary/35 hover:bg-slate-900 hover:text-white"
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <BookOpen size={16} className="text-primary" aria-hidden />
        O que é um vetor?
      </button>
      {modal}
    </>
  );
}
