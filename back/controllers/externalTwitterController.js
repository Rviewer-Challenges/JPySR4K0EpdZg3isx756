const externalTweeetServices = require('../services/externalTweetServices')
const developersServices = require('../services/developersServices');

const updateDevelopersTweet = async (request, response) => {
    try {
        const developers = await developersServices.getAllDevelopers();
        //actualización de repositorios
        for (dev of developers) {
            const twitt = await externalTweeetServices.getTweetProfile(dev.twitter.username);
            dev.twitter = {
                ...twitt
            }
            const tweetts = await externalTweeetServices.getTweets(dev.twitter.username);
            dev.twitter.tweets = tweetts;
            await developersServices.updateDeveloper(dev);

        }


        response
            .status(200)
            .send({
                data:
                {
                    developers: developers,
                }
            })
    } catch (error) {
        response
            .status(error.status || 500)
            .send({
                satus: "FAILED",
                data: error.message,
                code: error?.status || 500
            })
    }
}


module.exports = {
    updateDevelopersTweet
}