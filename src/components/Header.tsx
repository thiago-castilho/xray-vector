import { FlaskConical, RotateCcw, Sparkles } from "lucide-react";

interface HeaderProps {
  onReset: () => void;
  onPreset: () => void;
}

export function Header({ onReset, onPreset }: HeaderProps) {
  return (
    <header className="panel p-4 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-primary/35 bg-primary/10 px-3 py-1 text-xs text-primary">
            <Sparkles size={14} />
            Laboratório interativo para vetores
          </div>
          <h1 className="text-2xl font-bold text-white md:text-3xl">Vector X-Ray</h1>
          <p className="mt-1 max-w-2xl text-sm text-slate-300 md:text-base">
            Veja o que acontece por dentro da função, linha por linha, com foco didático para iniciantes.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPreset}
            className="inline-flex items-center gap-2 rounded-lg border border-line bg-slate-900 px-4 py-2 text-sm text-slate-100 transition hover:border-primary/40 hover:text-primary"
          >
            <FlaskConical size={16} />
            Carregar exemplo
          </button>
          <button
            onClick={onReset}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-slate-950 transition hover:brightness-110"
          >
            <RotateCcw size={16} />
            Reiniciar tudo
          </button>
        </div>
      </div>
    </header>
  );
}
