# Queen B documentação do jogo

## Visão do protótipo

**Beyoncé atravessa os bastidores de uma indústria transformada em plataformas e conquista o palco com dança, abelhas e crocodilos.** Queen B é um jogo de plataforma 2D lateral, para uma pessoa, com exploração leve e combate à distância. O primeiro protótipo deve comprovar que controlar a protagonista é divertido mesmo antes de aparecer um inimigo.

O projeto combina o acesso imediato de um jogo de plataforma clássico com movimentos de show. Correr tem postura de passarela; saltar forma uma pose; lançar um poder termina em gesto coreografado. A resposta aos comandos continua rápida. A dança aparece na animação e não exige acertar o tempo de uma música.

**Nome de trabalho:** Queen B. **Plataforma inicial:** navegador no computador. **Público:** quem gosta de plataformas acessíveis, cultura pop e humor visual. **Duração pretendida do protótipo:** 5 a 8 minutos na primeira tentativa. **Estilo:** pixel art estilizada, com linguagem de 16 bits, preto dominante e lettering rosa inspirado no álbum BEYONCÉ.

![Referência de cenário e combate](refs/01_cenario_e_combate.png)

**Entrega jogável pretendida:** uma fase com oito trechos, três ataques, três tipos de inimigo, um chefe, dois checkpoints e tela de vitória. Os valores deste documento são a base inicial de balanceamento e devem ficar em configuração editável.

<!-- pagebreak -->

## 01 Regras essenciais e controles

### O que a pessoa faz

1. Avança pelos cenários, salta entre plataformas e lê a preparação dos inimigos.
2. Usa abelhas em alvos isolados, enxames em grupos e crocodilos para atravessar defesas.
3. Coleta notas para pontuar e mel para recuperar Poder Diva.
4. Ativa checkpoints e vence o executivo que controla o acesso ao palco.
5. Entra na luz central após derrotar o chefe para concluir a fase.

Não existe cronômetro eliminatório, sistema de vidas finitas ou obrigação de derrotar todos os inimigos. O percurso principal pode ser resolvido com salto e ataque básico; poderes caros facilitam encontros e abrem recompensas opcionais. Na saída da arena, a derrota do chefe é obrigatória.

### Controles do primeiro protótipo

| Ação | Teclado | Comportamento |
| --- | --- | --- |
| Mover | A e D ou setas | Direção pressionada define a corrida |
| Saltar | Espaço | Segurar aumenta a altura até o limite |
| Deslizar dançando | Shift | Dash horizontal no chão ou no ar |
| Abelha | J | Ataque básico na direção do olhar |
| Enxame | K | Ataque forte com custo de Poder Diva |
| Crocodilo | L | Especial disponível com a barra cheia |
| Pausar | Esc | Congela física, IA e temporizadores |
| Recomeçar | R na derrota | Retorna ao último checkpoint |

Aceitar as duas famílias de movimento ao mesmo tempo. A e D simultâneos resultam em velocidade horizontal zero. O navegador não deve rolar a página ao receber Espaço ou setas enquanto o jogo estiver em foco.

### Sucesso e falha

A protagonista tem cinco pontos de vida. Contato hostil ou projétil retira um ponto. Cair em um abismo ou chegar a zero causa uma derrota com retorno ao checkpoint em até dois segundos. Não há penalidade permanente. A vitória ocorre somente com o chefe derrotado e a protagonista dentro do portal de luz.

<!-- pagebreak -->

## 02 Movimento e sensação de controle

Todas as medidas usam pixels da resolução lógica de 480 × 270. A física roda em passos fixos de 60 Hz. A arte pode ampliar a postura e o cabelo sem alterar o corpo usado nas colisões.

| Parâmetro | Valor inicial | Efeito esperado |
| --- | --- | --- |
| Corrida máxima | 160 px/s | Travessia clara e responsiva |
| Aceleração no chão | 1.600 px/s² | Cerca de 0,10 s para atingir a máxima |
| Frenagem no chão | 2.000 px/s² | Parada curta com pose de conclusão |
| Aceleração no ar | 1.000 px/s² | Correção de salto sem voo livre |
| Gravidade | 1.200 px/s² | Salto com arco definido |
| Impulso do salto | −360 px/s | Altura teórica de 54 px |
| Velocidade máxima de queda | 600 px/s | Evita quedas visualmente bruscas |
| Corte ao soltar salto | Limitar subida a −160 px/s | Permite saltos curtos |
| Tolerância após sair da borda | 100 ms | Ainda aceita o salto após sair do chão |
| Memória do comando de salto | 120 ms | Salta ao tocar o chão logo após apertar |
| Dash | 440 px/s por 180 ms | Deslocamento aproximado de 79 px |
| Recarga do dash | 800 ms do início | Máximo de um por ciclo de recarga |

