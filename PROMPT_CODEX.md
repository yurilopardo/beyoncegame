# Pedido inicial para o Codex

Crie o protótipo jogável de Queen B com base em GDD_Queen_B.md, gameplay.json, levels/prototype.json e nas imagens da pasta refs. A protagonista é Beyoncé em pixel art estilizada. A direção visual é preto dominante e lettering rosa, inspirada no álbum BEYONCÉ. O movimento deve parecer dança, com silhuetas claras e resposta rápida aos comandos.

Use TypeScript, Vite e Phaser 3.90.0 com Arcade Physics, resolução lógica de 480 × 270 e física a 60 Hz. Fixe as dependências. Mantenha valores em configuração e separe o controlador físico da animação. Use os parâmetros do JSON como base de balanceamento. Não use serviços externos em tempo de execução.

Implemente primeiro apenas a etapa 1: um trecho com chão, plataformas, dois vãos, movimento, salto variável, tolerância de borda de 100 ms, memória de salto de 120 ms e dash. Mostre os comandos. Use arte provisória quando necessário, mantendo preto e rosa, e crie uma animação mínima de dança para repouso e corrida. Inclua um comando de desenvolvimento e outro de build. Execute o build e corrija os erros antes de apresentar o resultado.

Depois siga as etapas 2 a 5 do documento: abelhas básicas, enxame forte, lançamento especial de crocodilos, três executivos fictícios, checkpoints, chefe e vitória. Preserve os critérios de aceite. Não amplie o escopo para novas fases ou sistemas antes de concluir a primeira fase. Ao final de cada etapa, informe o que está jogável, como iniciar e o que falta.

As imagens são referências de direção de arte e poses. Produza sprites com grade, transparência e pivô corretos, ou use formas provisórias legíveis. Faça a lógica de dano independente da animação. Não recorte automaticamente a prancha como se ela já fosse um atlas pronto. A fase deve continuar vencível com salto e abelha, incluindo o chefe em suas aberturas.
