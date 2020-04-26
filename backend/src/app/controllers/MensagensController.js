const Mensagem = require('../models/Mensagens');
module.exports = {

    async store(req, res) {
        try {
            const { email, nome, mensagem } = req.body;
    
            const mensagemCriada = await Mensagem.create({
                mensagem,
                nome,
                email
            });

            return res.status(201).json({ message: "Mensagem enviada com sucesso!", mensagemCriada });
            
        } catch (error) {
            return res.status(404).json({erro: true})
        }
    },

    async index(req, res) {
        try {
            const mensagens = await Mensagem.find().sort({data: 'desc'})
           
            return res.json({mensagens});
            
        } catch (error) {
            return res.status(404).json({erro: true})
        }
    },

     async userMessage(req, res) {
         try {
             const email = req.params.email;

             const mensagens = await Mensagem.find().where('email').all(email).sort({data: 'desc'})
             
             return res.json({mensagens});
             
         } catch (error) {
            return res.status(404).json({erro: true})
         }

    },

    async delete(req, res) {
        try {
            const id = req.params.id;            

            const mensagemDeletada = await Mensagem.findById({_id: id});
            
            if(mensagemDeletada !== null) {
                await Mensagem.deleteOne({ _id: id});
                
                return res.json({mensagem: "Mensagem deletada com sucesso"});
            } else {
                return res.status(200).json({mensagem: "Não foi possível deletar a sua mensagem!"})
            }
            
        } catch (error) {
            return res.status(404).json({erro: true})

        }
       
        
    }
};