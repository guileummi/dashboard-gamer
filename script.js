
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
const spanDesempenho = document.getElementById('taxaD')

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

    for(let i = 0; i < partidas.length; i++){
        const partida = partidas[i]

        const li = document.createElement('li')

        const texto = document.createElement('span')
        texto.textContent = `🎮 ${partida.jogo} | 🏆 ${partida.resultado} | 📅 ${partida.data}`

        const botaoDelete = document.createElement('buttom')
        botaoDelete.textContent = "🗑️"

        botaoDelete.onclick = function(){
            deletarPartida(i)
        }

        li.appendChild(texto)
        li.appendChild(botaoDelete)

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

    const total = partidas.length

    let taxaDesempenho = 0

    if(total > 0){
        taxaDesempenho = (vitorias / total) * 100
    }

    spanPartidas.textContent = partidas.length
    spanPartidas.textContent = vitorias
    spanDerrotas.textContent = derrotas
    spanDesempenho.textContent = taxaDesempenho.toFixed(1) + '%'
}

function render(){
    atualizarLista()
    atualizarEstatisticas()
}

// INICIALIZAÇÃO

render()

