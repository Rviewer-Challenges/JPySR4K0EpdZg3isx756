const developersServices = require('../services/developersServices');
const externalYoutubeServices = require('../services/externalYoutubeService');

const updateDevelopersYoutube = async (request, response, next) => {
    try {
        const developers = await developersServices.getAllDevelopers();
        //Acutalización repositorios y datos usuario de git

        const lists = await externalYoutubeServices.getListInfo('UCxPD7bsocoAMq8Dj18kmGyQ');

        for (dev of developers) {
            const channel = await externalYoutubeServices.getChannelInfo(dev.youtube.url_code);
            dev.youtube = {
                ...channel
            }

            // OBTENEMOS ID DE CANAL PRINCIPAL dev.youtube.channels[0].channelId
            const videos = await externalYoutubeServices.getiVideosInfo(dev.youtube.channels[0].channelId);
            dev.youtube.videos = [...videos]
            const lists = await externalYoutubeServices.getListInfo(dev.youtube.channels[0].channelId);
            dev.youtube.lists = [...lists];
            await developersServices.updateDeveloper(dev);
        }

        response
            .status(200)
            .send({
                data:
                {
                    youtube: developers,
                }
            })
    } catch (error) {
        
        response
            .status(error?.status || error?.code || 500)
            .send({
                satus: "FAILED",
                data: error.message,
                code: error?.status || 500
            })
    }
}

module.exports = {
    updateDevelopersYoutube
}
