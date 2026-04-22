const apiPedidos = 'https://sistema-de-aluguel-de-carros-42yo.onrender.com/pedidos';
const apiClientes = 'https://sistema-de-aluguel-de-carros-42yo.onrender.com/clientes';
const apiCarros = 'https://sistema-de-aluguel-de-carros-42yo.onrender.com/carros';

async function carregarPedidosPendentes(cnpjAgenteLogado) {
    try {
        const resPedidos = await fetch(apiPedidos);
        if (!resPedidos.ok) throw new Error('Erro ao buscar pedidos');
        const todosPedidos = await resPedidos.json();
        const pedidosFiltrados = todosPedidos.filter(p => 
            p.cnpjAgente === cnpjAgenteLogado && 
            p.status?.toLowerCase() === 'pendente'
        );

        const tbody = document.querySelector('#PedidosPendentes').nextElementSibling;
        tbody.innerHTML = '<tr><td colspan="7">Processando solicitações...</td></tr>';

        const promessasDeLinhas = pedidosFiltrados.map(async (pedido) => {
            try {
                const [resCliente, resCarro] = await Promise.all([
                    fetch(`${apiClientes}/${pedido.cpfCliente}`),
                    fetch(`${apiCarros}/${pedido.matriculaCarro}`)
                ]);

                const cliente = resCliente.ok ? await resCliente.json() : { nome: "Desconhecido" };
                const carro = resCarro.ok ? await resCarro.json() : { marca: "N/A", modelo: "N/A" };

                return `
                    <tr>
                        <td>${cliente.nome}</td>
                        <td>${pedido.cpfCliente}</td>
                        <td>${carro.marca} ${carro.modelo}</td>
                        <td>${new Date(pedido.dataInicio).toLocaleDateString('pt-BR')}</td>
                        <td>${new Date(pedido.dataFim).toLocaleDateString('pt-BR')}</td>
                        <td>R$ ${pedido.valor.toFixed(2)}</td>
                        <td style="text-align: center;">
                            <button class="btn-approve" onclick="aprovarPedido(${pedido.idPedido})">
                                <i class="fas fa-check"></i> Aprovar
                            </button>
                            <button class="btn-reject" onclick="recusarPedido(${pedido.idPedido})">
                                <i class="fas fa-times"></i> Recusar
                            </button>
                        </td>
                    </tr>`;
            } catch (err) {
                console.error("Erro ao carregar detalhes do pedido:", err);
                return '';
            }
        });

        const linhasHtml = await Promise.all(promessasDeLinhas);
        tbody.innerHTML = linhasHtml.join('') || '<tr><td colspan="7">Nenhum pedido pendente encontrado.</td></tr>';

    } catch (error) {
        console.error('Erro geral:', error);
        alert('Erro ao carregar pedidos pendentes.');
    }
}

async function carregarPedidosAprovados(cnpjAgenteLogado) {
    try {
        const resPedidos = await fetch(apiPedidos);
        if (!resPedidos.ok) throw new Error('Erro ao buscar pedidos');
        const todosPedidos = await resPedidos.json();

        const pedidosAtivos = todosPedidos.filter(p => 
            p.cnpjAgente === cnpjAgenteLogado && p.status === 'ativo'
        );

        const tbody = document.querySelector('#PedidosAprovados').nextElementSibling;
        tbody.innerHTML = '<tr><td colspan="5">Carregando aluguéis ativos...</td></tr>';

        const promessasDeLinhas = pedidosAtivos.map(async (pedido) => {
            try {
                const [resCliente, resCarro] = await Promise.all([
                    fetch(`${apiClientes}/${pedido.cpfCliente}`),
                    fetch(`${apiCarros}/${pedido.matriculaCarro}`)
                ]);

                const cliente = resCliente.ok ? await resCliente.json() : { nome: "N/A" };
                const carro = resCarro.ok ? await resCarro.json() : { marca: "N/A", modelo: "Veículo Indisponível" };

                return `
                    <tr>
                        <td>${carro.marca} ${carro.modelo}</td>
                        <td>${cliente.nome}</td>
                        <td>${new Date(pedido.dataFim).toLocaleDateString('pt-BR')}</td>
                        <td><span class="status-ativo">${pedido.status}</span></td>
                        <td style="text-align: center;">
                            <button class="action-icon btn-delete-icon" onclick="deletarAluguel(${pedido.idPedido})" title="Encerrar/Deletar">
                                <i class="fas fa-trash-alt"></i> Excluir
                            </button>
                        </td>
                    </tr>`;
            } catch (err) {
                console.error("Erro nos detalhes do aluguel ativo:", err);
                return '';
            }
        });

        const linhasHtml = await Promise.all(promessasDeLinhas);
        tbody.innerHTML = linhasHtml.join('') || '<tr><td colspan="5">Nenhum aluguel ativo no momento.</td></tr>';

    } catch (error) {
        console.error('Erro ao carregar aprovados:', error);
        alert('Erro ao carregar a lista de pedidos aprovados.');
    }
}

function deletarAluguel(id) {
    if(confirm('Tem certeza que deseja deletar/encerrar este aluguel?')) {
        fetch(`${apiPedidos}/${id}`, { method: 'DELETE' })
            .then(res => {
                if(res.ok) {
                    alert('Aluguel removido com sucesso!');
                    const cnpjLogado = localStorage.getItem('cnpjLogado');
                    carregarPedidosAprovados(cnpjLogado);
                } else {
                    alert('Erro ao deletar o aluguel.');
                }
            })
            .catch(err => console.error('Erro na requisição DELETE:', err));
    }
}

async function atualizarStatusPedido(id, novoStatus) {
    try {
        const resBusca = await fetch(`${apiPedidos}/${id}`);
        if (!resBusca.ok) throw new Error('Não foi possível encontrar os dados do pedido.');
        const pedidoAtual = await resBusca.json();

        pedidoAtual.status = novoStatus;

        const resUpdate = await fetch(`${apiPedidos}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(pedidoAtual)
        });

        if (resUpdate.ok) {
            alert(`Pedido ${novoStatus} com sucesso!`);
            
            const cnpjLogado = localStorage.getItem('cnpjLogado');
            if (typeof carregarPedidosPendentes === 'function') {
                carregarPedidosPendentes(cnpjLogado);
            }
        } else {
            throw new Error('Falha ao atualizar o status no servidor.');
        }
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
    }
}

function aprovarPedido(id) {
    if (confirm('Tem certeza que deseja APROVAR este pedido?')) {
        atualizarStatusPedido(id, 'ativo');
    }
}

function recusarPedido(id) {
    if (confirm('Tem certeza que deseja RECUSAR este pedido?')) {
        atualizarStatusPedido(id, 'recusado');
    }
}