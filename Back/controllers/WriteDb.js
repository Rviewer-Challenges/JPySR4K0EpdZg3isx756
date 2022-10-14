
const mongoose = require('mongoose');
const Developer = require('../models/Developer');
const GitHub = require('../models/GitHub');
const Youtube = require('../models/Youtube');
const Twitter = require('../models/Twitter');
const dataFile = require('../db/json/developers.json');


const writeDb = async (request, response) => {
    try {
        for (data of dataFile) {
            const { developerJSON, gitHubJSON, youtubeJSON, twitterJSON } = data;

            const developer = new Developer({
                ...developerJSON
            });
            await developer.save();

            const gitHub = new GitHub({
                ...gitHubJSON,
                developer: developer._id
            });
            await gitHub.save();

            developer.gitHub = gitHub._id
            await developer.save();


            const twitter = new Twitter({
                ...twitterJSON,
                developer: developer._id
            })
            const r = await twitter.save()

    

            const youtube = new Youtube({
                ...youtubeJSON,
                developer: developer._id
            })
            
            const t = await youtube.save();

            developer.twitter = twitter._id;
            developer.youtube = youtube._id;
            developer.gitHub = gitHub._id;

            await developer.save();

        }
        response
            .status(200)
            .send({
                status: "OK",
                info: "Colecciones creadas correctamente"
            })

    } catch (error) {
        response
            .status(500)
            .send({
                status: "FAILED",
                data: {
                    status: 500,
                    info: error?.message || "No se ha podido crear coleccioens en BD",

                }
            })
    }
}

module.exports = {
    writeDb
}