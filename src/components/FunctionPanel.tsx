"use client";

import { useId } from "react";
import { Card } from "@/components/ui/Card";
import { FunctionExample, LanguageId } from "@/types/simulator";

interface FunctionPanelProps {
  examples: FunctionExample[];
  selectedId: string;
  onChange: (id: string) => void;
  language: LanguageId;
  onLanguageChange: (language: LanguageId) => void;
  codeLines: string[];
  targetInput: string;
  setTargetInput: (v: string) => void;
}

export function FunctionPanel({
  examples,
  selectedId,
  onChange,
  language,
  onLanguageChange,
  codeLines,
  targetInput,
  setTargetInput
}: FunctionPanelProps) {
  const selected = examples.find((e) => e.id === selectedId) ?? examples[0];
  const plainCode = codeLines.join("\n");
  const exampleSelectId = useId();
  const languageSelectId = useId();
  const searchInputId = useId();
  const codeRegionId = useId();

  return (
    <Card title="Painel da função" subtitle={selected.description}>
      <div className="space-y-3">
        <div className="space-y-1">
          <label htmlFor={exampleSelectId} className="text-xs text-slate-400">
            Escolha a função de exemplo
          </label>
          <select
            id={exampleSelectId}
            value={selectedId}
            onChange={(e) => onChange(e.target.value)}
            className="w-full rounded-lg border border-line bg-slate-950 p-2 text-sm"
          >
            {examples.map((example) => (
              <option key={example.id} value={example.id}>
                {example.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-1">
          <label htmlFor={languageSelectId} className="text-xs text-slate-400">
            Escolha a linguagem da função
          </label>
          <select
            id={languageSelectId}
            value={language}
            onChange={(e) => onLanguageChange(e.target.value as LanguageId)}
            className="w-full rounded-lg border border-line bg-slate-950 p-2 text-sm"
          >
            <option value="javascript">JavaScript</option>
            <option value="portugol">Portugol</option>
          </select>
        </div>

        {selected.id === "search" ? (
          <div className="space-y-1">
            <label htmlFor={searchInputId} className="text-xs text-slate-400">
              Valor alvo para busca
            </label>
            <input
              id={searchInputId}
              value={targetInput}
              onChange={(e) => setTargetInput(e.target.value)}
              className="w-full rounded-lg border border-line bg-slate-950 p-2 text-sm"
              placeholder="Ex.: 9 ou texto"
              autoComplete="off"
            />
          </div>
        ) : null}

        <div className="overflow-hidden rounded-xl border border-line bg-slate-950">
          <div className="border-b border-line px-3 py-2 text-xs text-slate-400" id={codeRegionId}>
            Função atual ({language === "javascript" ? "JavaScript" : "Portugol"})
          </div>
          <pre
            role="region"
            aria-labelledby={codeRegionId}
            tabIndex={0}
            className="overflow-x-auto p-3 text-sm"
            onCopy={(event) => {
              event.preventDefault();
              event.clipboardData.setData("text/plain", plainCode);
            }}
          >
            {codeLines.map((line, idx) => (
              <div key={`${idx}-${line}`} className="text-slate-200">
                <span className="mr-3 inline-block w-6 select-none text-slate-500">{String(idx + 1).padStart(2, "0")}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </Card>
  );
}
