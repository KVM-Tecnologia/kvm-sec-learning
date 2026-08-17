const quiz = [
        {
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
      ];

      let index = 0;
      let score = 0;
      let locked = false;
      const questionText = document.getElementById("questionText");
      const answers = document.getElementById("answers");
      const feedback = document.getElementById("quizFeedback");
      const scoreEl = document.getElementById("quizScore");
      const nextBtn = document.getElementById("nextQuestion");
      const restartBtn = document.getElementById("restartQuiz");

      function renderQuestion() {
        locked = false;
        nextBtn.disabled = true;
        feedback.textContent = "";
        feedback.className = "quiz-feedback";
        const item = quiz[index];
        scoreEl.textContent = `Pergunta ${index + 1} de ${quiz.length} | Acertos: ${score}`;
        questionText.textContent = item.q;
        answers.innerHTML = "";
        item.a.forEach((text, i) => {
          const btn = document.createElement("button");
          btn.className = "answer";
          btn.type = "button";
          btn.textContent = text;
          btn.addEventListener("click", () => choose(i));
          answers.appendChild(btn);
        });
      }

      function choose(choice) {
        if (locked) return;
        locked = true;
        const item = quiz[index];
        const isCorrect = choice === item.c;
        const buttons = [...answers.querySelectorAll("button")];
        buttons.forEach((btn, i) => {
          btn.disabled = true;
          if (i === item.c) btn.classList.add("correct");
          if (i === choice && !isCorrect) btn.classList.add("wrong");
        });
        if (isCorrect) score++;
        feedback.textContent = item.feedback[choice];
        feedback.className = `quiz-feedback ${isCorrect ? "correct" : "wrong"}`;
        nextBtn.disabled = false;
        scoreEl.textContent = `Pergunta ${index + 1} de ${quiz.length} | Acertos: ${score}`;
      }

      nextBtn.addEventListener("click", () => {
        if (index < quiz.length - 1) {
          index++;
          renderQuestion();
        } else {
          questionText.textContent =
            score >= Math.ceil(quiz.length * 0.8)
              ? "Bom resultado."
              : "Vale revisar os pontos principais.";
          answers.innerHTML = "";
          feedback.className = "quiz-feedback correct";
          feedback.innerHTML = `Você acertou <strong>${score}</strong> de <strong>${quiz.length}</strong>. Antes de clicar, baixar, responder ou compartilhar, confira a origem e o contexto.`;
          scoreEl.textContent = "Quiz concluído";
          nextBtn.disabled = true;
        }
      });

      restartBtn.addEventListener("click", () => {
        index = 0;
        score = 0;
        renderQuestion();
      });
      renderQuestion();