O salto completo dura aproximadamente 0,60 s até voltar à mesma altura e cobre até 96 px quando a protagonista já está à velocidade máxima. A fase usa vãos obrigatórios de até 64 px e desníveis de até 32 px para manter margem de execução. Não há salto duplo nem salto de parede no protótipo.

Durante o dash, suspender a gravidade, zerar a velocidade vertical e fixar a direção escolhida no início. Ao terminar, restaurar a gravidade e começar a queda com velocidade vertical zero. Permitir um dash aéreo por aterrissagem, além da recarga geral. O dash não concede invulnerabilidade e termina ao encontrar uma parede.

### Dano e interrupções

Após receber dano, aplicar 1 s de invulnerabilidade, um recuo horizontal de 90 px/s durante 120 ms e impulso vertical de −120 px/s. A perda de vida interrompe o dash e a animação de ataque. Poderes ainda não emitidos são cancelados e devolvem seu custo; projéteis já criados continuam existindo. A recuperação da pose de aterrissagem não bloqueia o próximo salto ou movimento.

Prioridade visual: derrota, dano, dash, ataque, salto ou queda, corrida e repouso. A prioridade organiza a imagem; as colisões e os comandos seguem as regras de cada ação.

<!-- pagebreak -->

## 03 Ataques e Poder Diva

### Valores de combate

| Ataque | Dano | Custo | Intervalo mínimo | Alcance aproximado |
| --- | --- | --- | --- | --- |
| Abelha | 1 por projétil | 0 | 280 ms | 180 px |
| Enxame | Até 3 por alvo | 35 | 2.400 ms | 144 px de deslocamento |
| Crocodilo | 6 por alvo | 100 | 1.200 ms | 364 px de deslocamento |

**Abelha:** Beyoncé aponta com um gesto curto e solta uma abelha dourada após 80 ms. O projétil segue horizontalmente a 300 px/s, vive por 600 ms e some ao atingir o primeiro alvo ou parede. Hitbox de 8 × 6 px. Limite de três abelhas ativas. Segurar J repete os disparos respeitando o intervalo. A corrida mantém 100% da velocidade.

**Enxame:** um giro dos braços emite uma nuvem após 160 ms. A nuvem, com hitbox de 80 × 56 px, avança a 120 px/s por 1.200 ms. Cada alvo recebe no máximo três pulsos de um ponto, separados por pelo menos 400 ms. A nuvem alcança vários inimigos e aplica lentidão de 30% por 600 ms a cada pulso. Chefes ignoram a lentidão. Parede sólida encerra a nuvem. A corrida fica a 80% durante os 400 ms da animação de conjuração; o salto continua disponível.

**Crocodilo:** um movimento amplo de quadril e braços conjura e lança um crocodilo mágico após 240 ms. Ele nasce no nível da mão, segue horizontalmente a 280 px/s por 1.300 ms e tem hitbox de 56 × 18 px. Atinge cada alvo uma única vez, atravessa inimigos, quebra o escudo de contratos e destrói barreiras marcadas como destrutíveis. Paredes comuns encerram o voo. Ele não vira plataforma, montaria ou animal persistente. A corrida fica a 60% durante os 600 ms da animação.

Os três ataques podem ser lançados no chão ou no ar, na direção do olhar. Não iniciar outro ataque antes da emissão do anterior. Após a emissão, outro tipo de ataque pode interromper a pose de recuperação, respeitando seu próprio intervalo e recursos. Um dash pode interromper a conjuração: devolver o custo se o projétil ainda não tiver saído. Pressionar K ou L repetidamente não enfileira lançamentos. Todos os intervalos contam a partir do comando aceito.

### Economia do poder

Poder Diva varia de 0 a 100 e começa em 60. Recupera 6 pontos por segundo após 1,5 s sem gastar poder. Mel concede 20 pontos; derrotar um inimigo pela primeira vez concede 5. O enxame consome 35; o crocodilo exige e consome 100. Não há munição separada. Tentativas sem recurso mostram o custo na barra e não interrompem o movimento. Pular em cima de inimigos causa contato hostil; o combate usa os três ataques.

<!-- pagebreak -->

## 04 Inimigos e leitura do perigo

Os adversários são homens brancos engravatados, em caricaturas fictícias de executivos da música. Ternos e papéis expressam o poder institucional que tentam impor à protagonista. A narrativa é uma sátira própria do jogo. Nomes, aparência e falas não representam executivos reais.

