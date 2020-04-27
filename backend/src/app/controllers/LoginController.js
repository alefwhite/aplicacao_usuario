const Usuario = require('../models/Usuario');
module.exports = {

    async store(req, res) {

        try {
            const { email } = req.body;
    
            if(!email) {
                return res.status(404).json({ message: "E-mail é obrigatório!"});
            }
    
            const existeEmail = await Usuario.findOne({ email })
            
            if(!existeEmail) {
                return res.status(404).json({ message: "E-mail não econtrado!"});
            }                   
            
            return res.status(200).json({ message: "Login efetuado com sucesso!", existeEmail });
            
        } catch (error) {
            return res.status(404).json({erro: true});
        }
    }

};