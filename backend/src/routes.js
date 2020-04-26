const { Router } = require('express');
const routes = new Router();

const UsuarioController = require('./app/controllers/UsuarioController');
const LoginController = require('./app/controllers/LoginController');
const MensagensController = require('./app/controllers/MensagensController');

routes.get('/', (req, res) => {
    return res.send("<h1>Teste</h1>");
});

// Usuario
routes.post('/usuario', UsuarioController.store);

// Login
routes.post('/login', LoginController.store);

// Mensagens
routes.post('/mensagem', MensagensController.store);
routes.get('/mensagem', MensagensController.index);
routes.get('/usuarioMensagem/:email', MensagensController.userMessage);
routes.delete('/mensagem/:id', MensagensController.delete);

module.exports = routes;
