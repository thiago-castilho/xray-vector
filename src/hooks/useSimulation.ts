"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { examples, getExampleById } from "@/lib/examples";
import { parseUserInput } from "@/lib/parser";
import { ExampleId, LanguageId, Primitive, Snapshot } from "@/types/simulator";

const DEFAULT_INPUT = "5, 8, 2, 9, 1";

function formatPortugolLiteral(value: Primitive) {
  return typeof value === "number" ? String(value) : `"${String(value)}"`;
}

function buildPortugolVectorDeclaration(array: Primitive[]) {
  const safeArray = array.length ? array : [0];
  const allNumbers = safeArray.every((item) => typeof item === "number");
  const type = allNumbers ? "inteiro" : "cadeia";
  const values = safeArray.map(formatPortugolLiteral).join(", ");
  return `${type} vetor[${safeArray.length}] = {${values}}`;
}

function buildPortugolTargetDeclaration(target: Primitive) {
  const type = typeof target === "number" ? "inteiro" : "cadeia";
  return `${type} alvo = ${formatPortugolLiteral(target)}`;
}

export function useSimulation() {
  const [exampleId, setExampleId] = useState<ExampleId>("sum");
  const [language, setLanguage] = useState<LanguageId>("javascript");
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
  const selectedCodeLines = useMemo(() => {
    const targetRaw = searchTargetInput.trim();
    const parsedTarget = Number(targetRaw);
    const target: Primitive =
      targetRaw === "" ? mountedArray[0] ?? 0 : Number.isNaN(parsedTarget) ? targetRaw : parsedTarget;

    return selectedExample.code[language].map((line) =>
      line
        .replace("{{VECTOR_DECLARATION}}", buildPortugolVectorDeclaration(mountedArray))
        .replace("{{TARGET_DECLARATION}}", buildPortugolTargetDeclaration(target))
    );
  }, [selectedExample, language, mountedArray, searchTargetInput]);
  const codeLineOffset = language === "portugol" ? 4 : 0;
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
    setLanguage("javascript");
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
    selectedCodeLines,
    codeLineOffset,
    language,
    setLanguage,
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
