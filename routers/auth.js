const Usuario = require('../models/usuario_model');
const config = require('config');
//const Joi = require('joi');
const bcrypt = require('bcrypt');
const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

router.post('/', (req, res) => {
    Usuario.findOne({ email: req.body.email })
        .then(datos => {
            if (datos) {
                const passwordValido = bcrypt.compareSync(req.body.password, datos.password);
                if (!passwordValido) return res.status(400).json({
                    error: 'ok',
                    msg: 'Usuario o Contraseña Incorrecta'
                })
                const jwToken = jwt.sign({
                    usuario: { _id: datos._id, nombre: datos.nombre, email: datos.email }
                }, config.get('configToken.SEED'), { expiresIn: config.get('configToken.expiration') })
                //jwt.sign({ _id: datos._id, nombre: datos.nombre, email: datos.email }, 'password')
                res.json({
                    usuario: {
                        id: datos._id,
                        nombre: datos.nombre,
                        email: datos.email
                    },
                    jwToken
                })
            } else {
                res.status(400).json({
                    error: 'ok',
                    msg: 'Usuario o Contraseña Incorrecta'
                })
            }
        }).catch(err => {
            res.status(400).json({
                error: 'ok',
                msg: 'Error en el servicio' + err
            })
        })
})


module.exports = router;