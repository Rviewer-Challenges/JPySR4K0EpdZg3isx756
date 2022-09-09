const { response } = require('express')
const { findById } = require('../models/Developer.js')
const Developer = require('../models/Developer.js')

const getAllDevelopers = async () => {
    try {
        const developers = await Developer.find()

        if (developers.length > 0) {
            return developers
        } else {
            throw new Error('No se han localizado developers.')
        }

    } catch (error) {
        throw {
            status: error?.status || 400,
            message: error?.message || 'Error al buscar developers en base de datos'
        }
    }
}

const getDeveloperById = async (id) => {
    try {
        return await Developer.findById(id)


    } catch (error) {
        throw {
            status: error?.status || 400,
            message: error?.message || 'Error al buscar developers en base de datos'
        }
    }
}

const updateDeveloper = async(developer)=>{
    try {

        // const newDev = await Developer.create(developer)
        const dev =await  Developer.findById(developer.id);
        const result= await Developer.findByIdAndUpdate(developer.id,developer, {new:true});
        

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || 'Error al buscar developers en base de datos'
        }
    }
}


module.exports = {
    getAllDevelopers,
    getDeveloperById,
    updateDeveloper
}