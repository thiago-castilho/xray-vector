import { ReactNode } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
}

export function Card({ title, subtitle, rightSlot, children }: CardProps) {
  return (
    <section className="panel p-4 md:p-5">
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
          {subtitle ? <p className="muted text-sm">{subtitle}</p> : null}
        </div>
        {rightSlot}
      </header>
      {children}
    </section>
  );
}
