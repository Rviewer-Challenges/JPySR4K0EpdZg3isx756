const RespositoryServices = require('../services/RepositoryServices');
const LanguageSelector = require('../helpers/LanguageSelector');
//CONSULTAS BASE DE DATSO
const getAllRepos = async (request, response) => {
    try {
        const repos = await RespositoryServices.getAllRepositories();
        response
            .status(200)
            .send({
                info: "Repositorios almacenados en BD",
                status: "OK",
                repos
            })
    } catch (error) {

        response
            .status(error?.status || 500)
            .send(error?.message || "No se ha podido realizar la busqueda de repositorios por repository")

    }
}

const getReposByDeveloper = async (request, response) => {
    try {
        const gitHubId = { gitHub: request.params.gitHubId }
        const repos = await RespositoryServices.getRepoByParam(gitHubId)
        
        response
            .status(200)
            .send({
                info: "Repos por developer",
                status: "OK",
                repos
            })
    } catch (error) {
        response
            .status(error?.status || 500)
            .send(error?.message || "No se ha podido realizar la busqueda de repositorios por developer")
    }
}

const getReposByLanguage = async (request, response) => {
    try {
        language = LanguageSelector(request.params.dev_language)
        const repos = await RespositoryServices.getRepoByParam({ dev_language: language });
        response
            .status(200)
            .send({
                status: "OK",
                info: "Repositorios por lenguage",
                data: repos
            })
    } catch (error) {
        response
            .status(error?.code || 500)
            .send({
                status: "FAILED",
                data: error?.message || "No se ha podido realizar la busqueda de repositorios por lenguage"
            })
    }
}

const searchText = async (request, response) => {
    try {
        const data = await RespositoryServices.searchText(request.query.repo)
        response
            .status(200)
            .send({
                info: "Busqueda en git por texto",
                status: "OK",
                repositories: data
            })
    } catch (error) {
        response
            .status(error?.code || 500)
            .send({
                status: "FAILED",
                data: error?.message || "No se ha podido realizar la busqueda de repositorios por texto"
            })
    }
}

module.exports = {
    getReposByDeveloper,
    getAllRepos,
    getReposByLanguage,
    searchText
}