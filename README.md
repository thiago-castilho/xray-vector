# Vector X-Ray

Aplicação web didática para visualizar, passo a passo, o funcionamento de funções com vetores em programação.

## Repositório no GitHub

Código-fonte, issues e histórico de commits: **[github.com/thiago-castilho/xray-vector](https://github.com/thiago-castilho/xray-vector)**

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

## Acessibilidade

- Link **“Pular para o conteúdo principal”** (visível ao navegar com teclado)
- **Foco visível** (`:focus-visible`) e estados **desabilitados** coerentes nos controles da simulação
- Formulários com **rótulos** ligados aos campos, erros em **`role="alert"`**, regiões com **`aria-live`** onde o conteúdo muda
- Modal **“O que é um vetor?”** com `aria-modal`, retorno de foco ao fechar e `aria-expanded` no botão
- **Atalhos do teclado** (botão **Atalhos** no cabeçalho): painel com lista e suporte a teclas como `E`, `P`, `C`, setas, `R`, `Shift+R`, `?`, `F1`, `Ctrl+/`
- Código e listas com **papéis ARIA** adequados; animações respeitam **`prefers-reduced-motion`**

## Funcionalidades

- Rodapé no site com **links para o repositório**, **issues** e o guia **Como contribuir** no GitHub
- Ajuda contextual **“O que é um vetor?”** (modal com explicação simples, exemplo em Portugol e analogia)
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

## Ações do cabeçalho

- `Reiniciar tudo`:
  - retorna os dados para o estado base (`5, 8, 2, 9, 1` e alvo `9`)
  - limpa a execução atual (passos e ponteiro)
  - mantém a função e linguagem atualmente selecionadas

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

## Como contribuir

Contribuições são bem-vindas: correções, melhorias de acessibilidade, novos exemplos de funções, textos didáticos, traduções ou ajustes de UX.

1. **Faça um fork** do repositório: [thiago-castilho/xray-vector](https://github.com/thiago-castilho/xray-vector)
2. **Crie uma branch** para sua alteração, por exemplo: `feat/minha-melhoria` ou `fix/correcao-x`
3. **Instale e rode localmente** (Node.js 20+):

   ```bash
   npm install
   npm run dev
   ```

4. Antes de abrir o PR, verifique:

   ```bash
   npm run lint
   npm run build
   ```

5. **Abra um Pull Request** descrevendo o que mudou e o porquê. Se resolver um bug ou implementar uma ideia já discutida, referencie a **issue** correspondente.

**Sugestões de contribuição**

- Reportar bugs ou ideias em [**Issues**](https://github.com/thiago-castilho/xray-vector/issues)
- Melhorar textos do painel didático ou do modal “O que é um vetor?”
- Novos cenários em `src/lib/examples.ts` (com passos em JavaScript e, se possível, em Portugol)
- Pequenos ajustes de acessibilidade ou de performance
- Atualizar o README (incluindo esta seção) quando fizer sentido

Seja respeitoso na descrição do PR e nas discussões; revisões podem pedir ajustes — isso é parte do processo.

## Objetivo pedagógico

Transformar conceitos abstratos de vetor em algo visual e concreto para iniciantes, mostrando claramente o que acontece em cada linha da execução.
