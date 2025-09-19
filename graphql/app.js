const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs, resolvers } = require('./schema');

const app = express();
app.use(express.json());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req })
});

async function startApollo() {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });
}

startApollo();

module.exports = app;