Quando vencidos, os inimigos perdem a pose, espalham documentos e saem correndo ou desaparecem em partículas. Os ataques não apresentam ferimentos gráficos. Uma silhueta diferente identifica cada comportamento mesmo sem cor.

| Tipo | Vida | Sinal visual | Função no encontro |
| --- | --- | --- | --- |
| Executivo da prancheta | 2 | Terno estreito e prancheta | Patrulhar e ensinar o disparo |
| Porteiro dos contratos | 4 | Terno largo e escudo de papéis | Exigir flanco ou crocodilo |
| Produtor do carimbo | 3 | Óculos e carimbo grande | Criar pressão à distância |

Corpos de colisão medem 18 × 36 px no executivo e no produtor, e 24 × 38 px no porteiro. O salto completo passa acima do porteiro em terreno plano, com margem para o corpo da protagonista.

### Executivo da prancheta

Anda a 40 px/s, vira em paredes e em bordas. Ao avistar Beyoncé a até 120 px na mesma faixa de altura, ergue a prancheta durante 450 ms e avança a 100 px/s por 600 ms. Depois fica parado por 700 ms. A direção é fixada no começo do avanço, permitindo que a protagonista o ultrapasse. Contato causa um ponto de dano.

### Porteiro dos contratos

Patrulha a 28 px/s e só vira a cada 800 ms. O escudo bloqueia abelhas e enxames vindos de sua frente; pelas costas, recebe dano normal. Um crocodilo destrói o escudo e aplica os seis pontos de dano, suficientes para vencê-lo. Esse inimigo nunca deve bloquear sozinho uma passagem estreita obrigatória: deve haver espaço para saltar por cima e atacar pelas costas.

### Produtor do carimbo

Permanece em uma plataforma. A cada 2,2 s, se a protagonista estiver a até 260 px e visível, aponta o carimbo por 600 ms e lança um contrato horizontal a 110 px/s. O papel mede 10 × 6 px, vive 3 s e some na parede. Não mira novamente depois do aviso. Abelhas e crocodilos destroem esse projétil e continuam o percurso; o enxame não o destrói.

**Ativação:** inimigos acordam até 80 px antes de entrar na câmera e só atacam quando visíveis. Ao pausar ou perder foco, sua IA congela. O protótipo permite até seis inimigos ativos e, no máximo, dois ataques hostis simultâneos. Ao atingir esse limite, os demais aguardam o próximo ciclo.

<!-- pagebreak -->

## 05 Chefe da primeira fase

### O Presidente do Conselho

Um executivo de terno exagerado ocupa a entrada do palco com um púlpito e um escudo de contratos. Possui 24 pontos de vida. A arena tem 480 px de largura, chão contínuo em y = 224 e duas plataformas laterais de apoio em y = 192. O portão fecha quando a protagonista cruza x = 3.392. Nenhum inimigo comum permanece dentro da arena.

O chefe alterna três ataques e uma abertura. Os avisos visuais são obrigatórios; o jogador precisa entender o que vem antes de sofrer o dano.

| Etapa | Preparação | Ação | Recuperação |
| --- | --- | --- | --- |
| Contrato baixo | 600 ms com seta baixa | Um papel horizontal a 120 px/s | 800 ms |
| Contrato alto | 600 ms com seta alta | Um papel 60 px acima do chão | 800 ms |
| Martelo de aprovação | 800 ms com chão marcado | Onda rasteira a 140 px/s | 900 ms |
| Discurso interrompido | Escudo cai | Vulnerável por 2.500 ms | Reinicia o ciclo |

Cada ataque cria um projétil de um ponto de dano e só reinicia após a recuperação. O papel alto pode ser evitado permanecendo no chão; o papel baixo e a onda devem ser saltados. O chefe permanece no lado direito e olha para a esquerda. Os projéteis somem na parede esquerda. Abaixo de 12 pontos de vida, reduzir as preparações em 20%, preservando os outros tempos e o dano.

### Como causar dano

Durante os três ataques, o escudo bloqueia abelha e enxame de qualquer direção. Na abertura, todos os ataques acertam. Um crocodilo pode romper o escudo a qualquer momento, aplicar seis pontos e antecipar a abertura de 2,5 s. Esse rompimento cancela a preparação em andamento e remove projéteis hostis da arena. Ao terminar a abertura, o chefe recupera o escudo e volta ao contrato baixo.

O crocodilo é uma vantagem; a luta continua vencível apenas com abelhas durante as aberturas. Cada nuvem ou crocodilo respeita seu limite de dano por alvo, mesmo se atravessar o escudo e o corpo no mesmo passo de física.

### Checkpoint e encerramento

