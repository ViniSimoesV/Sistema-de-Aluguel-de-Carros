const apiURL = 'https://sistema-de-aluguel-de-carros-42yo.onrender.com/clientes';

// 1. Carregar lista ao abrir a página
document.addEventListener('DOMContentLoaded', carregarClientes);

function carregarClientes() {
    fetch(apiURL)
        .then(res => {
            if (!res.ok) throw new Error(`Erro no servidor: ${res.status}`);
            return res.json();
        })
        .then(data => {
            const tbody = document.querySelector('#tabelaClientes tbody');
            if (!tbody) return;

            // Construir a string primeiro é mais performático que innerHTML += repetidamente
            let html = '';
            data.forEach(c => {
                html += `
                    <tr>
                        <td>${c.nome}</td>
                        <td>${c.cpf}</td>
                        <td>${c.rg}</td>
                        <td>${c.emprego}</td>
                        <td class="text-center">
                            <button class="action-icon btn-edit-icon" onclick="abrirModal('${c.cpf}', '${c.nome}', '${c.rg}', '${c.emprego}')" title="Editar">
                                <i class="fas fa-edit"></i>
                            </button>
                            <button class="action-icon btn-delete-icon" onclick="deletarCliente('${c.cpf}')" title="Excluir">
                                <i class="fas fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>`;
            });
            tbody.innerHTML = html;
        })
        .catch(error => {
            console.error('Erro ao carregar tabela:', error);
            alert('Não foi possível carregar os dados. Verifique se o back-end está rodando.');
        });
}

// 2. Função de Deletar
function deletarCliente(cpf) {
    if(confirm('Deseja excluir este cliente?')) {
        fetch(`${apiURL}/${cpf}`, { method: 'DELETE' })
            .then(res => {
                if (!res.ok) throw new Error('Não foi possível excluir');
                carregarClientes();
            })
            .catch(err => alert(err.message));
    }
}
// 3. Funções do Modal
function abrirModal(cpf, nome, rg, emprego) {
    document.getElementById('edit-cpf').value = cpf;
    document.getElementById('edit-nome').value = nome;
    document.getElementById('edit-rg').value = rg;
    document.getElementById('edit-emprego').value = emprego;

    document.getElementById('modalEdicao').style.display = 'block';
}

function fecharModal() {
    document.getElementById('modalEdicao').style.display = 'none';
}

// 4. Salvar Edição (PUT)
document.getElementById('formEdicao').addEventListener('submit', function(e) {
    e.preventDefault();
    const cpf = document.getElementById('edit-cpf').value;
    const data = {
        nome: document.getElementById('edit-nome').value,
        rg: document.getElementById('edit-rg').value,
        emprego: document.getElementById('edit-emprego').value,
        cpf: cpf
    };

    fetch(`${apiURL}/${cpf}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(res => {
        if (!res.ok) throw new Error('Erro ao atualizar dados');
        fecharModal();
        carregarClientes();
    })
    .catch(err => alert(err.message));
});