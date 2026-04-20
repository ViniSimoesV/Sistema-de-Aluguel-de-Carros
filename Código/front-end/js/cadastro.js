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
        
        // 1. O DTO espera uma Lista de strings para entidadeEmpregadora
        const entidade = document.getElementById('entidadeEmpregadora').value;
        corpoRequisicao.entidadeEmpregadora = entidade ? [entidade] : []; 
        
        corpoRequisicao.rendimento = parseFloat(document.getElementById('rendimento').value) || 0;
    }

    fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(corpoRequisicao)
    })
    .then(async response => {
        if (response.ok) {
            alert('Sucesso! Usuário cadastrado.');
            window.location.href = "index.html"; // Redireciona para o login
        } else {
            const errorData = await response.json();
            console.error("Erro do servidor:", errorData);
            alert('Erro no cadastro! Verifique os dados.');
        }
    })
    .catch(error => {
        console.error("Erro de rede:", error);
        alert('Não foi possível conectar ao servidor.');
    });
});

document.querySelector('.sign-in-container form').addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento da página

    // Captura os inputs
    const inputs = e.target.querySelectorAll('input');
    const identificador = inputs[0].value.replace(/\D/g, ''); // Remove pontos e traços
    const senhaDigitada = inputs[1].value;

    if (!identificador || !senhaDigitada) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        // 1. Distinguir entre Cliente (CPF) e Agente (CNPJ) pelo comprimento
        // CPF possui 11 dígitos, CNPJ possui 14.
        const ehCliente = identificador.length <= 11;
        const endpoint = ehCliente ? `clientes/${identificador}` : `agentes/${identificador}`;
        
        // 2. Tenta buscar o usuário no banco
        const response = await fetch(`http://localhost:8080/${endpoint}`);

        if (response.ok) {
            const usuario = await response.json();

            // 3. Verificação da senha (comparando com o campo 'senha' da sua Model)
            if (usuario.senha === senhaDigitada) {
                
                // 4. Armazena no LocalStorage
                if (ehCliente) {
                    localStorage.setItem('cpfLogado', identificador);
                    localStorage.setItem('tipoUsuario', 'cliente');
                    window.location.href = 'perfil_cliente.html'; // Redireciona
                } else {
                    localStorage.setItem('cnpjLogado', identificador);
                    localStorage.setItem('tipoUsuario', 'agente');
                    window.location.href = 'perfil_agente.html'; // Redireciona
                }

            } else {
                alert("Senha incorreta. Tente novamente.");
            }
        } else if (response.status === 404) {
            alert("Usuário não encontrado. Verifique o CPF/CNPJ digitado.");
        } else {
            throw new Error("Erro no servidor.");
        }

    } catch (error) {
        console.error("Erro ao realizar login:", error);
        alert("Ocorreu um erro ao tentar entrar. Verifique sua conexão.");
    }
});