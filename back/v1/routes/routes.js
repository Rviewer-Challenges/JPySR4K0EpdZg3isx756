const express = require('express');
const developerController = require('../../controllers/developersController');
const externalGitController = require('../../controllers/exetrnalGitController');
const externalTweetController = require('../../controllers/externalTwitterController');
const externalYoutubeController = require ('../../controllers/externalYoutubeController');


const router = express.Router();

router
    .get('/',developerController.getDevelopers)
    .get('/info-git/update/', externalGitController.updateDevelopersGit)
    .get('/info-tweeter/update',externalTweetController.updateDevelopersTweet)
    .get('/info-youtube/update', externalYoutubeController.updateDevelopersYoutube)



module.exports = router;
