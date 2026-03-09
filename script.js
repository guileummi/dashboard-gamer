// Criar a estrutura de dados

const partidas = []

// Pegar os elementos do HTML

const inputJogo = document.getElementById('jogo')
const selectResultado = document.getElementById('resultado')
const botao = document.getElementById('btnAdicionar')

const lista = document.getElementById('listaPartidas')

const spanPartidas = document.getElementById('partidas')
const spanVitorias = document.getElementById('vitorias')
const spanDerrotas = document.getElementById('derrotas')

// clique do botão

botao.addEventListener('click', adicionarPartida)

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

    atualizarLista()

    atualizarEstatisticas()
}

// Mostrar as partidas

function atualizarLista(){
    lista.innerHTML = ''

    for(let partida of partidas){
        const li = document.createElement('li')
        li.textContent = `🎮 ${partida.jogo} | 🏆 ${partida.resultado} | 📅 ${partida.data}`
        lista.appendChild(li)
    }
}