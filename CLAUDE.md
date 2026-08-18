# Contexto do projeto

Desafio técnico para vaga de Desenvolvedor(a) Junior Full Stack na Hubsoft: CRUD de
usuários (nome, e-mail, telefone, foto de perfil) com backend em Laravel 12 + PostgreSQL
e frontend em React + Vite + Tailwind.

Ambiente local roda via Docker (docker-compose.yml na raiz), já que PHP/Composer/Node
não estão instalados nativamente nesta máquina. `docker compose up -d` sobe backend
(porta 8000) e frontend (porta 5173).

# Como trabalhar comigo neste projeto

- Sou júnior aprendendo Laravel/PHP na prática. Construa **um passo pequeno de cada vez**
  (ex: só a migration, só o model, só uma rota) e **pare para eu confirmar** antes de
  seguir para o próximo passo. Não implemente várias camadas de uma vez sem eu pedir.
- Depois de cada passo, **explique o que foi feito**: o que cada trecho de código faz,
  por que essa é a forma idiomática no Laravel, e quais conceitos de PHP/Laravel estão
  envolvidos (Eloquent, Service Container, Form Request, Route Model Binding, etc.).
- **Rode o código de verdade** (migrations, testes, servidor) antes de dizer que algo
  está pronto — nunca assuma que só "parece certo" significa que funciona.
- Se algo quebrar, delegue para o subagente `debugger` antes de sair editando às cegas.
  Peça para ele explicar a causa raiz, não só aplicar um fix.
- Escopo do backend: apenas Model, Controller, Form Request e API Resource — sem Service
  ou Repository (decisão consciente para não fazer overengineering neste desafio).
- Comunicação em português.
