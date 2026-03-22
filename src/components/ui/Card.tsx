"use client";

import { ReactNode, useId } from "react";

interface CardProps {
  title: string;
  subtitle?: string;
  rightSlot?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function Card({ title, subtitle, rightSlot, children, className = "" }: CardProps) {
  const titleId = useId();
  const subtitleId = useId();

  return (
    <section
      className={`panel p-4 md:p-5 ${className}`}
      aria-labelledby={titleId}
      aria-describedby={subtitle ? subtitleId : undefined}
    >
      <header className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h2 id={titleId} className="text-lg font-semibold text-slate-100">
            {title}
          </h2>
          {subtitle ? (
            <p id={subtitleId} className="muted text-sm">
              {subtitle}
            </p>
          ) : null}
        </div>
        {rightSlot}
      </header>
      {children}
    </section>
  );
}
