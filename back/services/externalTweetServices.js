const axios = require('axios');

const urlByUsername = 'https://api.twitter.com/2/users/by/username';
const urlTweetsSearch = 'https://api.twitter.com/2/tweets/search/recent?query=from:';
const getTweetProfile = async (username) => {
    try {
        const { data } = await axios.get(`${urlByUsername}/${username}?user.fields=description,id,name,public_metrics,username`, {
            headers: {
                'Authorization': `Bearer ${process.env.TWITT_TOKEN}`
            }
        });
        return data.data
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || 'No se ha podido actualizar datos de usuario de twitter'
        }
    }

}


const getTweets = async (username) => {
    try {
        const {data}  = await axios.get(`${urlTweetsSearch}${username}`, {
            headers: {
                'Authorization': `Bearer ${process.env.TWITT_TOKEN}`
            }
        })
        return data.data;
    } catch (error) {
        throw {
            status: error?.status || 500,
            message: error?.message || 'No se ha podido actualizar datos de usuario de twitter'
        }
    }
}

module.exports = {
    getTweetProfile,
    getTweets
}