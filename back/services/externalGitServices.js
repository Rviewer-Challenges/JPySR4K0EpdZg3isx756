const axios = require('axios');
const url = 'https://api.github.com/users'


const getGitRepos = async (user) => {
    try {
<<<<<<< HEAD
        const gitInfo = await axios.get(`${url}/${user}/repos`)
        // {
        //     headers:{
        //         'Authorization': `Bearer ${process.env.GIT_TOKEN}`
        //     }
        // })
=======
        const gitInfo = await axios.get(`${url}/${user}/repos`,{
            headers:{
                'Authorization': `Bearer ${process.env.GIT_TOKEN}`
            }
        })
>>>>>>> ce8a35992ace401e598fa034004301f77d0e2248

        return gitInfo.data.map((item) => {
            return {
                name: item.name,
                html_url: item.html_url,
                description: item.description,
                language: item.language,
            }
        })
    } catch (error) {
        throw {
            status: error?.status  || 500,
            message: error.message
        }
    }

}

const getGitUserDetails = async (user) => {
    try {
<<<<<<< HEAD
        const userInfo = await axios.get(`${url}/${user}`)
        //     headers:{
        //         'Authorization': `Bearer ${process.env.GIT_TOKEN}`
        //     }
        // });
=======
        const userInfo = await axios.get(`${url}/${user}`,{
            headers:{
                'Authorization': `Bearer ${process.env.GIT_TOKEN}`
            }
        });
>>>>>>> ce8a35992ace401e598fa034004301f77d0e2248
        if (!userInfo) {
            throw new Error('No se ha localizado usuario en Github')
        }
        
        return {
            name: userInfo.data.name,
            gitUser: userInfo.data.login,
            followers: userInfo.data.followers,
            avatar_url: userInfo.data.avatar_url,
            url: userInfo.data.url,
            html_url: userInfo.data.html_url,
            bio: userInfo.data.bio,
            public_repos: userInfo.data.public_repos
        }

    } catch (error) {
        console.log(error)
        throw {
            status: error?.status  || 500,
            message: error.message
        }
    }
}

module.exports = {
    getGitRepos,
    getGitUserDetails
}