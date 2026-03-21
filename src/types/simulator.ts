export type Primitive = string | number;

export type ExampleId =
  | "iterate"
  | "sum"
  | "search"
  | "max"
  | "countEven"
  | "reverse";

export interface Snapshot {
  line: number;
  index: number | null;
  currentValue: Primitive | null;
  variables: Record<string, Primitive | boolean | null>;
  array: Primitive[];
  output: Primitive[];
  explanation: string;
  done?: boolean;
}

export interface FunctionExample {
  id: ExampleId;
  name: string;
  description: string;
  code: string[];
  createInitialVariables: (array: Primitive[]) => Record<string, Primitive | boolean | null>;
  run: (array: Primitive[], options: { target?: Primitive }) => Snapshot[];
}
