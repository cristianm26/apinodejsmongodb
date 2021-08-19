const Curso = require('../models/curso_model');

async function listarCursosActivos() {
    let cursos = await Curso
        .find({ "estado": true })
    //.populate('autor', 'nombre -_id');
    return cursos;
}


async function crearCurso(req) {
    let curso = new Curso({
        titulo: req.body.titulo,
        //  autor: req.usuario._id,
        autor: req.usuario,
        descripcion: req.body.descripcion,

    });
    return await curso.save();
}

async function actualizarCurso(id, body) {

    let curso = await Curso.findOneAndUpdate(id, {
        $set: {
            titulo: body.titulo,
            descripcion: body.descripcion,
        }
    }, { new: true });
    return curso;
}

async function desactivarCurso(id) {
    let curso = await Curso.findByIdAndUpdate(id, {
        $set: {
            estado: false
        }
    }, { new: true });
    return curso;
}

module.exports = {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
}