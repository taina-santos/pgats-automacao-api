const jwt = require('jsonwebtoken');

// Chave secreta para JWT (em produção, usar variável de ambiente)
const JWT_SECRET = 'pgats-secret-key';

function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ error: 'Token de acesso requerido' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
}

function generateToken(user) {
  return jwt.sign(
    { username: user.username },
    JWT_SECRET,
    { expiresIn: '1h' }
  );
}

module.exports = {
  authenticateToken,
  generateToken,
  JWT_SECRET
};