O checkpoint antes da arena restaura cinco pontos de vida e 100 de poder. Morrer no chefe reinicia toda a luta, seus temporizadores e sua vida. Ao chegar a zero, ele derruba o púlpito e foge. Abrir o acesso ao palco, remover projéteis hostis e acender o portal em x = 3.760. Entrar no portal ativa a dança de vitória e o resumo da partida.

<!-- pagebreak -->

## 06 Primeira fase e progressão

### Do backstage ao palco

O protótipo usa um único cenário contínuo de 3.840 × 270 px, dividido em oito trechos de uma tela. A câmera acompanha horizontalmente e mantém a altura fixa. Cada trecho apresenta uma ideia, permite praticá-la e combina essa ideia com um risco já conhecido.

| Trecho e faixa de x | Conteúdo | Aprendizado |
| --- | --- | --- |
| 1 Camarim · 0 a 479 | Piso seguro, movimento, primeiro executivo | Correr, saltar e atirar |
| 2 Bastidores · 480 a 959 | Primeiro vão, degrau e duas notas visíveis | Variar a altura do salto |
| 3 Porta dos contratos · 960 a 1.439 | Porteiro com espaço por cima | Saltar e atacar pelas costas |
| 4 Corredor da colmeia · 1.440 a 1.919 | Três executivos separados em dois grupos | Usar enxame sem prender o avanço |
| 5 Arquivo · 1.920 a 2.399 | Checkpoint, mel e parede opcional de contratos | Lançar crocodilo e quebrar barreira |
| 6 Estúdio · 2.400 a 2.879 | Produtor e plataformas em degraus | Ler avisos e escolher altura |
| 7 Pré palco · 2.880 a 3.359 | Encontro misto e segundo checkpoint | Combinar poderes e se preparar |
| 8 Conselho · 3.360 a 3.839 | Arena, chefe e portal | Vencer a luta e concluir |

### Geometria mínima a construir

Usar chão com topo em y = 224. Abrir apenas dois abismos obrigatórios: x = 576 a 623 e x = 1.104 a 1.151, ambos com 48 px. Adicionar plataformas em x = 656 a 751, y = 192; x = 1.184 a 1.263, y = 192; e x = 1.280 a 1.359, y = 160. No estúdio, usar degraus de 32 px, vãos de até 64 px e aterrissagens de pelo menos 48 px. Plataformas sólidas usam colisão nos quatro lados. Plataformas de mão única ficam fora do primeiro protótipo.

Spawn inicial em x = 64 com pés em y = 224. O primeiro checkpoint fica em x = 1.968 e o segundo em x = 3.248, ambos em terreno seguro. A arena começa em x = 3.360. A personagem, com seu corpo inteiro, deve caber entre plataformas, chão e teto. Nenhum salto obrigatório exige dash ou poder.

### Coletas e rota opcional

Distribuir 30 notas, quatro potes de mel e dois corações fixos. Cada nota vale 10 pontos; cada inimigo comum vale 100; o chefe vale 1.000. Posicionar três selos dourados em desvios opcionais, cada um valendo 250. Uma parede destrutível protege um selo no arquivo; esse desvio nunca é o caminho até o chefe.

Cada checkpoint restaura vida e poder ao máximo na primeira ativação da partida. Na derrota, manter score, coletas e barreiras destruídas; repor inimigos posteriores ao checkpoint. Inimigos concedem recompensa uma única vez por partida. Retomar com vida máxima e 60 de poder, ou 100 no checkpoint pré chefe. Antes do primeiro checkpoint, retornar ao spawn inicial. Reiniciar a fase pelo menu limpa todo esse progresso.

<!-- pagebreak -->

## 07 Direção de arte

### Preto e rosa com leitura de plataforma

A capa do álbum BEYONCÉ orienta o contraste e a tipografia: fundo preto, grande respiro e letras rosas em caixa alta, estreitas e de peso forte. A fase transporta essa linguagem para palcos, camarins, corredores, estúdios e prédios de gravadoras. Não usar o visual de outros álbuns como base do primeiro protótipo.

| Uso | Cor | Aplicação |
| --- | --- | --- |
| Fundo profundo | #050505 | Céu interno, telas e áreas distantes |
| Arquitetura | #17131A | Paredes, alto falantes e cortinas |
| Volume de cenário | #302630 | Separação de planos e plataformas |
| Rosa principal | #F2A6C8 | Título, interface e bordas caminháveis |
| Rosa de ação | #FF4FA0 | Poder, antecipação e efeitos curtos |
| Branco quente | #F6EEF3 | Texto pequeno e avisos importantes |
| Dourado | #F4C95D | Abelhas, mel e recompensas |
| Verde | #4D9B67 | Crocodilos e partículas de invocação |

