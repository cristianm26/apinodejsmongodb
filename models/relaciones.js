// relaciones por referencia (normalizacion)
let usuario = {
    id: '1',
    nombre: 'Cristian',
    email: 'cristi@gmail.com'
}

let curso = {
    id: 'C0001',
    id_alumno: ['A0001'],
    titulo: 'JavaScript Moderno',
    moderno: 'Hola jaja'
}

// Relaciones por documentos embebidos (Desnormalizacion)
let curso = {
    id: 'C0001',
    autor: {
        nombre: 'Carlos'
    },
    id_alumno: [
        { id: 'A0001', nombre: 'Cristian', email: 'cris' },
        { id: 'A0001', nombre: 'Cristian', email: 'cris' },
    ],
    titulo: 'JavaScript Moderno',
    moderno: 'Hola jaja'
}


/* let curso_alumno = {
    id: '0001',
    id_curso: 'C0001',

} */