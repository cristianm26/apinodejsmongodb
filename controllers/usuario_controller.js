const Usuario = require('../models/usuario_model');
const Joi = require('joi');
const bcrypt = require('bcrypt');


async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({ "estado": true })
        .select({ nombres: 1, email: 1 });
    return usuarios;
}

async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
    });
    return await usuario.save();
}

async function actualizarUsuario(id, body) {

    let usuario = await Usuario.findOneAndUpdate(id, {
        $set: {
            nombre: body.nombre,
            password: body.password,
            email: body.email,
            estado: body.estado
        }
    }, { new: true });
    return usuario;
}

async function desactivarUsuario(id) {
    let usuario = await Usuario.findOneAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return usuario;
}

module.exports = {
    crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
}