
// Carregar dados salvos
const partidas = JSON.parse(localStorage.getItem('partidas')) || []

const nomeJogador = document.getElementById('nomeJogador')
const btnAlterarNome = document.getElementById('btnAlterarNome')
const nomeSalvo = localStorage.getItem('nomeJogador')
if(nomeSalvo){
    nomeJogador.textContent = nomeSalvo
}

// Pegar os elementos do HTML
const inputJogo = document.getElementById('jogo')
const selectResultado = document.getElementById('resultado')
const botao = document.getElementById('btnAdicionar')

const lista = document.getElementById('listaPartidas')

const spanPartidas = document.getElementById('partidas')
const spanVitorias = document.getElementById('vitorias')
const spanDerrotas = document.getElementById('derrotas')
const spanDesempenho = document.getElementById('taxaD')

const ctx = document.getElementById('graficoResultados')
const ctxTempo = document.getElementById('graficoTempo')
const filtroJogo = document.getElementById("filtroJogo")

// Evento
botao.addEventListener('click', adicionarPartida)
filtroJogo.addEventListener("change", render)
btnAlterarNome.addEventListener('click', alterarNome)

// adicionar Partida
function adicionarPartida(){
    const jogo = inputJogo.value
    const resultado = selectResultado.value

    const data = new Date().toLocaleDateString()

    // objeto
    const partida = {
        jogo: jogo,
        resultado: resultado,
        data: data
    }

    partidas.push(partida)

    
    salvarDados()
    atualizarFiltro()
    render()    
}

// salvar partidas
function salvarDados(){
    localStorage.setItem('partidas', JSON.stringify(partidas))
}

// alterar nome
function alterarNome(){

    const novoNome = prompt("Digite seu nome")

    if(novoNome){
        nomeJogador.textContent = novoNome
        localStorage.setItem('nomeJogador', novoNome)
    }

}

// Mostrar as partidas
function atualizarLista(){
    lista.innerHTML = ''

    const jogoSelecionado = filtroJogo.value

    for(let i = 0; i < partidas.length; i++){
        const partida = partidas[i]

        if(jogoSelecionado !== "todos" && partida.jogo !== jogoSelecionado){
            continue
        }

        const li = document.createElement('li')

        const texto = document.createElement('span')
        texto.textContent = `🎮 ${partida.jogo} | 🏆 ${partida.resultado} | 📅 ${partida.data}`

        const botaoDelete = document.createElement('button')
        botaoDelete.textContent = '🗑️'

        botaoDelete.onclick = function(){
            deletarPartida(i)
        }

        li.appendChild(texto)
        li.appendChild(botaoDelete)

        lista.appendChild(li)
    }
}

// deletar partida
function deletarPartida(index){

    partidas.splice(index, 1)

    salvarDados()
    render()
}

// Atualiazar gráfico resultado
let graficoResultados

function atualizarGrafico(vitorias, derrotas){
    if(graficoResultados){
        graficoResultados.destroy()
    }

    graficoResultados = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['vitorias', 'derrotas'],
            datasets: [{
                label: 'Resultados',
                data: [vitorias, derrotas],
                backgroundColor: [
                    'green',
                    'red'
                ]
            }]
        }
    })
}

// atualizar gráfico tempo
let graficoDesempenho

function atualizarGraficoTempo(){
    const labels = []
    const dados = []

    let vitorias = 0

    for(let i = 0; i < partidas.length; i++){
        const partida = partidas[i]

        if(partida.resultado === 'vitoria'){
            vitorias++
        }

        labels.push('Partida' + (i + 1))
        dados.push(vitorias)
    }

    if(graficoDesempenho){
        graficoDesempenho.destroy()
    }

    graficoDesempenho = new Chart(ctxTempo, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vitórias acumuladas',
                data: dados,
                borderColor: 'green',
                fill: false
            }]
        }
    })
}

// atualizar filtro
function atualizarFiltro(){
    const jogosUnicos = []

    for(let i = 0; i < partidas.length; i++){
        const jogo = partidas[i].jogo

        if(!jogosUnicos.includes(jogo)){
            jogosUnicos.push(jogo)
        }
    }

    filtroJogo.innerHTML = '<option value="todos">Todos os jogos</option>'

    for(let i = 0; i < jogosUnicos.length; i++){
        const option = document.createElement('option')

        option.value = jogosUnicos[i]
        option.textContent = jogosUnicos[i]

        filtroJogo.appendChild(option)
    }
}

// Atualizar estatísticas
function atualizarEstatisticas(){
    let vitorias = 0
    let derrotas = 0

    for(let partida of partidas){
        if(partida.resultado === 'vitoria'){
            vitorias++
        }else {
            derrotas++
        }
    }

    const total = partidas.length

    let taxaDeVitoria = 0

    if(total > 0){
        taxaDeVitoria = (vitorias / total) * 100
    }

    spanPartidas.textContent = partidas.length
    spanVitorias.textContent = vitorias
    spanDerrotas.textContent = derrotas
    spanDesempenho.textContent = taxaDeVitoria.toFixed(1) + '%'

    atualizarGrafico(vitorias, derrotas)
}

function render(){
    atualizarLista()
    atualizarEstatisticas()
    atualizarGraficoTempo()
}

render() // INICIALIZAÇÃO

