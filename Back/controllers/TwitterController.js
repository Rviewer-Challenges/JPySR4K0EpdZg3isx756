const TwitterServices = require('../services/TwitterServices');
//BASE DE DATOS

const getTwitterById = async(request, response) => {
    try {
        const tweets = await TwitterServices.getTweetsById(request.params.twitterId)
        response
            .status(200)
            .send({
                status: "OK",
                info: "Tweets por id",
                tweets
            })
    } catch (error) {
        response
            .status( error?.code || 500)
            .send( {
                status: "FAILED",
                dat:error?.message || 'No se ha podido localizar Twitter'
            })
    }
}

//API EXTERNA
const updateTwitter = async(request, response)=>{
    try {
            await TwitterServices.updateUser();
            const tweetsText = await TwitterServices.updateTweets();
            response
                .status(200)
                .send({
                    status: 'OK',
                    info: "Twiter actualizado correctamente",
                    data:{
                        twitters: tweetsText
                    }
                })
    } catch (error) {
        response
            .status( error?.code || 500)
            .send( {
                status: "FAILED",
                dat:error?.message || 'No se ha podido actualizar los datos de Twitter'
            })
    }
}

module.exports = {
    updateTwitter,
    getTwitterById
}