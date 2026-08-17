(() => {
  "use strict";

  const categoryMeta = {
    "engenharia-social": {
      label: "Engenharia social",
      section: "#ameacas",
      tip: "Revise sinais de urgência, pedidos fora do processo, QR Codes, ligações e validações por canais independentes.",
    },
    "informacao-privacidade": {
      label: "Informação e privacidade",
      section: "#informacoes",
      tip: "Reforce classificação, necessidade de conhecimento, autorização e proteção de dados pessoais e confidenciais.",
    },
    "dispositivos-acesso": {
      label: "Dispositivos e acesso",
      section: "#boas-praticas",
      tip: "Revise cuidados com USB, equipamentos corporativos, trabalho remoto, redes e instalações não autorizadas.",
    },
    "comunicacao-compartilhamento": {
      label: "Comunicação e compartilhamento",
      section: "#boas-praticas",
      tip: "Antes de enviar, valide destinatários, anexos, histórico, nível de sigilo e o canal aprovado.",
    },
    "senhas-identidade": {
      label: "Senhas e identidade",
      section: "#senhas",
      tip: "Priorize senhas únicas, gerenciador de senhas, MFA e resposta rápida quando houver exposição de credenciais.",
    },
    "resposta-incidentes": {
      label: "Resposta a incidentes",
      section: "#incidentes",
      tip: "Interrompa a ação, preserve evidências e comunique rapidamente o canal interno responsável.",
    },
  };

  const quiz = [
    {
      category: "engenharia-social",
      q: "Você escaneia um QR Code e a página pede validação imediata para liberar um documento. Qual é a melhor ação?",
      a: [
        "Inserir a senha rapidamente para não perder o acesso.",
        "Verificar o endereço, o contexto e validar a origem antes de qualquer ação.",
        "Encaminhar o link para outros colegas testarem primeiro.",
      ],
      c: 1,
      feedback: [
        "Incorreto. A pressa faz parte do golpe. Nunca informe senha ou aprove um acesso antes de conferir o domínio, a origem e o contexto.",
        "Correto. QR Code funciona como um link. Confira o endereço aberto e valide a solicitação antes de prosseguir.",
        "Incorreto. Encaminhar um link suspeito aumenta a exposição. Pare e confirme a origem com o responsável pelo material.",
      ],
    },
    {
      category: "informacao-privacidade",
      q: "Uma informação classificada como Confidencial pode ser enviada para qualquer pessoa da empresa?",
      a: [
        "Não. O acesso deve seguir necessidade de conhecimento e autorização.",
        "Sim, desde que seja colaborador interno.",
        "Sim, se estiver em arquivo PDF.",
      ],
      c: 0,
      feedback: [
        "Correto. Informações classificadas como Confidencial devem ser acessadas apenas por pessoas autorizadas que precisam delas para trabalhar.",
        "Incorreto. Estar dentro da empresa não significa ter autorização. O acesso depende da função e da necessidade de conhecimento.",
        "Incorreto. O formato do arquivo não muda o nível de sigilo. Um PDF também pode conter informação confidencial.",
      ],
    },
    {
      category: "dispositivos-acesso",
      q: "Você recebe um pendrive de origem desconhecida. O que fazer?",
      a: [
        "Conectar apenas para ver o conteúdo.",
        "Conectar em outro computador para testar.",
        "Não conectar e solicitar orientação ou autorização pelos canais internos.",
      ],
      c: 2,
      feedback: [
        "Incorreto. Um pendrive pode executar malware ou copiar informações assim que é conectado. Não teste o dispositivo por conta própria.",
        "Incorreto. Usar outro computador apenas transfere o risco para outra máquina. O dispositivo deve permanecer desconectado.",
        "Correto. Dispositivos removíveis só devem ser usados com autorização prévia e expressa.",
      ],
    },
    {
      category: "comunicacao-compartilhamento",
      q: "Antes de encaminhar um e-mail com histórico e anexos, o que deve ser revisado?",
      a: [
        "Destinatários, cópias, anexos, histórico e nível de sigilo.",
        "Somente se o arquivo está pesado.",
        "Nada, porque mensagens internas são sempre seguras.",
      ],
      c: 0,
      feedback: [
        "Correto. Essa revisão evita que informações e anexos sejam enviados para pessoas que não deveriam recebê-los.",
        "Incorreto. O tamanho do arquivo não é o principal risco. É preciso revisar quem receberá a mensagem e quais informações seguirão junto.",
        "Incorreto. Mensagens internas também podem ser encaminhadas ao destinatário errado ou conter informações que exigem acesso restrito.",
      ],
    },
    {
      category: "senhas-identidade",
      q: "Qual atitude reduz o risco de comprometimento de contas?",
      a: [
        "Usar a mesma senha em vários serviços para memorizar melhor.",
        "Não compartilhar senha, evitar reutilização e usar 2FA quando disponível.",
        "Salvar senhas em qualquer navegador ou arquivo pessoal.",
      ],
      c: 1,
      feedback: [
        "Incorreto. Reutilizar senha transforma o vazamento de um serviço em risco para todas as outras contas que usam a mesma combinação.",
        "Correto. Senhas exclusivas e autenticação em dois fatores reduzem o impacto de um vazamento de credenciais.",
        "Incorreto. Senhas não devem ficar em arquivos pessoais ou em locais sem controle. Use apenas recursos aprovados pela empresa.",
      ],
    },
    {
      category: "engenharia-social",
      q: "Durante uma chamada de vídeo, alguém que parece ser um gestor pede uma aprovação urgente fora do processo. O que fazer?",
      a: [
        "Aprovar, porque a imagem e a voz parecem reais.",
        "Pedir que a pessoa repita a solicitação em voz alta e continuar se parecer convincente.",
        "Pausar a ação e confirmar por um canal oficial já conhecido antes de aprovar qualquer coisa.",
      ],
      c: 2,
      feedback: [
        "Incorreto. Imagem e voz podem ser manipuladas por deepfake. A validação precisa considerar o processo, o contexto e um canal independente.",
        "Incorreto. Repetir a fala não garante que a pessoa seja legítima. Golpes com IA podem manter conversa em tempo real.",
        "Correto. Pedidos urgentes em chamada, áudio ou vídeo devem ser confirmados por canal oficial antes de qualquer aprovação.",
      ],
    },
    {
      category: "resposta-incidentes",
      q: "Você suspeita que dados pessoais foram enviados para o destinatário errado. O que fazer?",
      a: [
        "Apagar a mensagem e esperar que ninguém perceba.",
        "Comunicar imediatamente o responsável ou canal interno indicado pela organização para apuração.",
        "Avisar apenas no fim do dia, se houver tempo.",
      ],
      c: 1,
      feedback: [
        "Incorreto. Apagar a mensagem não elimina a possibilidade de acesso pelo destinatário. A situação precisa ser comunicada para contenção e análise.",
        "Correto. O reporte imediato permite avaliar o alcance, conter o problema e cumprir as obrigações de proteção de dados.",
        "Incorreto. Quanto mais tempo passa, menor é a chance de conter o envio e orientar as pessoas envolvidas.",
      ],
    },
    {
      category: "senhas-identidade",
      q: "O Have I Been Pwned informa que seu e-mail apareceu em um vazamento e você reutilizava a mesma senha em outros serviços. Qual é a melhor resposta?",
      a: [
        "Trocar a senha somente no serviço citado e continuar usando a mesma nos demais.",
        "Trocar a senha em todos os locais onde foi reutilizada, revisar sessões e habilitar MFA.",
        "Ignorar o alerta, porque o site não mostrou a senha completa.",
      ],
      c: 1,
      feedback: [
        "Incorreto. Quando uma senha foi reutilizada, o risco se estende a todos os serviços que usam a mesma combinação.",
        "Correto. Senhas reutilizadas devem ser substituídas por combinações únicas; também revise sessões e ative MFA sempre que possível.",
        "Incorreto. A ausência da senha completa no resultado não elimina o risco de comprometimento ou uso das credenciais em outros serviços.",
      ],
    },
    {
      category: "senhas-identidade",
      q: "Qual é a forma mais segura de criar e armazenar senhas para vários sistemas?",
      a: [
        "Criar uma senha forte e reutilizá-la em todos os sistemas.",
        "Anotar as senhas em um arquivo de texto na área de trabalho.",
        "Usar senhas fortes e únicas, armazenadas em um gerenciador aprovado, e ativar MFA.",
      ],
      c: 2,
      feedback: [
        "Incorreto. Mesmo uma senha forte perde sua proteção quando é reutilizada em vários serviços.",
        "Incorreto. Arquivos expostos podem ser acessados por malware, outros usuários ou ferramentas de sincronização.",
        "Correto. Um gerenciador de senhas ajuda a criar e armazenar combinações únicas, enquanto o MFA adiciona uma camada extra de proteção.",
      ],
    },
    {
      category: "senhas-identidade",
      q: "Para que o Have I Been Pwned pode ser usado de forma segura?",
      a: [
        "Para verificar se um e-mail apareceu em vazamentos conhecidos e apoiar a resposta de segurança.",
        "Para descobrir a senha atual de qualquer conta cadastrada.",
        "Para confirmar que uma conta está protegida apenas porque não apareceu nos resultados.",
      ],
      c: 0,
      feedback: [
        "Correto. O serviço ajuda a identificar exposições conhecidas, mas o resultado deve ser combinado com boas práticas e avaliação do contexto.",
        "Incorreto. O serviço não revela a senha atual de uma conta nem deve ser usado com esse objetivo.",
        "Incorreto. Não aparecer em uma base conhecida não garante que a conta nunca tenha sido exposta ou comprometida.",
      ],
    },
    {
      category: "informacao-privacidade",
      q: "Como uma informação classificada como Confidencial Restrita deve ser compartilhada?",
      a: [
        "Somente com pessoas ou áreas especificamente autorizadas e usando os controles aprovados.",
        "Com qualquer colaborador que solicitar, desde que seja por e-mail corporativo.",
        "Em grupos de mensagem para acelerar o trabalho.",
      ],
      c: 0,
      feedback: [
        "Correto. Informações restritas exigem autorização específica, necessidade de conhecimento e controles reforçados de acesso e envio.",
        "Incorreto. O canal corporativo não substitui a autorização e a necessidade de conhecimento.",
        "Incorreto. Grupos amplos aumentam a exposição e dificultam o controle sobre quem recebeu a informação.",
      ],
    },
    {
      category: "dispositivos-acesso",
      q: "Você precisa trabalhar em um café usando o notebook corporativo. Qual conjunto de cuidados é mais adequado?",
      a: [
        "Usar qualquer Wi-Fi disponível e deixar a tela visível para facilitar a leitura.",
        "Proteger a tela, evitar conversas confidenciais, usar recursos autorizados e bloquear o equipamento ao se afastar.",
        "Compartilhar o notebook com um colega para não deixá-lo sozinho.",
      ],
      c: 1,
      feedback: [
        "Incorreto. Redes desconhecidas e telas expostas podem facilitar interceptação, observação indevida e vazamento de informações.",
        "Correto. Em locais públicos, reduza a exposição visual e verbal, use apenas recursos autorizados e mantenha o equipamento bloqueado quando não estiver em uso.",
        "Incorreto. Equipamentos corporativos não devem ser compartilhados sem autorização e controle apropriado.",
      ],
    },
    {
      category: "engenharia-social",
      q: "Uma pessoa liga dizendo ser do suporte e pede o código de MFA que acabou de chegar no seu celular. O que fazer?",
      a: [
        "Informar o código, porque o suporte precisa concluir a validação.",
        "Pedir o nome da pessoa e informar o código se ela parecer convincente.",
        "Não compartilhar o código, encerrar a ligação e contatar o suporte pelo canal oficial conhecido.",
      ],
      c: 2,
      feedback: [
        "Incorreto. Códigos de MFA são pessoais e podem permitir que um atacante conclua um acesso indevido.",
        "Incorreto. Um nome ou uma narrativa convincente não comprovam a identidade de quem está ligando.",
        "Correto. Nunca compartilhe códigos de autenticação. Valide a solicitação por um canal oficial independente.",
      ],
    },
    {
      category: "resposta-incidentes",
      q: "Após clicar em um link suspeito, qual deve ser a primeira sequência de ações?",
      a: [
        "Continuar navegando para entender o que a página faria.",
        "Interromper a ação, preservar evidências e comunicar imediatamente o canal interno responsável.",
        "Fechar tudo e não contar a ninguém para evitar preocupação.",
      ],
      c: 1,
      feedback: [
        "Incorreto. Continuar interagindo pode aumentar o impacto e destruir evidências importantes.",
        "Correto. A contenção rápida e a preservação de informações como link, horário e captura de tela ajudam a investigação.",
        "Incorreto. Ocultar o ocorrido reduz a chance de contenção e pode permitir que o problema se espalhe.",
      ],
    },
    {
      category: "comunicacao-compartilhamento",
      q: "Um fornecedor pede por e-mail uma planilha confidencial com urgência. Qual é a melhor conduta?",
      a: [
        "Enviar imediatamente, porque o pedido veio de um contato conhecido.",
        "Validar a necessidade, a autorização, o destinatário e o canal de proteção antes de compartilhar.",
        "Encaminhar para um e-mail pessoal para facilitar o envio.",
      ],
      c: 1,
      feedback: [
        "Incorreto. Um contato conhecido pode estar comprometido, e a urgência não substitui validação e autorização.",
        "Correto. Informações confidenciais exigem confirmação do contexto, autorização, destinatário correto e mecanismo de proteção adequado.",
        "Incorreto. E-mails pessoais não devem ser usados para contornar os controles corporativos.",
      ],
    },
  ];

  let index = 0;
  let score = 0;
  let locked = false;
  let responses = [];

  const questionArea = document.getElementById("quizQuestionArea");
  const result = document.getElementById("quizResult");
  const quizCard = questionArea?.closest(".quiz-card");
  const questionText = document.getElementById("questionText");
  const answers = document.getElementById("answers");
  const feedback = document.getElementById("quizFeedback");
  const scoreEl = document.getElementById("quizScore");
  const topicEl = document.getElementById("quizTopic");
  const progressEl = document.getElementById("quizProgress");
  const progressBar = document.getElementById("quizProgressBar");
  const nextBtn = document.getElementById("nextQuestion");
  const restartBtn = document.getElementById("restartQuiz");

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function updateProgress(answeredCount) {
    const safeCount = Math.min(quiz.length, Math.max(0, answeredCount));
    const percentage = (safeCount / quiz.length) * 100;
    if (progressBar) progressBar.style.width = `${percentage}%`;
    if (progressEl) {
      progressEl.setAttribute("aria-valuenow", String(safeCount));
      progressEl.setAttribute(
        "aria-label",
        `${safeCount} de ${quiz.length} perguntas respondidas`,
      );
    }
  }

  function renderQuestion() {
    const item = quiz[index];
    locked = false;
    nextBtn.disabled = true;
    nextBtn.textContent =
      index === quiz.length - 1 ? "Ver meu resultado" : "Continuar";
    feedback.textContent = "";
    feedback.className = "quiz-feedback";
    scoreEl.textContent = `Pergunta ${index + 1} de ${quiz.length} | Acertos: ${score}`;
    topicEl.textContent = categoryMeta[item.category].label;
    questionText.textContent = item.q;
    answers.innerHTML = "";
    updateProgress(index);

    item.a.forEach((text, answerIndex) => {
      const button = document.createElement("button");
      button.className = "answer";
      button.type = "button";
      button.textContent = text;
      button.addEventListener("click", () => choose(answerIndex));
      answers.appendChild(button);
    });
  }

  function choose(choice) {
    if (locked) return;
    locked = true;

    const item = quiz[index];
    const isCorrect = choice === item.c;
    const buttons = [...answers.querySelectorAll("button")];

    buttons.forEach((button, answerIndex) => {
      button.disabled = true;
      if (answerIndex === item.c) button.classList.add("correct");
      if (answerIndex === choice && !isCorrect) button.classList.add("wrong");
    });

    responses[index] = {
      question: item.q,
      category: item.category,
      selected: item.a[choice],
      correctAnswer: item.a[item.c],
      isCorrect,
    };

    if (isCorrect) score += 1;

    feedback.textContent = item.feedback[choice];
    feedback.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"}`;
    nextBtn.disabled = false;
    scoreEl.textContent = `Pergunta ${index + 1} de ${quiz.length} | Acertos: ${score}`;
    updateProgress(index + 1);
  }

  function buildCategoryAnalysis() {
    const analysis = Object.entries(categoryMeta).map(([key, meta]) => ({
      key,
      ...meta,
      total: 0,
      correct: 0,
      percentage: 0,
    }));

    const byKey = new Map(analysis.map((item) => [item.key, item]));

    quiz.forEach((item, questionIndex) => {
      const category = byKey.get(item.category);
      if (!category) return;
      category.total += 1;
      if (responses[questionIndex]?.isCorrect) category.correct += 1;
    });

    analysis.forEach((category) => {
      category.percentage = category.total
        ? Math.round((category.correct / category.total) * 100)
        : 0;
    });

    return analysis;
  }

  function getPerformanceProfile(percentage) {
    if (percentage >= 90) {
      return {
        className: "is-excellent",
        label: "Excelente domínio",
        title: "Você demonstrou excelente percepção de risco.",
        message:
          "Seu resultado mostra atenção consistente aos sinais de fraude, proteção de dados e resposta a incidentes. Mantenha o hábito de validar contexto e canal antes de agir.",
      };
    }

    if (percentage >= 75) {
      return {
        className: "is-strong",
        label: "Bom nível de segurança",
        title: "Sua base está sólida e bem aplicada.",
        message:
          "Você reconheceu a maior parte das situações de risco. As recomendações abaixo indicam os temas que podem elevar sua resposta a um nível ainda mais consistente.",
      };
    }

    if (percentage >= 60) {
      return {
        className: "is-attention",
        label: "Atenção em desenvolvimento",
        title: "Você identificou riscos importantes, mas ainda há pontos para reforçar.",
        message:
          "Revise os temas com menor pontuação e transforme as recomendações em hábitos práticos antes de clicar, compartilhar, instalar ou aprovar solicitações.",
      };
    }

    return {
      className: "is-review",
      label: "Revisão recomendada",
      title: "Reforce os fundamentos antes de situações reais.",
      message:
        "O resultado indica oportunidades importantes de aprendizado. Use o plano personalizado abaixo para revisar os temas prioritários e refaça o quiz depois.",
    };
  }

  function renderCategoryRows(categories) {
    return categories
      .map(
        (category) => `
          <div class="quiz-category-row">
            <div class="quiz-category-copy">
              <strong>${escapeHtml(category.label)}</strong>
              <span>${category.correct} de ${category.total} respostas corretas</span>
            </div>
            <div class="quiz-category-score">${category.percentage}%</div>
            <div aria-label="${escapeHtml(category.label)}: ${category.percentage}%" aria-valuemax="100" aria-valuemin="0" aria-valuenow="${category.percentage}" class="quiz-category-bar" role="progressbar">
              <span class="quiz-category-fill" style="--category-score: ${category.percentage}%"></span>
            </div>
          </div>
        `,
      )
      .join("");
  }

  function renderImprovementCards(categories) {
    const priorities = categories
      .filter((category) => category.percentage < 100)
      .sort((a, b) => a.percentage - b.percentage || b.total - a.total)
      .slice(0, 3);

    if (!priorities.length) {
      return `
        <div class="quiz-mastery-card">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>Todos os temas foram dominados</strong>
            <p>Você acertou todas as perguntas. Continue aplicando as validações e boas práticas no dia a dia.</p>
          </div>
        </div>
      `;
    }

    return priorities
      .map(
        (category, priorityIndex) => `
          <article class="quiz-improvement-card">
            <span class="quiz-improvement-index">0${priorityIndex + 1}</span>
            <div>
              <div class="quiz-improvement-title">
                <strong>${escapeHtml(category.label)}</strong>
                <span>${category.percentage}%</span>
              </div>
              <p>${escapeHtml(category.tip)}</p>
              <a href="${category.section}">Revisar este conteúdo</a>
            </div>
          </article>
        `,
      )
      .join("");
  }

  function renderAnswerReview() {
    const incorrectResponses = responses.filter((response) => !response.isCorrect);

    if (!incorrectResponses.length) {
      return `
        <div class="quiz-review-success">
          <span aria-hidden="true">✓</span>
          <div>
            <strong>Nenhuma resposta incorreta</strong>
            <p>Seu desempenho foi completo em todas as situações apresentadas.</p>
          </div>
        </div>
      `;
    }

    return `
      <div class="quiz-review-list">
        ${incorrectResponses
          .map(
            (response, responseIndex) => `
              <article class="quiz-review-item">
                <span class="quiz-review-number">${String(responseIndex + 1).padStart(2, "0")}</span>
                <div>
                  <strong>${escapeHtml(response.question)}</strong>
                  <p><b>Sua resposta:</b> ${escapeHtml(response.selected)}</p>
                  <p class="quiz-review-correct"><b>Resposta recomendada:</b> ${escapeHtml(response.correctAnswer)}</p>
                </div>
              </article>
            `,
          )
          .join("")}
      </div>
    `;
  }

  function renderQuizResults() {
    const total = quiz.length;
    const correct = score;
    const incorrect = total - correct;
    const percentage = Math.round((correct / total) * 100);
    const scoreAngle = percentage * 3.6;
    const categories = buildCategoryAnalysis();
    const strongestCategory = [...categories].sort(
      (a, b) => b.percentage - a.percentage || b.correct - a.correct,
    )[0];
    const profile = getPerformanceProfile(percentage);
    const strengths = categories
      .filter((category) => category.percentage >= 75)
      .sort((a, b) => b.percentage - a.percentage)
      .slice(0, 3);

    result.className = `quiz-result ${profile.className}`;
    result.innerHTML = `
      <div class="quiz-result-dashboard">
        <section class="quiz-result-hero">
          <div class="quiz-result-copy">
            <span class="quiz-result-kicker">DIAGNÓSTICO DE CONSCIENTIZAÇÃO</span>
            <span class="quiz-level-badge">${escapeHtml(profile.label)}</span>
            <h3>${escapeHtml(profile.title)}</h3>
            <p>${escapeHtml(profile.message)}</p>
            <div class="quiz-strengths">
              <span>Pontos fortes</span>
              <div>
                ${
                  strengths.length
                    ? strengths
                        .map(
                          (category) =>
                            `<b>${escapeHtml(category.label)} · ${category.percentage}%</b>`,
                        )
                        .join("")
                    : "<b>Continue evoluindo com o plano abaixo</b>"
                }
              </div>
            </div>
          </div>
          <div class="quiz-donut-panel">
            <div aria-label="${correct} respostas corretas e ${incorrect} incorretas, aproveitamento de ${percentage}%" class="quiz-donut" role="img" style="--quiz-score-target: ${scoreAngle}deg">
              <div class="quiz-donut-center">
                <strong>${percentage}%</strong>
                <span>aproveitamento</span>
              </div>
            </div>
            <div class="quiz-chart-legend">
              <span><i class="is-correct"></i>${correct} corretas</span>
              <span><i class="is-wrong"></i>${incorrect} incorretas</span>
            </div>
          </div>
        </section>

        <section class="quiz-result-metrics" aria-label="Resumo do resultado">
          <article class="quiz-metric-card">
            <span>Acertos</span>
            <strong>${correct}</strong>
            <small>de ${total} perguntas</small>
          </article>
          <article class="quiz-metric-card">
            <span>Erros</span>
            <strong>${incorrect}</strong>
            <small>pontos para revisar</small>
          </article>
          <article class="quiz-metric-card">
            <span>Maior domínio</span>
            <strong class="is-text">${escapeHtml(strongestCategory.label)}</strong>
            <small>${strongestCategory.percentage}% nesse tema</small>
          </article>
          <article class="quiz-metric-card">
            <span>Situações avaliadas</span>
            <strong>${total}</strong>
            <small>cenários do cotidiano</small>
          </article>
        </section>

        <div class="quiz-analysis-grid">
          <section class="quiz-category-panel">
            <div class="quiz-section-heading">
              <span>ANÁLISE POR TEMA</span>
              <h4>Onde você está mais preparado</h4>
              <p>As barras mostram seu aproveitamento em cada área do treinamento.</p>
            </div>
            <div class="quiz-category-list">
              ${renderCategoryRows(categories)}
            </div>
          </section>

          <section class="quiz-improvement-panel">
            <div class="quiz-section-heading">
              <span>PLANO PERSONALIZADO</span>
              <h4>Prioridades de melhoria</h4>
              <p>Comece pelos temas de menor desempenho e transforme a revisão em ação prática.</p>
            </div>
            <div class="quiz-improvement-list">
              ${renderImprovementCards(categories)}
            </div>
          </section>
        </div>

        <section class="quiz-review-panel">
          <div class="quiz-section-heading">
            <span>REVISÃO GUIADA</span>
            <h4>${incorrect ? "Respostas que merecem uma nova leitura" : "Desempenho completo"}</h4>
            <p>${
              incorrect
                ? "Compare sua escolha com a resposta recomendada e identifique o sinal de risco principal."
                : "Você aplicou corretamente as boas práticas em todos os cenários."
            }</p>
          </div>
          ${renderAnswerReview()}
        </section>

        <div class="quiz-result-actions">
          <button class="btn btn-primary" id="restartQuizResult" type="button">Refazer as 15 perguntas</button>
          <a class="btn btn-ghost" href="${
            [...categories].sort((a, b) => a.percentage - b.percentage)[0].section
          }">Revisar conteúdo prioritário</a>
        </div>
      </div>
    `;

    questionArea.hidden = true;
    result.hidden = false;
    quizCard?.classList.add("quiz-complete");

    requestAnimationFrame(() => {
      requestAnimationFrame(() => result.classList.add("is-ready"));
    });

    document
      .getElementById("restartQuizResult")
      ?.addEventListener("click", restartQuiz);

    const resultTarget = result.querySelector(".quiz-result-hero") || result;
    if (window.kvmScrollTo) {
      window.kvmScrollTo(resultTarget, { offset: -116 });
    } else {
      resultTarget.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function restartQuiz() {
    index = 0;
    score = 0;
    locked = false;
    responses = [];
    result.classList.remove("is-ready");
    result.hidden = true;
    result.innerHTML = "";
    questionArea.hidden = false;
    quizCard?.classList.remove("quiz-complete");
    renderQuestion();

    if (window.kvmScrollTo) {
      window.kvmScrollTo(questionArea, { offset: -132 });
    }
  }

  nextBtn?.addEventListener("click", () => {
    if (!locked) return;

    if (index < quiz.length - 1) {
      index += 1;
      renderQuestion();
      return;
    }

    renderQuizResults();
  });

  restartBtn?.addEventListener("click", restartQuiz);

  if (
    questionArea &&
    result &&
    questionText &&
    answers &&
    feedback &&
    scoreEl &&
    topicEl &&
    nextBtn &&
    restartBtn
  ) {
    renderQuestion();
  }
})();
