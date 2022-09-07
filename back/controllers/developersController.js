const developerService = require('../services/developersServices')
const getDevelopers = async (request, response) => {
    try {
        const developers =await developerService.getAllDevelopers()
        response
            .status(200)
            .send({
                status: 'OK',
                developers
            })
    }catch(error){
        response
            .status(error?.status || 500)
            .send({
                satus:"FAILED",
                data: error.message,
                code: error?.status || 500
            })
    }
    
}

module.exports = {
    getDevelopers
}