/* ===================================================================
   script.js — Web page da Monitoria de Raciocínio Lógico e Matemático
   Vanilla JS: scrollspy, drawer mobile, barra de progresso, quiz.
   Conteúdo teórico fica no HTML; aqui só vaidade de navegação + quiz.
   =================================================================== */

'use strict';

/* ---------- Dados do quiz (Exercícios: 30 questões) ---------- */
const QUIZ = {
  'exercicios-parte1': [
    {
      pergunta: 'Assinale a alternativa que apresenta uma proposição lógica simples:',
      opcoes: [
        'Que dia maravilhoso para estudar lógica!',
        'Leia o edital do concurso com atenção.',
        'O número 12 é par.',
        'A raiz quadrada de 16 é igual a 4 e o Brasil fica na América do Sul.',
        'Quem descobriu o Brasil?'
      ],
      correta: 2,
      explicacao: 'Proposição simples é frase declarativa com valor V ou F, sem conectivos. "O número 12 é par." é declarativa e julgável. As demais são exclamativa, imperativa, composta e interrogativa.'
    },
    {
      pergunta: 'Sendo p: "O candidato estuda", q: "faz exercícios", r: "é aprovado", a tradução de "Se o candidato estuda e faz exercícios, então ele é aprovado" é:',
      opcoes: [
        '(p ∨ q) → r',
        'p ∧ (q → r)',
        '(p ∧ q) → r',
        '(p → q) ∧ r',
        'p → (q ∧ r)'
      ],
      correta: 2,
      explicacao: 'A frase tem "se (p e q), então r". Traduzindo: o antecedente é a conjunção (p ∧ q) e o consequente é r, logo (p ∧ q) → r.'
    },
    {
      pergunta: 'Usando as mesmas p, q, r acima, qual a tradução da fórmula p ↔ (q ∧ ∼r)?',
      opcoes: [
        'O candidato estuda se, e somente se, faz exercícios e não é aprovado.',
        'Se o candidato estuda, então faz exercícios e não é aprovado.',
        'O candidato estuda, ou faz exercícios e não é aprovado.',
        'O candidato estuda se, e somente se, não faz exercícios e é aprovado.',
        'O candidato não estuda se, e somente se, faz exercícios e é aprovado.'
      ],
      correta: 0,
      explicacao: 'O bicondicional p ↔ (q ∧ ∼r) equivale a "p se, e somente se, (q e não r)". Como p é "estuda", q "faz exercícios" e r "é aprovado", ∼r é "não é aprovado". Logo: "estuda se, e somente se, faz exercícios e não é aprovado".'
    },
    {
      pergunta: 'Sendo p: "Maria vai ao cinema", q: "compra pipoca", r: "estuda para a prova", a representação de "Ou Maria vai ao cinema e compra pipoca, ou Maria estuda para a prova" é:',
      opcoes: [
        '(p ∨ q) ⊻ r',
        '(p ∧ q) ⊻ r',
        '(p ∧ q) ∨ r',
        'p ∧ (q ⊻ r)',
        '(p ⊻ q) ∧ r'
      ],
      correta: 1,
      explicacao: 'A frase tem duas partes mutuamente exclusivas: "vai ao cinema e compra pipoca" (p ∧ q) e "estuda para a prova" (r). Logo a fórmula é (p ∧ q) ⊻ r.'
    },
    {
      pergunta: 'Sendo p: "Chove", q: "Neva", r: "Faz frio", a tradução de ∼(p ∨ q) → r é:',
      opcoes: [
        'Se não chove ou não neva, então faz frio.',
        'Não é verdade que, se chove ou neva, então faz frio.',
        'Se não é verdade que chove ou neva, então faz frio.',
        'Se chove e neva, então não faz frio.',
        'Se não chove e neva, então faz frio.'
      ],
      correta: 2,
      explicacao: '∼(p ∨ q) é a negação de toda a disjunção, ou seja, "não é verdade que (chove ou neva)". Juntando com → r: "Se não é verdade que chove ou neva, então faz frio".'
    },
    {
      pergunta: 'Quantas linhas possui a tabela-verdade de P(p, q, r, s) = (p ∧ q) → (r ∨ ∼s)?',
      opcoes: ['4', '8', '16', '32', '64'],
      correta: 2,
      explicacao: 'São 4 proposições simples (p, q, r, s), logo 2⁴ = 16 linhas.'
    },
    {
      pergunta: 'Sendo p: "projeto aprovado", q: "orçamento revisado", r: "prazo estendido", a frase "O projeto será aprovado se, e somente se, o orçamento for revisado e o prazo não for estendido" é:',
      opcoes: [
        'p → (q ∧ ∼r)',
        'p ↔ (q ∨ ∼r)',
        'p ↔ (∼q ∧ r)',
        'p ↔ (q ∧ ∼r)',
        '(p ↔ q) ∧ ∼r'
      ],
      correta: 3,
      explicacao: 'O "se, e somente se" é bicondicional (↔). O consequente é "orçamento revisado E prazo não estendido", ou seja, q ∧ ∼r. Logo p ↔ (q ∧ ∼r).'
    },
    {
      pergunta: 'Sendo p: "alarme falhar", q: "cofre roubado", r: "segurança acionada", "Se o alarme falhar, então o cofre será roubado ou a segurança será acionada" é:',
      opcoes: [
        'p → (q ∨ r)',
        'p → (q ⊻ r)',
        '(p → q) ∨ r',
        'p ∧ (q ∨ r)',
        '∼p → (q ∧ r)'
      ],
      correta: 0,
      explicacao: 'O "se … então …" é condicional (→). O consequente é "cofre roubado OU segurança acionada" (q ∨ r). Logo p → (q ∨ r).'
    },
    {
      pergunta: 'Sendo p: "Trabalho", q: "Estudo", r: "Ganho dinheiro", a tradução natural de (∼p ∧ ∼q) ↔ ∼r é:',
      opcoes: [
        'Não trabalho ou não estudo se, e somente se, não ganho dinheiro.',
        'Não trabalho e não estudo se, e somente se, não ganho dinheiro.',
        'Se não trabalho e não estudo, então não ganho dinheiro.',
        'É falso que trabalho e estudo se, e somente se, não ganho dinheiro.',
        'Trabalho e estudo se, e somente se, ganho dinheiro.'
      ],
      correta: 1,
      explicacao: '∼p ∧ ∼q é "não trabalho e não estudo". O bicondicional (↔) une ao ∼r ("não ganho dinheiro"). Logo: "Não trabalho e não estudo se, e somente se, não ganho dinheiro".'
    },
    {
      pergunta: 'Assinale a sentença que representa uma conjunção disfarçada (mas, todavia, contudo funcionam como ∧):',
      opcoes: [
        'Se corro, então canso.',
        'Ou estudo, ou durmo.',
        'Fui ao mercado, mas não comprei pão.',
        'A maçã é vermelha ou verde.',
        'O sol nasce se, e somente se, a Terra gira.'
      ],
      correta: 2,
      explicacao: 'O conectivo "mas" funciona como conjunção (∧) na lógica. "Fui ao mercado" ∧ "não comprei pão". As outras usam →, ⊻, ∨ e ↔.'
    },
    {
      pergunta: 'Sendo p: "João é engenheiro", q: "trabalha na obra", r: "usa capacete", a tradução natural de p ⊻ (q → r) é:',
      opcoes: [
        'João é engenheiro ou, se trabalha na obra, usa capacete.',
        'Ou João é engenheiro, ou se ele trabalha na obra, então usa capacete.',
        'Se João é engenheiro, então ele trabalha na obra e usa capacete.',
        'João é engenheiro e trabalha na obra se, e somente se, usa capacete.',
        'João não é engenheiro, mas se trabalha na obra, usa capacete.'
      ],
      correta: 1,
      explicacao: 'p ⊻ (q → r) é a disjunção exclusiva entre "p" e "(q → r)". A leitura mais natural é: "Ou João é engenheiro, ou (se trabalha na obra, então usa capacete)".'
    },
    {
      pergunta: 'Sendo p: "Carlos é programador", q: "entende de lógica", como representamos "Não é verdade que Carlos é programador e não entende de lógica"?',
      opcoes: [
        '∼p ∧ ∼q',
        '∼(p ∧ ∼q)',
        '∼p ∨ q',
        '∼(p ∨ q)',
        '∼p ∧ q'
      ],
      correta: 1,
      explicacao: 'A frase nega toda a conjunção "Carlos é programador E não entende de lógica" (p ∧ ∼q). Logo a representação é ∼(p ∧ ∼q).'
    },
    {
      pergunta: 'Se p é FALSA e q é VERDADEIRA, qual das proposições abaixo é VERDADEIRA?',
      opcoes: [
        'p ∧ q',
        'q → p',
        'p ↔ q',
        'p ∨ ∼q',
        '∼p ∧ q'
      ],
      correta: 4,
      explicacao: 'Com p = F e q = V: (A) F∧V = F; (B) V→F = F; (C) F↔V = F; (D) F∨F = F; (E) ∼F∧V = V∧V = V. Logo a única V é ∼p ∧ q.'
    },
    {
      pergunta: 'Qual é o conectivo principal (o último a ser resolvido) na expressão ∼(p ∧ q) → (r ∨ p)?',
      opcoes: [
        'Negação (∼)',
        'Conjunção (∧)',
        'Condicional (→)',
        'Disjunção Inclusiva (∨)',
        'Disjunção Exclusiva (⊻)'
      ],
      correta: 2,
      explicacao: 'Resolvendo os parênteses primeiro: ∼(p ∧ q) fica após a negação, e (r ∨ p) fica após a disjunção. O último a ser resolvido é a condicional → que une os dois blocos.'
    },
    {
      pergunta: 'Em "A temperatura cai, a água congela", o conectivo implícito costuma representar uma:',
      opcoes: [
        'Disjunção Inclusiva',
        'Bicondicional',
        'Condicional',
        'Conjunção',
        'Disjunção Exclusiva'
      ],
      correta: 2,
      explicacao: 'A frase sugere causa e consequência: "Se a temperatura cai, então a água congela". O conectivo implícito é o condicional (→).'
    }
  ],
  'exercicios-parte2': [
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de p ∧ (q ∨ r)?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'q ∨ r = F ∨ V = V; p ∧ (q ∨ r) = V ∧ V = V.' },
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de (p → q) ∨ r?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p → q = V → F = F; (p → q) ∨ r = F ∨ V = V.' },
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de ∼(p ↔ r) → q?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ↔ r = V ↔ V = V; ∼(p ↔ r) = F; F → q = F → F = V.' },
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de (∼p ∨ q) ⊻ r?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: '∼p ∨ q = F ∨ F = F; F ⊻ r = F ⊻ V = V.' },
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de (p ∧ ∼q) ↔ (r ∨ ∼p)?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ∧ ∼q = V ∧ V = V; r ∨ ∼p = V ∨ F = V; V ↔ V = V.' },
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de ∼(p ∨ q) ∧ r?', opcoes: ['Verdadeiro', 'Falso'], correta: 1, explicacao: 'p ∨ q = V ∨ F = V; ∼(p ∨ q) = F; F ∧ r = F ∧ V = F.' },
    { pergunta: 'Sendo p=V, q=F, r=V, qual o valor lógico de (p ⊻ r) → (q ∧ p)?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ⊻ r = V ⊻ V = F; q ∧ p = F ∧ V = F; F → F = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de p → (q ∧ r)?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'q ∧ r = F ∧ V = F; p → (q ∧ r) = F → F = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de ∼(p ∨ q) ↔ r?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ∨ q = F ∨ F = F; ∼(p ∨ q) = V; V ↔ r = V ↔ V = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de (r → p) ⊻ (q → p)?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'r → p = V → F = F; q → p = F → F = V; F ⊻ V = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de (∼r ∧ p) ∨ (q ↔ r)?', opcoes: ['Verdadeiro', 'Falso'], correta: 1, explicacao: '∼r ∧ p = F ∧ F = F; q ↔ r = F ↔ V = F; F ∨ F = F.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de (p ⊻ q) → ∼r?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ⊻ q = F ⊻ F = F; ∼r = F; F → F = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de (p ∧ q) ∨ (r ∧ ∼p)?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ∧ q = F ∧ F = F; r ∧ ∼p = V ∧ V = V; F ∨ V = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de ∼(r → q) ∧ ∼p?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'r → q = V → F = F; ∼(r → q) = V; ∼p = V; V ∧ V = V.' },
    { pergunta: 'Sendo p=F, q=F, r=V, qual o valor lógico de ((p ∨ r) ∧ ∼q) ↔ r?', opcoes: ['Verdadeiro', 'Falso'], correta: 0, explicacao: 'p ∨ r = F ∨ V = V; ∼q = V; (V ∧ V) = V; V ↔ r = V ↔ V = V.' }
  ]
};

