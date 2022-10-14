const GitHub = require('../../models/GitHub');
const Developer = require('../../models/Developer');
const Twitter = require('../../models/Twitter');
const getGitHubId = async()=>{
    try {
        const GitHubId = await GitHub.findOne();
        return GitHubId._id
    } catch (error) {
        throw new Error(error)
    }
}

const getDeveloperId = async()=>{
    try {
        const DeveloperId = await Developer.findOne();
        return DeveloperId._id
    } catch (error) {
        throw new Error(error)
    }
}

const getTwittertId  = async() =>{
    try {
        const TwitterId = await Twitter.findOne();
        return TwitterId._id
    } catch (error) {
        throw new Error(error)
    }
}

module.exports = {
    getGitHubId,
    getDeveloperId,
    getTwittertId
}