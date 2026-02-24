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