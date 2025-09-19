const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
    username: String!
    favorecidos: [String]
    saldo: Float
  }

  type Transfer {
    from: String!
    to: String!
    amount: Float!
    date: String
  }

  type AuthPayload {
    message: String!
    user: User!
    token: String!
  }

  type Query {
    users: [User]
    transfers: [Transfer]
  }

  type Mutation {
    register(username: String!, password: String!, favorecidos: [String]): User!
    login(username: String!, password: String!): AuthPayload!
    transfer(from: String!, to: String!, amount: Float!): Transfer!
  }
`;
