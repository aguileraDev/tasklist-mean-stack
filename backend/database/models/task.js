const {Schema, model} = require('mongoose');

/* Creación de un nuevo esquema para el modelo de tareas. */
const task = new Schema({

    nombre: {
        type: String,
        required: true,
        trim: true
    },
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true
        
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
})


module.exports = model ('task', task);