Tons de pele e cabelo completam a paleta e preservam a identidade da protagonista. O preto do figurino precisa ter contorno claro ou luz rosa suficiente para se separar do cenário. As superfícies caminháveis recebem uma borda contínua de dois pixels lógicos. Fundos ficam menos contrastados que personagens e obstáculos.

### Protagonista e inimigos

Beyoncé deve ser reconhecível pela pele marrom, cabelos longos loiro mel, postura, expressão e figurino de palco preto com detalhes rosa. Preservar o volume do cabelo entre as animações. A expressão é confiante e divertida. Joelhos, quadril e braços produzem curvas rítmicas nas poses, com silhuetas legíveis em tamanho pequeno.

Os executivos usam ternos pretos e cinza, camisas claras e gravatas. Pranchetas, carimbos e escudos distinguem as funções. O chefe tem ombros e púlpito maiores. Evitar que detalhes do fundo pareçam projéteis ou colecionáveis.

### Regras de acabamento

Resolução lógica de 480 × 270, tiles de 16 × 16, ampliação por vizinho mais próximo e alinhamento da câmera ao pixel inteiro. Sem suavização ou rotação livre de sprites. Criar poses desenhadas para diagonais, em vez de girar uma imagem lisa. Usar poucos brilhos, sem cobrir a área de aterrissagem. O título pode usar letras altas; as instruções usam uma fonte pixelada simples com acentos legíveis.

<!-- pagebreak -->

## 08 Sprites e animações da protagonista

### Formato para produção

Cada quadro da protagonista ocupa uma célula transparente de 48 × 64 px. O ponto dos pés fica em x = 24, y = 60 em todos os quadros. O corpo de colisão é um retângulo de 18 × 40 px, alinhado aos pés. Cabelo, braços e efeitos não alteram esse retângulo. Desenhar inicialmente para a direita e espelhar no jogo; uma versão dedicada à esquerda pode vir depois.

As sequências abaixo somam 65 quadros. O arquivo final deve ser PNG com transparência e atlas JSON com nomes estáveis. Efeitos de abelhas, enxame e crocodilo ficam em arquivos separados. A saída do ataque é comandada pelos milissegundos da regra, sem depender da quantidade de quadros exibidos.

| Estado | Quadros | Exibição | Gesto que define a dança |
| --- | --- | --- | --- |
| idle | 6 | 8 fps em ciclo | Ombro marca o pulso e mão descansa no quadril |
| run | 8 | 12 fps em ciclo | Passo de passarela, joelho alto e braços expressivos |
| jump_start | 2 | 40 ms por quadro | Flexão breve e impulso com braço em arco |
| jump_up | 2 | 100 ms por quadro | Joelho recolhido e pose alongada |
| jump_fall | 2 | 100 ms por quadro | Cabelo sobe e braços preparam o pouso |
| land | 3 | 50 ms por quadro | Joelhos absorvem o peso e mão faz um floreio |
| dash | 4 | 45 ms por quadro | Deslize lateral com tronco inclinado |
| bee_cast | 4 | 50 ms por quadro | Aponta como quem marca uma batida |
| swarm_cast | 6 | Cerca de 67 ms por quadro | Desenha um círculo com os braços |
| croc_cast | 8 | 75 ms por quadro | Torção de quadril, preparação e lançamento |
| hurt | 2 | 80 ms por quadro | Recuo breve com postura recuperada |
| defeat | 6 | 100 ms por quadro | Spotlight apaga e ela sai de cena |
| victory | 12 | 10 fps em ciclo | Pequena sequência coreografada de celebração |

O impulso do salto acontece imediatamente no comando; jump_start é preparação visual já em movimento. No ar, jump_up permanece na última pose quando necessário e troca para jump_fall ao atingir o ápice. Usar uma sombra oval no chão para reforçar a profundidade do salto.

### Movimento contínuo durante ataques

Para manter corrida e ataque ao mesmo tempo, separar pernas e tronco em camadas com o mesmo pivô. As linhas bee_cast, swarm_cast e croc_cast são poses do tronco; as pernas seguem run, jump ou idle. No crocodilo, o tronco pode deslocar até dois pixels, com compensação do pivô. A primeira versão pode compor as camadas por código. O dash usa o corpo inteiro.

<!-- pagebreak -->

## 09 Referência de poses e produção dos assets

![Prancha de poses e ataques](refs/02_poses_e_movimentos.png)

A prancha orienta postura, cabelo, gesto e unidade visual. As poses devem ser redesenhadas na grade de 48 × 64 para gerar animações com escala e pivô constantes. Os exemplos de ataque mostram a intenção do gesto; os arquivos dos poderes continuam separados do corpo.

