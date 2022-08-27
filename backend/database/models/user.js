const { Schema, model } = require("mongoose");

/* Creación de un nuevo esquema para el modelo de usuario. */
const user = new Schema({

    username : {
        type: String,
        required: true
    },

    email: {
        type: String,
        unique: true,
        required: true
    },

    password: {
        type: String,
        required: true,
    },

    registered:{
        type: Date,
        default: Date.now()
    },
   
})

module.exports = model('user',user);