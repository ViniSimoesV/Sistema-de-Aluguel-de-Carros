const API_URL = "https://sistema-de-aluguel-de-carros-42yo.onrender.com"; // URL do backend no Render

const inputIdentificador = document.getElementById('identificador');
const camposCliente = document.getElementById('camposCliente');
const camposAgente = document.getElementById('camposAgente');

// Lógica para alternar formulário entre CPF (Cliente) e CNPJ (Agente)
inputIdentificador.addEventListener('input', function(e) {
    const valor = e.target.value.replace(/\D/g, '');

    if (valor.length > 11) { 
        camposCliente.style.display = 'none';
        camposAgente.style.display = 'block';
    } else {
        camposCliente.style.display = 'block';
        camposAgente.style.display = 'none';
    }
});

// --- LÓGICA DE CADASTRO ---
document.getElementById('formCadastro').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const valorId = inputIdentificador.value.replace(/\D/g, '');
    const ehAgente = valorId.length > 11;
    
    // CORREÇÃO: Usando a API_URL definida no topo
    const endpoint = ehAgente ? `${API_URL}/agentes` : `${API_URL}/clientes`;
    
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
        corpoRequisicao.nome = document.getElementById('nome').value;
        corpoRequisicao.rg = document.getElementById('rg').value;
        corpoRequisicao.dataNascimento = document.getElementById('dataNascimento').value;
        corpoRequisicao.ruaCliente = document.getElementById('rua').value;
        corpoRequisicao.numeroCliente = document.getElementById('numero').value;
        corpoRequisicao.bairroCliente = document.getElementById('bairro').value;
        corpoRequisicao.cidadeCliente = document.getElementById('cidade').value;
        corpoRequisicao.complementoCliente = document.getElementById('complemento').value;
        corpoRequisicao.emprego = document.getElementById('emprego').value;
        
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
            window.location.reload(); // Recarrega para limpar ou redireciona
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

// --- LÓGICA DE LOGIN ---
document.querySelector('.sign-in-container form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const inputs = e.target.querySelectorAll('input');
    const identificador = inputs[0].value.replace(/\D/g, ''); 
    const senhaDigitada = inputs[1].value;

    if (!identificador || !senhaDigitada) {
        alert("Por favor, preencha todos os campos.");
        return;
    }

    try {
        const ehCliente = identificador.length <= 11;
        const rota = ehCliente ? `clientes/${identificador}` : `agentes/${identificador}`;
        
        const response = await fetch(`${API_URL}/${rota}`);

        if (response.ok) {
            const usuario = await response.json();

            if (usuario.senha === senhaDigitada) {
                if (ehCliente) {
                    localStorage.setItem('cpfLogado', identificador);
                    localStorage.setItem('tipoUsuario', 'cliente');
                    window.location.href = '/Codigo/front-end/html/alugueis_cliente.html';
                } else {
                    localStorage.setItem('cnpjLogado', identificador);
                    localStorage.setItem('tipoUsuario', 'agente');
                    window.location.href = '/Codigo/front-end/html/alugueis_agente.html';
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
        alert("Ocorreu um erro ao tentar entrar. Verifique sua conexão ou aguarde o servidor acordar.");
    }
});