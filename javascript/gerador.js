// --- BANCO DE DADOS DO SANDLER (Estático para perfomance) ---
const filmesSandler = [
    {titulo: "Click", caos: 450},
    {titulo: "Jack e Jill", caos: 9999},
    {titulo: "Gente Grande", caos: 1200},
    {titulo: "Joias Brutas", caos: 100},
    {titulo: "O Paizão", caos: 3000},
    {titulo: "Pixels", caos: 5000}
]

const sopa_de_letrinhas = filmesSandler
    .map(f => f.titulo)
    .join("")
    .replace(/[^a-zA-Z]/g, "")
    .toUpperCase();

    console.log("Sistema: Matriz de Caos pré-carregada na memória");

// ------------- VARIÁVEL GLOBAL DE CACHE -------------------
let cacheUniverso = null;

//Função lenta, bitcoin + vento do ponto nemo. Rodar só uma vez
async function carregarEntropiaGlobal() {
    //Chegar se já está carregado pra não rodar duas vezes
    if(cacheUniverso) return cacheUniverso;

    console.log("Iniciando a coleta de entropia global... (APIS)");

    try{

        // 1. BITCOIN (CoinGecko API)
        // Pega o preço em BRL
        const btcRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
        const btcData = await btcRes.json();
        const btcPreco = btcData.bitcoin.brl;

        // 2. CLIMA NO PONTO NEMO (Open-Meteo)
        // Coordenadas: Latitude -48.87, Longitude -123.39
        const nemoRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-48.87&longitude=-123.39&current_weather=true');
        const nemoData = await nemoRes.json();
        const ventoNemo = nemoData.current_weather.windspeed;

        //SALVAR NA CACHE   

        cacheUniverso = {btc: btcPreco, vento: ventoNemo};
    }catch(erro){
        console.error("O universo colapsou, Usando fallback local.",erro);
        cacheUniverso = {btc: 350000, vento: 25.5};
        return cacheUniverso;
    }
}


//Função Rápida (Roda para cada minhoca, a cada 50ms)
function calcularPuloCaoticoMinhoca(){

    // O FATO SANDLER (Rápido)
    const indice = Math.floor(Math.random() * sopa_de_letrinhas.length);
    const letra = sopa_de_letrinhas[indice];
    const valorA1Z26 = letra.charCodeAt(0) - 64;

    // O TEMPO (rápido)
    let entropiaTemporal = performance.now();

    //Misturando usando o cache pronto na memória
    let mistura = (cacheUniverso.btc * cacheUniverso.vento * valorA1Z26);
    mistura = mistura * (entropiaTemporal % 10);

    // NORMALIZAÇÃO ENTRE 0 E 10000
    let velocidadeFinal = (Math.floor(mistura) % 10000) + 1;

    // Transforma esse número caótico gigante em um pulinho percentual pra tela (ex: 0.1% a 2.0%)
    // Como a escala é 10000, dividir por 5000 dá no máximo um pulo de 2% por frame.
    return (velocidadeFinal / 5000);

}

/*GAME LOOP DA ARENA*/


const btnComecar = document.querySelector("#botao-largada");
let corridaEmAndamento = null;

if(btnComecar){
    btnComecar.addEventListener("click", async () => {
        //Trava de segurança, se já estiver rolando o botão não faz nada
        if(corridaEmAndamento) return;

        //PREPARAÇÃO (fora do relógio)
        btnComecar.disabled = true;
        btnComecar.textContent = "Lendo a entropia do ponto nemo!"

        await carregarEntropiaGlobal();

        btnComecar.textContent = "Corrida Rolando!";

        // O GAME LOOP (rolando a cada 50ms)
        corridaEmAndamento = setInterval(() => {
            let alguemGanhou = false;

            minhocas.forEach(minhoca => {

                const pulo = calcularPuloCaoticoMinhoca();

                minhoca.progresso += pulo;

                if(minhoca.progresso >= 100) {
                    minhoca.progresso = 100;
                    alguemGanhou = true;
                }

                const divMinhoca = document.getElementById(`corredor-${minhoca.id}`);
                    if(divMinhoca){
                        divMinhoca.style.width = `${minhoca.progresso}%`;
                    }
            });

            if(alguemGanhou){
                clearInterval(corridaEmAndamento);
                corridaEmAndamento = null;

                const campeao = minhocas.find(m => m.progresso === 100);

                //TIMEOUT PRO CSS TER TEMOP DE TERMINAR A ANIMAÇÃO
                setTimeout(() => {
                    alert(` FIM DA CORRIDA!\nA minhoca ${campeao.nome} venceu!`);

                    //Reseta o botão
                    btnComecar.textContent = "Começar Nova Corrida";
                    btnComecar.disabled = false;

                    minhocas.forEach(m => m.progresso = 0);

                    salvar_banco_local();
                },300);
            }
        },50);
    });
}








/*
FUNÇÃO ANTIGA, SEM USO 
async function gerarVelocidadeCaotica() {
   console.log("🌪️ Iniciando a coleta de entropia global...");

   try {

    // 1. BITCOIN (CoinGecko API)
        // Pega o preço em BRL
        const btcRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
        const btcData = await btcRes.json();
        const btcPreco = btcData.bitcoin.brl; // Ex: 350000
        
        // 2. CLIMA NO PONTO NEMO (Open-Meteo)
        // Coordenadas: Latitude -48.87, Longitude -123.39
        const nemoRes = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-48.87&longitude=-123.39&current_weather=true');
        const nemoData = await nemoRes.json();
        const ventoNemo = nemoData.current_weather.windspeed; // Ex: 25.5 km/h

        // 3. O FATOR SANDLER
        // Escolhe um filme aleatório da lista

        const indice = Math.floor(Math.random() * sopa_de_letrinhas.length);
        const letra = sopa_de_letrinhas[indice];

        //Calculo A1Z26
        const valorA1Z26 = letra.charCodeAt(0) - 64; // 'A' = 1, 'B' = 2, ..., 'Z' = 26

   
        // --- ALQUÍMIA (CÁLCULO) ---

        let entropiaTemporal = performance.now(); // Tempo em milissegundos (com fração)

        //Mistura tudo: Preço * Vento + Sandler
        //Math.abs garante que não fique negativo
        let mistura = (btcPreco * ventoNemo * valorA1Z26);
        mistura = mistura * (performance.now() % 10);

        // Normaliza para 1 a 10000
        
        let velocidadeFinal = (Math.floor(mistura) % 10000) + 1;

        console.log(`📊 Dados: BTC R$${btcPreco} | Vento ${ventoNemo}km/h | Letra Sandler ${valorA1Z26}`);
        console.log(`🚀 VELOCIDADE GERADA: ${velocidadeFinal}`);

        return velocidadeFinal;
} catch (erro) {
    console.error("❌ O universo colapsou (Erro na API):", erro);
    // Fallback: Se a internet cair, usa o Date.now();
    return (Date.now() % 10000) + 1;
}
}
*/