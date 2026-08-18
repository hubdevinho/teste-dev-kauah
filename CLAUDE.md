# Sobre o projeto

Desafio técnico para a vaga de Desenvolvedor(a) Junior Full Stack na Hubsoft (empresa
de ERP para provedores de internet). Objetivo: construir um CRUD completo de **endereços**
(cep, logradouro, número, complemento, bairro, cidade, estado), com backend em API REST
e frontend consumindo essa API — a integração entre os dois é o ponto mais avaliado no
desafio.

Cadastro solto/independente — endereço não pertence a nenhuma outra entidade (sem
pessoa/cliente dono, sem chave estrangeira). Projeto não tem login/autenticação.

# Stack

- Backend: PHP 8.2+, Laravel 12, PostgreSQL
- Frontend: React (Vite), Tailwind CSS, Axios
- Testes: PHPUnit (feature tests da API)
- Infra: Docker/docker-compose (Postgres + backend + frontend), opcional para rodar tudo de uma vez

# Estrutura do backend (`backend/`)

Usar **apenas** estas camadas — decisão consciente para não fazer overengineering
num CRUD simples:

- `app/Models/Endereco.php` — entidade Eloquent (cep, logradouro, numero, complemento,
  bairro, cidade, estado)
- `app/Http/Controllers/Api/EnderecoController.php` — index (com busca/paginação), store,
  show, update, destroy
- `app/Http/Requests/StoreEnderecoRequest.php` e `UpdateEnderecoRequest.php` — validação
  de entrada
- `app/Http/Resources/ApiResource.php` e `ApiCollection.php` — base genérica do envelope
  de resposta da API (ver seção abaixo); `EnderecoResource` herda de `ApiResource`
- `database/migrations/` — schema da tabela `enderecos`
- `routes/api.php` — `Route::apiResource('enderecos', EnderecoController::class)`
- `tests/Feature/EnderecoApiTest.php` — testes da API

Colunas do banco e contrato JSON da API (request e response) usam os mesmos nomes em
português (`cep`, `logradouro`, `numero`, `complemento`, `bairro`, `cidade`, `estado`) —
sem camada de tradução entre DB e API.

Sem Service, sem Repository — se a lógica de negócio crescer a ponto de justificar isso,
discutimos antes de adicionar. Tratamento de exceções (abaixo) é a única camada "extra"
combinada, e mora em `bootstrap/app.php`, não numa camada nova.

# Estrutura do frontend (`frontend/`)

- `src/api/client.js` — instância única do axios (baseURL via variável de ambiente)
- `src/api/enderecos.js` — funções de acesso à API (listEnderecos, createEndereco,
  updateEndereco, deleteEndereco)
- `src/components/EnderecoTable.jsx` — tabela de endereços
- `src/components/EnderecoFormModal.jsx` — modal de criar/editar/visualizar
- `src/components/ConfirmDialog.jsx` — confirmação antes de excluir
- `src/App.jsx` — tela principal (busca, paginação, tabela, modais)

Sem upload de arquivo neste CRUD (endereço não tem campo de foto/anexo) — todo o
formulário é campos de texto simples.

# Convenção de resposta da API

**Sucesso** segue o envelope `{"success": true, "data": ...}` (mais `links`/`meta` quando
paginado), implementado via `App\Http\Resources\ApiResource` (item único) e
`App\Http\Resources\ApiCollection` (listagens, genérica — recebe a classe do Resource a
usar como segundo argumento no construtor, sem precisar criar uma Collection nova por
entidade). Toda nova Resource da API deve herdar de `ApiResource`, nunca de
`JsonResource` diretamente.

**Erro** segue o mesmo espírito, no formato `{"success": false, "message": "...", "errors": {...}}`
(a chave `errors` só aparece em erro de validação). Isso é tratado centralizado em
`bootstrap/app.php`, no método `withExceptions()`, cobrindo pelo menos:

- `Illuminate\Validation\ValidationException` → 422, com `errors` preenchido
- `Illuminate\Database\Eloquent\ModelNotFoundException` / `NotFoundHttpException` → 404
- Qualquer outra `Throwable` não tratada → 500, com mensagem genérica (nunca vazar
  detalhes internos/stack trace na resposta, mesmo em ambiente local)

Não criar uma exception customizada por tipo de erro de negócio ainda — usar as exceptions
padrão do Laravel/PHP é suficiente neste escopo; só a *formatação* da resposta é
centralizada.

# Como trabalhar comigo neste projeto

- Sou júnior aprendendo Laravel/PHP na prática. Construa **um passo pequeno de cada vez**
  (ex: só a migration, só o model, só uma rota) e **pare para eu confirmar** antes de
  seguir para o próximo passo. Não implemente várias camadas de uma vez sem eu pedir.
- Depois de cada passo, **explique o que foi feito** — ou delegue pro subagente
  `explainer` se eu pedir explicitamente uma explicação mais aprofundada de um arquivo.
- **Rode o código de verdade** (migrations, testes, servidor) antes de dizer que algo
  está pronto — nunca assuma que só "parece certo" significa que funciona.
- Se algo quebrar, delegue para o subagente `debugger` antes de sair editando às cegas.
- Comunicação em português.