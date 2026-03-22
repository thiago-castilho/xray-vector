import { Card } from "@/components/ui/Card";
import { Snapshot } from "@/types/simulator";

interface DidacticPanelProps {
  step: Snapshot | null;
}

export function DidacticPanel({ step }: DidacticPanelProps) {
  const variables = step?.variables ?? {};
  const output = step?.output ?? [];

  return (
    <Card title="Painel didático" subtitle="Explicações simples para cada movimento da função." className="h-full">
      {!step ? (
        <p className="text-sm text-slate-400">Quando a execução começar, você verá as mudanças de variáveis aqui.</p>
      ) : (
        <div className="space-y-4" aria-live="polite" aria-atomic="false">
          <div className="rounded-xl border border-line bg-slate-950 p-3">
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Variáveis auxiliares</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {Object.entries(variables).map(([key, value]) => (
                <div key={key} className="rounded-lg border border-line bg-slate-900 px-3 py-2">
                  <p className="text-xs text-slate-400">{key}</p>
                  <p className="text-sm font-semibold text-slate-100">{String(value)}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-line bg-slate-950 p-3">
            <p className="text-xs uppercase tracking-wide text-slate-400">
              {step.done ? "Resultado final" : "Resultado parcial"}
            </p>
            <p className="mt-1 text-sm text-accent">{output.length ? JSON.stringify(output) : "Sem saída ainda"}</p>
          </div>

          <div className="rounded-xl border border-primary/30 bg-primary/10 p-3 text-sm text-slate-100">
            <p>
              {step.explanation} O índice atual mostra qual posição está sendo acessada e as variáveis mudam em tempo
              real para você enxergar o processo interno.
            </p>
          </div>
        </div>
      )}
    </Card>
  );
}
