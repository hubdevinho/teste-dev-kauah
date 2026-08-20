# Desafio Técnico Full Stack Jr. — Hubsoft

CRUD de **endereços** (cep, logradouro, número, complemento, bairro, cidade, estado), com
backend em API REST (Laravel) e frontend em React consumindo essa API.

Cadastro solto/independente — não há entidade "dona" do endereço, nem login/autenticação
no projeto.

## Stack

- **Backend:** Laravel 12 (PHP 8.4) + PostgreSQL 16
- **Frontend:** React 19 + Vite + Tailwind CSS v4 + Axios
- **Ambiente:** Docker / Docker Compose — não é necessário ter PHP, Composer, Node ou npm
  instalados na máquina, só Docker.

## Estrutura do repositório

```
.
├── backend/   # API Laravel
├── frontend/  # SPA React
├── docker/backend/Dockerfile
└── docker-compose.yml
```

## Como rodar

### Pré-requisitos

- Docker e Docker Compose
- Portas livres: `5432` (Postgres), `8000` (backend), `5173` (frontend) — confira se não
  há outro projeto usando essas portas antes de subir os containers

### Passo a passo

1. Clonar o repositório
   ```bash
   git clone git@github.com:hubdevinho/teste-dev-kauah.git
   cd teste-dev-kauah
   ```

2. Configurar as variáveis de ambiente
   - Baixar o `.env` enviado pelo PrivNote e colocá-lo dentro da pasta **backend/**
   - O `frontend/.env` já vem pronto, apontando para a API local — não precisa mexer

3. Subir os containers (Postgres + backend + frontend)
   ```bash
   docker compose up -d --build
   ```

4. Gerar a chave da aplicação Laravel
   ```bash
   docker compose exec backend php artisan key:generate
   ```

5. Rodar as migrations
   ```bash
   docker compose exec backend php artisan migrate
   ```

6. (opcional) Popular o banco com endereços fake para testar a listagem/paginação
   ```bash
   docker compose exec backend php artisan db:seed
   ```

Depois disso:

- Frontend: http://localhost:5173
- API: http://localhost:8000/api/enderecos

## Endpoints da API

| Método | Rota                   | Descrição                                   |
|--------|------------------------|----------------------------------------------|
| GET    | `/api/enderecos`       | Lista paginada. Aceita `?busca=` (filtra por logradouro/bairro/cidade/cep) e `?por_pagina=` (padrão 15) |
| POST   | `/api/enderecos`       | Cria um endereço                              |
| GET    | `/api/enderecos/{id}`  | Mostra um endereço                            |
| PUT    | `/api/enderecos/{id}`  | Atualiza um endereço (aceita atualização parcial) |
| DELETE | `/api/enderecos/{id}`  | Remove um endereço (soft delete)              |

### Campos

| Campo         | Tipo                  | Observação                          |
|---------------|-----------------------|--------------------------------------|
| `cep`         | string, até 9 chars   | Somente números, sem hífen           |
| `logradouro`  | string                | Obrigatório                          |
| `numero`      | string, até 20 chars  | Aceita valores não-numéricos (ex: "S/N") |
| `complemento` | string                | Opcional                             |
| `bairro`      | string                | Obrigatório                          |
| `cidade`      | string                | Obrigatório                          |
| `estado`      | string, 2 chars       | Sigla da UF (ex: "SP")               |

### Convenção de resposta

**Sucesso**
```json
{
  "success": true,
  "data": { "id": 1, "cep": "01310100", "logradouro": "Av. Paulista", "...": "..." }
}
```
Listagens paginadas incluem também `links` e `meta`.

**Erro**
```json
{
  "success": false,
  "message": "Os dados enviados são inválidos.",
  "errors": { "logradouro": ["O campo logradouro é obrigatório."] }
}
```
`errors` só aparece em erro de validação (422). Não-encontrado retorna 404, erros
inesperados retornam 500 — nunca com stack trace na resposta.

## Rodando os testes do backend

```bash
docker compose exec backend php artisan test
```

## Decisões técnicas

- **Sem autenticação/login** — fora do escopo do desafio; o CRUD é o foco.
- **Sem Service/Repository/Exceptions** — Model, Controller, Form Request e API Resource cobrem bem
  a complexidade de um CRUD simples; decisão consciente contra overengineering.
- **Soft delete** em `Endereco` — excluir não apaga a linha do banco, só marca
  `deleted_at`; consultas normais já ignoram registros excluídos automaticamente.
- **CORS** liberado via configuração padrão do Laravel (`allowed_origins => ['*']` em
  `api/*`), sem necessidade de publicar `config/cors.php`.
  
