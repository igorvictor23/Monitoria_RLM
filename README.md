# Monitoria de Raciocínio Lógico e Matemático

Material de apoio da monitoria da disciplina de **Raciocínio Lógico e Matemático**, organizado
em páginas web independentes — uma por aula — para facilitar o estudo e a revisão.

Cada aula é uma página estática (HTML + CSS + JS puro, sem build e sem dependências) que pode
ser aberta diretamente no navegador. O conteúdo segue a progressão da apostila da disciplina:
cada tópico usa o anterior, então é recomendado acompanhar a ordem.

## Sobre o repositório

Este repositório reúne as páginas das aulas da monitoria. A estrutura foi pensada para crescer
conforme novas aulas forem produzidas:

```
index.html         ← hub na raiz: lista as aulas e direciona para cada uma
.nojekyll          ← desliga o Jekyll no GitHub Pages (site 100% estático)
aulas/
├── aula1/          ← primeira aula (conteúdo completo: proposições, conectivos,
│   ├── index.html     linguagem simbólica e tabelas-verdade)
│   └── assets/
│       ├── estilo.css
│       └── script.js
├── aula2/          ← próximas aulas (a adicionar)
└── aula3/          ← …

O `index.html` da raiz é um **hub** que lista as aulas e direciona para cada uma
(`aulas/aulaN/`). Para adicionar uma aula, basta criar a pasta em `aulas/` e incluir
um card correspondente nesse arquivo.

## Como clonar e rodar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/igorvictor23/Monitoria_RLM.git
   ```
2. Entre na pasta:
   ```bash
   cd Monitoria_RLM
   ```
3. Abra no navegador (não é necessário servidor nem instalação — são arquivos HTML estáticos):
   - o hub `index.html` (na raiz), que lista e direciona para cada aula, ou
   - diretamente a primeira aula: dê duplo clique em `aulas/aula1/index.html` ou cole
     o caminho `file:///.../Monitoria_RLM/aulas/aula1/index.html`.

Não é necessário servidor nem instalação — as páginas são arquivos HTML estáticos.

## Conteúdo da Aula 1

A primeira aula cobre os fundamentos da lógica proposicional e a ponte entre a linguagem natural
e a linguagem simbólica. Está dividida nos seguintes tópicos:

1. **Proposições Simples** — o que é uma proposição (frase com valor verdadeiro ou falso), os
   três princípios da lógica (terceiro excluído, não contradição e identidade), a ideia de
   lógica bivalente e a notação de variáveis proposicionais (`p`, `V(p)`).

2. **Proposições Compostas** — como duas ou mais proposições simples se combinam por conectivos,
   a notação de letras maiúsculas (`P(p₁, p₂, …, pₙ)`), o conceito de fórmula proposicional e a
   diferença entre proposição simples e composta.

3. **Conectivos Lógicos** — os seis conectivos da lógica matemática: conjunção (`∧`), disjunção
   inclusiva (`∨`), disjunção exclusiva (`⊻`), condicional (`→`), bicondicional (`↔`) e negação
   (`∼`), com seus nomes, significados e exemplos. Inclui a observação sobre sinônimos
   (mas, todavia, contudo…) que funcionam como conjunção.

4. **Linguagem Natural ↔ Linguagem Simbólica** — método de 4 passos para traduzir frases em
   português para símbolos e vice-versa, exemplos de cada conectivo, variações como "q, se p" e
   "quando p, q", e as pegadinhas mais comuns (ou exclusivo, condição necessária vs. suficiente,
   sinônimos de conjunção e de negação).

5. **Tabelas-Verdade** — a regra 2ⁿ (número de linhas), como montar as tabelas de cada conectivo,
   a ordem de precedência, um exemplo resolvido passo a passo `(p ∧ ∼r) → q` e a introdução a
   tautologia, contradição e contingência.

Ao final, há uma **Trilha** que mostra a mesma frase passando pelas três etapas — da linguagem
natural ao conectivo, à fórmula e à tabela-verdade — para reforçar a conexão entre os tópicos.
Cada tópico também traz um pequeno quiz de fixação.

## Próximas aulas

Novas pastas `aula2/`, `aula3/`, … serão adicionadas aqui conforme o conteúdo avançar.

---

*Material de apoio da monitoria — uso livre para estudo.*
