const Developers = require('../models/Developer');

const UpdateDate = async(id)=>{
    try {
        await Developers.findByIdAndUpdate(id, {update: Date.now()})
        
    } catch (error) {
        throw{
            status: 500,
            message: "Error al establecer la hora para actualizar base de datos"
        }
    }
}

module.exports = {
    UpdateDate
}