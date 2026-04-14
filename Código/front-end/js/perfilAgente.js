const btnEditar = document.getElementById('btnEditar');
const btnCancelar = document.getElementById('btnCancelar');
const editGroup = document.getElementById('editGroup');
const form = document.getElementById('formPerfil');
const inputs = form.querySelectorAll('input, select');

// Função para ativar modo edição
btnEditar.addEventListener('click', () => {
    inputs.forEach(input => {
        input.readOnly = false;
        input.disabled = false;
        input.classList.remove('input-disabled');
        input.classList.add('input-enabled');
    });

    btnEditar.style.display = 'none';
    editGroup.style.display = 'flex';
});

// Função para cancelar edição
btnCancelar.addEventListener('click', () => {
    inputs.forEach(input => {
        input.readOnly = true;
        input.classList.add('input-disabled');
        input.classList.remove('input-enabled');
    });

    btnEditar.style.display = 'inline-flex';
    editGroup.style.display = 'none';
    
    // Aqui você poderia recarregar os dados originais se necessário
    // location.reload(); 
});

// Mock de envio do formulário
form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Alterações enviadas para processamento!');
    // Lógica futura para persistência no Supabase/Banco de Dados
    location.reload(); 
});