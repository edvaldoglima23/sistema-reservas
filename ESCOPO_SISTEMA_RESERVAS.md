# DOCUMENTO DE ESCOPO DO PROJETO
## Sistema de Reservas e Agendamento

**Autor**: edvaldoglima23  
**Data de Criação**: 2025-05-26  
**Data de Atualização**: 2025-05-26 16:00:20  
**Versão**: 1.2

## 1. VISÃO GERAL

O Sistema de Reservas e Agendamento é uma aplicação web full-stack que permite o gerenciamento de agendamentos de serviços entre prestadores (administradores) e clientes. O sistema oferecerá interfaces específicas para cada tipo de usuário, facilitando a configuração de disponibilidade por parte dos prestadores e a reserva de horários pelos clientes.

## 2. OBJETIVOS

- Desenvolver um sistema funcional de agendamentos e reservas
- Demonstrar habilidades full-stack para portfolio no GitHub
- Criar uma interface intuitiva e responsiva
- Implementar boas práticas de desenvolvimento
- Documentar o processo e as funcionalidades

## 3. FUNCIONALIDADES

### 3.1 Gerenciamento de Usuários
- Cadastro e autenticação de usuários
- Perfis diferenciados (cliente e administrador)
- Recuperação de senha (opcional)
- Edição de perfil

### 3.2 Painel de Administrador
- Cadastro e gerenciamento de serviços oferecidos
- Configuração de disponibilidade (dias/horários)
- Visualização e gerenciamento de reservas
- Confirmação/cancelamento de agendamentos
- Bloqueio de horários para folgas

### 3.3 Painel de Cliente
- Visualização de serviços disponíveis
- Consulta de disponibilidade via calendário
- Agendamento de serviços
- Histórico e gerenciamento de reservas
- Cancelamento e reagendamento

### 3.4 Sistema de Reservas
- Verificação de conflitos de horário
- Confirmação por email (opcional)
- Status de reservas (pendente, confirmada, cancelada, concluída)
- Notificações sobre alterações

## 4. REQUISITOS NÃO-FUNCIONAIS

### 4.1 Segurança
- Autenticação segura com JWT
- Senhas armazenadas com hash e salt
- Proteção contra injeção SQL
- Validação de dados em todas as entradas

### 4.2 Performance
- Tempo de resposta máximo de 2 segundos
- Otimização de consultas ao banco de dados
- Carregamento rápido das páginas do frontend

### 4.3 Usabilidade
- Interface responsiva para desktop e dispositivos móveis
- Design intuitivo seguindo princípios de UX
- Mensagens de erro claras e informativas
- Acessibilidade básica (WCAG 2.1 nível A)

### 4.4 Escalabilidade
- Arquitetura que permita crescimento futuro
- Código modular e reutilizável

## 5. ARQUITETURA TÉCNICA

### 5.1 Frontend
- HTML5, CSS3, JavaScript
- Layout responsivo
- Componentes de calendário interativo

### 5.2 Backend
- Node.js com Express
- API RESTful
- Autenticação JWT
- Validações de dados

### 5.3 Banco de Dados
- SQLite (desenvolvimento)
- Esquema relacional com tabelas para:
  - Usuários
  - Serviços
  - Disponibilidade
  - Reservas

## 6. MODELO DE DADOS

### 6.1 Usuários (users)
- id (INTEGER, PK)
- name (TEXT)
- email (TEXT, UNIQUE)
- password (TEXT, hash)
- role (TEXT: 'admin' ou 'client')
- created_at (DATETIME)
- updated_at (DATETIME)

### 6.2 Serviços (services)
- id (INTEGER, PK)
- name (TEXT)
- description (TEXT)
- duration (INTEGER, minutos)
- price (REAL)
- admin_id (INTEGER, FK → users.id)
- created_at (DATETIME)
- updated_at (DATETIME)

### 6.3 Disponibilidade (availability)
- id (INTEGER, PK)
- admin_id (INTEGER, FK → users.id)
- day_of_week (INTEGER, 0-6 domingo-sábado)
- start_time (TEXT, formato HH:MM)
- end_time (TEXT, formato HH:MM)
- created_at (DATETIME)
- updated_at (DATETIME)

