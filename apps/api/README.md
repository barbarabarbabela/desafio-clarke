# Desafio Clarke Energia

Plataforma de comparação de fornecedores de energia elétrica. O usuário informa seu estado (UF) e consumo mensal em kWh, e o sistema retorna quais fornecedores podem atendê-lo com o cálculo de economia em reais e percentual.

---

## Tecnologias

**Backend**

- [Fastify](https://fastify.dev/) — servidor HTTP
- [Mercurius](https://mercurius.dev/) — plugin GraphQL para Fastify
- [Drizzle ORM](https://orm.drizzle.team/) — ORM TypeScript para PostgreSQL
- [PostgreSQL 16](https://www.postgresql.org/) — banco de dados relacional
- [TypeScript](https://www.typescriptlang.org/)

**Testes**

- [Vitest](https://vitest.dev/)

**Infra**

- [Docker](https://www.docker.com/) + [Docker Compose](https://docs.docker.com/compose/)

---

## Estrutura do projeto

```
desafio-clarke/
├── apps/
│   ├── api/                        # Backend Node.js
│   │   ├── src/
│   │   │   ├── server.ts           # Ponto de entrada — Fastify + Mercurius
│   │   │   ├── graphql/
│   │   │   │   ├── schema.ts       # Tipos e queries GraphQL (SDL)
│   │   │   │   └── resolvers.ts    # Conecta queries ao service
│   │   │   ├── services/
│   │   │   │   └── fornecedor.service.ts   # Lógica de negócio e cálculos
│   │   │   ├── repositories/
│   │   │   │   └── fornecedor.repository.ts  # Queries SQL com Drizzle
│   │   │   └── db/
│   │   │       ├── index.ts        # Conexão com o banco (pool)
│   │   │       ├── schema.ts       # Definição das tabelas
│   │   │       └── seed.ts         # Dados iniciais para desenvolvimento
│   │   ├── drizzle.config.ts
│   │   └── package.json
│   └── web/                        # Frontend (React)
├── docker-compose.yml
└── package.json
```

---

## Pré-requisitos

- [Node.js](https://nodejs.org/) >= 18
- [Docker](https://www.docker.com/) e Docker Compose

---

## Rodando com Docker (recomendado)

Sobe todos os serviços (banco, API e frontend) com um único comando:

```bash
docker-compose up --build
```

| Serviço               | URL                            |
| --------------------- | ------------------------------ |
| Frontend              | http://localhost               |
| API GraphQL           | http://localhost:3000          |
| GraphiQL (playground) | http://localhost:3000/graphiql |
| PostgreSQL            | localhost:5432                 |

---

## Rodando localmente (desenvolvimento)

### 1. Sobe o banco via Docker

```bash
docker-compose up postgres
```

### 2. Instala as dependências da API

```bash
cd apps/api
npm install
```

### 3. Configura as variáveis de ambiente

```bash
# apps/api/.env
DATABASE_URL=postgres://postgres:postgres@localhost:5432/clarke-energia
PORT=3000
```

### 4. Cria as tabelas no banco

```bash
npx drizzle-kit push:pg
```

### 5. Popula o banco com dados iniciais

```bash
npm run db:seed
```

### 6. Inicia a API em modo desenvolvimento

```bash
npm run dev
```

A API estará disponível em `http://localhost:3000` e o GraphiQL em `http://localhost:3000/graphiql`.

---

## Scripts disponíveis

```bash
npm run dev          # Inicia em modo desenvolvimento com hot reload
npm run build        # Compila TypeScript para JavaScript
npm run start        # Inicia a versão compilada (produção)
npm run db:seed      # Popula o banco com dados de exemplo
npm run test         # Roda os testes
npm run test:watch   # Roda os testes em modo watch
```

---

## API GraphQL

### Queries disponíveis

#### `fornecedores` — lista fornecedores compatíveis com o perfil do cliente

```graphql
query {
  fornecedores(uf: "SP", consumoKwh: 500) {
    id
    nome
    logo
    estadoOrigem
    totalClientes
    avaliacaoMedia
    ufsAtendidas
    solucoes {
      solucao
      custoKwh
      consumoMinimoKwh
      consumoMaximoKwh
      custoTotal
      economia
      economiaPercentual
    }
  }
}
```

#### `resumoSolucoes` — melhor fornecedor por tipo de solução

```graphql
query {
  resumoSolucoes(uf: "SP", consumoKwh: 500) {
    solucao
    melhorEconomia
    melhorFornecedor
  }
}
```

#### `ufsDisponiveis` — estados com fornecedores cadastrados

```graphql
query {
  ufsDisponiveis
}
```

---

## Banco de dados

### Tabelas

| Tabela                | Descrição                                        |
| --------------------- | ------------------------------------------------ |
| `fornecedores`        | Dados cadastrais dos fornecedores                |
| `fornecedor_solucoes` | Ofertas com custo e faixa de consumo por solução |
| `fornecedor_estados`  | Estados atendidos por cada fornecedor            |
| `tarifas_base`        | Tarifa padrão da distribuidora por UF            |

### Tipos de solução

- `GD` — Geração Distribuída
- `MERCADO_LIVRE` — Mercado Livre de Energia

### Dados do seed

O seed popula o banco com 4 fornecedores de exemplo cobrindo 7 estados (SP, RJ, MG, RS, PR, SC, BA) com tarifas base reais por UF.

---

## Cálculo de economia

Para cada solução de fornecedor, o sistema calcula:

```
custoBase        = consumoKwh × tarifaBase (tarifa atual do estado)
custoFornecedor  = consumoKwh × custoKwh   (tarifa do fornecedor)
economia         = custoBase - custoFornecedor
economiaPercentual = (economia / custoBase) × 100
```

---

## Variáveis de ambiente

| Variável       | Descrição                          | Padrão |
| -------------- | ---------------------------------- | ------ |
| `DATABASE_URL` | String de conexão com o PostgreSQL | —      |
| `PORT`         | Porta da API                       | `3333` |
