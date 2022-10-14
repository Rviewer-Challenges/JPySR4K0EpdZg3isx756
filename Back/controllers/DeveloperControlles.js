const DeveloperServices = require('../services/DeveloperServices');

const getDevelopersBasicInfo = async (request, response) => {
    try {
        const developers = await DeveloperServices.getDevelopersBasicInfo()
        response
            .status(200)
            .send({
                info: "Información de developers",
                status: "OK",
                developers: developers
            })
    } catch (error) {
        response
            .status(error?.code || 500)
            .send({
                status: "FAILED",
                data: {
                    status: error?.code || error?.status || 500,
                    info: error.message
                }
            })
    }
}

const getDevelopers = async (request, response) => {
    try {
        const developers = await DeveloperServices.getDevelopers();
        response
            .status(200)
            .send({
                info: "Información de developers",
                status: "OK",
                developers: developers

            })
    } catch (error) {
        response
            .status(error?.code || 500)
            .send({
                status: "FAILED",
                data: {
                    status: error?.code || error?.status || 500,
                    info: error.message,
                    error:error
                }
            })
    }


}

module.exports = {
    getDevelopers,
    getDevelopersBasicInfo
}