import { Card } from "@/components/ui/Card";
import { FunctionExample } from "@/types/simulator";

interface FunctionPanelProps {
  examples: FunctionExample[];
  selectedId: string;
  onChange: (id: string) => void;
  targetInput: string;
  setTargetInput: (v: string) => void;
}

export function FunctionPanel({ examples, selectedId, onChange, targetInput, setTargetInput }: FunctionPanelProps) {
  const selected = examples.find((e) => e.id === selectedId) ?? examples[0];

  return (
    <Card title="Painel da função" subtitle={selected.description}>
      <div className="space-y-3">
        <select
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

        {selected.id === "search" ? (
          <input
            value={targetInput}
            onChange={(e) => setTargetInput(e.target.value)}
            className="w-full rounded-lg border border-line bg-slate-950 p-2 text-sm"
            placeholder="Valor alvo para busca"
          />
        ) : null}

        <div className="overflow-hidden rounded-xl border border-line bg-slate-950">
          <div className="border-b border-line px-3 py-2 text-xs text-slate-400">Função atual</div>
          <pre className="overflow-x-auto p-3 text-sm">
            {selected.code.map((line, idx) => (
              <div key={`${idx}-${line}`} className="text-slate-200">
                <span className="mr-3 text-slate-500">{idx + 1}</span>
                <span>{line}</span>
              </div>
            ))}
          </pre>
        </div>
      </div>
    </Card>
  );
}
