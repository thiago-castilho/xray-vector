import { motion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Snapshot } from "@/types/simulator";

interface XRayPanelProps {
  codeLines: string[];
  step: Snapshot | null;
}

export function XRayPanel({ codeLines, step }: XRayPanelProps) {
  return (
    <Card title="X-Ray da execução" subtitle="Acompanhe linha, índice, valor e variáveis em tempo real.">
      {!step ? (
        <p className="text-sm text-slate-400">Clique em Executar para gerar os passos da simulação.</p>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="overflow-hidden rounded-xl border border-line bg-slate-950">
            <div className="border-b border-line px-3 py-2 text-xs text-slate-400">Linha em execução</div>
            <div className="p-3 text-sm">
              {codeLines.map((line, idx) => {
                const lineNumber = idx + 1;
                const active = lineNumber === step.line;
                return (
                  <div key={`${idx}-${line}`} className={`rounded px-2 py-1 ${active ? "code-line-active" : ""}`}>
                    <span className="mr-3 text-slate-500">{lineNumber}</span>
                    <span>{line}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="space-y-3">
            <div className="rounded-xl border border-line bg-slate-950 p-3">
              <p className="text-xs text-slate-400">Índice atual</p>
              <p className="text-lg font-semibold text-primary">{step.index ?? "-"}</p>
            </div>
            <div className="rounded-xl border border-line bg-slate-950 p-3">
              <p className="text-xs text-slate-400">Valor lido</p>
              <p className="text-lg font-semibold text-accent">{String(step.currentValue ?? "-")}</p>
            </div>
            <motion.div
              key={step.explanation}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-xl border border-primary/25 bg-primary/10 p-3 text-sm text-slate-100"
            >
              {step.explanation}
            </motion.div>
          </div>
        </div>
      )}
    </Card>
  );
}
