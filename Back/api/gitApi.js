const axios = require('axios');
const url = 'https://api.github.com/users';

const getGitUserDetails = async (user) => {
    try {

        const userInfo = await axios.get(`${url}/${user}`, {
            headers: {
                'Authorization': `Bearer ${process.env.GIT_TOKEN}`
            }
        });

        if (!userInfo) {
            throw new Error('No se ha localizado usuario en Github')
        }

        return {
            gitUser: userInfo.data.login,
            followers: userInfo.data.followers,
            avatar_url: userInfo.data.avatar_url,
            url: userInfo.data.url,
            html_url: userInfo.data.html_url,
            bio: userInfo.data.bio,
            public_repos: userInfo.data.public_repos
        }

    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error.message
        }
    }
}

const getGitReposByUser = async (user) => {
    try {

        const gitInfo = await axios.get(`${url}/${user}/repos`,
            {
                headers: {
                    'Authorization': `Bearer ${process.env.GIT_TOKEN}`
                }
            })

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
            status: error?.status || 500,
            message: error.message
        }
    }

}

module.exports = { 
    getGitUserDetails,
    getGitReposByUser
}