"use client";

import { Pause, Play, Redo2, SkipForward, StepBack, StepForward } from "lucide-react";
import { useId } from "react";
import { Card } from "@/components/ui/Card";

interface ExecutionControlsProps {
  running: boolean;
  hasSteps: boolean;
  pointer: number;
  stepsCount: number;
  hasMountedVector: boolean;
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
  pointer,
  stepsCount,
  hasMountedVector,
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
  const speedId = useId();
  const progressId = useId();
  const statusId = useId();

  const atEnd = hasSteps && pointer >= stepsCount - 1;
  const atStart = pointer <= 0;

  const canPause = hasSteps && running;
  const canContinue = hasSteps && !running && !atEnd;
  const canRestart = hasSteps;
  const canPrev = hasSteps && !atStart;
  const canNext = hasSteps && !atEnd;

  const statusText = running
    ? "Executando"
    : hasSteps
      ? atEnd
        ? "Pausado no último passo"
        : "Pausado"
      : "Aguardando execução";

  return (
    <Card title="Controles de execução" subtitle="Controle completo da simulação passo a passo.">
      <div className="space-y-4">
        <div className="flex flex-wrap gap-2" role="toolbar" aria-label="Controles da simulação">
          <button
            type="button"
            onClick={onExecute}
            disabled={!hasMountedVector}
            className="rounded-lg bg-primary px-3 py-2 text-sm font-semibold text-slate-950 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Play size={16} className="mr-1 inline-block" aria-hidden />
            Executar
          </button>
          <button
            type="button"
            onClick={onPause}
            disabled={!canPause}
            className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Pause size={16} className="mr-1 inline-block" aria-hidden />
            Pausar
          </button>
          <button
            type="button"
            onClick={onContinue}
            disabled={!canContinue}
            className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <SkipForward size={16} className="mr-1 inline-block" aria-hidden />
            Continuar
          </button>
          <button
            type="button"
            onClick={onRestart}
            disabled={!canRestart}
            className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Redo2 size={16} className="mr-1 inline-block" aria-hidden />
            Reiniciar execução
          </button>
          <button
            type="button"
            onClick={onPrev}
            disabled={!canPrev}
            className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <StepBack size={16} className="mr-1 inline-block" aria-hidden />
            Passo anterior
          </button>
          <button
            type="button"
            onClick={onNext}
            disabled={!canNext}
            className="rounded-lg border border-line px-3 py-2 text-sm text-slate-100 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <StepForward size={16} className="mr-1 inline-block" aria-hidden />
            Próximo passo
          </button>
        </div>

        <div className="space-y-2">
          <label htmlFor={speedId} className="text-xs text-slate-400">
            Velocidade ({speed}ms por passo)
          </label>
          <input
            id={speedId}
            type="range"
            min={250}
            max={5000}
            step={50}
            value={speed}
            onChange={(e) => onSpeed(Number(e.target.value))}
            className="w-full"
            aria-valuemin={250}
            aria-valuemax={5000}
            aria-valuenow={speed}
          />
        </div>

        <div>
          <div className="mb-1 flex justify-between text-xs text-slate-400">
            <span id={progressId}>Progresso</span>
            <span aria-hidden>{progress}%</span>
          </div>
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            aria-labelledby={progressId}
            className="h-2 w-full overflow-hidden rounded-full bg-slate-900"
          >
            <div className="h-full bg-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
          <p id={statusId} className="mt-2 text-xs text-slate-400" aria-live="polite" aria-atomic="true">
            Status: {statusText}
          </p>
        </div>
      </div>
    </Card>
  );
}
