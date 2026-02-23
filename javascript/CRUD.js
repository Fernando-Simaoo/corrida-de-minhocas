/*
  /$$$$$$                            /$$       /$$$$$$$                      /$$                    
 /$$__  $$                          | $$      | $$__  $$                    |__/                    
| $$  \__/  /$$$$$$  /$$   /$$  /$$$$$$$      | $$  \ $$  /$$$$$$   /$$$$$$$ /$$  /$$$$$$$  /$$$$$$ 
| $$       /$$__  $$| $$  | $$ /$$__  $$      | $$$$$$$  |____  $$ /$$_____/| $$ /$$_____/ /$$__  $$
| $$      | $$  \__/| $$  | $$| $$  | $$      | $$__  $$  /$$$$$$$|  $$$$$$ | $$| $$      | $$  \ $$
| $$    $$| $$      | $$  | $$| $$  | $$      | $$  \ $$ /$$__  $$ \____  $$| $$| $$      | $$  | $$
|  $$$$$$/| $$      |  $$$$$$/|  $$$$$$$      | $$$$$$$/|  $$$$$$$ /$$$$$$$/| $$|  $$$$$$$|  $$$$$$/
 \______/ |__/       \______/  \_______/      |_______/  \_______/|_______/ |__/ \_______/ \______/                                                                                                     
*/

