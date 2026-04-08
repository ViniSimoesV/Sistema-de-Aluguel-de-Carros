document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o recarregamento da página

    // Captura os dados do formulário
    const clienteData = {
        nome: document.getElementById('nome').value,
        cpf: document.getElementById('cpf').value,
        rg: document.getElementById('rg').value,
        emprego: document.getElementById('emprego').value
    };

    // Faz a requisição para o Micronaut 
    fetch('http://localhost:8080/clientes', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(clienteData)
    })
    .then(response => {
        if (response.ok) {
            alert('Cliente cadastrado com sucesso!');
            window.location.href = 'clientes.html'; // Redireciona para a listagem
        } else {
            alert('Erro ao cadastrar cliente.');
        }
    })
    .catch(error => console.error('Erro na conexão:', error));
});