/* ---------- Renderização do quiz ---------- */
function montarQuiz(secao, dados) {
  const container = document.querySelector('.quiz[data-quiz="' + secao + '"]');
  if (!container || !dados) return;

  const titulo = document.createElement('h3');
  titulo.textContent = 'Quiz de fixação';
  container.appendChild(titulo);

  dados.forEach((q, i) => {
    const bloco = document.createElement('div');
    bloco.className = 'quiz__pergunta';

    const pergunta = document.createElement('div');
    pergunta.className = 'quiz__pergunta--titulo';
    pergunta.textContent = (i + 1) + '. ' + q.pergunta;
    bloco.appendChild(pergunta);

    const opcoes = document.createElement('div');
    opcoes.className = 'quiz__opcoes';

    q.opcoes.forEach((texto, j) => {
      const botao = document.createElement('button');
      botao.className = 'quiz__opcao';
      botao.type = 'button';
      botao.dataset.indice = j;
      botao.textContent = texto;
      opcoes.appendChild(botao);
    });
    bloco.appendChild(opcoes);

    const feedback = document.createElement('div');
    feedback.className = 'quiz__feedback';
    feedback.setAttribute('role', 'status');
    bloco.appendChild(feedback);

    container.appendChild(bloco);
  });

  const placar = document.createElement('div');
  placar.className = 'quiz__placar';
  placar.setAttribute('aria-live', 'polite');
  placar.textContent = 'Você acertou 0 de ' + dados.length;
  container.appendChild(placar);

  const tentar = document.createElement('button');
  tentar.className = 'quiz__tentar';
  tentar.type = 'button';
  tentar.textContent = 'Tentar de novo';
  container.appendChild(tentar);
}

