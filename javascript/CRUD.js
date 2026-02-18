let minhocaId = 0;
class minhoca {
    constructor(nome,cor){
        this.id = minhocaId++;
        this.nome = nome;
        this.cor = cor;
        this.progresso = 0;
        this.velocidadeBase = 1;
    }
}

//CADASTRAR, LISTAR, ATUALIZAR, EXCLUIR
var minhocas = [];

function cadastrar_minhoca(nome, cor) {
    var nova_minhoca = new minhoca(nome, cor);
    minhocas.push(nova_minhoca);
    console.log("Minhoca cadastrada:", nova_minhoca);
}

function listar_minhocas() {
    console.log("Minhocas cadastradas:");
    minhocas.forEach(minhoca => {
        console.log(`ID: ${minhoca.id}, Nome: ${minhoca.nome}, Cor: ${minhoca.cor}, Progresso: ${minhoca.progresso}`);
    })
}

function atualizar_minhoca(id, nome, cor) {
    var minhoca = minhocas.find(m => m.id === id);
    if (minhoca) {
        minhoca.nome = nome;
        minhoca.cor = cor;
        console.log("Minhoca atualizada:", minhoca);
    } else {
        console.log("Minhoca não encontrada.");
    }
}

function excluir_minhoca(id) {
    var index = minhocas.findIndex(m => m.id === id);
    if (index !== -1) {
        var minhocaExcluida = minhocas.splice(index, 1);
        console.log("Minhoca excluída:", minhocaExcluida[0]);
    } else {
        console.log("Minhoca não encontrada.");
    }
}


/*

INTERAÇÃO COM O DOM

*/

const grid_minhocas = document.getElementsByClassName("grid-minhocas");
function criar_card(nome, corHex, id){
    // Inicializar um li vazio na memória do navegador
    const li = document.createElement("li");

    // Adiciona a classe para estilizar
    li.classList.add("card-minhoca");

    // Injeta a estrutura HTML dentro do <li> usando crases (Template String)
    // Observe os ${variavel} inserindo os dados dinamicamente!

    li.innerHTML = `
        <h3 class="nome-minhoca">${nome}</h3>
        <div class="info-cor">
            <span class="label-card">Cor:</span>
            <div class="bolinha-cor" style="background-color: ${corHex};"></div>
        </div>
        <span class="id-minhoca">ID: ${id}</span>
    `;

    // Pendura o card finalizado lá na tela, dentro da <ul>
    grid_minhocas[0].appendChild(li);




}