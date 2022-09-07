const mongoose = require('mongoose');

const connectionString = process.env.NODE_ENV === 'test'
            ? process.env.DB_URI_TEST
            : process.env.DB_URI


const dbConnection= async()=>{
    try {
        await mongoose.connect(
            connectionString,
            {
                useNewUrlParser:true,
                useUnifiedTopology: true,
            }
        )


        console.log('DB Online')
    } catch (error) {
        throw new Error('Error al incializar base de datos')

    }
}

module.exports ={
    dbConnection
}