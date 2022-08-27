const mongoose = require('mongoose');


/**
 * Se conecta a la base de datos y registra un mensaje en la consola si la conexión es exitosa.
 */
const conexionDB = async () => {
    
    try {

        await mongoose.connect(process.env.db_host)
        console.log('Connected to MongoDB');
       
    } catch (error) {  
    
        console.log(`Database connection error>>> ${error}`);
        
    }
}

/* Exportando la función `conexionDB` para que pueda ser utilizada en otros archivos. */
module.exports = {
    conexionDB
}