const userService = require('../src/service/userService');
const transferService = require('../src/service/transferService');
const { generateToken } = require('./auth');
const { getUserFromToken } = require('./auth');

module.exports = {
  Query: {
    users: () => userService.listUsers(),
    transfers: () => transferService.listTransfers(),
  },
  Mutation: {
    register: (_, { username, password, favorecidos }) => {
      return userService.registerUser({ username, password, favorecidos });
    },
    login: (_, { username, password }) => {
      const user = userService.authenticateUser({ username, password });
      const token = generateToken(user);
      return {
        message: 'Login realizado com sucesso',
        user,
        token
      };
    },
    transfer: (_, { from, to, amount }, { req }) => {
      // Autenticação JWT
      const authHeader = req.headers.authorization || '';
      const token = authHeader.replace('Bearer ', '');
      const user = getUserFromToken(token);
      if (!user) throw new Error('Token inválido ou ausente');
      // Transferência
      return transferService.transfer({ from, to, amount });
    }
  }
};
