const express = require('express');
const Usuario = require('../models/usuario_model');
const verificarToken = require('../middlewares/auth')

const { crearUsuario,
    actualizarUsuario,
    desactivarUsuario,
    listarUsuariosActivos
} = require('../controllers/usuario_controller');

const Joi = require('joi');
const router = express.Router();
const schema = Joi.object({
    nombre: Joi.string()
        .min(3)
        .max(30)
        .required(),

    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),


    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})




router.get('/', verificarToken, (req, res) => {
    let resultado = listarUsuariosActivos();
    resultado.then(usuarios => {
        res.json(usuarios)
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
});

router.post('/', (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({ error: 'Server Error' })
        }
        if (user) {
            // Usuario si existe
            return res.status(400).json({
                msg: 'El usuario ya existe'
            })
        }

    });

    const { error, value } = schema.validate({ nombre: body.nombre, email: body.email })
    if (!error) {
        let resultado = crearUsuario(body);

        resultado.then(user => {
            res.json({
                nombre: user.name,
                email: user.email
            })
        }).catch(err => {
            res.status(400).json({
                error: err
            })
        })
    } else {
        res.status(400).json({
            error
        })
    }

})


router.put('/:id', verificarToken, (req, res) => {

    const { error, value } = schema.validate({ nombre: req.body.nombre, email: req.body.email })
    if (!error) {
        let resultado = actualizarUsuario(req.params.id, req.body);
        resultado.then(valor => {
            res.json({
                nombre: valor.nombre,
                email: valor.email
            })
        }).catch(err => {
            res.status(400).json({
                err
            })
        })
    } else {
        res.status(400).json({
            error
        })
    }
})

router.delete('/:id', verificarToken, (req, res) => {
    let resultado = desactivarUsuario(req.params.email);
    resultado.then(valor => {
        res.json({
            nombre: valor.nombre,
            email: valor.email
        })
    }).catch(err => {
        res.status(400).json({
            error: err
        })
    })
})


module.exports = router;