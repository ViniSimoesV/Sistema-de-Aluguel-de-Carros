// clientes.js
const modal = document.getElementById("modalDetalhes");
const btnFechar = document.querySelector(".close-modal");

// Função para abrir a modal (será chamada pelo botão "Detalhes")
function abrirDetalhes(clienteId) {
    // No futuro, aqui você buscará os dados do clienteId no banco
    modal.style.display = "block";
}

// Fechar ao clicar no X
btnFechar.onclick = function() {
    modal.style.display = "none";
}

// Fechar ao clicar fora da modal
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}