function renderNavbar() {
    const navHTML = `
    <nav class="navbar">
        <a class="nav-logo">HORIZONTES</a>
        <ul class="nav-links">
            <li><a href="alugueis_agente.html">Início</a></li>
            <li><a href="lista_de_clientes.html">Clientes</a></li>
            <li><a href="lista_carros.html">Veículos</a></li>
            <li><a href="perfil_agente.html">Perfil</a></li> 
            <li><a href="../index.html" class="btn-sair">Sair <i class="fas fa-sign-out-alt"></i></a></li>
        </ul>
    </nav>
    `;
    
    document.body.insertAdjacentHTML('afterbegin', navHTML);
    
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        // Remove active de todos para evitar conflitos
        link.classList.remove('active');
        
        // Verifica se o href do link está contido na URL atual
        if (window.location.pathname.includes(link.getAttribute('href'))) {
            link.classList.add('active');
        }
    });
}

renderNavbar();