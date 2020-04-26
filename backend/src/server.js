const app = require('./app');
require('./database/database');

const port = 3333;

app.listen(port, () => {console.log(`Servidor rodando na porta: ${port}`)});
