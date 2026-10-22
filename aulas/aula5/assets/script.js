/* ===================================================================
   script.js — Web page da Monitoria de Raciocínio Lógico e Matemático
   Vanilla JS: scrollspy, drawer mobile, barra de progresso, quiz.
   Conteúdo teórico fica no HTML; aqui só validação de navegação + quiz.
   =================================================================== */

'use strict';

/* ---------- Dados do quiz ---------- */
/* correta = índice (0-based) da opção certa dentro de opcoes. */
const QUIZ = {
  'aula5-equivalencias': [
    {
      pergunta: 'Qual é o resultado da dupla negação ∼(∼p)?',
      opcoes: [
        'p',
        '∼p',
        'V',
        'F'
      ],
      correta: 0,
      explicacao: 'Dupla negação elimina as duas negações: a negação dupla se anula.'
    },
    {
      pergunta: 'Segundo a 1ª Lei de De Morgan, quanto a negação de (p ∧ q) equivale?',
      opcoes: [
        '∼p ∧ ∼q',
        '∼p ∨ ∼q',
        'p ∨ q',
        '∼p ∧ q'
      ],
      correta: 1,
      explicacao: '1ª Lei de De Morgan: negar uma conjunção vira uma disjunção de termos negados.'
    },
    {
      pergunta: 'Como se escreve a negação da disjunção (p ∨ q) de forma equivalente?',
      opcoes: [
        '∼p ∨ ∼q',
        '∼p ∧ ∼q',
        'p ∧ ∼q',
        '∼p → q'
      ],
      correta: 1,
      explicacao: '2ª Lei de De Morgan: negar uma disjunção vira uma conjunção de termos negados.'
    },
    {
      pergunta: 'Qual a equivalência correta para p → q?',
      opcoes: [
        'p ∧ q',
        '∼p ∧ q',
        '∼p ∨ q',
        'p ∨ ∼q'
      ],
      correta: 2,
      explicacao: 'A equivalência p → q ⇔ ∼p ∨ q é fundamental: negar o antecedente e manter o consequente.'
    },
    {
      pergunta: 'A contrapositiva de "p → q" é:',
      opcoes: [
        'q → p',
        '∼p → ∼q',
        '∼q → ∼p',
        'p ∧ ∼q'
      ],
      correta: 2,
      explicacao: 'Contrapositiva inverte e negativa ambas as partes: p → q ⇔ ∼q → ∼p.'
    },
    {
      pergunta: 'Qual a fórmula para ∼(p → q)?',
      opcoes: [
        '∼p ∨ q',
        'p ∧ ∼q',
        '∼p ∧ ∼q',
        'p ∨ ∼q'
      ],
      correta: 1,
      explicacao: 'Negação da implicação: ∼(p → q) ⇔ p ∧ ∼q. Não confundir com a contraposição.'
    },
    {
      pergunta: 'A bicondicional p ↔ q é equivalente a:',
      opcoes: [
        '(p → q) ∨ (q → p)',
        '(p → q) ∧ (q → p)',
        '(p ∧ q) → (∼p ∧ ∼q)',
        'p → (q ∧ r)'
      ],
      correta: 1,
      explicacao: 'Bicondicional básica: p ↔ q significa que ambas as direções valem.'
    },
    {
      pergunta: 'Qual a forma expandida de p ↔ q?',
      opcoes: [
        'p ∨ q',
        '(p ∧ q) ∨ (∼p ∧ ∼q)',
        '(p → q) ∨ (∼q → ∼p)',
        'p ∧ ∼q'
      ],
      correta: 1,
      explicacao: 'Bicondicional expandido: p ↔ q ⇔ (p ∧ q) ∨ (∼p ∧ ∼q). Verdade quando iguais.'
    },
    {
      pergunta: 'A negação da bicondicional ∼(p ↔ q) equivale a:',
      opcoes: [
        '(p ∧ q) ∨ (∼p ∧ ∼q)',
        '(p ∧ ∼q) ∧ (∼p ∧ q)',
        '(p ∧ ∼q) ∨ (∼p ∧ q)',
        'p → (q ∧ r)'
      ],
      correta: 2,
      explicacao: 'Negação da bicondicional: os valores são diferentes, forma disjunta.'
    },
    {
      pergunta: 'Qual aplicação válida do Princípio do Terceiro Excluído?',
      opcoes: [
        '∼(p ∨ ∼p)',
        'p ∧ ∼p',
        'p ∨ ∼p',
        '∼p ∧ q'
      ],
      correta: 2,
      explicacao: 'Terceiro Excluído: p ∨ ∼p é tautologia - uma proposição ou sua negação é verdadeira.'
    },
    {
      pergunta: 'Qual a forma correta da Absorção 1?',
      opcoes: [
        'p ∧ (p ∨ q) ⇔ q',
        'p ∨ (p ∧ q) ⇔ q',
        'p ∨ (p ∧ q) ⇔ p',
        '∼p ∨ (p ∧ q) ⇔ p'
      ],
      correta: 2,
      explicacao: 'Absorção 1: p ∨ (p ∧ q) ⇔ p. O termo p "absorve" a conjunção.'
    },
    {
      pergunta: 'Quanto a Lei da Não Contradição afirma:',
      opcoes: [
        'p ∨ ∼p é uma tautologia',
        'p ∧ ∼p é uma tautologia',
        'p ∧ ∼p é uma contradição',
        '∼(p ∧ ∼p) é uma contradição'
      ],
      correta: 2,
      explicacao: 'Não Contradição: uma proposição não pode ser verdadeira e falsa ao mesmo tempo. p ∧ ∼p é sempre falso.'
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