### Ordem de produção

1. Aprovar uma silhueta lateral em repouso e duas poses opostas da corrida.
2. Fechar corrida, salto, queda, pouso e dash antes das animações longas.
3. Animar a conjuração básica, o enxame e o crocodilo no mesmo figurino.
4. Desenhar os inimigos com a mesma escala de pixel da protagonista.
5. Exportar atlas, cadastrar pivôs e conferir cada sequência em fundo preto e em fundo claro.

### Assets mínimos além da protagonista

| Grupo | Escopo inicial |
| --- | --- |
| Inimigos comuns | Três modelos, com repouso, ação e derrota |
| Chefe | Escudo, três preparações, abertura e fuga |
| Abelhas | 4 quadros de voo em células de 12 × 12 px |
| Enxame | 6 quadros em células de 96 × 64 px |
| Crocodilo | 4 quadros em células de 64 × 32 px |
| Cenário | Um tileset de 16 px, um fundo e dois planos de profundidade |
| Interface | Coração, nota, mel, selo, barra e ícones dos três ataques |
| Efeitos | Dano, invocação, papel rasgado e ativação de checkpoint |

Manter nomes como player_run_00 e player_run_01, sem espaço ou acento. Cada estado registra duração, quadros e condição de saída em animations.json. Para o protótipo, inimigos e cenário podem começar com formas simples; a animação expressiva da protagonista deve aparecer já na primeira rodada de polimento.

<!-- pagebreak -->

## 10 Interface som e acessibilidade

### O que aparece na tela

No topo esquerdo, exibir cinco corações. Ao lado, barra de Poder Diva com valor de 0 a 100 e indicação dos custos 35 e 100. No topo direito, score e três espaços para os selos. Na arena, a vida do chefe aparece abaixo da faixa superior. Evitar textos sobre a protagonista, inimigos ou local de pouso.

Na parte inferior, mostrar J, K e L com os ícones dos poderes. Crocodilo indisponível fica em contorno; ao chegar a 100, o ícone preenche e mostra PRONTO. Checkpoint usa um pedestal de microfone com luz rosa. Ativação produz o texto curto CHECKPOINT e restaura recursos imediatamente.

### Fluxo de telas

Tela inicial com título rosa em fundo preto, botões Jogar, Controles e Ajustes. O jogo começa com uma pose curta que pode ser pulada. Instruções surgem em áreas seguras e somem depois que a ação é executada. A pausa oferece Continuar, Recomeçar fase e Voltar ao início. Recomeçar fase pede um segundo acionamento para evitar perder o progresso por engano.

Na derrota, mostrar uma frase curta e os comandos Tentar novamente e Menu. Na vitória, informar score, selos e tempo ativo, com opções Jogar de novo e Menu. O tempo não inclui pausa, telas ou foco perdido. O foco perdido pausa automaticamente; a volta exige um comando explícito para continuar.

### Som

Usar trilha instrumental original ou provisória com licença adequada, em torno de 110 a 120 BPM. Ela reforça a energia da performance, mas o jogo funciona em silêncio e os ataques não dependem do compasso. A fase ganha camadas de percussão conforme se aproxima do palco. Não é necessário usar gravações ou letras da artista no protótipo.

A abelha tem um ataque sonoro curto; o enxame ganha zumbido mais cheio; o crocodilo combina invocação com impacto grave. Cada sinal hostil importante tem também uma forma visível. Incluir volumes separados para música e efeitos, além de mudo geral. O primeiro som só toca depois de uma interação da pessoa.

### Ajustes de acesso

Oferecer opção de reduzir tremor, flashes e rastros, sem afetar a mecânica. Combinar cor, forma e movimento nos avisos. Incluir modo de assistência com sete pontos de vida, velocidade hostil 20% menor e regeneração de poder de 10 pontos/s. O modo não altera alcance do salto nem a geometria. Permitir trocar as teclas em uma versão posterior; o protótipo precisa ao menos exibir todos os comandos antes da primeira dificuldade.

<!-- pagebreak -->

## 11 Estrutura recomendada para o protótipo

### Base técnica

Adotar TypeScript, Vite e Phaser 3.90.0 com Arcade Physics. A escolha atende a um protótipo de navegador com colisões retangulares, sprites e mapa de tiles. Fixar essa versão no projeto e guardar o lockfile. Usar as referências oficiais correspondentes; este documento não exige migrar um projeto que já tenha outra engine funcional.

