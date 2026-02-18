Este projeto será sobre uma corrida de minhocas em uma página HTML, a arte será feita em html e css e terá um sistema básico de CRUD para cadastrar, ler, atualizar e deletar minhoquinhas da competição. As corridas serão decididas por importar dados externos e misturar eles pra criar uma camada mais realista de caos que um gerador pseudo-aleatório disponível nas bibliotecas padrões das linguagens

# PALETA DE CORES
 #93F1BA Verdinho claro, cor principal, nav bar
 #D1A082 Marrom Argila, cor secundária
 #FF8B94 Rosa Morango, Acento, Botões, Destaque
 #FFF9C4 Amarelo Sol, Destaque, detalhes de brilho
 #4A4A4A Grafite Suave, Texto, um preto mais macio 
 #2D3436 Um cinza mais escuro, pra quando o grafite é claro demais


# FONTES

> Fredoka One:
    Títulos, Subtítulos. Fofo e alinhado com a estética

> Nunito:
    <p>, textos. Bonitinho mas legível

> Comic Neue:
    Balões de fala

# COMPONENTES
> CRUD
> HTML E CSS
> GERADOR E DADOS EXTERNOS

# Estrutura HTML
Pretendo dividir o site em 3 páginas distintas, uma pro CRUD uma pra corrida e uma pros dados usados e uma explicação sobre o projeto.

Pretendo usar uma estética fofa e bonitinha pras minhocas, algo como um verde claro e dar as minhocas olhinhos, algo até infântil

## Estrutura das Páginas

### CRUD
Aqui eu vou fazer a tela de cadastro das minhoquinhas com diversas opções

Cadastrar: Cadastrar a nova minhoquinha, talvez uma mensagem legal como: "O Seu guerreiro [nome escolhido] foi invocado para a batalha"

Listar jogadores: Listar jogadores em uma tabela

Atualizar: Atualizar o jogador escolhido fornecendo o ID, exibir uma mensagem como: [nome escolhido] se transformou!

Deletar: Deletar determinado jogador fornecendo seu ID, exibir uma mensagem triste pra ter um certo ar comico e induzir culpa no jogador: "Deseja mesmo eliminar [nome escolhido]?" Talvez um desenho de uma minhoquinha triste se der tempo

NOTA: se der tempo criar classe de jogadores para cadastro para criar um sistema de apostas

### ARENA

Aqui é que vai acontecer os embates, as minhoquinhas vão ser organizadas em linhas (circuitos) assim como nas olímpiadas, essas por sua vez vão ser criadas dinâmicamente pelo javascript

Mostrar nome delas em cima

Se o sistema de apostas for incluido: Mostrar ODDs de determinada minhoquinha

### Página de explicação

Aqui eu vou incluir uma explicação sobre o algoritmo e mostrar gráficos em tempo real, vamos fazer um discurso interessante sobre caos, entropia, a natureza dos computadores como maquinas deterministicas e a necessidade do ser humano de tentar domesticar o caos da natureza

Bitcoin: Mostrar um gráfico de linha padrão do bitcoin e seu histórico

Ponto nemo: Mostrar as informações que for possível extrair da API sobre tempo, direção do vento etc

SE TEMPO SOBRAR: incluir temas diferentes pra sessão do ponto nemo dependendo do clima

Adam sandler: Mostrar a lista de filmes utilizada no algortimo
