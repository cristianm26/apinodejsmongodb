const express = require('express');
const verificarToken = require('../middlewares/auth')
const router = express.Router();
const {
    crearCurso,
    actualizarCurso,
    desactivarCurso,
    listarCursosActivos
} = require('../controllers/curso_controller');

router.get('/', verificarToken, (req, res) => {

    let resultado = listarCursosActivos();
    resultado.then(cursos => {
        res.json(cursos)
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})

router.post('/', verificarToken, (req, res) => {
    let resultado = crearCurso(req);



    resultado.then(curso => {
        res.json({
            curso
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})

router.put('/:id', verificarToken, (req, res) => {
    let resultado = actualizarCurso(req.params.id, req.body);
    resultado.then(valor => {
        res.json({
            valor
        })
    }).catch(err => {
        res.status(400).json({
            err
        })
    })
})

router.delete('/:id', verificarToken, (req, res) => {
    let resultado = desactivarCurso(req.params.id);
    resultado.then(valor => {
        res.json({
            curso: valor
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})

module.exports = router;