### 6.4 Reservas (reservations)
- id (INTEGER, PK)
- client_id (INTEGER, FK → users.id)
- service_id (INTEGER, FK → services.id)
- date (TEXT, formato YYYY-MM-DD)
- start_time (TEXT, formato HH:MM)
- end_time (TEXT, formato HH:MM)
- status (TEXT: 'pending', 'confirmed', 'cancelled', 'completed')
- notes (TEXT)
- created_at (DATETIME)
- updated_at (DATETIME)

## 7. FLUXOS PRINCIPAIS

### 7.1 Fluxo de Agendamento
1. Cliente faz login no sistema
2. Cliente navega para a página de serviços
3. Cliente seleciona um serviço
4. Sistema mostra calendário com horários disponíveis
5. Cliente seleciona data e horário
6. Cliente confirma agendamento
7. Sistema registra a reserva e notifica o prestador
8. Cliente recebe confirmação

### 7.2 Fluxo de Gerenciamento (Administrador)
1. Administrador faz login no sistema
2. Administrador visualiza painel com reservas pendentes
3. Administrador confirma ou rejeita reservas
4. Sistema atualiza status e notifica clientes
5. Administrador pode configurar disponibilidade e serviços

## 8. ESTRUTURA DE ARQUIVOS

```
sistema-reservas/                   # Raiz do projeto
│
├── .github/                        # Configurações e workflows do GitHub
│   ├── workflows/                  # GitHub Actions para CI/CD
│   │   └── deploy.yml              # Workflow de deploy automático
│   └── ISSUE_TEMPLATE/             # Templates para issues no GitHub
│       ├── bug_report.md           # Template para reportar bugs
│       └── feature_request.md      # Template para solicitar features
│
├── public/                         # Arquivos estáticos servidos diretamente
│   ├── css/                        # Folhas de estilo
│   │   ├── style.css               # Estilos globais
│   │   ├── auth.css                # Estilos para autenticação
│   │   ├── dashboard.css           # Estilos para painéis
│   │   ├── booking.css             # Estilos para agendamento
│   │   └── components/             # Estilos de componentes reutilizáveis
│   │       ├── calendar.css        # Estilos do calendário
│   │       ├── forms.css           # Estilos de formulários
│   │       ├── buttons.css         # Estilos de botões
│   │       └── notifications.css   # Estilos de notificações
│   │
│   ├── js/                         # JavaScript do cliente
│   │   ├── main.js                 # JavaScript global (inicialização)
│   │   ├── auth.js                 # Lógica de autenticação
│   │   ├── dashboard.js            # Lógica dos painéis
│   │   ├── booking.js              # Lógica de agendamento
│   │   ├── api.js                  # Cliente da API (requisições AJAX)
│   │   └── utils/                  # Funções utilitárias do frontend
│   │       ├── calendar.js         # Manipulação do calendário
│   │       ├── validation.js       # Validação de formulários no cliente
│   │       ├── formatting.js       # Formatação de datas e valores
│   │       └── notifications.js    # Sistema de notificações
│   │
│   ├── images/                     # Imagens e assets
│   │   ├── logo.svg                # Logo do sistema
│   │   ├── icons/                  # Ícones do sistema
│   │   ├── backgrounds/            # Imagens de fundo
│   │   └── placeholders/           # Imagens placeholder
│   │
│   ├── vendor/                     # Bibliotecas de terceiros
│   │   ├── fullcalendar/           # Biblioteca de calendário
│   │   └── bootstrap/              # Framework CSS (opcional)
│   │
│   ├── index.html                  # Página inicial (landing page)
│   └── pages/                      # Páginas HTML adicionais
│       ├── login.html              # Página de login
│       ├── register.html           # Página de registro
│       ├── dashboard-client.html   # Painel do cliente
│       ├── dashboard-admin.html    # Painel do administrador
│       ├── booking.html            # Página de agendamento
│       ├── services.html           # Lista de serviços
│       ├── profile.html            # Perfil do usuário
│       └── error.html              # Página de erro
│
├── src/                            # Código-fonte do backend
│   ├── config/                     # Configurações
│   │   ├── database.js             # Configuração do banco de dados
│   │   ├── auth.js                 # Configuração de autenticação (JWT)
│   │   ├── server.js               # Configurações do servidor Express
│   │   └── email.js                # Configuração de envio de emails (opcional)
│   │
│   ├── controllers/                # Controladores (lógica de negócios)
│   │   ├── UserController.js       # Controlador de usuários
│   │   ├── ServiceController.js    # Controlador de serviços
│   │   ├── ReservationController.js # Controlador de reservas
│   │   ├── AvailabilityController.js # Controlador de disponibilidade
│   │   └── AuthController.js       # Controlador de autenticação
│   │
│   ├── models/                     # Modelos de dados
│   │   ├── User.js                 # Modelo de usuário
│   │   ├── Service.js              # Modelo de serviço
│   │   ├── Reservation.js          # Modelo de reserva
│   │   └── Availability.js         # Modelo de disponibilidade
│   │
│   ├── routes/                     # Rotas da API
│   │   ├── index.js                # Arquivo principal de rotas
│   │   ├── users.js                # Rotas de usuários
│   │   ├── services.js             # Rotas de serviços
│   │   ├── reservations.js         # Rotas de reservas
│   │   ├── availability.js         # Rotas de disponibilidade
│   │   └── auth.js                 # Rotas de autenticação
│   │
│   ├── middlewares/                # Middlewares
│   │   ├── auth.js                 # Middleware de autenticação
│   │   ├── validation.js           # Middleware de validação
│   │   ├── errorHandler.js         # Middleware de tratamento de erros
│   │   └── logger.js               # Middleware de logging
│   │
│   ├── utils/                      # Funções utilitárias do backend
│   │   ├── dateHelpers.js          # Utilitários para manipulação de datas
│   │   ├── validators.js           # Funções de validação
│   │   ├── formatters.js           # Funções de formatação
│   │   └── notifications.js        # Lógica de notificações
│   │
│   ├── services/                   # Serviços externos
│   │   ├── emailService.js         # Serviço de envio de email
│   │   └── notificationService.js  # Serviço de notificações
│   │
│   ├── app.js                      # Configuração da aplicação Express
│   └── server.js                   # Ponto de entrada do servidor
│
├── docs/                           # Documentação
│   ├── api/                        # Documentação da API
│   │   ├── auth.md                 # Documentação de endpoints de autenticação
│   │   ├── users.md                # Documentação de endpoints de usuários
│   │   ├── services.md             # Documentação de endpoints de serviços
│   │   └── reservations.md         # Documentação de endpoints de reservas
│   │
│   ├── database.md                 # Documentação do esquema de banco de dados
│   ├── deployment.md               # Instruções de deployment
│   ├── development.md              # Guia de desenvolvimento
│   └── user-manual.md              # Manual do usuário
│
├── tests/                          # Testes
│   ├── unit/                       # Testes unitários
│   │   ├── models/                 # Testes de modelos
│   │   ├── controllers/            # Testes de controladores
│   │   └── utils/                  # Testes de utilitários
│   │
│   ├── integration/                # Testes de integração
│   │   ├── api/                    # Testes de API
│   │   └── database/               # Testes de banco de dados
│   │
│   └── fixtures/                   # Dados de teste
│       └── testData.js             # Dados para testes
│
├── scripts/                        # Scripts utilitários
│   ├── seed.js                     # Popula o banco com dados iniciais
│   ├── backup.js                   # Script de backup do banco de dados
│   └── deploy.sh                   # Script de deployment
│
├── .env.example                    # Exemplo de variáveis de ambiente
├── .gitignore                      # Arquivos ignorados pelo Git
├── .eslintrc.js                    # Configuração do ESLint
├── .prettierrc                     # Configuração do Prettier
├── package.json                    # Dependências e scripts
├── package-lock.json               # Lock de versões das dependências
├── nodemon.json                    # Configuração do Nodemon
├── LICENSE                         # Licença do projeto (MIT)
├── ESCOPO_SISTEMA_RESERVAS.md      # Este documento de escopo
└── README.md                       # Documentação principal
```