Configurar resolução lógica de 480 × 270, pixelArt e roundPixels ativos, antialias desativado e física a 60 Hz. A apresentação prefere escalas inteiras de 2×, 3× ou 4× com barras pretas. Em janelas menores, permitir ajuste para caber. A câmera tem uma zona central de 96 px, antecipa o olhar em 32 px e limita o deslocamento aos extremos da fase. Guardar a mira na direção do último movimento válido.

### Organização sugerida

- **BootScene:** carrega configuração, atlas, áudio e preferências.
- **MenuScene:** início, controles e ajustes.
- **LevelScene:** mapa, câmera, encontros e checkpoints.
- **HudScene:** vida, poder, score e pausa.
- **PlayerController e PlayerAnimator:** separam simulação e pose.
- **CombatSystem e DamageSystem:** criam ataques e aplicam dano sem duplicar colisões.
- **EnemyController e BossController:** estados e temporizadores próprios.
- **RunState:** score, coletas, recompensas, checkpoint e tempo ativo.
- **config/gameplay.json e levels/prototype.json:** números e objetos editáveis.

### Estados e eventos

O jogador usa estados físicos grounded, airborne, dashing, hurt e defeated. A animação recebe esses estados e uma camada de conjuração. Inimigos usam idle, patrol, telegraph, attack, recover e defeated. O chefe usa shielded, telegraph, attack, exposed e defeated. Pausa congela todos os relógios do jogo, incluindo regeneração, recargas, nuvens e projéteis.

Cada ataque recebe um attackId. Manter uma lista de alvos já atingidos por abelha e crocodilo; no enxame, registrar o instante do último pulso e o número de pulsos por alvo. Centralizar a função de dano. Cabelo não recebe dano. Remover ou desativar corpos de objetos vencidos ao final do passo de física, evitando efeitos repetidos na mesma sobreposição.

### Salvamento e limites

No protótipo, guardar progresso apenas em memória; ao recarregar a página, começar uma partida nova. Preferências de áudio, assistência e efeitos podem ir para localStorage. Não há conta, servidor, ranking online, compras ou multiplayer. Os arquivos de configuração no kit são especificações iniciais para implementação, sem código de jogo executável.

<!-- pagebreak -->

## 12 Etapas de desenvolvimento e validação

Trabalhar em cinco incrementos. Cada etapa termina em uma versão que inicia e pode ser jogada. As etapas são uma ordem de execução e não uma estimativa de calendário.

| Etapa | Entrega | Critério para avançar |
| --- | --- | --- |
| 1 Controle | Movimento, colisões, salto e dash | Vãos de 48 e 64 px são vencíveis sem poderes |
| 2 Combate | Vida, poder, três ataques e alvos | Custos, dano e intervalos batem com a configuração |
| 3 Fase | Oito trechos, coletas, três inimigos e checkpoints | Percurso inteiro acessível e sem bloqueio permanente |
| 4 Chefe | Ciclo de luta, abertura e vitória | É possível vencer apenas com abelhas |
| 5 Performance | Arte, camadas de animação, som e ajustes | Movimento transmite dança mantendo resposta imediata |

### Critérios de aceite para entregar o protótipo

1. A fase inicia sem erro no console e o comando de build termina com sucesso.
2. A protagonista para de cair no topo das plataformas e não atravessa paredes durante o dash.
3. Saltos baixos e altos têm alturas diferentes; tolerância de borda e memória de salto funcionam.
4. A abelha acerta uma vez e some; nunca existem mais de três abelhas do jogador ativas.
5. O enxame atinge vários alvos, até três vezes cada, com intervalo mínimo de 400 ms.
6. O crocodilo remove escudos e barreiras marcadas; uma parede comum interrompe o voo.
7. Recursos nunca ficam abaixo de zero nem acima de 100; cancelar antes da emissão devolve o custo uma única vez.
8. Dano não se repete durante o segundo de invulnerabilidade e a derrota ocorre uma única vez por queda.
9. Morrer depois de um checkpoint retorna ao local correto e não duplica score, selos ou recompensas.
10. O chefe reinicia corretamente e a vitória só ocorre após derrotá-lo e alcançar o portal.
11. Pausa e foco perdido congelam simulação, efeitos e temporizadores; continuar não cria saltos de tempo.
12. Os avisos hostis continuam legíveis com música muda e efeitos reduzidos.

### O que automatizar e o que observar jogando

Automatizar somente regras com risco de regressão: gasto e devolução de poder, máximo de pulsos, dano único por ataque e persistência de IDs no checkpoint. Verificar a geometria e o fluxo em uma partida completa. Usar uma sobreposição de desenvolvimento que mostre hitboxes, velocidade, vida, poder e estado, desligada na versão de apresentação.

