// Seleção dos elementos
const modalV = document.getElementById("modalVeiculo");
const modalEditar = document.getElementById("modalEditarVeiculo");

// Funções para o Modal de CADASTRO
function abrirModalVeiculo() {
    modalV.style.display = "block";
}

function fecharModalVeiculo() {
    modalV.style.display = "none";
}

// Funções para o Modal de EDIÇÃO
function abrirModalEditar(veiculoData) {
    document.getElementById('edit-matricula').value = veiculoData.matricula;
    document.getElementById('edit-marca').value = veiculoData.marca;
    document.getElementById('edit-modelo').value = veiculoData.modelo;
    document.getElementById('edit-lugares').value = veiculoData.lugares;
    document.getElementById('edit-combustivel').value = veiculoData.combustivel;
    document.getElementById('edit-status').value = veiculoData.status;

    modalEditar.style.display = "block";
}

function fecharModalEditar() {
    modalEditar.style.display = "none";
}

// Fechar ao clicar fora de qualquer modal
window.onclick = function(event) {
    if (event.target == modalV) fecharModalVeiculo();
    if (event.target == modalEditar) fecharModalEditar();
}

function excluirVeiculo() {
    if (confirm("Tem certeza que deseja excluir este veículo?")) {
        alert("Veículo excluído com sucesso!");
        fecharModalEditar();
    }
}