## 9. API ENDPOINTS

### 9.1 Autenticação
- `POST /api/auth/register`: Registra um novo usuário
- `POST /api/auth/login`: Autentica um usuário e retorna token JWT
- `POST /api/auth/forgot-password`: Inicia processo de recuperação de senha (opcional)
- `POST /api/auth/reset-password`: Redefine a senha (opcional)

### 9.2 Usuários
- `GET /api/users/me`: Obtém perfil do usuário autenticado
- `PUT /api/users/me`: Atualiza perfil do usuário autenticado
- `GET /api/users`: Lista usuários (somente admin)
- `GET /api/users/:id`: Obtém detalhes de um usuário específico (somente admin)

### 9.3 Serviços
- `GET /api/services`: Lista todos os serviços disponíveis
- `GET /api/services/:id`: Obtém detalhes de um serviço específico
- `POST /api/services`: Cria um novo serviço (somente admin)
- `PUT /api/services/:id`: Atualiza um serviço (somente admin)
- `DELETE /api/services/:id`: Remove um serviço (somente admin)

### 9.4 Disponibilidade
- `GET /api/availability/:adminId`: Lista disponibilidade de um admin
- `POST /api/availability`: Adiciona disponibilidade (somente admin)
- `PUT /api/availability/:id`: Atualiza disponibilidade (somente admin)
- `DELETE /api/availability/:id`: Remove disponibilidade (somente admin)

