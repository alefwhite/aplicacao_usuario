const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://root:root@cluster0-kpssg.mongodb.net/dinamica_teste?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Conexão com MongoDB realizado com sucesso!");
}).catch((erro) => {
    console.log("Erro: Conexão com MongoDB não realizado com sucesso!" + erro);
});

module.exports = mongoose;