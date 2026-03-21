"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { examples, getExampleById } from "@/lib/examples";
import { parseUserInput } from "@/lib/parser";
import { ExampleId, Primitive, Snapshot } from "@/types/simulator";

const DEFAULT_INPUT = "5, 8, 2, 9, 1";

export function useSimulation() {
  const [exampleId, setExampleId] = useState<ExampleId>("sum");
  const [arrayInput, setArrayInput] = useState(DEFAULT_INPUT);
  const [searchTargetInput, setSearchTargetInput] = useState("9");
  const [mountedArray, setMountedArray] = useState<Primitive[]>([5, 8, 2, 9, 1]);
  const [steps, setSteps] = useState<Snapshot[]>([]);
  const [pointer, setPointer] = useState(0);
  const [running, setRunning] = useState(false);
  const [speed, setSpeed] = useState(900);
  const [error, setError] = useState<string | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectedExample = useMemo(() => getExampleById(exampleId), [exampleId]);
  const currentStep = steps[pointer] ?? null;
  const progress = steps.length ? Math.round(((pointer + 1) / steps.length) * 100) : 0;

  const clearLoop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const mountArray = () => {
    const parsed = parseUserInput(arrayInput);
    if (!parsed.ok) {
      setError(parsed.error);
      return;
    }
    setMountedArray(parsed.data);
    setError(null);
    setSteps([]);
    setPointer(0);
    setRunning(false);
    clearLoop();
  };

  const loadPreset = () => {
    setArrayInput("5, 8, 2, 9, 1");
    setSearchTargetInput("9");
    setMountedArray([5, 8, 2, 9, 1]);
    setExampleId("sum");
    setSteps([]);
    setPointer(0);
    setRunning(false);
    setError(null);
    clearLoop();
  };

  const createSimulation = () => {
    if (!mountedArray.length) {
      setError("Monte um vetor antes de executar.");
      return;
    }
    const targetRaw = searchTargetInput.trim();
    const targetAsNumber = Number(targetRaw);
    const target: Primitive =
      targetRaw === "" ? mountedArray[0] : Number.isNaN(targetAsNumber) ? targetRaw : targetAsNumber;
    const generated = selectedExample.run(mountedArray, { target });
    setSteps(generated);
    setPointer(0);
    setRunning(true);
    setError(null);
  };

  const next = () => {
    setPointer((prev) => Math.min(prev + 1, Math.max(steps.length - 1, 0)));
  };

  const prev = () => {
    setPointer((prev) => Math.max(prev - 1, 0));
  };

  const restartExecution = () => {
    setPointer(0);
    setRunning(false);
    clearLoop();
  };

  const resetAll = () => {
    setArrayInput(DEFAULT_INPUT);
    setSearchTargetInput("9");
    setMountedArray([5, 8, 2, 9, 1]);
    setSteps([]);
    setPointer(0);
    setRunning(false);
    setError(null);
    clearLoop();
  };

  useEffect(() => {
    clearLoop();
    if (!running || steps.length === 0) return;

    timerRef.current = setInterval(() => {
      setPointer((prev) => {
        const atEnd = prev >= steps.length - 1;
        if (atEnd) {
          setRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, speed);

    return clearLoop;
  }, [running, speed, steps.length]);

  useEffect(() => {
    return () => clearLoop();
  }, []);

  return {
    examples,
    selectedExample,
    exampleId,
    setExampleId,
    arrayInput,
    setArrayInput,
    searchTargetInput,
    setSearchTargetInput,
    mountedArray,
    currentStep,
    steps,
    pointer,
    running,
    speed,
    setSpeed,
    error,
    progress,
    mountArray,
    loadPreset,
    createSimulation,
    next,
    prev,
    setRunning,
    restartExecution,
    resetAll
  };
}
