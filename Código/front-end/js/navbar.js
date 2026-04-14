function renderNavbar() {
    const navHTML = `
    <nav class="navbar">
        <a href="#" class="nav-logo">HORIZONTES</a>
        <ul class="nav-links">
            <li><a href="alugueis_cliente.html" class="active">Início</a></li>
            <li><a href="solicitar_aluguel.html">Solicitar Aluguel</a></li>
            <li><a href="editar_perfil.html">Editar Perfil</a></li>
            <li><a href="../index.html" class="btn-sair">Sair <i class="fas fa-sign-out-alt"></i></a></li>
        </ul>
    </nav>
    `;
    
    // Insere a navbar no início do body
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    // Destacar o link ativo
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        if (window.location.href.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

renderNavbar();