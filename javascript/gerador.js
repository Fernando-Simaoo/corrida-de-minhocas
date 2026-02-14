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