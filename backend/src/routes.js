const { Router } = require('express');
const routes = new Router();

routes.get('/', (req, res) => {
    return res.send("<h1>Teste</h1>");
});

module.exports = routes;
