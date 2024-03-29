const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const autorSchema = new mongoose.Schema({
    nombre: String,
    email: String
});

const cursoSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
    },
    autor: autorSchema,
    /*   autor: {
          type: Schema.Types.ObjectId,
          ref: 'Usuario'
      }, */
    descripcion: {
        type: String
    },
    estado: {
        type: Boolean,
        default: true
    },
    img: {
        type: String,
    },
    alumnos: {
        type: Number,
        default: 0
    },
    califica: {
        type: Number,
        default: 0
    }

});

module.exports = mongoose.model('Curso', cursoSchema);