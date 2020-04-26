const { Schema, model } = require('mongoose');

const UsuarioSchema = new Schema({
    nome: {
        type: String,
        required: true,
        lowercase: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true 

    },
}, 
{
    timestamps: true,
});

module.exports = model('Usuario', UsuarioSchema);