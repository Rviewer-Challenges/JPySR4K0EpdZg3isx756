const axios = require('axios');

const userDetailsUrl = 'https://api.twitter.com/2/users/by/username/';
const userTweetsUrl = 'https://api.twitter.com/2/tweets/search/recent?query=from:';

const getUserData = async (username) => {
    try {
        const { data } = await axios.get(`${userDetailsUrl}${username}?user.fields=description,id,name,public_metrics,username`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.TWITTER_TOKEN
            }
        });

        return {
            username: data.data.username,
            description: data.data.description,
            followers: data.data.public_metrics.followers_count,
        }
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se han podido descargar datos de las listas de la api de Twietter"
        }

    }
}

const getTweetsText = async (username) => {
    try {
        const { data } = await axios.get(`${userTweetsUrl}${username}`, {
            headers: {
                'Authorization': 'Bearer ' + process.env.TWITTER_TOKEN
            }
        });

        return data.data.filter(item => item.text)

    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se han podido descargar datos de las listas de la api de Twietter"
        }

    }
}

module.exports = {
    getUserData,
    getTweetsText
}