/* ===================================================================
   script.js — Web page da Monitoria de Raciocínio Lógico e Matemático
   Vanilla JS: scrollspy, drawer mobile, barra de progresso, quiz.
   Conteúdo teórico fica no HTML; aqui só vaidade de navegação + quiz.
   =================================================================== */

'use strict';

/* ---------- Dados do quiz ---------- */
/* correta = índice (0-based) da opção certa dentro de opcoes. */
const QUIZ = {
  'aula2-tautologia': [
    {
      pergunta: 'Se uma proposição composta tem sua coluna final na tabela-verdade contendo tanto V quanto F, como classificamos essa proposição?',
      opcoes: [
        'Tautologia',
        'Contradição',
        'Contingência',
        'Indeterminada'
      ],
      correta: 2,
      explicacao: 'Contingência é a classificação quando a tabela-verdade tem V e F misturados — nem sempre verdadeira nem sempre falsa. Tautologia é sempre V, contradição é sempre F.'
    },
    {
      pergunta: 'Qual é a principal característica distintiva de uma tautologia na sua tabela-verdade?',
      opcoes: [
        'Contém tanto V quanto F',
        'Contém somente V',
        'Contém somente F',
        'Tem exatamente 8 linhas'
      ],
      correta: 1,
      explicacao: 'Tautologia é caracterizada por conter somente V na coluna final — é sempre verdadeira independentemente dos valores das proposições simples que a compõem.'
    },
    {
      pergunta: 'Uma proposição composta é classificada como contingência quando:',
      opcoes: [
        'Sua coluna de resultado contém apenas V',
        'Sua coluna de resultado contém apenas F',
        'Sua coluna de resultado contém tanto V quanto F',
        'A tabela tem mais de 4 linhas'
      ],
      correta: 2,
      explicacao: 'Contingência ocorre quando a coluna final tem tanto V quanto F misturados — ou seja, a proposição é verdadeira em alguns casos e falsa em outros, dependendo dos valores das proposições simples.'
    },
    {
      pergunta: 'O que acontece com a classificação de uma proposição se mudarmos apenas os valores de verdade das proposições simples que a compõem?',
      opcoes: [
        'Uma tautologia pode virar contradição',
        'Uma contingência mantém sua classificação (continua sendo contingência)',
        'Uma contradição pode virar tautologia',
        'Todas as proposições mudam de classificação'
      ],
      correta: 1,
      explicacao: 'A classificação (tautologia, contradição ou contingência) é uma propriedade INTRÍNSECA da estrutura lógica da proposição. Mudar os valores das proposições simples apenas altera qual linha da tabela estamos olhando, mas NÃO muda a classificação da coluna inteira.'
    },
    {
      pergunta: 'Qual das seguintes é uma contradição?',
      opcoes: [
        'p ∨ ∼p',
        'p ∧ ∼p',
        '(p → q) ∧ (q → p)',
        'p → q'
      ],
      correta: 1,
      explicacao: 'p ∧ ∼p é sempre falsa (uma proposição não pode ser verdadeira e falsa ao mesmo tempo — princípio da não contradição). p ∨ ∼p é tautologia. As outras são contingências.'
    },
    {
      pergunta: 'Qual é a principal característica distintiva de uma contradição na sua tabela-verdade?',
      opcoes: [
        'Contém tanto V quanto F',
        'Contém somente V',
        'Contém somente F',
        'Tem exatamente 1 linha'
      ],
      correta: 2,
      explicacao: 'Contradição é caracterizada por conter somente F na coluna final — é sempre falsa independentemente dos valores das proposições simples que a compõem.'
    },
    {
      pergunta: 'Se duas proposições compostas têm a mesma tabela-verdade (mesma coluna final), o que podemos dizer sobre suas classificações?',
      opcoes: [
        'Podem ter classificações diferentes',
        'Devem ter a mesma classificação (tautologia, contradição ou contingência)',
        'Uma será tautologia e a outra contradição',
        'Nenhuma das anteriores'
      ],
      correta: 1,
      explicacao: 'A classificação depende EXCLUSIVAMENTE da coluna final da tabela-verdade. Se duas proposições têm a mesma coluna final, elas têm a mesma classificação — ambas são tautologias, ambas são contradições, ou ambas são contingências.'
    },
    {
      pergunta: 'Complete: Uma tautologia é ________ falsa, uma contradição é ________ verdadeira, e uma contingência ________.',
      opcoes: [
        'nunca / nunca / pode ser ambas',
        'sempre / sempre / nunca é nenhuma das duas',
        'às vezes / às vezes / é sempre uma das duas',
        'nunca / sempre / pode ser verdadeira ou falsa'
      ],
      correta: 0,
      explicacao: 'Tautologia = nunca falsa (sempre V). Contradição = nunca verdadeira (sempre F). Contingência = pode ser V em alguns casos e F em outros (ambas aparecem na coluna final).'
    },
    {
      pergunta: 'Qual proposição é uma tautologia?',
      opcoes: [
        'p ∧ ∼p',
        'p ∨ ∼p',
        '(p → q) ∧ p',
        'p ∧ q'
      ],
      correta: 1,
      explicacao: 'p ∨ ∼p é uma tautologia — é sempre verdadeira (princípio do terceiro excluído). p ∧ ∼p é sempre falsa (contradição). As outras são contingências.'
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
