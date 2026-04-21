const btnEditar = document.getElementById('btnEditar');
const btnCancelar = document.getElementById('btnCancelar');
const editGroup = document.getElementById('editGroup');
const form = document.getElementById('formPerfil');
const inputs = form.querySelectorAll('input');

const apiBase = 'http://localhost:8080/clientes';
let senhaUsuario = ""; // Guardamos a senha para não perdê-la no PUT

async function carregarPerfil() {
    const cpf = localStorage.getItem('cpfLogado');
    if (!cpf) {
        //window.location.href = '../html/index.html';
        return;
    }

    try {
        const response = await fetch(`${apiBase}/${cpf}`);
        const cliente = await response.json();

        // Preenchimento direto via ID
        document.getElementById('perfil-nome').value = cliente.nome || "";
        document.getElementById('perfil-cpf').value = cliente.cpf || "";
        document.getElementById('perfil-rg').value = cliente.rg || "";
        document.getElementById('perfil-email').value = cliente.email || "";
        document.getElementById('perfil-telefone').value = cliente.telefone || "";
        document.getElementById('perfil-dataNascimento').value = cliente.dataNascimento || "";
        document.getElementById('perfil-emprego').value = cliente.emprego || "";
        document.getElementById('perfil-ruaCliente').value = cliente.ruaCliente || "";
        document.getElementById('perfil-numeroCliente').value = cliente.numeroCliente || "";
        document.getElementById('perfil-bairroCliente').value = cliente.bairroCliente || "";
        document.getElementById('perfil-complementoCliente').value = cliente.complementoCliente || "";
        document.getElementById('perfil-cidadeCliente').value = cliente.cidadeCliente || "";
        
        senhaUsuario = cliente.senha; // Salva a senha para o envio posterior

    } catch (error) {
        console.error("Erro ao carregar dados:", error);
    }
}

btnEditar.onclick = () => {
    btnEditar.style.display = 'none';
    editGroup.style.display = 'flex';
    inputs.forEach(input => {
        if (input.id !== 'perfil-cpf') { // O CPF nunca deve ser editado
            input.readOnly = false;
            input.classList.remove('input-disabled');
        }
    });
};

btnCancelar.onclick = () => location.reload();

// Envio das Alterações
form.onsubmit = async (e) => {
    e.preventDefault();

    const dadosAtualizados = {
        cpf: document.getElementById('perfil-cpf').value,
        nome: document.getElementById('perfil-nome').value,
        rg: document.getElementById('perfil-rg').value,
        email: document.getElementById('perfil-email').value,
        telefone: document.getElementById('perfil-telefone').value,
        dataNascimento: document.getElementById('perfil-dataNascimento').value,
        emprego: document.getElementById('perfil-emprego').value,
        ruaCliente: document.getElementById('perfil-ruaCliente').value,
        numeroCliente: document.getElementById('perfil-numeroCliente').value,
        bairroCliente: document.getElementById('perfil-bairroCliente').value,
        complementoCliente: document.getElementById('perfil-complementoCliente').value,
        cidadeCliente: document.getElementById('perfil-cidadeCliente').value,
        senha: senhaUsuario // Mantém a senha original
    };

    try {
        const response = await fetch(`${apiBase}/${dadosAtualizados.cpf}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosAtualizados)
        });

        if (response.ok) {
            alert("Perfil atualizado com sucesso!");
            location.reload();
        } else {
            alert("Erro ao salvar alterações.");
        }
    } catch (error) {
        console.error("Erro no PUT:", error);
    }
};

// Iniciar
carregarPerfil();