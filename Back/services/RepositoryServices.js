const { NotFoundInBDError } = require('../errors/DBError')
const Repository = require('../models/Repository');
const Github = require('../models/GitHub');
const gitApi = require('../api/gitApi');
const UpdateDate = require('./UpdateDate')

//CONSUMO BASE DE DATOS INTERNA
const getAllRepositories = async () => {
    try {
        const repos = await Repository.find().populate("gitHub", "gitUser")
        if (repos.length === 0) throw new NotFoundInBDError('repositories')
        return repos

    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los repositorios por lenguaje"
        }
    }
}



const getRepoByParam = async(params = {})=>{
    try {
        const repos = await Repository.find(params).populate('gitHub', 'gitUser')
        if (repos.length === 0) throw new NotFoundInBDError('repositories')
        return repos

    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los repositorios"
        }
    }
}


const searchText = async(params) =>{
    try {
        const repositories = await Repository.find({$text:{$search:params, $caseSensitive:false, $language:"es"}}).populate('gitHub', 'gitUser')
        if (repositories.length ===0) throw new Error("No hay resultados para la búsqueda de texto en el respositorio");
        return repositories
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los repositorios"
        }
    }
}

//OPERACIONES CON API EXTERNA
const updateReposInfo = async () => {
    try {
        const gitHubs = await Github.find();
        let remoteRepo = []
        for (git of gitHubs){
            remoteRepos = await gitApi.getGitReposByUser(git.gitUser);
            
            remoteRepos.map(repo  => {
                repo.gitHub = git._id
                repo.dev_language = repo.language

                return repo
            })
            await Repository.deleteMany({gitHub : git._id})
            await Repository.create(remoteRepos)
            remoteRepo.push(remoteRepos);
        }
        await UpdateDate.UpdateDate();
        return remoteRepo
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido actualizar bd detalles de usuario de Github"
        }
    }
}

module.exports = {
    getAllRepositories,
    getRepoByParam,
    updateReposInfo,
    searchText
}