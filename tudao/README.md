# Bankai — Sistema de Logística (TCC)

Plataforma web para gestão logística: produtos, armazéns, entregas, rastreamento, transportadoras e veículos.

- **Front-end:** React + Vite (landing page, cadastro, login e dashboard)
- **Back-end:** Node.js + Express (API REST)
- **Banco de dados:** PostgreSQL (hospedado na [Neon](https://neon.tech))

## Estrutura

```
.
├── frontend/              # aplicação React
│   ├── public/            # favicon e imagens estáticas
│   └── src/
│       ├── components/    # seções da landing page (Hero, Vantagens, Planos...)
│       ├── pages/         # telas: Login, Cadastro, Dashboard
│       ├── services/      # api.js — comunicação com o back-end
│       ├── App.jsx        # controla qual tela aparece
│       └── main.jsx
├── backend/
│   ├── sql/schema.sql     # criação das tabelas
│   └── src/
│       ├── routes/        # rotas da API
│       ├── controllers/   # regras de cada rota
│       ├── models/        # consultas SQL
│       ├── database/      # conexão com o PostgreSQL
│       ├── app.js         # configuração do Express
│       └── server.js      # inicia o servidor
└── docs/                  # anotações e comandos de teste da API
```

## Como rodar localmente

Pré-requisitos: [Node.js](https://nodejs.org) 20+ e um banco PostgreSQL (pode ser o da Neon).

### 1. Banco de dados
Execute o conteúdo de `backend/sql/schema.sql` no seu banco (no painel SQL da Neon ou com `psql`).

### 2. Back-end
```bash
cd backend
npm install
cp .env.example .env      # no Windows: copy .env.example .env
# edite o .env e cole sua DATABASE_URL
npm run dev
```
A API sobe em http://localhost:3000. Teste abrindo essa URL no navegador.

### 3. Front-end (em outro terminal)
```bash
cd frontend
npm install
cp .env.example .env      # no Windows: copy .env.example .env
npm run dev
```
Abra o endereço mostrado no terminal (normalmente http://localhost:5173).

## Fluxo das telas

Landing page → **Entrar** → Login ⇄ Cadastro → Dashboard → **Sair** (volta à landing).

O email informado é usado como `login` na API.

## Principais endpoints

| Recurso | Rota |
|---|---|
| Usuários | `POST /usuarios`, `POST /usuarios/login`, `GET/PUT/DELETE /usuarios/:id` |
| Produtos | `/produtos` |
| Armazéns | `/armazens` |
| Movimentações | `/movimentacoes` |
| Entregas | `/entregas` |
| Rastreamento | `/rastreamento` |
| Transportadoras | `/transportadoras` |
| Veículos | `/veiculos` |

Exemplos de chamadas em PowerShell estão em `docs/comandos-powershell.txt`.

## Deploy (Vercel)

O back-end e o front-end são publicados como **dois projetos separados** na Vercel:

- **Back-end:** Root Directory = `backend` (usa o `backend/vercel.json`). Variável de ambiente: `DATABASE_URL`.
- **Front-end:** Root Directory = `frontend` (preset Vite). Variável de ambiente: `VITE_API_URL` com a URL pública do back-end.

## Licença

MIT