### 9.5 Reservas
- `GET /api/reservations`: Lista reservas do usuário atual
- `GET /api/reservations/all`: Lista todas as reservas (somente admin)
- `GET /api/reservations/:id`: Obtém detalhes de uma reserva específica
- `POST /api/reservations`: Cria uma nova reserva
- `PUT /api/reservations/:id/status`: Atualiza status de uma reserva
- `DELETE /api/reservations/:id`: Cancela uma reserva

## 10. CRONOGRAMA DE DESENVOLVIMENTO

### Fase 1: Configuração Inicial (26/05/2025 - 02/06/2025)
- **Semana 1**: 
  - Configuração do ambiente
  - Estrutura de pastas e arquivos
  - Configuração do banco de dados
  - README inicial
  - Documento de escopo

### Fase 2: Backend (03/06/2025 - 16/06/2025)
- **Semana 2**:
  - Modelos de dados (User, Service)
  - Configuração de autenticação
  - Rotas e controladores básicos
- **Semana 3**:
  - Modelos restantes (Availability, Reservation)
  - API completa com todas as rotas
  - Validações e tratamento de erros
  - Testes básicos da API

### Fase 3: Frontend (17/06/2025 - 30/06/2025)
- **Semana 4**:
  - Layout básico e navegação
  - Páginas de autenticação (login/registro)
  - CSS responsivo
- **Semana 5**:
  - Visualização de calendário
  - Formulário de agendamento
  - Painéis de cliente e administrador

### Fase 4: Integração e Recursos (01/07/2025 - 14/07/2025)
- **Semana 6**:
  - Integração frontend-backend
  - Sistema de notificações
  - Tratamento de erros no frontend
- **Semana 7**:
  - Filtros e buscas
  - Melhorias de UI/UX
  - Testes integrados

### Fase 5: Finalização (15/07/2025 - 21/07/2025)
- **Semana 8**:
  - Testes e correção de bugs
  - Otimização de performance
  - Documentação final
  - Deploy da aplicação

## 11. TECNOLOGIAS UTILIZADAS

### 11.1 Frontend
- HTML5, CSS3
- JavaScript (ES6+)
- Biblioteca de Calendário (FullCalendar)
- Bootstrap ou CSS puro para responsividade

### 11.2 Backend
- Node.js (v14+)
- Express.js (framework web)
- JSON Web Tokens (JWT) para autenticação
- Bcrypt para hash de senhas
- SQLite3 para banco de dados
- Middleware de validação

### 11.3 Ferramentas de Desenvolvimento
- Visual Studio Code (IDE)
- Git e GitHub (controle de versão)
- Nodemon (desenvolvimento com auto-reload)
- Postman ou Insomnia (testes de API)
- ESLint (linting de código)
- Prettier (formatação de código)

## 12. ESTRATÉGIA DE GIT E GITHUB

### 12.1 Branches
- `main`: Código estável e pronto para produção
- `develop`: Branch de desenvolvimento
- `feature/nome-da-feature`: Branches para novas funcionalidades
- `bugfix/nome-do-bug`: Branches para correção de bugs

### 12.2 Commits
- Mensagens claras e descritivas
- Prefixos nos commits:
  - `feat:` Nova funcionalidade
  - `fix:` Correção de bug
  - `docs:` Documentação
  - `style:` Formatação, sem alteração de código
  - `refactor:` Refatoração de código
  - `test:` Adição ou correção de testes

### 12.3 Pull Requests
- Descrição detalhada do que foi feito
- Referência a issues relacionadas
- Code reviews antes de merge

## 13. ESTRATÉGIA DE TESTES

