// inportando DOM
const moeda = document.querySelector("#moedas");
const btnvalor = document.querySelector("#btnvalor");
const tabela = document.querySelector("#tabela");
const resultado = document.querySelector("#resultado");
const erro02 = document.querySelector("#erro02");


btnvalor.addEventListener("click", function () {
    const moedaSelecionada = moeda.value;
    // console.log(moedaSelecionada);

    let ultimaCotacao;
    let dataeHora;
    let valorMin;
    let valorMax;
    let valorFechamento;

    fetch(`https://economia.awesomeapi.com.br/last/${moedaSelecionada}-BRL`)
        .then((resposta) => { // esse recebe a resposta da API 
            let dados = resposta.json(); // aqui uma váriavel que pega os dados json da resposta
            return dados; //retorna dados do json para o proximo then
        })
        .then((dados) => { // várivel dados mostrando dados
            ultimaCotacao = dados[`${moedaSelecionada}BRL`]["bid"];
            dataeHora = dados[`${moedaSelecionada}BRL`]["create_date"];
            resultado.innerHTML = `Ultima Cotação: R$ ${ultimaCotacao} Data e Horário: ${dataeHora}`

            console.log(ultimaCotacao);
            // console.log(dataeHora);
        })
        .catch((erro) => {
            // console.log(erro);

            resultado.innerHTML = `Ultima cotação deu ruim!`;

        });

    let dataIni=new Date(document.querySelector("#dataInicial").value+' ');
    let dataFim=new Date(document.querySelector("#dataFinal").value+' ');

    const dias = ((dataFim - dataIni)/1000/60/60/24)+1;
    
    let data = '';
    tabela.innerHTML = ` <tr>
                            <th>Data e Hora</th>
                            <th>Valor.min</th>
                            <th>Valor.max</th>
                            <th>Fechamento</th>
                        </tr>`;

    for (let i=1; i<=dias; i++){
        if (i>1){
            dataFim.setDate(dataFim.getDate() - 1)
        }
        data = dataFim.toLocaleDateString().substring(6,10)+dataFim.toLocaleDateString().substring(3,5)+dataFim.toLocaleDateString().substring(0,2)

        fetch(`https://economia.awesomeapi.com.br/json/daily/${moedaSelecionada}-BRL/?start_date=${data}&end_date=${data}`)
            .then((respFecha) => {
                return respFecha.json();
            })

            .then((dadosRespfecha) => {

                valorMin = dadosRespfecha[0].low;
                valorMax = dadosRespfecha[0].high;
                valorFechamento = dadosRespfecha[0].bid;
                dataeHora = dadosRespfecha[0].create_date;

                erro02.innerHTML = ``;

                tabela.innerHTML += ` <tr>
            <td>${dataeHora}</td>
            <td>${valorMin}</td>
            <td>${valorMax}</td>
            <td>${valorFechamento}</td>
        </tr>`;


            })

            .catch((erro) => {
                //console.log(erro);

                erro02.innerHTML = `Cotação do período deu ruim!`;
            })

    }
});


////////// explicação do fetch
// utlizando o fetch-solicitação(comando js pra API)
// no fetch o link do site de cotação
//then (captura a resposta da API)
//catch faz parte da estrutura do fetch(mostrando um erro caso ocorra)

