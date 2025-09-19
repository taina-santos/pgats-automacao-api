const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'pgats-secret-key';

function getUserFromToken(token) {
  try {
    if (!token) return null;
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}

function generateToken(user) {
  return jwt.sign({ username: user.username }, JWT_SECRET, { expiresIn: '1h' });
}

module.exports = { getUserFromToken, generateToken, JWT_SECRET };
