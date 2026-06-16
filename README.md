# 🐛 Corrida de Minhocas: Chaos Engine Simulation
## Versão 1.0 (Versão 1.1 em Desenvolvimento)
![Status do Projeto](https://img.shields.io/badge/Status-Concluído-brightgreen)
![Linguagem Principal](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)
![Backend](https://img.shields.io/badge/PHP-API_RESTful-777BB4?logo=php&logoColor=white)

## 🚀 Visão Geral do Projeto

A **Corrida de Minhocas** é uma aplicação web interativa que explora o conceito de entropia e geração de pseudo-aleatoriedade através de dados do mundo real. Indo além das bibliotecas padrão matemáticas (`Math.random`), o motor do jogo consome dados macroeconômicos e meteorológicos ao vivo para determinar o progresso de entidades (minhocas) em uma simulação de corrida.

O projeto conta com um sistema de gerenciamento completo (CRUD) e uma interface de Data Visualization

## 🎨O Design e identidade Visual
O design do projeto foi pensado com essa identidade visual infantil e fofa do Claymorphism, a decisão artística foi construída em cima da sinergia que esse estilo tinha com o projeto, entregando muito mais apelo e identidade visual que um estilo minimalista corporativo.

Para facilitar o processo de manutenção e programação as fontes e cores foram salvas como variáveis dentro do CSS. Ademais o projeto foi inteiramente construído em cima de medidas relativas para tornar o processo de portabilidade mais rápido e fácil

## 🧠 O Algoritmo de Caos (Entropia Global)

O principal diferencial arquitetural do projeto é o motor de cálculo de velocidade no *game loop*, que opera a 50ms. Para evitar o bloqueio por *rate limit* das APIs e garantir a alta performance da UI, os dados externos são salvos em uma camada de cache antes do início da corrida.

A fórmula de propagação de movimento utiliza:
1. **API CoinGecko:** Preço em tempo real do Bitcoin (BRL).
2. **API Open-Meteo:** Velocidade atual do vento no Ponto Nemo (o polo de inacessibilidade do Pacífico).
3. **Cifra A1Z26:** Processamento de matrizes de strings estáticas para adição de ruído (Fator Sandler).
4. **Cronometria de Precisão:** Uso da API `performance.now()` do navegador para capturar a entropia temporal na casa dos microssegundos.

A velocidade final de cada entidade é calculada dinamicamente através do módulo da multiplicação desses fatores, garantindo uma distribuição altamente imprevisível do deslocamento.

## 🛠️ Destaques de Engenharia e Arquitetura

- **Sincronização Local-First Bidirecional:** O gerenciamento de estado das entidades prioriza o `LocalStorage` para fluidez da UI. As mutações são enviadas assincronamente (via `Fetch API`) para um backend em PHP, que realiza a persistência em MySQL.
- **Operações de Upsert Seguras:** A API de sincronização utiliza comandos SQL `ON DUPLICATE KEY UPDATE`, otimizando a atualização de registros em lote.
- **Proteção contra SQL Injection:** Toda a comunicação de manipulação de dados (CRUD) utiliza estritamente *Prepared Statements* (`bind_param`) via `mysqli`.
- **Hashing Estrutural:** Implementação nativa do algoritmo de hash **DJB2** no front-end para gerar IDs únicos determinísticos baseados em operações bit a bit (`bitwise operations`) a partir dos nomes das entidades.
- **Data Visualization em Tempo Real:** Integração com `Chart.js` para renderização assíncrona do histórico de volatilidade das variáveis de entropia (Preço do BTC e Ventos no Ponto Nemo).
- **Design System Claymorphism:** Toda a interface foi componentizada utilizando CSS Moderno (Variáveis no `:root`, Grid, Flexbox e sombras internas múltiplas) para criar um design tátil e responsivo.

## 💻 Tecnologias Utilizadas

**Front-end:**
- HTML5 Semântico
- CSS3 (Variáveis, Grid, Aspect-Ratio, Animações)
- JavaScript (ES6+, Async/Await, Fetch API, DOM Manipulation)
- Chart.js

**Back-end & Persistência:**
- PHP 8+ (API RESTful)
- MySQL (Arquitetura Relacional)

## 🗺️ Roadmap e Visão de Futuro (V1.1)
A arquitetura do projeto foi desenhada para suportar expansões modulares. As próximas *features* planejadas incluem:

*   **Sistema de Apostas (Game Theory):** Implementação de um motor de cálculo de ODDs dinâmicas em tempo real, onde os usuários poderão apostar em entidades com base na probabilidade estatística calculada pela entropia atual.
*   **Weather UI Reativa:** O design system (Claymorphism) irá reagir aos dados da `Open-Meteo API`, alterando a paleta de cores e efeitos visuais da arena caso o Ponto Nemo registre tempestades ou ventos extremos.
*   **Micro-interações Narrativas:** Adição de feedbacks visuais e mensagens dinâmicas no CRUD para aumentar a retenção e o engajamento emocional do usuário durante as mutações de banco de dados.


## ⚙️ Como Executar Localmente

1. Clone o repositório:
```bash
   git clone [https://github.com/SeuUsuario/corrida-de-minhocas.git](https://github.com/SeuUsuario/corrida-de-minhocas.git)
```