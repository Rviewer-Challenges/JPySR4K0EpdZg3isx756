const axios = require('axios');
const externalGitService = require('../services/externalGitServices');
const developersServices = require('../services/developersServices')
const url = 'https://api.github.com/users'

const updateDevelopers = async (request, response, next) => {
    try {
        const developers = await developersServices.getAllDevelopers();
        //actualización de repositorios
        for (dev of developers) {
            const newDev = { gitHub: await externalGitService.getGitUserDetails(dev.gitHub.gitUser) }
            newDev.gitHub.repositories = await externalGitService.getGitRepos(dev.gitHub.gitUser)
            dev.gitHub = newDev.gitHub
            await developersServices.updateDeveloper(dev)

        }

        response
            .status(200)
            .send({
                data:
                {
                    developers: developers,
                }
            })
    } catch (error) {
        response
            .status(error.status || 500)
            .send({
                satus: "FAILED",
                data: error.message,
                code: error?.status || 500
            })
    }
}

module.exports = {
    updateDevelopers
}

