const userService = require('../service/userService');

exports.register = (req, res) => {
  const { username, password, favorecidos } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  const result = userService.registerUser({ username, password, favorecidos });
  if (result.error) {
    return res.status(409).json({ error: result.error });
  }
  res.status(201).json({ user: result.user });
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }
  const result = userService.authenticateUser({ username, password });
  if (result.error) {
    return res.status(401).json({ error: result.error });
  }
  res.json({ message: 'Login realizado com sucesso', user: result.user });
};

exports.list = (req, res) => {
  res.json({ users: userService.listUsers() });
};
