const GitHubServices = require('../services/GitHubServices');
const RepositoriesServices = require('../services/RepositoryServices')

//CONSULTA BASE DE DATOS
const getGitInfo = async (request, response) => {
    try {
        const gitInfo = await GitHubServices.getGitInfo();
        response
            .status(200)
            .send({
                status: "OK",
                info: "Información repositorios git",
                data: {
                    gitInfo: gitInfo
                }
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                data: error?.message || "No seha podido localizar datos de Github en base de datos"
            })
    }
}

//UPDATE DE TODOS LOS DEVELOPERS DE LA BASE DE DATOS PARA LA INFO DE GITHUB
const updateGitInfo = async (request, response) => {
    try {
        const updateDetails = await GitHubServices.updateUserDetails();
        const updateRepos = await RepositoriesServices.updateReposInfo();
        response
            .status(200)
            .send({
                status: "OK",
                info: "Actualizados destalles de usuario Github",
                data: {
                    gitUsers: updateDetails,
                    gitRepos: updateRepos
                }
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send({
                status: "FAILED",
                data: error?.message || "No seha podido actualizar datos de Git con API externa"
            })
    }
}


module.exports = {
    updateGitInfo,
    getGitInfo,
}