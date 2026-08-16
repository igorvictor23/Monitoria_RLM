/* ===================================================================
   script.js — Web page da Monitoria de Raciocínio Lógico e Matemático
   Vanilla JS: scrollspy, drawer mobile, barra de progresso, quiz.
   Conteúdo teórico fica no HTML; aqui só vaidade de navegação + quiz.
   =================================================================== */

'use strict';

/* ---------- Dados do quiz (15 perguntas, 3 por aula) ---------- */
/* correta = índice (0-based) da opção certa dentro de opcoes. */
const QUIZ = {
  'proposicoes-simples': [
    {
      pergunta: 'Qual das frases abaixo é uma proposição?',
      opcoes: [
        '"Feche a janela."',
        '"Que dia lindo!"',
        '"O número 10 é par."',
        '"Você já almoçou?"'
      ],
      correta: 2,
      explicacao: 'Proposição é frase declarativa/afirmativa com valor V ou F. "O número 10 é par." é declarativa e julgável (verdadeira). As outras são imperativa, exclamativa e interrogativa — por isso não são proposições.'
    },
    {
      pergunta: 'Qual princípio proíbe que uma proposição seja, ao mesmo tempo, verdadeira e falsa?',
      opcoes: [
        'Terceiro excluído',
        'Não contradição',
        'Identidade',
        'Bivalência'
      ],
      correta: 1,
      explicacao: 'O princípio da Não contradição afirma que uma proposição não pode ser verdadeira e falsa ao mesmo tempo. O terceiro excluído diz que não há terceira opção (só V ou F); a identidade diz que o valor não muda.'
    },
    {
      pergunta: 'Por que "O gato dormiu o dia todo." é uma proposição simples?',
      opcoes: [
        'Porque é falsa.',
        'Porque contém várias proposições ligadas por conectivos.',
        'Porque é declarativa e não contém outra proposição dentro dela.',
        'Porque usa a palavra "não".'
      ],
      correta: 2,
      explicacao: 'Proposição simples (ou atômica) é a que não contém nenhuma outra proposição dentro dela — é "de uma peça só", sem conectivos. "O gato dormiu o dia todo." é declarativa e autocontida, logo é simples.'
    }
  ],
  'proposicoes-compostas': [
    {
      pergunta: 'Segundo a notação, proposições simples são representadas por letras…',
      opcoes: [
        'maiúsculas (P, Q, R…)',
        'minúsculas (p, q, r…)',
        'gregas (α, β, γ…)',
        'numeradas (P1, P2…)'
      ],
      correta: 1,
      explicacao: 'Proposições simples usam letras minúsculas (p, q, r…). As letras maiúsculas (P, Q, R…) representam proposições compostas, que também são chamadas de fórmulas proposicionais.'
    },
    {
      pergunta: '"Choveu hoje e o jogo foi cancelado." é uma proposição…',
      opcoes: [
        'simples',
        'composta',
        'negação',
        'bicondicional'
      ],
      correta: 1,
      explicacao: 'É composta: reúne duas ideias ("choveu hoje" e "o jogo foi cancelado") ligadas pelo conectivo "e". Toda proposição composta precisa de um conectivo.'
    },
    {
      pergunta: 'O que toda proposição composta obrigatoriamente tem?',
      opcoes: [
        'Um valor fixo V.',
        'Pelo menos uma negação (∼).',
        'Um conectivo lógico unindo proposições simples.',
        'Exatamente três proposições simples.'
      ],
      correta: 2,
      explicacao: 'É a presença de um conectivo (e, ou, se…então…) que transforma proposições simples em composta. Sem conectivo, a frase continua simples.'
    }
  ],
  'conectivos': [
    {
      pergunta: 'Qual símbolo representa o conectivo "ou … ou" (disjunção exclusiva)?',
      opcoes: ['∧', '∨', '⊻', '→'],
      correta: 2,
      explicacao: '⊻ é a disjunção exclusiva ("ou p ou q"): exatamente uma das duas é verdadeira, nunca as duas e nunca nenhuma. ∨ é a disjunção inclusiva (ou); ∧ é a conjunção (e).'
    },
    {
      pergunta: 'Em linguagem lógica, a palavra "mas" costuma funcionar como qual conectivo?',
      opcoes: ['Negação (∼)', 'Conjunção (∧)', 'Condicional (→)', 'Bicondicional (↔)'],
      correta: 1,
      explicacao: 'Sinônimos como mas, todavia, contudo, no entanto, apesar de, no sentido lógico, funcionam como conjunção (∧): ligam duas ideias que devem ser ambas verdadeiras.'
    },
    {
      pergunta: 'Na condicional p → q, quem é a condição necessária?',
      opcoes: [
        'p (a antecedente)',
        'q (a consequente)',
        'ambas, indistintamente',
        'nenhuma das duas'
      ],
      correta: 1,
      explicacao: 'Em p → q: p é condição suficiente para q, e q é condição necessária para p. Ou seja, para que p ocorra, é necessário que q ocorra.'
    }
  ],
  'traducao': [
    {
      pergunta: 'Traduza: "Se o time treinar, então ele joga bem."',
      opcoes: [
        'p ∧ q',
        'p ∨ q',
        'p → q',
        'p ↔ q'
      ],
      correta: 2,
      explicacao: 'Com p: "o time treinar" e q: "ele joga bem", o "se … então" vira condicional: p → q. É o padrão direto da estrutura "Se p, então q".'
    },
    {
      pergunta: 'A frase "Júlia vai, se chover" na forma "q, se p" corresponde a:',
      opcoes: [
        'q → p',
        'p → q',
        'p ∧ q',
        '∼p'
      ],
      correta: 1,
      explicacao: 'O padrão "q, se p" é traduzido como p → q (p é a condição, q é o resultado). Aqui p = "chover" e q = "Júlia vai", logo p → q.'
    },
    {
      pergunta: 'Em "Rosa nasceu na Itália ou nasceu no Brasil", o "ou" deve ser tratado como:',
      opcoes: [
        'Inclusivo (∨), sempre.',
        'Exclusivo (⊻), porque ninguém nasce em dois lugares.',
        'Negação (∼).',
        'Conjunção (∧).'
      ],
      correta: 1,
      explicacao: 'Mesmo usando só a palavra "ou", as opções se excluem naturalmente (ninguém nasce em dois países), então trata-se de disjunção exclusiva (⊻). É uma das pegadinhas comuns.'
    }
  ],
  'tabelas-verdade': [
    {
      pergunta: 'Uma proposição composta com n = 4 proposições simples tem quantas linhas?',
      opcoes: ['4', '8', '12', '16'],
      correta: 3,
      explicacao: 'Pelo teorema 2ⁿ, com n = 4 temos 2⁴ = 16 linhas. (Para referência: n=1→2, n=2→4, n=3→8.)'
    },
    {
      pergunta: 'Em que caso a condicional p → q é falsa?',
      opcoes: [
        'Quando p e q são ambos V.',
        'Quando p é V e q é F.',
        'Quando p e q são ambos F.',
        'Nunca é falsa.'
      ],
      correta: 1,
      explicacao: 'A condicional só é F num caso: p verdadeiro e q falso (a promessa "se p então q" quebra quando p ocorre e q não). Nos demais casos, é V.'
    },
    {
      pergunta: 'Sem parênteses, qual conectivo se resolve primeiro na expressão ∼p ∧ q → r?',
      opcoes: ['→ (condicional)', '∧ (conjunção)', '∼ (negação)', '↔ (bicondicional)'],
      correta: 2,
      explicacao: 'A ordem de precedência sem parênteses é: 1) ∼, 2) ∧ ou ∨, 3) →, 4) ↔. Logo a negação (∼) é resolvida primeiro. Com parênteses, resolve-se de dentro para fora.'
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
