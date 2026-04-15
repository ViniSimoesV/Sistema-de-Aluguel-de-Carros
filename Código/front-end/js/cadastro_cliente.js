const endpoint = 'http://localhost:8080/clientes'; // URL do endpoint do Micronaut

document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Captura os dados do formulário
    const dadosParaEnviar = {
        cpf: document.getElementById('cpf').value,
        nome: document.getElementById('nome').value,
        telefone: document.getElementById('telefone').value,
        email: document.getElementById('email').value, 
        senha: document.getElementById('senha').value, 
        rg: document.getElementById('rg').value,
        emprego: document.getElementById('emprego').value,
        renda: parseFloat(document.getElementById('renda').value),
        numeroCliente: document.getElementById('numeroCliente').value,
        ruaCliente: document.getElementById('ruaCliente').value,
        bairroCliente: document.getElementById('bairroCliente').value,
        cidadeCliente: document.getElementById('cidadeCliente').value,
        complementoCliente: document.getElementById('complementoCliente').value
    };

    // Faz a requisição para o Micronaut 
    fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(dadosParaEnviar)
    })
    .then(async response => {
        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            window.location.href = 'index.html'; // Redireciona para a listagem
        } else {
            const erro = await response.json();
            alert('Erro: ' + (erro.message || 'Erro ao cadastrar cliente.'));
        }
    })
    .catch(error => console.error('Erro na conexão:', error));
});