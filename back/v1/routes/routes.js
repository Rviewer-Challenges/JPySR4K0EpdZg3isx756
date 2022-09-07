const express = require('express');
const Developer = require('../../models/Developer');
const developerController = require('../../controllers/developersController');
const externalApiGit = require('../../controllers/exetrnalApiController')


const router = express.Router();

router
    // .get('/',developerController.getDevelopers)    
.get('/', async (request, response) => {
        const developers = await Developer.find();
        const developers1 = new Developer({
                name: "Brais Moure",
                gitHub:{
                    gitUser:"mouredev",
                    avatar_url: "http://avatargithub",
                    html_url: "http://urlperfil",
                    bio: "Biografía del programador",
                    public_repos:100,
                    followers: 500,
                    repositories: [{
                        name: "nombre repositorio prueba",
                        html_url:"http://google.es",
                        description: "Descripción de prueba",
                        language: "ES"
                    }]
                }

        })
        const prueba = await developers1.save()
        
        response
            .status(200)
            .send({
                status: "ok",
                info: 'Ruta principal ok',
                developers,
            })

    })
    //URL PARA ACUTALIZACIÓN DE DATOS DE APIS EXTERNAS
    .get('/info/update', externalApiGit.updateDevelopers)

module.exports = router;
