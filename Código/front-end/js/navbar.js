function renderNavbar() {
    const navHTML = `
    <nav class="navbar">
        <div class="nav-logo">Aluguel de Carros</div>
        <ul class="nav-links">
            <li><a href="../index.html">Início</a></li>
            <li><a href="clientes.html">Clientes</a></li>
            <li><a href="#">Automóveis</a></li>
            <li><a href="#">Aluguéis</a></li>
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