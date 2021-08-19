const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    nombre: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,

    }

});

module.exports = mongoose.model('Usuario', usuarioSchema);