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