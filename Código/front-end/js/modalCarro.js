const modalV = document.getElementById("modalVeiculo");

function abrirModalVeiculo() {
    modalV.style.display = "block";
}

function fecharModalVeiculo() {
    modalV.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modalV) {
        fecharModalVeiculo();
    }
}