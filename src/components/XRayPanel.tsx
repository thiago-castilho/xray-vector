"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Snapshot } from "@/types/simulator";

interface XRayPanelProps {
  codeLines: string[];
  step: Snapshot | null;
  lineOffset?: number;
}

export function XRayPanel({ codeLines, step, lineOffset = 0 }: XRayPanelProps) {
  const reduceMotion = useReducedMotion();

  return (
    <Card title="X-Ray da execução" subtitle="Acompanhe linha, índice, valor e variáveis em tempo real.">
      {!step ? (
        <div
          role="status"
          className="flex min-h-[330px] items-center justify-center rounded-xl border border-line bg-slate-950/40 p-4"
        >
          <p className="text-sm text-slate-400">Clique em Executar para gerar os passos da simulação.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="overflow-hidden rounded-xl border border-line bg-slate-950">
            <div className="border-b border-line px-3 py-2 text-xs text-slate-400">Linha em execução</div>
            <div className="p-3 text-sm font-mono" role="region" aria-label="Código da função com linha ativa destacada">
              {codeLines.map((line, idx) => {
                const lineNumber = idx + 1;
                const active = lineNumber === step.line + lineOffset;
                return (
                  <div
                    key={`${idx}-${line}`}
                    aria-current={active ? "true" : undefined}
                    className={`rounded px-2 py-1 ${active ? "code-line-active" : ""}`}
                  >
                    <span className="mr-3 inline-block w-6 text-slate-500" aria-hidden>
                      {String(lineNumber).padStart(2, "0")}
                    </span>
                    <span className="whitespace-pre">{line}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3" aria-live="polite" aria-atomic="false">
            <div className="rounded-xl border border-line bg-slate-950 p-3 xl:col-span-1">
              <p className="text-xs text-slate-400">Índice atual</p>
              <p className="text-lg font-semibold text-primary">{step.index ?? "-"}</p>
            </div>
            <div className="rounded-xl border border-line bg-slate-950 p-3 xl:col-span-1">
              <p className="text-xs text-slate-400">Valor lido</p>
              <p className="text-lg font-semibold text-accent">{String(step.currentValue ?? "-")}</p>
            </div>
            <motion.div
              key={step.explanation}
              initial={reduceMotion ? false : { opacity: 0, y: 8 }}
              animate={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              className="rounded-xl border border-primary/25 bg-primary/10 p-3 text-sm text-slate-100 md:col-span-2 xl:col-span-1"
            >
              {step.explanation}
            </motion.div>
          </div>
        </div>
      )}
    </Card>
  );
}
