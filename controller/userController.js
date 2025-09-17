const userService = require('../service/userService');
const { generateToken } = require('../middleware/auth');

exports.register = (req, res) => {
  const { username, password, favorecidos } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  try {
    const user = userService.registerUser({ username, password, favorecidos });
    res.status(201).json(user);
  } catch (error) {
    res.status(409).json({ error: error.message });
  }
};

exports.login = (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).json({ error: 'Usuário e senha são obrigatórios' });
  }

  try {
    const user = userService.authenticateUser({ username, password });
    const token = generateToken(user);
    res.json({ 
      message: 'Login realizado com sucesso', 
      user: user,
      token: token
    });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

exports.list = (req, res) => {
  res.json({ users: userService.listUsers() });
};
