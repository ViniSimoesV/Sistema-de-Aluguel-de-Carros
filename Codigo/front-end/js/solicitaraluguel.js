const apiPedidos = 'http://localhost:8080/pedidos';
const apiCarros = 'http://localhost:8080/carros';

function obterCpfLogado() {
    // Busca a chave que definimos no script de login
    const cpf = localStorage.getItem('cpfLogado');

    if (!cpf) {
        console.warn("Nenhum usuário logado encontrado no sistema.");
        return null;
    }

    // Retorna o CPF (já deve estar limpo do login, mas garantimos aqui)
    return cpf.replace(/\D/g, ''); 
}

// Exemplo de uso prático:
const cpfAtual = obterCpfLogado();

async function filtrarVeiculosDisponiveis() {
    const inputsData = document.querySelectorAll('.date-input-group input');
    const dataInicioBusca = new Date(inputsData[0].value);
    const dataFimBusca = new Date(inputsData[1].value);

    // Validação básica de datas
    if (isNaN(dataInicioBusca) || isNaN(dataFimBusca)) {
        alert("Por favor, selecione as datas de retirada e devolução.");
        return;
    }

    if (dataInicioBusca > dataFimBusca) {
        alert("A data de retirada não pode ser posterior à data de devolução.");
        return;
    }

    try {
        // 1. Busca simultânea de carros e pedidos
        const [resCarros, resPedidos] = await Promise.all([
            fetch(apiCarros),
            fetch(apiPedidos)
        ]);

        const todosCarros = await resCarros.json();
        const todosPedidos = await resPedidos.json();

        // 2. Lógica de Filtragem
        const carrosDisponiveis = todosCarros.filter(carro => {
            // Busca todos os pedidos deste carro que não foram recusados/cancelados
            const pedidosDesteCarro = todosPedidos.filter(p => 
                p.matriculaCarro === carro.matricula && 
                p.status !== 'recusado' && 
                p.status !== 'cancelado'
            );

            // Verifica se há sobreposição de datas
            // Um conflito ocorre se: (Inicio1 <= Fim2) E (Fim1 >= Inicio2)
            const temConflito = pedidosDesteCarro.some(pedido => {
                const pInicio = new Date(pedido.dataInicio);
                const pFim = new Date(pedido.dataFim);

                return dataInicioBusca <= pFim && dataFimBusca >= pInicio;
            });

            return !temConflito; // Mantém o carro se NÃO houver conflito
        });

        // 3. Chama a função de renderização passando a lista filtrada
        renderizarCardsCarros(carrosDisponiveis);

    } catch (error) {
        console.error("Erro ao filtrar carros:", error);
        alert("Erro ao processar disponibilidade.");
    }
}

// Modificação da função anterior para aceitar uma lista como parâmetro
function renderizarCardsCarros(listaDeCarros) {
    const container = document.getElementById('car-list-container');
    container.innerHTML = '';

    if (listaDeCarros.length === 0) {
        container.innerHTML = '<p class="no-results">Nenhum veículo disponível para estas datas.</p>';
        return;
    }

    listaDeCarros.forEach(carro => {
        const carCard = document.createElement('div');
        carCard.className = 'car-card';
        carCard.innerHTML = `
            <div class="car-info">
                <h4>${carro.marca} ${carro.modelo} ${carro.ano}</h4>
                <p class="car-detail">Placa: <strong>${carro.placa}</strong></p>
                <div class="car-tags">
                    <span><i class="fas fa-gas-pump"></i> ${carro.tipoCombustivel}</span>
                    <span><i class="fas fa-cog"></i> ${carro.tipoCambio}</span>
                </div>
            </div>
            <div class="car-pricing">
                <p class="price-label">Valor por dia</p>
                <p class="price-value">R$ 150,00</p> 
                <button class="btn-main" onclick="iniciarReserva(${carro.matricula}, '${carro.cnpjAgente}')">Alugar Agora</button>
            </div>
        `;
        container.appendChild(carCard);
    });
}

const VALOR_DIARIA = 120.00;

async function iniciarReserva(matricula, cnpjAgente) {
    const cpfLogado = localStorage.getItem('cpfLogado');
    
    // 1. Verificações de Segurança
    if (!cpfLogado) {
        alert("Você precisa estar logado como cliente para realizar uma reserva.");
        return;
    }

    const inputsData = document.querySelectorAll('.date-input-group input');
    const dataInicioStr = inputsData[0].value;
    const dataFimStr = inputsData[1].value;

    if (!dataInicioStr || !dataFimStr) {
        alert("Por favor, selecione as datas de retirada e devolução antes de alugar.");
        return;
    }

    // 2. Cálculo do Valor Total
    const dataInicio = new Date(dataInicioStr);
    const dataFim = new Date(dataFimStr);
    
    // Diferença em milissegundos convertida para dias
    const diffTempo = Math.abs(dataFim - dataInicio);
    const diffDias = Math.ceil(diffTempo / (1000 * 60 * 60 * 24)) + 1; // +1 para incluir o dia da entrega

    const valorTotal = diffDias * VALOR_DIARIA;

    // 3. Confirmação com o Cliente
    const confirmacao = confirm(
        `Resumo da Reserva:\n` +
        `---------------------------\n` +
        `Duração: ${diffDias} dia(s)\n` +
        `Valor Diária: R$ ${VALOR_DIARIA.toFixed(2)}\n` +
        `Total a Pagar: R$ ${valorTotal.toFixed(2)}\n\n` +
        `Deseja confirmar a solicitação de aluguel?`
    );

    if (!confirmacao) return;

    // 4. Montagem do Objeto Pedido (conforme seu Model Java)
    const novoPedido = {
        cpfCliente: cpfAtual,
        cnpjAgente: cnpjAgente,
        matriculaCarro: matricula,
        dataInicio: dataInicioStr, // Formato YYYY-MM-DD compatível com LocalDate
        dataFim: dataFimStr,
        valor: valorTotal,
        status: "pendente" // Status inicial solicitado
    };

    try {
        const response = await fetch(apiPedidos, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoPedido)
        });

        if (response.ok) {
            alert("Solicitação enviada com sucesso! Aguarde a aprovação do agente.");
            // Opcional: Redirecionar para a aba de "Meus Aluguéis"
            location.reload(); 
        } else {
            const erro = await response.json();
            throw new Error(erro.message || "Erro ao processar pedido no servidor.");
        }

    } catch (error) {
        console.error("Erro ao criar pedido:", error);
        alert("Não foi possível processar sua reserva. Tente novamente.");
    }
}

// Configuração do botão de busca
document.querySelector('.btn-search').addEventListener('click', filtrarVeiculosDisponiveis);