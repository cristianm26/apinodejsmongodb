const express = require('express');
const mongoose = require('mongoose');
const usuarioRouter = require('./routers/usuarios_router');
const cursoRouter = require('./routers/cursos_router');
const authRouter = require('./routers/auth');
const config = require('config');
// Conectarnos a nuestra base de datos
mongoose.connect(config.get('configDB.HOST'), {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => console.log('Conectando a MongoDB..'))
    .catch(err => console.log('No se pudo conectar con MongoDb', err));


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extends: true }))
app.use('/api/usuarios', usuarioRouter);
app.use('/api/cursos', cursoRouter);
app.use('/api/auth', authRouter)

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`)
})

