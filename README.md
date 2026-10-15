# Queen B — etapa 1

Protótipo de navegador em TypeScript, Vite e Phaser **3.90.0**, com Arcade Physics a 60 Hz e resolução lógica de 480 × 270. Sem serviços externos em execução.

## Executar

Requer Node.js 22.12+ (validado com 24.19.0).

```sh
npm ci
npm run dev
```

Abra o endereço indicado pelo Vite. `npm run build` verifica TypeScript e gera `dist/`; `npm run preview` serve esse build.

## Jogar

- A/D ou setas: mover; comandos opostos se anulam.
- Espaço: saltar; segure para salto alto, solte para salto curto.
- Shift: dash no chão ou no ar, com recarga de 800 ms e um uso aéreo por aterrissagem.
- Esc ou botão Pausar: pausa/continua; perder foco pausa e exige continuação explícita.
- R ou Novo ensaio: reinicia. Cair retorna ao começo. Alcance a luz no final.

## Escopo

Esta entrega implementa a etapa 1 do GDD: movimento, colisões, plataformas, vãos de 48 e 64 px, tolerância de borda de 100 ms, memória de salto de 120 ms, salto variável, dash e poses provisórias de repouso/corrida. O controlador físico e o animador estão separados. Os números vêm de `gameplay.json`.

`levels/prototype.json` foi criado para este trecho, pois o arquivo citado no kit não estava no commit original. Não representa a fase completa do GDD. A arte foi desenhada com formas por código; as imagens de referência não vieram no repositório. Não há áudio nesta etapa.

Ainda faltam as etapas 2–5: combate e recursos, inimigos, fase completa/checkpoints, chefe/vitória final, arte e som. Chegar à luz aqui conclui somente o ensaio de movimento.

## Verificar

Com o servidor de desenvolvimento em execução:

```sh
npm run build
npm run test:browser
```

Os testes usam Chromium em `/usr/bin/chromium`; informe outro executável com `CHROMIUM_PATH`. `TEST_URL` altera o endereço de teste. Verificam inicialização sem exceções, chão, salto variável, dash, pausa, entrada oposta e travessia completa sem dash. A captura do smoke test fica em `/tmp/queen-b-stage1.png`. A telemetria somente de leitura `window.queenB` permite inspecionar o jogador durante desenvolvimento. Buffer de salto, tolerância de borda e bloqueio do dash em paredes ainda requerem testes específicos.
