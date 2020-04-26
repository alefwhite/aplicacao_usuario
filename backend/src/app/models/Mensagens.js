const { Schema, model } = require('mongoose');

const MensagemSchema = new Schema({
    mensagem:{
        type: String,
        required: true,
        lowercase: true
    },
    nome: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
    },
    data:{
        type: Date,
        lowercase: true,
        default: Date.now
    }
}, 
{
    timestamps: true,
});

module.exports = model('Mensagem', MensagemSchema);