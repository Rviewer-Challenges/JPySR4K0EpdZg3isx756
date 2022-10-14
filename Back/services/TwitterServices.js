const Twitter = require('../models/Twitter');
const twitterApi = require('../api/twitterApi');

//CONSULTA BASE DE DATOS

const getTweetsById = async (twitterId) =>{
    try {
        const tweets  = await Twitter.findById(twitterId);
        return tweets
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido actualizar bd detalles de usuario de Twitter"
        }
    }
}

//ACTUALIZACIÓIN API EXTERNA
const updateUser = async()=>{
    try {
        const twitters = await Twitter.find();
        const finalTweetInfo = []
        for (tweet of twitters){
            const apiData = await twitterApi.getUserData(tweet.username)
            tweet ={
                ...tweet._doc,
                ...apiData
            }
            await Twitter.findByIdAndUpdate(tweet._id, tweet);
            finalTweetInfo.push(tweet)
        }
        return finalTweetInfo
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido actualizar bd detalles de usuario de Twitter"
        }
    }
}

const updateTweets =async()=>{
    try {
        const twitters = await Twitter.find();
    for (twitter of twitters){
        twitter.tweets  = await twitterApi.getTweetsText(twitter.username);
        twitter.save()
    }
    return twitters
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido actualizar los distintos twitters"
        }
    }
    
}

module.exports = {
    updateUser,
    updateTweets,
    getTweetsById
}