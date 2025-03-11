# ⚽ Trybe Futebol Clube (TFC)

## 📝 Descrição do Projeto

O TFC é uma aplicação full-stack que permite gerenciar um campeonato de futebol! Com esta aplicação, é possível:
- Visualizar partidas e classificação dos times
- Adicionar novas partidas
- Editar o placar de partidas em andamento
- Finalizar partidas
- Gerenciar times e seus desempenhos

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** e **TypeScript**
- **Express**
- **Sequelize** (ORM)
- **MySQL**
- **JWT** para autenticação
- **Docker** para containerização
- **Jest** e **Mocha** para testes

### Frontend (Desenvolvido pela Trybe)
- **React.js**
- **Docker**
- **Axios**

## 🚀 Instalação

### Pré-requisitos
- Docker
- Node.js (versão 16.14 ou superior)
- Docker Compose

### Passo a passo

1. **Clone o repositório**
```bash
git clone git@github.com:seu-usuario/trybe-futebol-clube.git
cd trybe-futebol-clube
```

2. **Instale as dependências**
```bash
npm run install:apps
```

3. **Configure as variáveis de ambiente**
```bash
cp app/backend/.env.example app/backend/.env
```

4. **Inicie os containers Docker**
```bash
npm run compose:up
```

## 📊 Endpoints da API

### Autenticação
- `POST /login`: Realiza login do usuário

### Times
- `GET /teams`: Lista todos os times
- `GET /teams/:id`: Busca time por ID

### Partidas
- `GET /matches`: Lista todas as partidas
- `POST /matches`: Adiciona nova partida
- `PATCH /matches/:id`: Atualiza partida em andamento
- `PATCH /matches/:id/finish`: Finaliza uma partida

### Placar/Classificação
- `GET /leaderboard`: Classificação geral
- `GET /leaderboard/home`: Classificação mandantes
- `GET /leaderboard/away`: Classificação visitantes

## 🔍 Estrutura do Projeto
```
app/
├── backend/                    # API REST em Node.js
│   ├── src/
│   │   ├── controllers/       # Controladores
│   │   ├── database/         # Configurações do banco
│   │   ├── interfaces/       # Interfaces TypeScript
│   │   ├── middlewares/      # Middlewares
│   │   ├── models/          # Models Sequelize
│   │   ├── routes/          # Rotas da API
│   │   └── services/        # Camada de serviços
│   └── Dockerfile           # Configuração Docker backend
│
└── frontend/                  # Aplicação React
    ├── src/
    │   ├── components/      # Componentes React
    │   ├── pages/          # Páginas da aplicação
    │   └── services/       # Serviços e API calls
    └── Dockerfile          # Configuração Docker frontend
```

## 🧪 Executando Testes

```bash
# Executa todos os testes
npm test

# Executa testes com visualização no navegador
npm run test:browser

# Executa testes em modo debug
npm run test:debug
```

## 🐳 Comandos Docker

```bash
# Inicia os containers
npm run compose:up

# Para os containers
npm run compose:down

# Visualiza logs
npm run logs
```

## 👥 Contribuição

Este projeto foi desenvolvido como parte do currículo da Trybe, onde:
- Frontend foi fornecido pela Trybe
- Backend foi desenvolvido por mim
- Configurações Docker foram desenvolvidas por mim

## 📝 Licença

Este projeto está sob a licença MIT.

## 🙏 Agradecimentos

- Trybe pela estrutura do projeto e frontend
- Comunidade Node.js e TypeScript