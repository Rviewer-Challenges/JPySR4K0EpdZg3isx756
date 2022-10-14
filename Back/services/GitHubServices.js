const gitApi = require('../api/gitApi');
const Github = require('../models/GitHub');
const UpdateDate = require('./UpdateDate');

//CONSULTAS BASE DE DATOS
const getGitInfo = async() =>{
    try {
        return await Github.find();
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar bd detalles de usuario de Github en la base de datos"
        }
    }
}



//UPDATE CON API EXTERNA
const updateUserDetails = async () => {
    try {
        const gitHubs = await Github.find();
        for (git of gitHubs) {
            const details = await gitApi.getGitUserDetails(git.gitUser);
            git._doc = {
                ...git._doc,
                ...details,
            }
            await Github.findByIdAndUpdate(git._id, git)
        }
        await UpdateDate.UpdateDate();
        return gitHubs
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido actualizar bd detalles de usuario de Github"
        }
    }
}




/********************************** */
module.exports = {
    updateUserDetails,
    getGitInfo
}