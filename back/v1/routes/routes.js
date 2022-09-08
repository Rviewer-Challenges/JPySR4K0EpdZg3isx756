const express = require('express');
const Developer = require('../../models/Developer');
const developerController = require('../../controllers/developersController');
const externalGitController = require('../../controllers/exetrnalGitController')
const externalTweetController = require('../../controllers/externalTwitterController')


const router = express.Router();

router
    .get('/',developerController.getDevelopers)
    .get('/info-git/update/', externalGitController.updateDevelopersGit)
    .get('/info-tweeter/update',externalTweetController.updateDevelopersTweet)

// .get('/', async (request, response) => {
//         const developers = await Developer.find();
//         const developers1 = new Developer({
//                 name: "Brais Moure",
//                 gitHub:{
//                     gitUser:"mouredev",
//                     avatar_url: "http://avatargithub",
//                     html_url: "http://urlperfil",
//                     bio: "Biografía del programador",
//                     public_repos:100,
//                     followers: 500,
//                     repositories: [{
//                         name: "nombre repositorio prueba",
//                         html_url:"http://google.es",
//                         description: "Descripción de prueba",
//                         language: "ES"
//                     }]
//                 }

//         })
//         const prueba = await developers1.save()
        
//         response
//             .status(200)
//             .send({
//                 status: "ok",
//                 info: 'Ruta principal ok',
//                 developers,
//             })

//     })
    //URL PARA ACUTALIZACIÓN DE DATOS DE APIS EXTERNAS

module.exports = router;
