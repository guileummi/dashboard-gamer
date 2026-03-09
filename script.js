
// Criar a estrutura de dados / Carregar dados salvos

const partidas = JSON.parse(localStorage.getItem('partidas')) || []

// Pegar os elementos do HTML

const inputJogo = document.getElementById('jogo')
const selectResultado = document.getElementById('resultado')
const botao = document.getElementById('btnAdicionar')

const lista = document.getElementById('listaPartidas')

const spanPartidas = document.getElementById('partidas')
const spanVitorias = document.getElementById('vitorias')
const spanDerrotas = document.getElementById('derrotas')

// Evento

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

    salvarDados()
    render()    
}

// salvar dados

function salvarDados(){
    localStorage.setItem('partidas', JSON.stringify(partidas))
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

    spanPartidas.textContent = partidas.length
    spanPartidas.textContent = vitorias
    spanDerrotas.textContent = derrotas
}

function render(){
    atualizarLista()
    atualizarEstatisticas()
}

// INICIALIZAÇÃO

render()

