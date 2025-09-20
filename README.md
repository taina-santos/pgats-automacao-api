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

## Configuração

Antes de seguir, crie um arquivo .env na pasta razi contendo as propriedades BASE_URL_REST e BASE_URL_GRAPHQL com a URL desses serviços

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

## API GraphQL

A API GraphQL está disponível na pasta `graphql` e expõe os mesmos serviços da API REST.

### Instalação de dependências GraphQL
Execute:
```sh
npm install apollo-server-express graphql jsonwebtoken
```

### Como rodar a API GraphQL

1. Inicie o servidor GraphQL:
   ```sh
   npm run start-graphql
   ```
   O servidor rodará por padrão na porta 4000.

2. Acesse o playground GraphQL em [http://localhost:4000/graphql](http://localhost:4000/graphql)

### Queries e Mutations disponíveis

- **Query users**: Lista todos os usuários
- **Query transfers**: Lista todas as transferências
- **Mutation register**: Registra novo usuário
- **Mutation login**: Realiza login e retorna JWT
- **Mutation transfer**: Realiza transferência (requer JWT no header Authorization)

#### Exemplo de Mutation de Login
```graphql
mutation {
  login(username: "user1", password: "senha") {
    message
    user { username favorecidos saldo }
    token
  }
}
```

#### Exemplo de Mutation de Transferência (com JWT)
```graphql
mutation {
  transfer(from: "user1", to: "user2", amount: 100) {
    from
    to
    amount
    date
  }
}
```
No header, inclua:
```
Authorization: Bearer <token>
```
