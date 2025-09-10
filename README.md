# API de Transferências e Usuários

Esta API permite o registro, login, consulta de usuários e transferências de valores entre usuários, com regras de negócio para aprendizado de testes e automação de API.

## Tecnologias
- Node.js
- Express
- Swagger (documentação)

## Instalação

1. Clone o repositório:
   ```sh
   git clone <url-do-repositorio>
   cd pgats-automacao-api
   ```
2. Instale as dependências:
   ```sh
   npm install express swagger-ui-express
   ```

## Como rodar a API

- Para iniciar o servidor:
  ```sh
  node server.js
  ```
- O servidor rodará por padrão na porta 3000.

## Endpoints

- `POST /register` — Registra um novo usuário.
- `POST /login` — Realiza login.
- `GET /users` — Lista todos os usuários.
- `POST /transfer` — Realiza transferência de valores.
- `GET /api-docs` — Documentação Swagger interativa.

## Regras de Negócio
- Login exige usuário e senha.
- Não é permitido registrar usuários duplicados.
- Transferências acima de R$ 5.000,00 só podem ser feitas para favorecidos.
- Banco de dados em memória (os dados são perdidos ao reiniciar o servidor).

## Testes
- O arquivo `app.js` pode ser importado em ferramentas de teste como Supertest, pois não executa o método `listen()`.

## Documentação Swagger
Acesse [http://localhost:3000/api-docs](http://localhost:3000/api-docs) após iniciar o servidor para visualizar e testar os endpoints.
