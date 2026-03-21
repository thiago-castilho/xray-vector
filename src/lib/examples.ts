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
    code: {
      javascript: [
        "function percorrer(vetor) {",
        "  const saida = [];",
        "  for (let contador = 0; contador < vetor.length; contador++) {",
        "    const atual = vetor[contador];",
        "    saida.push(atual);",
        "  }",
        "  return saida;",
        "}"
      ],
      portugol: [
        "programa {",
        "  inclua biblioteca Util",
        "",
        "  funcao inicio() {",
        "    {{VECTOR_DECLARATION}}",
        "    para (inteiro contador = 0; contador < Util.numero_elementos(vetor); contador++) {",
        "      escreva(\"Indice \", contador, \" -> \", vetor[contador], \"\\n\")",
        "    }",
        "  }",
        "}"
      ]
    },
    createInitialVariables: () => ({ contador: 0, atual: null, saida: "[]" }),
    run: (array) => {
      const steps: Snapshot[] = [];
      const output: Primitive[] = [];
      for (let contador = 0; contador < array.length; contador++) {
        steps.push({
          line: 3,
          index: contador,
          currentValue: array[contador],
          variables: { contador, atual: null, saida: `[${output.join(", ")}]` },
          array: clone(array),
          output: clone(output),
          explanation: `Agora a função está acessando a posição ${contador} do vetor.`
        });
        steps.push({
          line: 4,
          index: contador,
          currentValue: array[contador],
          variables: { contador, atual: array[contador], saida: `[${output.join(", ")}]` },
          array: clone(array),
          output: clone(output),
          explanation: `O valor encontrado nessa posição é ${String(array[contador])}.`
        });
        output.push(array[contador]);
        steps.push({
          line: 5,
          index: contador,
          currentValue: array[contador],
          variables: { contador, atual: array[contador], saida: `[${output.join(", ")}]` },
          array: clone(array),
          output: clone(output),
          explanation: "Esse valor foi enviado para a saída parcial."
        });
      }
      steps.push({
        line: 7,
        index: null,
        currentValue: null,
        variables: { contador: array.length, atual: null, saida: `[${output.join(", ")}]` },
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
    code: {
      javascript: [
        "function somar(vetor) {",
        "  let total = 0;",
        "  for (let contador = 0; contador < vetor.length; contador++) {",
        "    total = total + Number(vetor[contador]);",
        "  }",
        "  return total;",
        "}"
      ],
      portugol: [
        "programa {",
        "  inclua biblioteca Util",
        "",
        "  funcao inicio() {",
        "    {{VECTOR_DECLARATION}}",
        "    inteiro total = 0",
        "    para (inteiro contador = 0; contador < Util.numero_elementos(vetor); contador++) {",
        "      total = total + vetor[contador]",
        "    }",
        "    escreva(\"A soma total e: \", total)",
        "  }",
        "}"
      ]
    },
    createInitialVariables: () => ({ contador: 0, total: 0 }),
    run: (array) => {
      const steps: Snapshot[] = [];
      let total = 0;
      for (let contador = 0; contador < array.length; contador++) {
        const value = Number(array[contador]) || 0;
        steps.push({
          line: 3,
          index: contador,
          currentValue: array[contador],
          variables: { contador, total },
          array: clone(array),
          output: [total],
          explanation: `Estamos lendo o índice ${contador}.`
        });
        total += value;
        steps.push({
          line: 4,
          index: contador,
          currentValue: array[contador],
          variables: { contador, total },
          array: clone(array),
          output: [total],
          explanation: `O valor ${value} foi somado. Total parcial = ${total}.`
        });
      }
      steps.push({
        line: 6,
        index: null,
        currentValue: null,
        variables: { contador: array.length, total },
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
    code: {
      javascript: [
        "function buscar(vetor, alvo) {",
        "  for (let contador = 0; contador < vetor.length; contador++) {",
        "    if (vetor[contador] === alvo) {",
        "      return contador;",
        "    }",
        "  }",
        "  return -1;",
        "}"
      ],
      portugol: [
        "programa {",
        "  inclua biblioteca Util",
        "",
        "  funcao inicio() {",
        "    {{VECTOR_DECLARATION}}",
        "    {{TARGET_DECLARATION}}",
        "    inteiro posicao = -1",
        "    para (inteiro contador = 0; contador < Util.numero_elementos(vetor); contador++) {",
        "      se (vetor[contador] == alvo) {",
        "        posicao = contador",
        "      }",
        "    }",
        "    escreva(\"Posicao encontrada: \", posicao)",
        "  }",
        "}"
      ]
    },
    createInitialVariables: () => ({ contador: 0, encontrado: false, alvo: null }),
    run: (array, options) => {
      const steps: Snapshot[] = [];
      const alvo = options.target ?? array[0] ?? null;
      for (let contador = 0; contador < array.length; contador++) {
        steps.push({
          line: 2,
          index: contador,
          currentValue: array[contador],
          variables: { contador, encontrado: false, alvo },
          array: clone(array),
          output: [],
          explanation: `Verificando se o índice ${contador} contém o valor procurado.`
        });
        const matched = array[contador] === alvo;
        steps.push({
          line: 3,
          index: contador,
          currentValue: array[contador],
          variables: { contador, encontrado: matched, alvo },
          array: clone(array),
          output: [],
          explanation: matched
            ? "Comparação verdadeira: valor encontrado."
            : "Comparação falsa: vamos para o próximo índice."
        });
        if (matched) {
          steps.push({
            line: 4,
            index: contador,
            currentValue: array[contador],
            variables: { contador, encontrado: true, alvo },
            array: clone(array),
            output: [contador],
            explanation: `A função retorna o índice ${contador}.`
          });
          return markDone(steps);
        }
      }
      steps.push({
        line: 7,
        index: null,
        currentValue: null,
        variables: { contador: array.length, encontrado: false, alvo },
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
    code: {
      javascript: [
        "function maior(vetor) {",
        "  let maior = Number(vetor[0]);",
        "  for (let contador = 1; contador < vetor.length; contador++) {",
        "    if (Number(vetor[contador]) > maior) {",
        "      maior = Number(vetor[contador]);",
        "    }",
        "  }",
        "  return maior;",
        "}"
      ],
      portugol: [
        "programa {",
        "  inclua biblioteca Util",
        "",
        "  funcao inicio() {",
        "    {{VECTOR_DECLARATION}}",
        "    inteiro maior = vetor[0]",
        "    para (inteiro contador = 1; contador < Util.numero_elementos(vetor); contador++) {",
        "      se (vetor[contador] > maior) {",
        "        maior = vetor[contador]",
        "      }",
        "    }",
        "    escreva(\"Maior valor: \", maior)",
        "  }",
        "}"
      ]
    },
    createInitialVariables: (array) => ({ contador: 1, maior: Number(array[0] ?? 0) }),
    run: (array) => {
      const steps: Snapshot[] = [];
      let maior = Number(array[0] ?? 0);
      for (let contador = 1; contador < array.length; contador++) {
        const value = Number(array[contador]) || 0;
        steps.push({
          line: 4,
          index: contador,
          currentValue: array[contador],
          variables: { contador, maior },
          array: clone(array),
          output: [maior],
          explanation: `Comparando ${value} com maior atual (${maior}).`
        });
        if (value > maior) {
          maior = value;
          steps.push({
            line: 5,
            index: contador,
            currentValue: array[contador],
            variables: { contador, maior },
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
        variables: { contador: array.length, maior },
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
    code: {
      javascript: [
        "function contarPares(vetor) {",
        "  let totalPares = 0;",
        "  for (let contador = 0; contador < vetor.length; contador++) {",
        "    if (Number(vetor[contador]) % 2 === 0) totalPares++;",
        "  }",
        "  return totalPares;",
        "}"
      ],
      portugol: [
        "programa {",
        "  inclua biblioteca Util",
        "",
        "  funcao inicio() {",
        "    {{VECTOR_DECLARATION}}",
        "    inteiro totalPares = 0",
        "    para (inteiro contador = 0; contador < Util.numero_elementos(vetor); contador++) {",
        "      se (vetor[contador] % 2 == 0) {",
        "        totalPares = totalPares + 1",
        "      }",
        "    }",
        "    escreva(\"Quantidade de pares: \", totalPares)",
        "  }",
        "}"
      ]
    },
    createInitialVariables: () => ({ contador: 0, totalPares: 0 }),
    run: (array) => {
      const steps: Snapshot[] = [];
      let totalPares = 0;
      for (let contador = 0; contador < array.length; contador++) {
        const value = Number(array[contador]);
        const isPair = !Number.isNaN(value) && value % 2 === 0;
        steps.push({
          line: 4,
          index: contador,
          currentValue: array[contador],
          variables: { contador, totalPares, par: isPair },
          array: clone(array),
          output: [totalPares],
          explanation: `Testando se ${String(array[contador])} é par.`
        });
        if (isPair) {
          totalPares += 1;
          steps.push({
            line: 4,
            index: contador,
            currentValue: array[contador],
            variables: { contador, totalPares, par: true },
            array: clone(array),
            output: [totalPares],
            explanation: "Valor par detectado. Total de pares foi incrementado."
          });
        }
      }
      steps.push({
        line: 6,
        index: null,
        currentValue: null,
        variables: { contador: array.length, totalPares },
        array: clone(array),
        output: [totalPares],
        explanation: `Quantidade final de pares: ${totalPares}.`
      });
      return markDone(steps);
    }
  },
  {
    id: "reverse",
    name: "Inverter vetor",
    description: "Troca os elementos de ponta a ponta até inverter a ordem.",
    code: {
      javascript: [
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
      portugol: [
        "programa {",
        "  inclua biblioteca Util",
        "",
        "  funcao inicio() {",
        "    {{VECTOR_DECLARATION}}",
        "    inteiro inicio = 0",
        "    inteiro fim = Util.numero_elementos(vetor) - 1",
        "    enquanto (inicio < fim) {",
        "      inteiro aux = vetor[inicio]",
        "      vetor[inicio] = vetor[fim]",
        "      vetor[fim] = aux",
        "      inicio = inicio + 1",
        "      fim = fim - 1",
        "    }",
        "    escreva(\"Vetor invertido: \", vetor)",
        "  }",
        "}"
      ]
    },
    createInitialVariables: (array) => ({ inicio: 0, fim: array.length - 1, aux: null }),
    run: (array) => {
      const steps: Snapshot[] = [];
      const work = clone(array);
      const parcial: Primitive[] = Array.from({ length: work.length }, () => "_");
      let inicio = 0;
      let fim = work.length - 1;
      while (inicio < fim) {
        steps.push({
          line: 4,
          index: inicio,
          currentValue: work[inicio],
          variables: { inicio, fim, aux: null },
          array: clone(work),
          output: clone(parcial),
          explanation: `Comparando ponteiros: inicio=${inicio}, fim=${fim}.`
        });
        const aux = work[inicio];
        work[inicio] = work[fim];
        work[fim] = aux;
        parcial[inicio] = work[inicio];
        parcial[fim] = work[fim];
        steps.push({
          line: 6,
          index: inicio,
          currentValue: work[inicio],
          variables: { inicio, fim, aux },
          array: clone(work),
          output: clone(parcial),
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
          output: clone(parcial),
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
