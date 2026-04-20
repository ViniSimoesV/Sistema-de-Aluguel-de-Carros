const apiPedidos = 'http://localhost:8080/pedidos';
const apiCarros = 'http://localhost:8080/carros';
const apiClientes = 'http://localhost:8080/clientes';

async function carregarAlugueisDoCliente(cpfAtual) {
    try {
        // 1. Busca todos os pedidos
        const resPedidos = await fetch(apiPedidos);
        if (!resPedidos.ok) throw new Error('Erro ao buscar pedidos');
        const todosPedidos = await resPedidos.json();

        // 2. Filtra os pedidos pelo CPF do cliente logado
        const pedidosFiltrados = todosPedidos.filter(p => p.cpfCliente === cpfAtual);

        const tbody = document.querySelector('#tabelaAluguel').nextElementSibling; // Pega o <tbody>
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
                            <button class="btn-action" onclick="detalharPedido(${pedido.idPedido})">
                                <i class="fas fa-eye"></i>
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