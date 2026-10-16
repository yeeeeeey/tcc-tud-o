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
| Usuários | `POST /api/usuarios`, `POST /api/usuarios/login`, `GET/PUT/DELETE /api/usuarios/:id` |
| Produtos | `/api/produtos` |
| Armazéns | `/api/armazens` |
| Movimentações | `/api/movimentacoes` |
| Entregas | `/api/entregas` |
| Rastreamento | `/api/rastreamento` |
| Transportadoras | `/api/transportadoras` |
| Veículos | `/api/veiculos` |

Todas as rotas ficam sob `/api` (ex.: `/api/produtos`). Exemplos de chamadas em PowerShell estão em `docs/comandos-powershell.txt`.

## Deploy (Vercel)

Um único projeto na Vercel publica front-end e back-end no mesmo domínio, usando o recurso **Services** (`vercel.json` na raiz):

- `/api/*` → back-end (Express)
- todo o resto → front-end (React/Vite)

Passos:

1. Importe o repositório como novo projeto na Vercel.
2. Em *Settings → Build and Deployment → Framework Preset*, escolha **Services**.
3. Em *Settings → Environment Variables*, crie `DATABASE_URL` com a string de conexão da Neon.
4. Faça o deploy. **Não** defina `VITE_API_URL` na Vercel: o front usa o mesmo domínio automaticamente.

> Se no seu repositório as pastas `backend` e `frontend` estiverem dentro de outra pasta (por exemplo `tudao/`), ajuste os `root` do `vercel.json` para `tudao/backend` e `tudao/frontend`.

## Licença

MIT
