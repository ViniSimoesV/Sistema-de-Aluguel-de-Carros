const API_URL = "https://sistema-de-aluguel-de-carros-42yo.onrender.com";
const apiPedidos = `${API_URL}/pedidos`;
const apiCarros = `${API_URL}/carros`;
const apiClientes = `${API_URL}/clientes`;

async function carregarAlugueisDoCliente(cpfAtual) {
    try {
        // 1. Busca todos os pedidos
        const resPedidos = await fetch(apiPedidos);
        if (!resPedidos.ok) throw new Error('Erro ao buscar pedidos');
        const todosPedidos = await resPedidos.json();

        // 2. Verifique se no seu banco o campo se chama 'cpfCliente' ou apenas 'cpf'
        const pedidosFiltrados = todosPedidos.filter(p => p.cpfCliente === cpfAtual || p.cpf === cpfAtual);

        //const tbody = document.querySelector('tabelaAluguel').nextElementSibling;
        const tbody = document.querySelector('.modern-table tbody');
        tbody.innerHTML = '<tr><td colspan="7">Carregando dados dos veículos...</td></tr>';

        // 3. Para cada pedido, busca os detalhes do carro (async)
        const promessasDeLinhas = pedidosFiltrados.map(async (pedido) => {
            try {
                const resCarro = await fetch(`${apiCarros}/${pedido.matriculaCarro}`);
                const carro = resCarro.ok ? await resCarro.json() : { marca: 'N/A', modelo: 'Desconhecido', placa: '---' };

                // Retorna a string do HTML para esta linha
                return `
                    <tr>
                        <td>${carro.marca} ${carro.modelo}</td>
                        <td>${carro.placa}</td>
                        <td>${new Date(pedido.dataInicio).toLocaleDateString('pt-BR')}</td>
                        <td>${new Date(pedido.dataFim).toLocaleDateString('pt-BR')}</td>
                        <td>R$ ${pedido.valor.toFixed(2)}</td>
                        <td><span class="badge">${pedido.status}</span></td>
                        <td style="text-align: center;">
                            <button type="button" onclick="abrirModalEditar(${pedido.idPedido})" class="btn-edit-outline">
                                <i class="fas fa-edit"></i> Editar
                            </button>
                        </td>
                    </tr>`;
            } catch (err) {
                console.error(`Erro ao buscar carro ${pedido.matriculaCarro}:`, err);
                return ''; // Linha vazia em caso de erro crítico no carro
            }
        });

        // 4. Aguarda todas as buscas de carros terminarem e preenche a tabela
        const linhasHtml = await Promise.all(promessasDeLinhas);
        tbody.innerHTML = linhasHtml.join('') || '<tr><td colspan="7">Nenhum aluguel encontrado.</td></tr>';

    } catch (error) {
        console.error('Erro ao processar alugueis:', error);
        alert('Erro ao carregar a lista de aluguéis.');
    }
}

// Dispara o carregamento assim que o DOM estiver pronto
document.addEventListener('DOMContentLoaded', () => {
    const cpfLogado = localStorage.getItem('cpfLogado');

    if (cpfLogado) {
        carregarAlugueisDoCliente(cpfLogado);
    } else {
        console.error('Nenhum CPF encontrado no localStorage. Redirecionando...');
        //window.location.href = 'index.html';
    }
});

// Seletores
const modal = document.getElementById('modalEditar');
const btnFechar = document.getElementById('btnFecharModal');
const btnCancelar = document.getElementById('btnCancelar');

// Função para abrir a modal e carregar dados
async function abrirModalEditar(idPedido) {
    modal.style.display = 'block';
    try {
        const res = await fetch(`${apiPedidos}/${idPedido}`);
        const pedido = await res.json();
        
        document.getElementById('editIdPedido').value = pedido.idPedido;
        document.getElementById('editDataInicio').value = pedido.dataInicio.split('T')[0];
        document.getElementById('editDataFim').value = pedido.dataFim.split('T')[0];
        
        modal.style.display = 'block';
    } catch (error) {
        console.error("Erro ao carregar pedido para edição:", error);
    }
}

if (btnCancelar) {
    btnCancelar.onclick = () => modal.style.display = 'none';
}

// Fechar modal
btnFechar.onclick = () => modal.style.display = 'none';
window.onclick = (event) => { if (event.target == modal) modal.style.display = 'none'; }