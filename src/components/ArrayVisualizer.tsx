"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Card } from "@/components/ui/Card";
import { Primitive, Snapshot } from "@/types/simulator";

interface ArrayVisualizerProps {
  mountedArray: Primitive[];
  step: Snapshot | null;
}

export function ArrayVisualizer({ mountedArray, step }: ArrayVisualizerProps) {
  const reduceMotion = useReducedMotion();
  const visible = step?.array ?? mountedArray;

  return (
    <Card title="Visualização do vetor" subtitle="Cada bloco representa uma posição do vetor.">
      <div
        className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6"
        role="list"
        aria-label="Elementos do vetor por índice"
      >
        {visible.map((value, idx) => {
          const active = step?.index === idx;
          return (
            <motion.div
              key={`${idx}-${String(value)}`}
              layout={!reduceMotion}
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 350, damping: 28 }
              }
              role="listitem"
              aria-current={active ? "true" : undefined}
              className={`rounded-xl border p-3 ${
                active ? "border-primary bg-primary/15 shadow-neon" : "border-line bg-slate-950"
              }`}
            >
              <p className="text-xs text-slate-400">índice {idx}</p>
              <p className={`mt-1 text-lg font-semibold ${active ? "text-primary" : "text-slate-200"}`}>
                {String(value)}
              </p>
            </motion.div>
          );
        })}
      </div>
    </Card>
  );
}