document.addEventListener('DOMContentLoaded', function () {
  Object.keys(QUIZ).forEach(function (secao) {
    montarQuiz(secao, QUIZ[secao]);
  });
  configurarQuiz();
  configurarNavegacao();
});

/* ---------- Lógica de interação do quiz (delegação de eventos) ---------- */
function configurarQuiz() {
  const quizzes = document.querySelectorAll('.quiz');

  quizzes.forEach(function (quiz) {
    const opcoesWrap = quiz.querySelectorAll('.quiz__opcoes');

    quiz.addEventListener('click', function (e) {
      const botao = e.target.closest('.quiz__opcao');
      if (!botao || botao.disabled) return;

      const pergunta = botao.closest('.quiz__pergunta');
      if (pergunta.dataset.respondida === 'true') return;
      pergunta.dataset.respondida = 'true';

      const blocoQuiz = quiz.closest('.quiz');
      const secao = blocoQuiz.dataset.quiz;
      const indice = parseInt(pergunta.querySelector('.quiz__pergunta--titulo').textContent, 10) - 1;
      const q = QUIZ[secao][indice];
      const acertou = parseInt(botao.dataset.indice, 10) === q.correta;
      if (acertou) quiz._acertos = (quiz._acertos || 0) + 1;

      const botoes = pergunta.querySelectorAll('.quiz__opcao');
      botoes.forEach(function (b) {
        b.disabled = true;
        const idx = parseInt(b.dataset.indice, 10);
        if (idx === q.correta) b.classList.add('quiz__opcao--correta');
        else if (b === botao) b.classList.add('quiz__opcao--incorreta');
      });

      const feedback = pergunta.querySelector('.quiz__feedback');
      feedback.classList.add('quiz__feedback--visivel');
      feedback.classList.add(acertou ? 'quiz__feedback--certo' : 'quiz__feedback--errado');
      feedback.innerHTML = acertou ? '<strong>✓ Correto.</strong>' : '<strong>✗ Incorreto.</strong>';
      feedback.appendChild(document.createTextNode(' ' + q.explicacao));

      atualizarPlacar(quiz);
    });

    quiz.querySelector('.quiz__tentar').addEventListener('click', function () {
      const perguntas = quiz.querySelectorAll('.quiz__pergunta');
      perguntas.forEach(function (p) {
        p.dataset.respondida = 'false';
        const botoes = p.querySelectorAll('.quiz__opcao');
        botoes.forEach(function (b) {
          b.disabled = false;
          b.classList.remove('quiz__opcao--correta', 'quiz__opcao--incorreta');
        });
        const fb = p.querySelector('.quiz__feedback');
        fb.className = 'quiz__feedback';
        fb.textContent = '';
      });
      quiz._acertos = 0;
      quiz.querySelector('.quiz__placar').textContent =
        'Você acertou 0 de ' + QUIZ[quiz.dataset.quiz].length;
    });
  });

  function atualizarPlacar(quiz) {
    const total = QUIZ[quiz.dataset.quiz].length;
    const certas = quiz._acertos || 0;
    quiz.querySelector('.quiz__placar').textContent =
      'Você acertou ' + certas + ' de ' + total;
  }
}

