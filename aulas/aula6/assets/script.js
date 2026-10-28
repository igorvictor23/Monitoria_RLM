/* ===================================================================
   script.js — Web page da Monitoria de Raciocínio Lógico e Matemático
   Vanilla JS: scrollspy, drawer mobile, barra de progresso, quiz.
   Conteúdo teórico fica no HTML; aqui só validação de navegação + quiz.
   =================================================================== */

'use strict';

/* ---------- Dados do quiz ---------- */
/* correta = índice (0-based) da opção certa dentro de opcoes. */
const QUIZ = {
  'aula6-argumentos': [
    {
      pergunta: 'O que caracteriza um argumento válido?',
      opcoes: [
        'Todas as premissas são verdadeiras',
        'A conclusão é verdadeira',
        'É impossível ter premissas V e conclusão F',
        'A conclusão implica as premissas'
      ],
      correta: 2,
      explicacao: 'Argumento válido: a estrutura garante que se premissas V, conclusão V. Nunca pode haver premissas verdadeiras com conclusão falsa.'
    },
    {
      pergunta: 'Qual a diferença entre "verdade" e "validade" em lógica?',
      opcoes: [
        'Verdade é sobre estrutura; validade sobre conteúdo',
        'Verdade se aplica a proposições; validade a argumentos',
        'Verdade é subjective; validade é objetiva',
        'Não há diferença'
      ],
      correta: 1,
      explicacao: 'Verdade/Falsidade aplica-se a proposições individuais. Validade/Invalidade aplica-se à relação lógica entre premissas e conclusão em um argumento.'
    },
    {
      pergunta: 'Um argumento P → Q, P ⊢ Q é uma aplicação de qual regra?',
      opcoes: [
        'Modus Tollens',
        'Modus Ponens',
        'Silogismo Hipotético',
        'Silogismo Disjuntivo'
      ],
      correta: 1,
      explicacao: 'Modus Ponens: Se P → Q e P são V, então Q é conclusão válida. É a regra mais básica de inferência direta.'
    },
    {
      pergunta: 'Qual formato representa corretamente P₁, P₂, ..., Pₙ ⊢ Q?',
      opcoes: [
        'Tabela vertical com barra',
        'Formato horizontal com turnstile',
        'Formato de lista numerada',
        'Todas são representações válidas'
      ],
      correta: 1,
      explicacao: 'P₁, P₂, ..., Pₙ ⊢ Q é o formato horizontal usando o símbolo ⊢ (turnstile), lido como "acarreta" ou "deduz". O turnstile indica validade.'
    },
    {
      pergunta: 'Como se verifica a validade de "p → q, q → r ⊢ p → r"?',
      opcoes: [
        'Usando Modus Tollens',
        'Usando Silogismo Hipotético',
        'Usando tabela-verdade',
        'Usando dedução indireta'
      ],
      correta: 1,
      explicacao: 'Este é o Silogismo Hipotético (SH): P→Q, Q→R ⊢ P→R. É a propriedade da transitividade aplicada a condicionais.'
    },
    {
      pergunta: 'Qual a regra correta para ¬(P → Q)?',
      opcoes: [
        'P → ¬Q',
        '¬P ∧ Q',
        'P ∧ ¬Q',
        '¬P ∨ Q'
      ],
      correta: 2,
      explicacao: 'A negação da implicação é a conjunção: ¬(P → Q) ≡ P ∧ ¬Q. Não confundir com Modus Tollens.'
    },
    {
      pergunta: 'Na dedução 1 (prova condicional), qual é o primeiro passo?',
      opcoes: [
        'Negar a conclusão',
        'Assumir o antecedente como hipótese',
        'Usar Modus Ponens',
        'Construir tabela-verdade'
      ],
      correta: 1,
      explicacao: 'Passo 1 da dedução 1: assumir temporariamente o antecedente (A) como premissa adicional (hipótese) para deduzir o consequente.'
    },
    {
      pergunta: 'Para testar inválidez, qual método usar se conclusão é simples?',
      opcoes: [
        'Tabela-Verdade',
        'Premissas Verdadeiras',
        'Conclusão Falsa',
        'Dedução Indireta'
      ],
      correta: 2,
      explicacao: 'Método da Conclusão Falsa (Teste de Invalididade): assume-se conclusão F e procura-se ter premissas V simultaneamente.'
    },
    {
      pergunta: 'Uma argumento com p → q, ¬q ⊢ ¬p é:',
      opcoes: [
        'Modus Ponens',
        'Modus Tollens',
        'Silogismo Hipotético',
        'Dedução Indireta'
      ],
      correta: 1,
      explicacao: 'Modus Tollens: P → Q e ¬Q inferem ¬P. É o método "ao negar, nega" - inverso do Modus Ponens.'
    },
    {
      pergunta: 'P ∨ Q, ¬P ⊢ Q é uma aplicação de:',
      opcoes: [
        'Modus Ponens',
        'Modus Tollens',
        'Silogismo Hipotético',
        'Silogismo Disjuntivo'
      ],
      correta: 3,
      explicacao: 'Silogismo Disjuntivo: P ∨ Q e ¬P inferem Q. Baseia-se na eliminação de alternativas - se uma é falsa, a outra deve ser verdadeira.'
    },
    {
      pergunta: 'O que a tabela-verdade verifica?',
      opcoes: [
        'Se uma proposição é tautologia',
        'Se um argumento é válido',
        'Se duas proposições são igualdade',
        'Se uma fórmula é satisfatível'
      ],
      correta: 1,
      explicacao: 'Para argumentos: verifica se (P₁ ∧ ... ∧ Pₙ) → Q é tautologia. Se for, argumento é válido.'
    },
    {
      pergunta: 'Qual é o objetivo da dedução 2 (redução ao absurdo)?',
      opcoes: [
        'Deduzir a conclusão diretamente',
        'Demonstrar que a conclusão é falsa',
        'Obter uma contradição assumindo a negação',
        'Usar apenas premissas simples'
      ],
      correta: 2,
      explicacao: 'Dedução 2: assumir ¬C, deduzir R ∧ ¬R (contradição), concluir C. Serve quando a prova direta é inviável.'
    },
    {
      pergunta: 'Um argumento onde premissas V e conclusão F existe é:',
      opcoes: [
        'Válido',
        'Inválido',
        'Tautológico',
        'Contraditório'
      ],
      correta: 1,
      explicacao: 'Argumento inválido: existe pelo menos uma valoração onde premissas são V mas conclusão é F. Sinal de falácia!'
    },
    {
      pergunta: 'A notação P₁, P₂, …, Pₙ ⊢ Q lê-se como:',
      opcoes: [
        'P₁ e P₂ implicam Q',
        'P₁, P₂ lidam com Q',
        'P₁, P₂ ..., Pₙ acarretam Q',
        'P₁ é equivalente a Q'
      ],
      correta: 2,
      explicacao: 'Turnstile ⊢ é lido como 'acarreta', 'dá origem a', 'infere'. P₁, P₂, ..., Pₙ ⊢ Q = Q se deduz das premissas.'
    },
    {
      pergunta: 'Qual método NÃO verifica validade?',
      opcoes: [
        'Tabela-Verdade',
        'Premissas Verdadeiras',
        'Conclusão Falsa',
        'Contagem de palavras'
      ],
      correta: 3,
      explicacao: 'Contagem de palavras não tem relação com validade lógica. Os três primeiros são métodos formais de verificação.'
    }
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