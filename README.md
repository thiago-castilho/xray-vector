# Vector X-Ray

Aplicação web didática para visualizar, passo a passo, o funcionamento de funções com vetores em programação.

## Stack

- Next.js (App Router)
- React + TypeScript
- Tailwind CSS
- Framer Motion

## Como executar

Pré-requisito: Node.js 20+ e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

## Funcionalidades

- Entrada personalizada de vetor (números e textos)
- Seletor de linguagem da função (JavaScript e Portugol Webstudio)
- Simulação passo a passo com explicações amigáveis
- Código exibido acompanha os dados montados pelo usuário
- Numeração de linhas com layout didático (`01`, `02`, ...)
- Ao copiar o código, os números de linha não são copiados
- Modo X-Ray com:
  - linha atual
  - índice atual
  - valor atual
  - variáveis auxiliares
  - estado do vetor
  - resultado parcial/final
- Controles completos:
  - Executar
  - Pausar
  - Continuar
  - Reiniciar execução
  - Próximo passo
  - Passo anterior
  - Velocidade (250ms até 5000ms por passo)

## Observações sobre o Portugol

- Os exemplos seguem o estilo do Portugol Webstudio com:
  - `programa { ... }`
  - `inclua biblioteca Util`
  - `funcao inicio()`
  - `Util.numero_elementos(vetor)`
  - `escreva(...)`
- O exemplo de busca usa `posicao = -1` como valor padrão para "não encontrado".
- O exemplo de inversão mostra progresso parcial no painel didático, em vez de exibir o resultado final logo no início.

## Funções de exemplo incluídas

- Percorrer e exibir
- Somar elementos
- Buscar valor
- Encontrar maior
- Contar pares
- Inverter vetor

## Estrutura de pastas

```txt
src/
  app/
    globals.css
    layout.tsx
    page.tsx
  components/
    ArrayVisualizer.tsx
    DidacticPanel.tsx
    ExecutionControls.tsx
    FunctionPanel.tsx
    Header.tsx
    InputPanel.tsx
    XRayPanel.tsx
    ui/
      Card.tsx
  hooks/
    useSimulation.ts
  lib/
    examples.ts
    parser.ts
  types/
    simulator.ts
```

## Objetivo pedagógico

Transformar conceitos abstratos de vetor em algo visual e concreto para iniciantes, mostrando claramente o que acontece em cada linha da execução.