let minhocaId = 0;
class minhoca {
    constructor(nome, cor) {
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
 /$$$$$$             /$$                                                                      /$$$$$$$   /$$$$$$  /$$      /$$
|_  $$_/            | $$                                                                     | $$__  $$ /$$__  $$| $$$    /$$$
  | $$   /$$$$$$$  /$$$$$$    /$$$$$$   /$$$$$$  /$$$$$$   /$$$$$$$  /$$$$$$   /$$$$$$       | $$  \ $$| $$  \ $$| $$$$  /$$$$
  | $$  | $$__  $$|_  $$_/   /$$__  $$ /$$__  $$|____  $$ /$$_____/ |____  $$ /$$__  $$      | $$  | $$| $$  | $$| $$ $$/$$ $$
  | $$  | $$  \ $$  | $$    | $$$$$$$$| $$  \__/ /$$$$$$$| $$        /$$$$$$$| $$  \ $$      | $$  | $$| $$  | $$| $$  $$$| $$
  | $$  | $$  | $$  | $$ /$$| $$_____/| $$      /$$__  $$| $$       /$$__  $$| $$  | $$      | $$  | $$| $$  | $$| $$\  $ | $$
 /$$$$$$| $$  | $$  |  $$$$/|  $$$$$$$| $$     |  $$$$$$$|  $$$$$$$|  $$$$$$$|  $$$$$$/      | $$$$$$$/|  $$$$$$/| $$ \/  | $$
|______/|__/  |__/   \___/   \_______/|__/      \_______/ \_______/ \_______/ \______/       |_______/  \______/ |__/     |__/                                                                                                                              
*/

const grid_minhocas = document.getElementsByClassName("grid-minhocas");
const todosOverlays = document.querySelectorAll(".Overlay");

// Formulários dos modais
const formCadastro = document.getElementById("form-cadastro");
const formAtualizar = document.getElementById("form-atualizar");
const formExcluir = document.getElementById("form-excluir");

//Constantes especiais do form Excluir
const inputExcluir = document.getElementById("Id-excluir");
const cardExclusaoPreview = document.getElementById("CardExclusao");
const textoStatusExcluir = document.getElementById("isMinhocaFound");

cardExclusaoPreview.classList.add("escondido");


//Constantes da arena
const listaPistas = document.getElementById('pistas');


function criar_card(nome, corHex, id) {
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

    li.id = `card-${id}`; // Dá um ID único pro card, pra facilitar futuras manipulações (atualizar, excluir, etc)

    // Pendura o card finalizado lá na tela, dentro da <ul>
    grid_minhocas[0].appendChild(li);
}

function atualizar_card(id, novoNome, novaCorHex) {
    const card = document.getElementById(`card-${id}`);


    if (card) {
        card.querySelector(".nome-minhoca").textContent = novoNome;
        card.querySelector(".bolinha-cor").style.backgroundColor = novaCorHex;

        console.log(`Card com ID ${id} atualizado para Nome: ${novoNome} e Cor: ${novaCorHex}`);
    } else {
        console.log(`Card com ID ${id} não encontrado para atualização.`);
    }

}

function excluir_card(id) {
    const card = document.getElementById(`card-${id}`);
    if (card) {
        card.remove(); // Só arranca a tag do HTML
        console.log(`Card ${id} removido da interface`);
    }
}

function ToggleOverlay(id) {
    const overlay = document.getElementById(id);

    overlay.classList.toggle('ativo');

    document.body.classList.toggle('travar-scroll');
}

function ToggleCard() {
    const CardExclusao = document.getElementById('CardExclusao');
    const isMinhocaFound = document.getElementById('isMinhocaFound');

    CardExclusao.classList.toggle('escondido');
    isMinhocaFound.innerHTML.toggle("MInhoca Encontrada, tem certeza disso?");

}

/*
 /$$$$$$$$                                       /$$$$$$            /$$                     /$$   /$$    
| $$_____/                                      /$$__  $$          | $$                    |__/  | $$    
| $$     /$$$$$$   /$$$$$$  /$$$$$$/$$$$       | $$  \__/ /$$   /$$| $$$$$$$  /$$$$$$/$$$$  /$$ /$$$$$$  
| $$$$$ /$$__  $$ /$$__  $$| $$_  $$_  $$      |  $$$$$$ | $$  | $$| $$__  $$| $$_  $$_  $$| $$|_  $$_/  
| $$__/| $$  \ $$| $$  \__/| $$ \ $$ \ $$       \____  $$| $$  | $$| $$  \ $$| $$ \ $$ \ $$| $$  | $$    
| $$   | $$  | $$| $$      | $$ | $$ | $$       /$$  \ $$| $$  | $$| $$  | $$| $$ | $$ | $$| $$  | $$ /$$
| $$   |  $$$$$$/| $$      | $$ | $$ | $$      |  $$$$$$/|  $$$$$$/| $$$$$$$/| $$ | $$ | $$| $$  |  $$$$/
|__/    \______/ |__/      |__/ |__/ |__/       \______/  \______/ |_______/ |__/ |__/ |__/|__/   \___/  
*/

/*
====================================================
CADASTRO DE MINHOCAS - LÓGICA DE FUNCIONAMENTO
====================================================
*/


formCadastro.addEventListener("submit", (event) => {

    event.preventDefault(); // NÃO ATUALIZA A PÁGINA PRA PODER USAR ARMAZENAMENTO NO ARRAY

    const nome = document.getElementById("nome-cadastro").value;
    const cor = document.querySelector('input[name="cor-cadastro"]:checked').value;

    cadastrar_minhoca(nome, cor);

    criar_card(nome, cor, minhocaId - 1); // O ID é o contador - 1 porque ele já foi incrementado no cadastro

    formCadastro.reset(); // Reseta o formulário
    ToggleOverlay("overlay-cadastro"); // Fecha o modal após cadastrar
})

formAtualizar.addEventListener("submit", (event) => {

    event.preventDefault(); // NÃO ATUALIZA A PÁGINA PRA PODER USAR ARMAZENAMENTO NO ARRAY

    const id = parseInt(document.getElementById("Id-atualizar").value);
    const NovoNome = document.getElementById("nome-atualizar").value;
    const NovaCor = document.querySelector('input[name="cor-atualizar"]:checked').value;

    atualizar_minhoca(id, NovoNome, NovaCor);

    atualizar_card(id, NovoNome, NovaCor); // O ID é o contador - 1 porque ele já foi incrementado no cadastro

    formAtualizar.reset(); // Reseta o formulário
    ToggleOverlay("overlay-atualizar"); // Fecha o modal após cadastrar
})

// RADAR

inputExcluir.addEventListener("input", (event) => {
    const idDigitado = parseInt(event.target.value);
    const minhocaEncontrada = minhocas.find(m => m.id === idDigitado);

    if (minhocaEncontrada) {
        // Minhoca Achada
        cardExclusaoPreview.querySelector(".nome-minhoca").textContent = minhocaEncontrada.nome;
        cardExclusaoPreview.querySelector(".bolinha-cor").style.backgroundColor = minhocaEncontrada.cor;
        cardExclusaoPreview.querySelector(".id-minhoca").textContent = `ID: ${minhocaEncontrada.id}`;

        // Mostra o card
        cardExclusaoPreview.classList.remove("escondido");
        textoStatusExcluir.textContent = "Minhoca Encontrada! Tem certeza disso?";
        textoStatusExcluir.style.color = "var(--rosa-morango)";

    } else {
        cardExclusaoPreview.classList.add("escondido");
        textoStatusExcluir.textContent = "Minhoca não encontrada ainda...";
        textoStatusExcluir.style.color = "var(--grafite)";
    }
})




//SUBMIT DO EXCLUIR

formExcluir.addEventListener("submit", (event) => {

    event.preventDefault(); // NÃO ATUALIZA A PÁGINA PRA PODER USAR ARMAZENAMENTO NO ARRAY

    const id = parseInt(inputExcluir.value);

    excluir_minhoca(id);
    excluir_card(id); // FUNÇÃO AINDA NÃO CRIADA        

    formExcluir.reset(); // Reseta o formulário
    cardExclusaoPreview.classList.add("escondido");
    textoStatusExcluir.textContent = "Minhoca não encontrada ainda...";
    textoStatusExcluir.style.color = "var(--grafite)";
    ToggleOverlay("overlay-excluir"); // Fecha o modal após cadastrar
})




/*
  /$$$$$$  /$$$$$$$  /$$$$$$$$ /$$   /$$  /$$$$$$       
 /$$__  $$| $$__  $$| $$_____/| $$$ | $$ /$$__  $$      
| $$  \ $$| $$  \ $$| $$      | $$$$| $$| $$  \ $$      
| $$$$$$$$| $$$$$$$/| $$$$$   | $$ $$ $$| $$$$$$$$      
| $$__  $$| $$__  $$| $$__/   | $$  $$$$| $$__  $$      
| $$  | $$| $$  \ $$| $$      | $$\  $$$| $$  | $$      
| $$  | $$| $$  | $$| $$$$$$$$| $$ \  $$| $$  | $$      
|__/  |__/|__/  |__/|________/|__/  \__/|__/  |__/      
*/

function inicialização_arena() {

    listaPistas.innerHTML = "";


    minhocas.forEach(element => {
        const li = document.createElement("li");
        li.classList.add("pista");

        li.innerHTML = `
        <div class="minhoca" id="${element.id}"style="background-color: ${element.cor}; width: ${element.progresso};">
            <div class="rosto-minhoca">
                <div class="olhos">
                    <div class="olho"></div>
                    <div class="olho"></div>
        </div>
        <div class="boca"></div>
        </div>
        </div>
        `

        li.appendChild(minhoca);
        listaPistas.appendChild(li);

    });
}