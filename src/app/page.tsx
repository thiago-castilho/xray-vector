"use client";

import { useMemo, useState } from "react";
import { ArrayVisualizer } from "@/components/ArrayVisualizer";
import { DidacticPanel } from "@/components/DidacticPanel";
import { ExecutionControls } from "@/components/ExecutionControls";
import { FunctionPanel } from "@/components/FunctionPanel";
import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { ShortcutsModal } from "@/components/ShortcutsModal";
import { SiteFooter } from "@/components/SiteFooter";
import { XRayPanel } from "@/components/XRayPanel";
import { useAppKeyboardShortcuts } from "@/hooks/useAppKeyboardShortcuts";
import { useSimulation } from "@/hooks/useSimulation";
import { ExampleId } from "@/types/simulator";

export default function HomePage() {
  const sim = useSimulation();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);

  const shortcutFlags = useMemo(() => {
    const hasSteps = sim.steps.length > 0;
    const stepsCount = sim.steps.length;
    const atEnd = hasSteps && sim.pointer >= stepsCount - 1;
    const atStart = sim.pointer <= 0;
    return {
      hasMountedVector: sim.mountedArray.length > 0,
      canPause: hasSteps && sim.running,
      canContinue: hasSteps && !sim.running && !atEnd,
      canRestart: hasSteps,
      canPrev: hasSteps && !atStart,
      canNext: hasSteps && !atEnd
    };
  }, [sim.steps.length, sim.pointer, sim.running, sim.mountedArray.length]);

  useAppKeyboardShortcuts({
    shortcutsOpen,
    setShortcutsOpen,
    ...shortcutFlags,
    onExecute: sim.createSimulation,
    onPause: () => sim.setRunning(false),
    onContinue: () => sim.setRunning(true),
    onRestartExecution: sim.restartExecution,
    onResetAll: sim.resetAll,
    onNext: sim.next,
    onPrev: sim.prev
  });

  return (
    <main
      id="conteudo-principal"
      tabIndex={-1}
      className="mx-auto max-w-7xl space-y-4 p-3 outline-none md:space-y-5 md:p-6"
    >
      <Header onReset={sim.resetAll} onOpenShortcuts={() => setShortcutsOpen(true)} shortcutsOpen={shortcutsOpen} />

      <ShortcutsModal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} />

      <section className="grid gap-4 lg:grid-cols-2" aria-label="Entrada de dados e função de exemplo">
        <InputPanel
          input={sim.arrayInput}
          setInput={sim.setArrayInput}
          mountedArray={sim.mountedArray}
          onMount={sim.mountArray}
          error={sim.error}
        />

        <FunctionPanel
          examples={sim.examples}
          selectedId={sim.exampleId}
          onChange={(id) => sim.setExampleId(id as ExampleId)}
          language={sim.language}
          onLanguageChange={sim.setLanguage}
          codeLines={sim.selectedCodeLines}
          targetInput={sim.searchTargetInput}
          setTargetInput={sim.setSearchTargetInput}
        />
      </section>

      <ExecutionControls
        running={sim.running}
        hasSteps={sim.steps.length > 0}
        pointer={sim.pointer}
        stepsCount={sim.steps.length}
        hasMountedVector={sim.mountedArray.length > 0}
        speed={sim.speed}
        progress={sim.progress}
        onExecute={sim.createSimulation}
        onPause={() => sim.setRunning(false)}
        onContinue={() => sim.setRunning(true)}
        onRestart={sim.restartExecution}
        onNext={sim.next}
        onPrev={sim.prev}
        onSpeed={sim.setSpeed}
      />

      <section className="grid gap-4 xl:grid-cols-12 xl:items-stretch" aria-label="X-Ray da execução e painel didático">
        <div className="xl:col-span-8 h-full">
          <XRayPanel codeLines={sim.selectedCodeLines} step={sim.currentStep} lineOffset={sim.codeLineOffset} />
        </div>
        <div className="xl:col-span-4 h-full">
          <DidacticPanel step={sim.currentStep} />
        </div>
      </section>

      <ArrayVisualizer mountedArray={sim.mountedArray} step={sim.currentStep} />

      <SiteFooter />
    </main>
  );
}
