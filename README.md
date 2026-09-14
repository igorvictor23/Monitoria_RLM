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
├── aula1/          ← Aula 1 — Fundamentos (conteúdo completo: proposições, conectivos,
│   ├── index.html     linguagem simbólica e tabelas-verdade)
│   └── assets/
│       ├── estilo.css
│       └── script.js
├── aula2/          ← Aula 1 — Exercícios (30 questões + 5 tabelas-verdade)
│   ├── index.html
│   └── assets/
│       ├── estilo.css
│       └── script.js
├── aula3/          ← Aula 2 — Tabelas-Verdade e Propriedades (teoria + propriedades)
│   ├── index.html
│   └── assets/
│       ├── estilo.css
│       └── script.js
```

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

## Conteúdo da Aula 1 — Fundamentos

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

## Conteúdo da Aula 1 — Exercícios

A segunda página reúne **35 exercícios práticos** organizados em 3 partes, servindo como
complemento de fixação da Aula 1:

1. **Parte 1 — Conceitos e Tradução (15 questões)** — múltipla escolha sobre proposições
   simples/compostas e tradução entre linguagem natural e simbólica.

2. **Parte 2 — Valoração Lógica (15 questões)** — questões V/F com valorações fixas:
   - Questões 16–22: p=V, q=F, r=V
   - Questões 23–30: p=F, q=F, r=V

3. **Parte 3 — Construção de Tabelas-Verdade (5 exercícios abertos)** — tabelas completas
   para expressões com 3 variáveis (p, q, r), padrão VVV, VVF, VFV, VFF, FVV, FVF, FFV, FFF:
   - 31. `p → (q ∧ r)`
   - 32. `(p ∨ q) ↔ ∼r`
   - 33. `(p ∧ ∼q) → r`
   - 34. `∼(p ⊻ q) ∨ r`
   - 35. `(p → r) ∧ (q → r)`

As Partes 1 e 2 usam o sistema de quiz interativo com feedback imediato e placar. A Parte 3
apresenta as tabelas-verdade já montadas para conferência e estudo.

## Conteúdo da Aula 2 — Tabelas-Verdade e Propriedades

A terceira página é a **parte teórica complementar** sobre tabelas-verdade, aprofundando o
tópico 5 da Aula 1 e introduzindo as propriedades das proposições compostas:

1. **Recapitulando** — definição de tabela-verdade, teorema 2ⁿ com explicação intuitiva
   (dobramento a cada nova proposição), tabela n vs 2ⁿ e fórmula do número de colunas
   (n colunas para n proposições simples).

2. **Construção de Tabelas** — exemplo completo passo a passo: `S(p,q,r) = (p ∧ q → ∼r) ∨ ∼q`
   (8 linhas, 8 colunas), ordem de precedência dos conectivos e método de preenchimento.

3. **Tautologia** — definição (coluna final só V), princípio da não contradição, exemplo
   `∼(p ∧ ∼p)` com tabela completa.

4. **Contradição** — definição (coluna final só F), exemplo `(p → q) ∧ (q → r) ∧ p ∧ ∼r`
   (8 linhas, 7 colunas) com explicação da impossibilidade por transitividade.

5. **Contingência** — definição (coluna final com V e F misturados), exemplo
   `p ∨ (q ∧ ∼r)` com tabela completa (8 linhas, 6 colunas).

6. **Questão estilo concurso** — aplicação prática com proposições m ("está chovendo") e
   n ("vou levar guarda-chuva"), identificando a tautologia entre 4 alternativas.

7. **Resumo rápido** — tabela comparativa das três classificações.

A aula inclui **quiz de fixação com 9 questões** focadas exclusivamente nas propriedades:
tautologia, contradição, contingência, invariância da classificação, 2ⁿ e construção.

## Próximas aulas

Novas pastas `aula4/`, `aula5/`, … serão adicionadas aqui conforme o conteúdo avançar.

---

*Material de apoio da monitoria — uso livre para estudo.*