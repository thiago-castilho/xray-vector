import { Pause, Play, Redo2, SkipForward, StepBack, StepForward } from "lucide-react";
import { Card } from "@/components/ui/Card";

interface ExecutionControlsProps {
  running: boolean;
  hasSteps: boolean;
  speed: number;
  progress: number;
  onExecute: () => void;
  onPause: () => void;
  onContinue: () => void;
  onRestart: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSpeed: (v: number) => void;
}

export function ExecutionControls({
  running,
  hasSteps,
  speed,
  progress,
  onExecute,
  onPause,
  onContinue,
  onRestart,
  onNext,
  onPrev,
  onSpeed
}: ExecutionControlsProps) {
  return (
    <Card title="Controles de execução" subtitle="Controle completo da simulação passo a passo.">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2">
          <button onClick={onExecute} className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-slate-950">
            <Play size={16} className="mr-1 inline-block" />
            Executar
          </button>
          <button onClick={onPause} className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100">
            <Pause size={16} className="mr-1 inline-block" />
            Pausar
          </button>
          <button onClick={onContinue} className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100">
            <SkipForward size={16} className="mr-1 inline-block" />
            Continuar
          </button>
          <button onClick={onRestart} className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100">
            <Redo2 size={16} className="mr-1 inline-block" />
            Reiniciar execução
          </button>
          <button onClick={onPrev} className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100">
            <StepBack size={16} className="mr-1 inline-block" />
            Passo anterior
          </button>
          <button onClick={onNext} className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100">
            <StepForward size={16} className="mr-1 inline-block" />
            Próximo passo
          </button>
        </div>

        <div className="space-y-2">
          <label className="text-xs text-slate-400">Velocidade ({speed}ms por passo)</label>
          <input
            type="range"
            min={250}
            max={2000}
            step={50}
            value={speed}
            onChange={(e) => onSpeed(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span>Progresso</span>
            <span>{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-900">
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Status: {running ? "Executando" : hasSteps ? "Pausado/finalizado" : "Aguardando execução"}
          </p>
        </div>
      </div>
    </Card>
  );
}
