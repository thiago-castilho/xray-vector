import { FunctionExample, Primitive, Snapshot } from "@/types/simulator";

const clone = (arr: Primitive[]) => [...arr];

function markDone(steps: Snapshot[]): Snapshot[] {
  if (steps.length === 0) return steps;
  const last = steps[steps.length - 1];
  steps[steps.length - 1] = { ...last, done: true };
  return steps;
}

export const examples: FunctionExample[] = [
  {
    id: "iterate",
    name: "Percorrer e exibir",
    description: "Visita cada posição do vetor e exibe os valores encontrados.",
    code: [
      "function percorrer(vetor) {",
      "  const saida = [];",
      "  for (let i = 0; i < vetor.length; i++) {",
      "    const atual = vetor[i];",
      "    saida.push(atual);",
      "  }",
      "  return saida;",
      "}"
    ],
    createInitialVariables: () => ({ i: 0, atual: null, saida: "[]" }),
    run: (array) => {
      const steps: Snapshot[] = [];
      const output: Primitive[] = [];
      for (let i = 0; i < array.length; i++) {
        steps.push({
          line: 3,
          index: i,
          currentValue: array[i],
          variables: { i, atual: null, saida: `[${output.join(", ")}]` },
          array: clone(array),
          output: clone(output),
          explanation: `Agora a função está acessando a posição ${i} do vetor.`
        });
        steps.push({
          line: 4,
          index: i,
          currentValue: array[i],
          variables: { i, atual: array[i], saida: `[${output.join(", ")}]` },
          array: clone(array),
          output: clone(output),
          explanation: `O valor encontrado nessa posição é ${String(array[i])}.`
        });
        output.push(array[i]);
        steps.push({
          line: 5,
          index: i,
          currentValue: array[i],
          variables: { i, atual: array[i], saida: `[${output.join(", ")}]` },
          array: clone(array),
          output: clone(output),
          explanation: "Esse valor foi enviado para a saída parcial."
        });
      }
      steps.push({
        line: 7,
        index: null,
        currentValue: null,
        variables: { i: array.length, atual: null, saida: `[${output.join(", ")}]` },
        array: clone(array),
        output: clone(output),
        explanation: "Fim da execução. A função retorna todos os elementos."
      });
      return markDone(steps);
    }
  },
  {
    id: "sum",
    name: "Somar elementos",
    description: "Acumula todos os valores numéricos do vetor em uma variável total.",
    code: [
      "function somar(vetor) {",
      "  let total = 0;",
      "  for (let i = 0; i < vetor.length; i++) {",
      "    total = total + Number(vetor[i]);",
      "  }",
      "  return total;",
      "}"
    ],
    createInitialVariables: () => ({ i: 0, total: 0 }),
    run: (array) => {
      const steps: Snapshot[] = [];
      let total = 0;
      for (let i = 0; i < array.length; i++) {
        const value = Number(array[i]) || 0;
        steps.push({
          line: 3,
          index: i,
          currentValue: array[i],
          variables: { i, total },
          array: clone(array),
          output: [total],
          explanation: `Estamos lendo o índice ${i}.`
        });
        total += value;
        steps.push({
          line: 4,
          index: i,
          currentValue: array[i],
          variables: { i, total },
          array: clone(array),
          output: [total],
          explanation: `O valor ${value} foi somado. Total parcial = ${total}.`
        });
      }
      steps.push({
        line: 6,
        index: null,
        currentValue: null,
        variables: { i: array.length, total },
        array: clone(array),
        output: [total],
        explanation: `Resultado final da soma: ${total}.`
      });
      return markDone(steps);
    }
  },
  {
    id: "search",
    name: "Buscar valor",
    description: "Procura o primeiro índice que contém o valor desejado.",
    code: [
      "function buscar(vetor, alvo) {",
      "  for (let i = 0; i < vetor.length; i++) {",
      "    if (vetor[i] === alvo) {",
      "      return i;",
      "    }",
      "  }",
      "  return -1;",
      "}"
    ],
    createInitialVariables: () => ({ i: 0, encontrado: false, alvo: null }),
    run: (array, options) => {
      const steps: Snapshot[] = [];
      const alvo = options.target ?? array[0] ?? null;
      for (let i = 0; i < array.length; i++) {
        steps.push({
          line: 2,
          index: i,
          currentValue: array[i],
          variables: { i, encontrado: false, alvo },
          array: clone(array),
          output: [],
          explanation: `Verificando se o índice ${i} contém o valor procurado.`
        });
        const matched = array[i] === alvo;
        steps.push({
          line: 3,
          index: i,
          currentValue: array[i],
          variables: { i, encontrado: matched, alvo },
          array: clone(array),
          output: [],
          explanation: matched
            ? "Comparação verdadeira: valor encontrado."
            : "Comparação falsa: vamos para o próximo índice."
        });
        if (matched) {
          steps.push({
            line: 4,
            index: i,
            currentValue: array[i],
            variables: { i, encontrado: true, alvo },
            array: clone(array),
            output: [i],
            explanation: `A função retorna o índice ${i}.`
          });
          return markDone(steps);
        }
      }
      steps.push({
        line: 7,
        index: null,
        currentValue: null,
        variables: { i: array.length, encontrado: false, alvo },
        array: clone(array),
        output: [-1],
        explanation: "Fim da busca. O valor não foi encontrado."
      });
      return markDone(steps);
    }
  },
  {
    id: "max",
    name: "Encontrar maior",
    description: "Compara os elementos e mantém o maior valor visto até o momento.",
    code: [
      "function maior(vetor) {",
      "  let maior = Number(vetor[0]);",
      "  for (let i = 1; i < vetor.length; i++) {",
      "    if (Number(vetor[i]) > maior) {",
      "      maior = Number(vetor[i]);",
      "    }",
      "  }",
      "  return maior;",
      "}"
    ],
    createInitialVariables: (array) => ({ i: 1, maior: Number(array[0] ?? 0) }),
    run: (array) => {
      const steps: Snapshot[] = [];
      let maior = Number(array[0] ?? 0);
      for (let i = 1; i < array.length; i++) {
        const value = Number(array[i]) || 0;
        steps.push({
          line: 4,
          index: i,
          currentValue: array[i],
          variables: { i, maior },
          array: clone(array),
          output: [maior],
          explanation: `Comparando ${value} com maior atual (${maior}).`
        });
        if (value > maior) {
          maior = value;
          steps.push({
            line: 5,
            index: i,
            currentValue: array[i],
            variables: { i, maior },
            array: clone(array),
            output: [maior],
            explanation: `Novo maior encontrado: ${maior}.`
          });
        }
      }
      steps.push({
        line: 8,
        index: null,
        currentValue: null,
        variables: { i: array.length, maior },
        array: clone(array),
        output: [maior],
        explanation: `Resultado final: maior valor = ${maior}.`
      });
      return markDone(steps);
    }
  },
  {
    id: "countEven",
    name: "Contar pares",
    description: "Conta quantos elementos numéricos são pares.",
    code: [
      "function contarPares(vetor) {",
      "  let contador = 0;",
      "  for (let i = 0; i < vetor.length; i++) {",
      "    if (Number(vetor[i]) % 2 === 0) contador++;",
      "  }",
      "  return contador;",
      "}"
    ],
    createInitialVariables: () => ({ i: 0, contador: 0 }),
    run: (array) => {
      const steps: Snapshot[] = [];
      let contador = 0;
      for (let i = 0; i < array.length; i++) {
        const value = Number(array[i]);
        const isPair = !Number.isNaN(value) && value % 2 === 0;
        steps.push({
          line: 4,
          index: i,
          currentValue: array[i],
          variables: { i, contador, par: isPair },
          array: clone(array),
          output: [contador],
          explanation: `Testando se ${String(array[i])} é par.`
        });
        if (isPair) {
          contador += 1;
          steps.push({
            line: 4,
            index: i,
            currentValue: array[i],
            variables: { i, contador, par: true },
            array: clone(array),
            output: [contador],
            explanation: "Valor par detectado. Contador foi incrementado."
          });
        }
      }
      steps.push({
        line: 6,
        index: null,
        currentValue: null,
        variables: { i: array.length, contador },
        array: clone(array),
        output: [contador],
        explanation: `Quantidade final de pares: ${contador}.`
      });
      return markDone(steps);
    }
  },
  {
    id: "reverse",
    name: "Inverter vetor",
    description: "Troca os elementos de ponta a ponta até inverter a ordem.",
    code: [
      "function inverter(vetor) {",
      "  let inicio = 0;",
      "  let fim = vetor.length - 1;",
      "  while (inicio < fim) {",
      "    const aux = vetor[inicio];",
      "    vetor[inicio] = vetor[fim];",
      "    vetor[fim] = aux;",
      "    inicio++;",
      "    fim--;",
      "  }",
      "  return vetor;",
      "}"
    ],
    createInitialVariables: (array) => ({ inicio: 0, fim: array.length - 1, aux: null }),
    run: (array) => {
      const steps: Snapshot[] = [];
      const work = clone(array);
      let inicio = 0;
      let fim = work.length - 1;
      while (inicio < fim) {
        steps.push({
          line: 4,
          index: inicio,
          currentValue: work[inicio],
          variables: { inicio, fim, aux: null },
          array: clone(work),
          output: clone(work),
          explanation: `Comparando ponteiros: inicio=${inicio}, fim=${fim}.`
        });
        const aux = work[inicio];
        work[inicio] = work[fim];
        work[fim] = aux;
        steps.push({
          line: 6,
          index: inicio,
          currentValue: work[inicio],
          variables: { inicio, fim, aux },
          array: clone(work),
          output: clone(work),
          explanation: "Troca realizada entre as extremidades."
        });
        inicio += 1;
        fim -= 1;
        steps.push({
          line: 8,
          index: inicio,
          currentValue: work[inicio] ?? null,
          variables: { inicio, fim, aux: null },
          array: clone(work),
          output: clone(work),
          explanation: "Ponteiros atualizados para a próxima troca."
        });
      }
      steps.push({
        line: 11,
        index: null,
        currentValue: null,
        variables: { inicio, fim, aux: null },
        array: clone(work),
        output: clone(work),
        explanation: "Vetor invertido com sucesso."
      });
      return markDone(steps);
    }
  }
];

export function getExampleById(id: string) {
  return examples.find((e) => e.id === id) ?? examples[0];
}
