import { Github, Heart } from "lucide-react";

const GITHUB_REPO = "https://github.com/thiago-castilho/xray-vector";
const GITHUB_ISSUES = `${GITHUB_REPO}/issues`;
/** Link direto ao README na seção "Como contribuir" (âncora estável no GitHub). */
const GITHUB_CONTRIBUTE =
  "https://github.com/thiago-castilho/xray-vector/blob/main/README.md#como-contribuir";

export function SiteFooter() {
  return (
    <footer className="panel mt-2 p-4 md:p-5" role="contentinfo" aria-labelledby="footer-contrib-title">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between md:gap-8">
        <div className="max-w-2xl space-y-2">
          <h2 id="footer-contrib-title" className="text-sm font-semibold text-slate-100">
            Contribua com o projeto
          </h2>
          <p className="text-sm leading-relaxed text-slate-400">
            O Vector X-Ray é <strong className="text-slate-300">código aberto</strong>. Você pode ajudar com ideias, correções,
            novos exemplos de funções, melhorias de acessibilidade ou textos mais didáticos - por issues e pull requests no GitHub.
          </p>
        </div>
        <nav className="flex flex-shrink-0 flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center" aria-label="Links do repositório">
          <a
            href={GITHUB_REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-slate-900/60 px-3 py-2 text-sm text-slate-100 transition hover:border-primary/35 hover:text-primary"
          >
            <Github size={16} aria-hidden />
            Repositório
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <a
            href={GITHUB_ISSUES}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-line bg-slate-900/60 px-3 py-2 text-sm text-slate-100 transition hover:border-primary/35 hover:text-primary"
          >
            Issues e ideias
            <span className="sr-only">(abre em nova aba)</span>
          </a>
          <a
            href={GITHUB_CONTRIBUTE}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/25 bg-primary/10 px-3 py-2 text-sm font-medium text-primary transition hover:border-primary/45 hover:bg-primary/15"
          >
            Como contribuir (guia)
            <span className="sr-only">(abre em nova aba)</span>
          </a>
        </nav>
      </div>
      <p className="mt-4 flex items-center gap-1.5 border-t border-line pt-4 text-xs text-slate-500">
        <Heart size={14} className="text-rose-400/90" aria-hidden />
        Feito para aprendizado - compartilhe com quem está começando em vetores e algoritmos.
      </p>
    </footer>
  );
}