Observar se a corrida é divertida, se a pose prejudica a leitura de um salto e se cada ataque tem uso claro. Ajustar primeiro velocidades, pausas e custos; ampliar conteúdo depois que esse núcleo estiver agradável.

<!-- pagebreak -->

## 13 Prompt para iniciar o trabalho no Codex

O arquivo PROMPT_CODEX.md do kit contém a mesma orientação em texto copiável. Anexe a pasta do projeto ao Codex e use o pedido abaixo para iniciar a implementação por etapas.

> Crie o protótipo jogável de Queen B com base em GDD_Queen_B.md, gameplay.json, levels/prototype.json e nas imagens da pasta refs. A protagonista é Beyoncé em pixel art estilizada. A direção visual é preto dominante e lettering rosa, inspirada no álbum BEYONCÉ. O movimento deve parecer dança, com silhuetas claras e resposta rápida aos comandos.
>
> Use TypeScript, Vite e Phaser 3.90.0 com Arcade Physics, resolução lógica de 480 × 270 e física a 60 Hz. Fixe as dependências. Mantenha valores em configuração e separe o controlador físico da animação. Use os parâmetros do JSON como base de balanceamento. Não use serviços externos em tempo de execução.
>
> Implemente primeiro apenas a etapa 1: um trecho com chão, plataformas, dois vãos, movimento, salto variável, tolerância de borda de 100 ms, memória de salto de 120 ms e dash. Mostre os comandos. Use arte provisória quando necessário, mantendo preto e rosa, e crie uma animação mínima de dança para repouso e corrida. Inclua um comando de desenvolvimento e outro de build. Execute o build e corrija os erros antes de apresentar o resultado.
>
> Depois siga as etapas 2 a 5 do documento: abelhas básicas, enxame forte, lançamento especial de crocodilos, três executivos fictícios, checkpoints, chefe e vitória. Preserve os critérios de aceite. Não amplie o escopo para novas fases ou sistemas antes de concluir a primeira fase. Ao final de cada etapa, informe o que está jogável, como iniciar e o que falta.
>
> As imagens são referências de direção de arte e poses. Produza sprites com grade, transparência e pivô corretos, ou use formas provisórias legíveis. Faça a lógica de dano independente da animação. Não recorte automaticamente a prancha como se ela já fosse um atlas pronto. A fase deve continuar vencível com salto e abelha, incluindo o chefe em suas aberturas.

### Decisões que ficam para depois do primeiro teste

Confirmar em jogo a velocidade da corrida, o tempo de regeneração e a largura das hitboxes. Ajustar o alcance do enxame para que ele tenha vantagem em grupos. Só adicionar pontuação por estilo, bônus de ritmo, roupas alternativas ou uma segunda fase depois de testar o percurso completo. As próximas fases podem usar uma premiação, uma fábrica de hits e um show final, mantendo uma ideia de plataforma por fase.

<!-- pagebreak -->

## 14 Referências e arquivos de trabalho

### Referências consultadas

**BEYONCÉ na Apple Music.** Referência de identificação do álbum e acesso à capa. A tradução para plataformas, cores auxiliares, personagens e regras foi criada para este projeto.

https://100best.music.apple.com/br/album/36

**Phaser 3.90.0 ArcadePhysics.** Referência da engine fixada para o protótipo, consultada em 15 de outubro de 2026. A documentação descreve a simulação Arcade e seus recursos de colisão.

https://docs.phaser.io/api-documentation/3.90.0/class/physics-arcade-arcadephysics

**Phaser 3.90.0 Types Core.** Referência de configuração de renderização e jogo.

https://docs.phaser.io/api-documentation/3.90.0/typedef/types-core

### Conteúdo do kit para o Codex

| Arquivo | Finalidade |
| --- | --- |
| GDD_Queen_B.md | Documento completo em texto editável |
| PROMPT_CODEX.md | Pedido inicial pronto para copiar |
| gameplay.json | Números iniciais de física, recursos, ataques e inimigos |
| levels/prototype.json | Trechos, posições e objetos iniciais da fase |
| animations.json | Durações, quadros e pivô da protagonista |
| refs/01_cenario_e_combate.png | Referência visual de cenário, HUD e poderes |
| refs/02_poses_e_movimentos.png | Referência visual de gestos e performance |
| refs/PROMPTS_VISUAIS.md | Descrições usadas para gerar as duas referências |
| LEIA_ME.md | Ordem de leitura e instruções para o próximo passo |

O kit contém o projeto de design e as referências. O protótipo executável é a próxima entrega de desenvolvimento. Os valores iniciais precisam ser confirmados em uma partida real; a meta de duração não é um resultado já medido.

**Versão 1.0 · 15 de outubro de 2026**
