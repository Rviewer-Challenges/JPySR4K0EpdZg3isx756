const express = require('express');
const DeveloperControllers = require('../../controllers/DeveloperControlles');
const GithubControllers = require('../../controllers/GitHubController');
const RepositoryController = require ('../../controllers/RepositoryController');
const YoutubeController = require('../../controllers/YoutubeController');
const TwitterController = require('../../controllers/TwitterController')

const createDb = require('../../controllers/WriteDb');
const { response } = require('express');

const router = express.Router();

//RUTAS PARA PREPARAR LA BASE DE DATOS:

//Crea la base de datos y cargar la info de api externa

/**
 * @openapi
 * /api/v1/JSON/:
 *   
 *   get:
 *     tags:
 *       - Crear base de datos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Base de datos creada ok"              
 */
router
    .get('/JSON', createDb.writeDb)

/**
 * @openapi
 * /api/v1/git-hub/update:
 *   
 *   get:
 *     tags:
 *       - Actualizar base de datos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Base de datos actualizada ok"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/GitHub"
 */

/**
 * @openapi
 * /api/v1/youtube/update:
 *   
 *   get:
 *     tags:
 *       - Actualizar base de datos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Base de datos actualizada ok"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Youtube"
 */

/**
 * @openapi
 * /api/v1/youtube/twitter:
 *   
 *   get:
 *     tags:
 *       - Actualizar base de datos
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Base de datos actualizada ok"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Twitter"
 */

router
    .get('/git-hub/update', GithubControllers.updateGitInfo)
    .get('/youtube/update', YoutubeController.updateYoutubeInfo)
    .get('/twitter/update', TwitterController.updateTwitter)

    //CONSULTAS DEVELOPERS
/**
 * @openapi
 * /api/v1/developers:
 *   
 *   get:
 *     tags:
 *       - Consultas Developers
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Datos obtenidos de base de datos"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Developers"
 */

/**
 * @openapi
 * /api/v1/developers/info:
 *   
 *   get:
 *     tags:
 *       - Consultas Developers
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Datos obtenidos de base de datos"
 *                 data:
 *                   type: array
 *                   items:
 *                      type: object
 *                      example: 
 *                          {
 *                              _id: 633163a8b7e04142f5a4bc61",
 *                              name: Brais Moure,
 *                              update: 2022-09-26T08:32:40.374Z,
 *                              gitHub: {
 *                                  _id: 633163a8b7e04142f5a4bc62,
 *                                  gitUser: MoureDev
 *                              },
 *                              twitter: {
 *                                  _id: 633163a8b7e04142f5a4bc63,
 *                                  username: mouredev
 *                              },
 *                              youtube: {
 *                                  _id: 633163a8b7e04142f5a4bc64,
 *                                  url_code: MoureDevApps
 *                              }
 *                           }
 */

    router
        .get('/developers', DeveloperControllers.getDevelopers)
        .get('/developers/info', DeveloperControllers.getDevelopersBasicInfo)

    //CONSULTAS GITHUB
/**
 * @openapi
 * /api/v1/developers/git-hub:
 *   
 *   get:
 *     tags:
 *       - Consultas datos GitHub
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Github"
 */

/**
 * @openapi
 * /api/v1/developers/git-hub/repositories:
 *   
 *   get:
 *     tags:
 *       - Consultas datos GitHub
 *     summary: Muestra repositorios 
 *     description: Muestra todos los repositorios almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Repository"
 */

/**
 * @openapi
 * /api/v1/developers/git-hub/repositories/{gitHubId}:
 *   
 *   get:
 *     tags:
 *       - Consultas datos GitHub
 *     summary: Muestra repositorios pir GitHub ID
 *     description: Muestra los repositorios, si se aporta  una id de GitHub muestra solo los de esa id
 *     parameters:
 *       - in: path
 *         name: gitHubId
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Repository"
 */

/**
 * @openapi
 * /api/v1/developers/git-hub/repositories/language/{language}':
 *   
 *   get:
 *     tags:
 *       - Consultas datos GitHub
 *     summary: Muestra repositorios de un determinado lenguage
 *     description: Muestra los repositorios, de un determinado lenguage
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Repository"
 */

/**
 * @openapi
 * /api/v1/developers/search/git-hub/repositories/:
 *   
 *   get:
 *     tags:
 *       - Consultas datos GitHub
 *     summary: Busqueda respositorios por texto
 *     description: Busca un texto en la descripción deun respositorio.
 *     parameters:
 *       - in: query
 *         name: repo
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: array
 *                   items:
 *                      $ref: "#/components/schemas/Repository"
 */

    router
        .get('/developers/git-hub', GithubControllers.getGitInfo )
        .get('/developers/git-hub/repositories', RepositoryController.getAllRepos)
        .get('/developers/git-hub/repositories/:gitHubId', RepositoryController.getReposByDeveloper)
        .get('/developers/git-hub/repositories/language/:language', RepositoryController.getReposByLanguage)
        .get('/developers/search/git-hub/repositories/', RepositoryController.searchText)

    //CONSULTAS YOUTUBE
/**
 * @openapi
 * /api/v1/developers/youtube/list-videos:
 *   
 *   get:
 *     tags:
 *       - Consulta datos Youtube
 *     summary: Muestra todos los vídeos  y listas de yotube 
 *     description: Muestra todos los vídeos  y listas de yotube almacenados en la base de datos.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: object
 *                   properties:
 *                      videos: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Videos"
 *                      list: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Lists"
 */

/**
 * @openapi
 * /api/v1/developers/youtube/list-videos/{developerId}:
 *   
 *   get:
 *     tags:
 *       - Consulta datos Youtube
 *     summary: Muestra listas y vídeos de youtube por id de Developer
 *     description: Muestra todos los listas y vídeos de youtube almacenados en la base de datos por id de Developer.
 *     parameters:
 *       - in: path
 *         name: developerId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: object
 *                   properties:
 *                      videos: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Videos"
 *                      list: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Lists"
 */

/**
 * @openapi
 * /api/v1/developers/search/youtube/:
 *   
 *   get:
 *     tags:
 *       - Consulta datos Youtube
 *     summary: Busqueda videos y listas por texto 
 *     description: Busca un texto en la descripción videos y listas de Youtube. Admite búsquedas en los dos parametros o en uno de los dos
 *     parameters:
 *       - in: query
 *         name: video
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: list
 *         required: false
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: object
 *                   properties:
 *                      videos: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Videos"
 *                      list: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Lists"
 */
    router
        .get('/developers/youtube/list-videos', YoutubeController.getListAndVideos)
        .get('/developers/youtube/list-videos/:developerId', YoutubeController.getListAndVideosByDeveloper)
        .get('/developers/search/youtube/', YoutubeController.searchText)
    
    //CONSULTAS TWITTER
/**
 * @openapi
 * /api/v1/developers/twitter/{twitterId}:
 *   
 *   get:
 *     tags:
 *       - Consulta datos Twitter
 *     summary: Muestra todos datos de twitter y los tweets de un usuarios por su twitter id      
 *     description: Muestra todos datos de twitter y los tweets de un usuarios
 *     parameters:
 *       - in: path
 *         name: twitterId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 info: 
 *                   type: string
 *                   example: "Descripción de la info"
 *                 data:
 *                   type: object
 *                   properties:
 *                      videos: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Videos"
 *                      list: 
 *                          type: array
 *                          items: 
 *                              $ref: "#/components/schemas/Lists"
 */

    router
        .get('/developers/twitter/:twitterId', TwitterController.getTwitterById)


module.exports = router;
 