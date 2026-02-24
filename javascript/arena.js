const listaPistas = document.getElementById('pistas');
const minhocas = JSON.parse(localStorage.getItem("minhocasDB")) || [];
function inicializacao_arena() {
    
    if(!listaPistas) return;


    listaPistas.innerHTML = "";

    minhocas.forEach(element => {
        const li = document.createElement("li");
        li.classList.add("pista");
        
        li.innerHTML = `
        <div class="minhoca" id="corredor-${element.id}" style="background-color: ${element.cor}; width: ${element.progresso}%;">
            <div class="rosto-minhoca">
                <div class="olhos">
                    <div class="olho"></div>
                    <div class="olho"></div>
                </div>
                <div class="boca"></div>
            </div>
        </div>
        `;


        listaPistas.appendChild(li);
    })

}

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




if(listaPistas){
    inicializacao_arena();
}