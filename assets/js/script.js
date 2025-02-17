const tabuleiro = document.getElementById("tabuleiro");
const mensagem = document.getElementById("mensagem");
const celulas = document.querySelectorAll(".celula");

let jogadorAtual = "X";
let jogoAtivo = true;
let estadoJogo = ["", "", "", "", "", "", "", "", ""];

const combinacoesVitoria = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

function jogadorDaVez(){
    mensagem.textContent = `Jogador ${jogadorAtual}`;
}

celulas.forEach(celula => celula.addEventListener("click", handleClick));

function handleClick(event) {
    const index = event.target.dataset.index;

    if (estadoJogo[index] !== "" || !jogoAtivo) return;

    estadoJogo[index] = jogadorAtual;
    event.target.textContent = jogadorAtual;
    event.target.disabled = true;

    jogadorDaVez();
    verificarResultado();
    jogadorAtual = jogadorAtual === "X" ? "O" : "X";
}

function verificarResultado() {
    for (let combinacao of combinacoesVitoria) {
        const [a, b, c] = combinacao;
        if (estadoJogo[a] && estadoJogo[a] === estadoJogo[b] && estadoJogo[a] === estadoJogo[c]) {
            mensagem.textContent = `Jogador ${estadoJogo[a]} venceu! 🎉;`
            jogoAtivo = false;
            return;
        }
    }

    if (!estadoJogo.includes("")) {
        mensagem.textContent = "Empate! 😐";
        jogoAtivo = false;
        return;
    }
}
window.reiniciarJogo = reiniciarJogo;

function reiniciarJogo() {
    jogadorAtual = "X";
    jogoAtivo = true;
    estadoJogo = ["", "", "", "", "", "", "", "", ""];
    jogadorDaVez();
    celulas.forEach(celula => {
        celula.textContent = "";
        celula.disabled = false;
    });
}