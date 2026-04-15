const inputIdentificador = document.getElementById('identificador');
const camposCliente = document.getElementById('camposCliente');
const camposAgente = document.getElementById('camposAgente');

inputIdentificador.addEventListener('input', function(e) {
    // Remove caracteres não numéricos para validar o tamanho
    const valor = e.target.value.replace(/\D/g, '');

    if (valor.length > 11) { 
        // Se tiver mais de 11 números, assume CNPJ (Agente)
        camposCliente.style.display = 'none';
        camposAgente.style.display = 'block';
    } else {
        // CPF ou digitando ainda (Cliente)
        camposCliente.style.display = 'block';
        camposAgente.style.display = 'none';
    }
});

// Integração com o fetch de cadastro
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const valorId = inputIdentificador.value.replace(/\D/g, '');
    const ehAgente = valorId.length > 11;
    
    // Define para qual endpoint enviar com base no tipo
    const endpoint = ehAgente ? 'http://localhost:8080/agentes' : 'http://localhost:8080/clientes';
    
    const corpoRequisicao = {
        email: document.getElementById('email').value,
        senha: document.getElementById('senha').value,
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value
    };

    if (ehAgente) {
        corpoRequisicao.cnpj = valorId;
        corpoRequisicao.compe = document.getElementById('compe').value;
        corpoRequisicao.tipo = document.getElementById('tipoAgente').value;
    } else {
        corpoRequisicao.cpf = valorId;
        corpoRequisicao.rg = document.getElementById('rg').value;
        corpoRequisicao.dataNascimento = document.getElementById('dataNascimento').value;
        corpoRequisicao.ruaCliente = document.getElementById('rua').value;
        corpoRequisicao.numeroCliente = document.getElementById('numero').value;
        corpoRequisicao.bairroCliente = document.getElementById('bairro').value;
        corpoRequisicao.cidadeCliente = document.getElementById('cidade').value;
        corpoRequisicao.complementoCliente = document.getElementById('complemento').value;
        corpoRequisicao.emprego = document.getElementById('emprego').value;
        corpoRequisicao.entidadeEmpregadora = document.getElementById('entidadeEmpregadora').value;
        corpoRequisicao.renda = parseFloat(document.getElementById('renda').value);
    }

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpoRequisicao)
    })
    .then(response => response.ok ? alert('Sucesso!') : alert('Erro no cadastro'));
});