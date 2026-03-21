import { Plus, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Primitive } from "@/types/simulator";

interface InputPanelProps {
  input: string;
  setInput: (v: string) => void;
  mountedArray: Primitive[];
  onMount: () => void;
  error: string | null;
}

export function InputPanel({ input, setInput, mountedArray, onMount, error }: InputPanelProps) {
  const addItem = () => {
    const next = input.trim().length ? `${input}, novo` : "novo";
    setInput(next);
  };

  const removeLast = () => {
    const chunks = input.split(",").map((c) => c.trim()).filter(Boolean);
    chunks.pop();
    setInput(chunks.join(", "));
  };

  return (
    <Card
      title="Entrada de dados"
      subtitle="Digite como lista JSON ou valores separados por vírgula."
      rightSlot={
        <div className="flex gap-2">
          <button onClick={addItem} className="rounded-md border border-line p-2 text-slate-200 hover:text-primary">
            <Plus size={16} />
          </button>
          <button onClick={removeLast} className="rounded-md border border-line p-2 text-slate-200 hover:text-rose-300">
            <Trash2 size={16} />
          </button>
        </div>
      }
    >
      <div className="space-y-3">
        <textarea
          className="h-28 w-full rounded-xl border border-line bg-slate-950 p-3 text-sm outline-none ring-primary transition focus:ring-2"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ex.: [5, 8, 2, 9, 1] ou "Cypress, Selenium, Playwright"'
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            onClick={onMount}
            className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white transition hover:brightness-110"
          >
            Montar vetor
          </button>
          <p className="text-xs text-slate-400">Vetor atual: {JSON.stringify(mountedArray)}</p>
        </div>
        {error ? <p className="text-sm text-rose-300">{error}</p> : null}
      </div>
    </Card>
  );
}
