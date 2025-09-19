const express = require('express');
const userController = require('./controller/userController');
const transferController = require('./controller/transferController');
const { authenticateToken } = require('./middleware/auth');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
app.use(express.json());

// User routes
app.post('/users/register', userController.register);
app.post('/users/login', userController.login);
app.get('/users', userController.list);

// Transfer routes (protegidas por autenticação)
app.post('/transfer', authenticateToken, transferController.transfer);
app.get('/transfer', authenticateToken, transferController.listTransfers);

// Swagger docs
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

module.exports = app;
