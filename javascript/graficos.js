const ctx = document.getElementById('graficoBitcoin').getContext('2d');

// Configuração inicial do gráfico "estilo massinha"
const bitcoinChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // Aqui vão os horários
        datasets: [{
            label: 'Preço do Bitcoin (BRL)',
            data: [], // Aqui vão os valores
            borderColor: '#ff8ca8', // Rosa das minhocas
            backgroundColor: '#ff8ca880',
            borderWidth: 5,
            tension: 0.4, // Deixa a linha curvada e suave
            pointBackgroundColor: '#333',
            pointRadius: 6,
            pointHoverRadius: 9
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: false,
                grid: { display: false },
                ticks: { font: { family: 'Comic Sans MS, sans-serif', weight: 'bold' } }
            },
            x: {
                grid: { display: false },
                ticks: { font: { family: 'Comic Sans MS, sans-serif', weight: 'bold' } }
            }
        },
        plugins: {
            legend: {
                labels: { font: { family: 'Comic Sans MS, sans-serif', size: 16, weight: 'bold' } }
            }
        }
    }
});

async function carregarHistoricoBtc() {
    try {
        // Puxa o histórico do último dia (days=1)
        const res = await fetch('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=brl&days=1');
        const data = await res.json();

        // A API devolve muitos dados. Vamos pegar só os últimos 15 pontos para o gráfico já começar preenchido
        const ultimosPontos = data.prices.slice(-15);

        ultimosPontos.forEach(ponto => {
            const dataHora = new Date(ponto[0]); // Ponto[0] é o timestamp
            const preco = ponto[1]; // Ponto[1] é o valor em BRL

            const horaFormatada = `${dataHora.getHours()}:${dataHora.getMinutes().toString().padStart(2, '0')}:${dataHora.getSeconds().toString().padStart(2, '0')}`;
            
            bitcoinChart.data.labels.push(horaFormatada);
            bitcoinChart.data.datasets[0].data.push(preco);
        });

        bitcoinChart.update();
    } catch (erro) {
        console.error("Erro ao carregar o histórico do Bitcoin:", erro);
    }
}



async function atualizarGraficoBtc() {
    try {
        const btcRes = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl');
        const btcData = await btcRes.json();
        const btcPreco = btcData.bitcoin.brl;

        // Pega a hora atual para colocar no eixo X
        const agora = new Date();
        const horaFormatada = `${agora.getHours()}:${agora.getMinutes().toString().padStart(2, '0')}:${agora.getSeconds().toString().padStart(2, '0')}`;

        bitcoinChart.data.labels.push(horaFormatada);
        bitcoinChart.data.datasets[0].data.push(btcPreco);

        if(bitcoinChart.data.labels.length > 15) {
            bitcoinChart.data.labels.shift();
            bitcoinChart.data.datasets[0].data.shift();
        }

        bitcoinChart.update();
    } catch(erro) {
        console.error("Falha ao atualizar o gráfico:",erro);

    }
}

/*GRAFICO DO PONTO NEMO*/

const ctxNemo = document.getElementById('graficoNemo').getContext('2d');

const nemoChart = new Chart(ctxNemo, {
    type: 'line',
    data: {
        labels: [], // Horários do dia
        datasets: [{
            label: 'Velocidade do Vento - Ponto Nemo (km/h)',
            data: [], // Força do vento
            borderColor: '#4facfe', // Azul oceano
            backgroundColor: '#4facfe80',
            fill: true, // Preenche a parte de baixo criando uma "onda"
            borderWidth: 5,
            tension: 0.5, // Deixa bem curvado e suave
            pointRadius: 0, // Tira os pontinhos para focar na onda
            pointHoverRadius: 8
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: { grid: { display: false }, ticks: { font: { family: 'Comic Sans MS, sans-serif', weight: 'bold' } } },
            x: { grid: { display: false }, ticks: { font: { family: 'Comic Sans MS, sans-serif', weight: 'bold' } } }
        },
        plugins: {
            legend: { labels: { font: { family: 'Comic Sans MS, sans-serif', size: 16, weight: 'bold' } } }
        }
    }
});

async function carregarGraficoNemo() {
    try {
        // Pega a previsão de vento por hora (hourly=windspeed_10m)
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=-48.87&longitude=-123.39&hourly=windspeed_10m&forecast_days=1');
        const data = await res.json();
        
        // Pega as horas e as velocidades do array da API
        const horas = data.hourly.time.map(t => t.substring(11, 16)); // Pega só o "HH:MM"
        const ventos = data.hourly.windspeed_10m;

        // Atualiza o gráfico de uma vez só
        nemoChart.data.labels = horas;
        nemoChart.data.datasets[0].data = ventos;
        nemoChart.update();
        
    } catch (erro) {
        console.error("Erro ao puxar ventos do Ponto Nemo:", erro);
    }
}

// Roda uma vez quando a página carrega







carregarGraficoNemo();
carregarHistoricoBtc();

setInterval(atualizarGraficoBtc,30000);
setInverval(carregarGraficoNemo,3600000);