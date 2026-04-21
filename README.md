# 🏷️ Sistema de Aluguel de Carros 👨‍💻

> Sistema para apoio à gestão de aluguéis de automóveis que
permita efetuar, cancelar e modificar pedidos através da Internet.

---

## 🚧 Status do Projeto

[![Versão](https://img.shields.io/badge/Versão-v0.1.0-blue?style=for-the-badge)](https://github.com/ViniSimoesV/Sistema-de-Aluguel-de-Carros/releases) 
![GitHub repo size](https://img.shields.io/github/repo-size/ViniSimoesV/Sistema-de-Aluguel-de-Carros?style=for-the-badge&logo=files) 
![GitHub directory file count](https://img.shields.io/github/directory-file-count/ViniSimoesV/Sistema-de-Aluguel-de-Carros?style=for-the-badge&logo=files)  
![GitHub last commit](https://img.shields.io/github/last-commit/ViniSimoesV/Sistema-de-Aluguel-de-Carros?style=for-the-badge&logo=clockify) 
![Vercel](https://vercelbadge.vercel.app/api/ViniSimoesV/Sistema-de-Aluguel-de-Carros?style=for-the-badge)

---

## 📝 Sobre o Projeto
O Sistema de Aluguel de Carros, Horizontes, é uma plataforma desenvolvida para gerenciar o ciclo de vida completo de locação de veículos. A aplicação permite o cadastro de clientes e agentes, a gestão de inventário de automóveis e a formalização de contratos e pedidos de aluguel.

---

## 🔗 Links Úteis
* 🌐 **Demo Online:** [Acesse a Aplicação Web](<https://horizontes-aluguel.vercel.app/>)
  > 💻 **Descrição:** Link para a aplicação em ambiente de produção (hospedado na Vercel).
  
---

## ✨ Funcionalidades Principais

- 🔐 **Gestão de Acessos e Perfis:** Sistema restrito a usuários previamente cadastrados, contendo diferenciação de permissões para Clientes e Agentes.
- 🚗 **Gestão de Aluguéis:** Clientes podem solicitar, alterar, consultar e cancelar seus pedidos de aluguel via internet
- 🏦 **Análise Financeira e Aprovação:** Agentes podem realizar Avaliação de Crédito e Associação de Crédito.

---
## 🛠 Tecnologias Utilizadas

As seguintes ferramentas, frameworks e bibliotecas foram utilizados na construção deste projeto.

### 💻 Front-end

* **Linguagem/Superset:** [HTML, CSS, JavaScript]
* **Estilização:** [CSS]

## 🏗 Arquitetura

1. **Visão geral da arquitetura**
     - Back-end: Desenvolvido em Java com o framework Micronaut, focado em alta performance e baixo consumo de memória.
     - Front-end: Interface desacoplada (SPA) hospedada na Vercel.
     - Persistência: Utilização do Supabase como DBaaS (Database as a Service), aproveitando o PostgreSQL.

2. **Padrões de design adotados**
     - MVC (Model-View-Controller): Para a organização fundamental das camadas.
     - Facade: Utilizado para simplificar a interface de comunicação entre os Controllers e a lógica complexa de múltiplos Services (ex: ClienteFacade).
     - Repository: Para abstrair o acesso aos dados e isolar as consultas SQL/JPA do restante da aplicação.
     - DTO (Data Transfer Object): Utilizado para o tráfego de dados entre as camadas, evitando a exposição direta das entidades de banco de dados (ex: ClienteDTO).

3. **Fluxo de dados**
     - A View realiza requisições via protocolo HTTP/REST.
     - Os Controllers recebem as chamadas e delegam para a Facade ou Services
     - Os Services processam as regras de negócio e utilizam os Repositories.
     - O Repository comunica-se com o Supabase via TCP/IP.

## 🔧 Instalação e Execução

### Pré-requisitos
Certifique-se de que o usuário tenha o ambiente configurado.

* **Java JDK:** Versão **21** ou superior (Necessário para o **Back-end Micronaut**)
* **Gerenciador de Pacotes:** npm ou yarn
* **Docker** 

---

### 🔑 Variáveis de Ambiente

Crie arquivos `.env` específicos e/ou configure as variáveis de ambiente no seu sistema para cada parte da aplicação.

#### 1 Back-end (Micronaut)

Configure estas variáveis como **variáveis de ambiente do sistema** ou em um arquivo de configuração do Micronaut (`application.properties`).

| Variável | Descrição | Exemplo |
| :--- | :--- | :--- |
| `JDBC_URL` | URL de conexão JDBC (PostgreSQL). | `jdbc:postgresql://aws-0-us-west-2.pooler.supabase.com:6543/postgres?user=postgres.fwulpocpojcdgdpxubng&password=Projeto_lab2` |
| `DB_USERNAME` | Usuário do banco de dados. | `postgres.fwulpocpojcdgdpxubng` |
| `DB_PASSWORD` | Senha do banco de dados. | `Projeto_lab2` |

#### 2 Front-end (HTML, CSS, JS)

Sem variáveis de ambiente.

---

Para adicionar essas variáveis:

1.  Acesse a página de Environment Variables do seu projeto no Render
2.  Clique em **"Add"** para adicionar cada variável com o nome e valor correspondente.

---

## 📂 Estrutura de Pastas

Descreva o propósito das pastas principais.

```
/Sistema-de-Aluguel-de-Carros
├── README.md                                # 📘 Documentação principal do projeto.
│
├── index.html                               # 📘 Documentação principal do projeto.
│
├── / Codigo
│     └── /back-end/demo                     # 📁 Aplicação Micronaut
│       │   ├── Dockerfile                   # 🐳 Docker build do Front-end.
│       │   ├── .build.gradle.kts/gradle.properties # ⚙️ Gerenciamento de dependências e build
│       │   ├── /.gradle                     # 📂 Arquivos temporários e cache do Gradle.
│       │   ├── /bin                         # 📂 Binários compilados da aplicação.
│       │   ├── /build                       # 🏗️ Artefatos gerados após a compilação.
│       │   ├── /gradle/wrapper              # 📦 Scripts para execução do Gradle sem instalação local.
│       │   ├── /src/main/java               # 📂 Código-fonte Java
│       │   │      └── /com/exemplo/app
│       │   │          ├── /controller       # 🎮 Endpoints REST.
│       │   │          ├── /Facade           # 🏛️ Padrão Facade para simplificar o acesso aos serviços.
│       │   │          ├── /model            # 🧬 Classes de domínio e entidades persistentes (JPA).
│       │   │          ├── /repository       # 🗄️ Repositórios (JPA/Hibernate).
│       │   │          └── /service          # ⚙️ Regras e lógica de negócio.
│       │   └── /src/main/resources          # 📄 Configurações (application.yml) e propriedades.
│       │
│       └── /front-end                       # 📁 Aplicação HTML, CSS, JS
│           ├── /css                         # 🎨 Estilos globais, temas, Design System.
│           ├── /html                        # 🌐 Estrutura das páginas da aplicação.
│           ├── /img                         # 🖼️ Imagens.
│           └── /js                          # 💡 Ícones.
│
├── /Diagramas                    # 📂 Diagramas de desenvolvimento do sistema
│
└── /Histórias de Usuários        # 📂 Cenários de uso do sistema
```

---

## 🔗 Documentações utilizadas

Liste aqui links para documentação técnica, referências de bibliotecas complexas ou guias de estilo que foram cruciais para o projeto.

* 📖 **Framework/Biblioteca (Front-end):** [Documentação Oficial do **React**](https://react.dev/reference/react)
* 📖 **Build Tool (Front-end):** [Guia de Configuração do **Vite**](https://vitejs.dev/config/)
* 📖 **Framework (Back-end):** [Documentação Oficial do **Micronaut**](https://docs.micronaut.io/latest/guide/)
* 📖 **Containerização:** [Documentação de Referência do **Docker**](https://docs.docker.com/)
* 📖 **Guia de Estilo:** [**Conventional Commits** (Padrão de Mensagens)](https://www.conventionalcommits.org/en/v1.0.0/)
* 📖 **Documentação Interna:** [Design System do Projeto](./docs/design-system.md)

---

## 👥 Autores
Liste os principais contribuidores. Você pode usar links para seus perfis.

| 👤 Nome | 🖼️ Foto | :octocat: GitHub | 💼 LinkedIn | 📤 Gmail |
|---------|----------|-----------------|-------------|-----------|
| Vinícius Simões  | <div align="center"><img src="https://avatars.githubusercontent.com/u/80927829?v=4" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/ViniSimoesV"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/user1"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:user1@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |
| Luiz Arthur  | <div align="center"><img src="https://avatars.githubusercontent.com/u/166531464?v=4" width="70px" height="70px"></div> | <div align="center"><a href="https://github.com/Chapeugenerico"><img src="https://joaopauloaramuni.github.io/image/github6.png" width="50px" height="50px"></a></div> | <div align="center"><a href="https://www.linkedin.com/in/user2"><img src="https://joaopauloaramuni.github.io/image/linkedin2.png" width="50px" height="50px"></a></div> | <div align="center"><a href="mailto:user2@gmail.com"><img src="https://joaopauloaramuni.github.io/image/gmail3.png" width="50px" height="50px"></a></div> |

---

## 🙏 Agradecimentos
Em ambiente acadêmico, citar fontes e inspirações é crucial (integridade acadêmica). Em ambiente profissional, mostra humildade e conexão com a comunidade.

Gostaria de agradecer aos seguintes canais e pessoas que foram fundamentais para o desenvolvimento deste projeto:

* [**Engenharia de Software PUC Minas**](https://www.instagram.com/engsoftwarepucminas/) - Pelo apoio institucional, estrutura acadêmica e fomento à inovação e boas práticas de engenharia.
* [**Prof. Dr. João Paulo Aramuni**](https://github.com/joaopauloaramuni) - Pelos valiosos ensinamentos sobre **Arquitetura de Software** e **Padrões de Projeto**.
* [**Fernanda Kipper**](https://www.instagram.com/kipper.dev/) - Pelos valiosos ensinamentos em **Desenvolvimento Web**, **DevOps** e melhores práticas em **Front-end**.
* [**Rodrigo Branas**](https://branas.io/) - Pela didática excepcional em **Clean Architecture** e **Clean Code**.
* [**Código Fonte TV**](https://codigofonte.tv/) - Pelo vasto conteúdo e cobertura de notícias, tutoriais e apoio à comunidade de **Desenvolvimento Web**.

---

## 📄 Licença

Este projeto é distribuído sob a **[Licença MIT](https://github.com/joaopauloaramuni/laboratorio-de-desenvolvimento-de-software/blob/main/LICENSE)**.

---
