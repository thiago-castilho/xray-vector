import { Primitive } from "@/types/simulator";

export function parseUserInput(raw: string): { ok: true; data: Primitive[] } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: false, error: "Digite ao menos um valor para montar o vetor." };
  }

  const attemptJson = (() => {
    try {
      const parsed = JSON.parse(trimmed);
      return Array.isArray(parsed) ? parsed : null;
    } catch {
      return null;
    }
  })();

  const source = attemptJson ?? trimmed.split(",").map((item) => item.trim()).filter(Boolean);

  if (!Array.isArray(source) || source.length === 0) {
    return { ok: false, error: "Formato inválido. Use JSON ([1,2]) ou lista separada por vírgula (1, 2)." };
  }

  const normalized: Primitive[] = source.map((item) => {
    if (typeof item === "number") return item;
    if (typeof item === "string") {
      const n = Number(item);
      return Number.isNaN(n) ? item : n;
    }
    return String(item);
  });

  return { ok: true, data: normalized };
}
