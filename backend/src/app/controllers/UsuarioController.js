const Usuario = require('../models/Usuario');
module.exports = {

    async store(req, res) {
        try {
            const { nome, email } = req.body;
    
            if(!nome || !email) {
              return res.status(404).json({ message: "Nome e E-mail obrigatórios!"});
            } 
    
            const existeEmail = await Usuario.findOne({ email });
    
            if(existeEmail) {
                return res.status(404).json({ message: "E-mail já cadastrado!"});
            }
    
            
            await Usuario.create({
                nome,
                email
            });
         
            return res.status(201).json({ message: "Usuário criado com sucesso!" });
            
        } catch (error) {
            return res.status(404).json({erro: true})
        }
    }

};