"use client";

import { ArrayVisualizer } from "@/components/ArrayVisualizer";
import { DidacticPanel } from "@/components/DidacticPanel";
import { ExecutionControls } from "@/components/ExecutionControls";
import { FunctionPanel } from "@/components/FunctionPanel";
import { Header } from "@/components/Header";
import { InputPanel } from "@/components/InputPanel";
import { XRayPanel } from "@/components/XRayPanel";
import { useSimulation } from "@/hooks/useSimulation";
import { ExampleId } from "@/types/simulator";

export default function HomePage() {
  const sim = useSimulation();

  return (
    <main className="mx-auto max-w-7xl space-y-4 p-3 md:space-y-5 md:p-6">
      <Header onReset={sim.resetAll} />

      <section className="grid gap-4 lg:grid-cols-2">
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

      <section className="grid gap-4 xl:grid-cols-12 xl:items-stretch">
        <div className="xl:col-span-8 h-full">
          <XRayPanel codeLines={sim.selectedCodeLines} step={sim.currentStep} lineOffset={sim.codeLineOffset} />
        </div>
        <div className="xl:col-span-4 h-full">
          <DidacticPanel step={sim.currentStep} />
        </div>
      </section>

      <ArrayVisualizer mountedArray={sim.mountedArray} step={sim.currentStep} />
    </main>
  );
}