/* ---------- Scrollspy + barra de progresso + drawer mobile ---------- */
function configurarNavegacao() {
  const links = Array.prototype.slice.call(
    document.querySelectorAll('.sidebar__nav a')
  );
  const secoes = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function marcarAtivo(id) {
    links.forEach(function (a) {
      if (a.getAttribute('href') === '#' + id) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
    });
  }

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (ent) {
        if (ent.isIntersecting) marcarAtivo(ent.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 });
    secoes.forEach(function (s) { observer.observe(s); });
  }

  const barra = document.getElementById('barra-progresso');
  let ticking = false;
  function aoRolar() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      const altura = document.documentElement.scrollHeight - window.innerHeight;
      const porcentagem = altura > 0 ? (window.scrollY / altura) * 100 : 0;
      barra.style.width = porcentagem + '%';
      ticking = false;
    });
  }
  window.addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');

  function abrirMenu() {
    document.body.style.overflow = 'hidden';
    sidebar.classList.add('aberta');
    overlay.classList.add('visivel');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function fecharMenu() {
    document.body.style.overflow = '';
    sidebar.classList.remove('aberta');
    overlay.classList.remove('visivel');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    if (sidebar.classList.contains('aberta')) fecharMenu();
    else abrirMenu();
  });
  overlay.addEventListener('click', fecharMenu);
  links.forEach(function (a) { a.addEventListener('click', fecharMenu); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && sidebar.classList.contains('aberta')) fecharMenu();
  });
}