### 13.1 Testes Unitários
- Testes de funções utilitárias
- Testes de modelos de dados
- Testes de validações

### 13.2 Testes de Integração
- Testes de endpoints da API
- Testes de fluxos completos

### 13.3 Testes Manuais
- Testes de interface de usuário
- Testes de compatibilidade com navegadores
- Testes de usabilidade

## 14. PLANO DE DEPLOYMENT

### 14.1 Ambiente de Desenvolvimento
- Local: Execução via `npm run dev`
- Banco de dados SQLite local

### 14.2 Ambiente de Produção
- Deploy no Vercel, Heroku ou Netlify
- Configuração de variáveis de ambiente
- Possível migração para PostgreSQL em produção

## 15. ANÁLISE DE RISCOS

### 15.1 Riscos Técnicos
- **Complexidade do calendário interativo**: Mitigação com uso de biblioteca estabelecida
- **Conflitos de agendamento**: Implementação de verificações rigorosas e transações
- **Problemas de performance**: Testes e otimização contínuos

### 15.2 Riscos de Cronograma
- **Atrasos no desenvolvimento**: Planejamento de buffer em cada fase
- **Complexidade não prevista**: Simplificação de features se necessário

## 16. ENTREGAS POR FASE

### 16.1 Fase 1: Configuração Inicial
- Repositório configurado no GitHub
- Estrutura de pastas criada
- Banco de dados inicializado
- README.md inicial
- Documento de escopo
- Configuração de ambiente de desenvolvimento

### 16.2 Fase 2: Backend
- API de autenticação funcional
- CRUD de usuários implementado
- CRUD de serviços implementado
- CRUD de disponibilidade implementado
- CRUD de reservas implementado
- Validações de dados implementadas
- Documentação da API iniciada

### 16.3 Fase 3: Frontend
- Página inicial responsiva
- Páginas de login/registro funcionais
- Página de visualização de serviços
- Página de agendamento com calendário interativo
- Painel do cliente com histórico de reservas
- Painel do administrador com gestão de reservas

### 16.4 Fase 4: Integração
- Integração completa do frontend com backend
- Sistema de notificações implementado
- Filtros e busca de serviços/reservas
- UI/UX melhorada com feedback visual
- Tratamento de erros no frontend
- Testes de integração

### 16.5 Fase 5: Finalização
- Correções de bugs identificados
- Documentação completa (código e usuário)
- Versão de demonstração online
- README.md detalhado com screenshots e instruções
- Otimização de performance

## 17. CRITÉRIOS DE ACEITAÇÃO

### 17.1 Funcionalidade
- Todas as funcionalidades principais implementadas
- Fluxos completos de agendamento e gerenciamento funcionando
- Verificação de conflitos de horário funcionando corretamente
- Sistema de notificações operacional

### 17.2 Qualidade
- Código bem documentado e comentado
- Testes cobrindo funcionalidades principais
- Interface responsiva em múltiplos dispositivos
- Tempo de resposta da API abaixo de 2 segundos

### 17.3 Documentação
- README completo com instruções de instalação e uso
- Documentação da API
- Comentários de código relevantes
- Mensagens de commit descritivas

## 18. ESTRATÉGIA DE DEMONSTRAÇÃO PARA RECRUTADORES

### 18.1 README Atrativo
- Banner/logo do projeto
- GIFs/screenshots demonstrando funcionalidades
- Descrição clara e concisa
- Instruções de instalação simples
- Badges mostrando tecnologias utilizadas

### 18.2 Deploy de Demonstração
- Versão live do projeto hospedada (Vercel/Heroku)
- Dados de exemplo pré-carregados
- Usuários de teste (cliente e admin) prontos para uso
- QR code no README levando à demo

### 18.3 Documentação para Recrutadores
- Seção "Highlights do Código" no README
- Links para arquivos/partes interessantes do código
- Explicação de decisões técnicas importantes
- Descrição de desafios enfrentados e soluções

## 19. MANUTENÇÃO PÓS-IMPLEMENTAÇÃO

- Correção de bugs reportados
- Pequenas melhorias de usabilidade
- Adição de funcionalidades extras como:
  - Pagamentos online
  - Integração com calendários externos (Google, Outlook)
  - Sistema de avaliações
  - Agendamentos recorrentes

---

Aprovado por: edvaldoglima23  
Data de Aprovação: 2025-05-26 16:00:20 UTC