const { expect } = require('chai');
const mongoose = require('mongoose');
const supertest = require('supertest');
const { dbConnection } = require('../db/config');
const { app, server } = require('../index');
const api = supertest(app);
const apiUrl = '/api/v1';
const { makeGetMultiTest, makeGetOneTest } = require('./helpers/testingGets');
const getParams = require('./helpers/getParamsFromBD');
const GitHub = require('../models/GitHub');


beforeAll(async () => {
    await dbConnection();
})

//PRUEBAS CREACIÓN BASE DE DATOS E IMPORTACIÓN
//Estos test sólo se deben ejecutar la primera vez ANTES DE CREAR LA BASE DE DATOS

// describe('Crea base de datos ok', () => {
//     test('Creación base de datos devuelve un JSON status OK', async () => {
//         await api
//             .get(`${apiUrl}/JSON`)
//             .expect(200)
//             .expect('Content-Type', /json/)

//     })
// })


//TESTS CON LA BASE DED DATOS YA CREADA
//VERIFIAMOS QUE DA EL EROR CORRECTO SI LA BASE DE DATOS YA ESTA CREADA
describe('Devuelve un error si la base de datos ya esta creada', () => {
    test('Creación base de datos devuelve un JSON status FAILED', async () => {
        await api
            .get(`${apiUrl}/JSON`)
            .expect(500)
            .expect('Content-Type', /json/)

        const response = await api.get(`${apiUrl}/JSON`);
        expect(response.body.status).to.equal('FAILED')
        expect(response.body.data.status).to.equal(500)
        expect(response.body.data.info).to.contains('duplicate')

    })
})

//IMPORTACIÓN DE DATOS DE API EXTERNA
describe("Revisión de la importación de datos de api externa", () => {
    const externalApiResults = require('./helpers/externalApirResults')
    makeGetMultiTest(externalApiResults, api, apiUrl)
 })

describe("GETS de developers",()=>{
    const developersResults = require('./helpers/getDevelopersResults');
    makeGetMultiTest(developersResults, api, apiUrl)
})

describe("GETS de gitHub con y sin repositorios", () => {

    describe('consultas sin parametros', () => {
        const gitHubResults = require('./helpers/getGitHubResults');
        makeGetMultiTest(gitHubResults, api, apiUrl);
    })
    describe('consultas con parametros', () => {

        const gitUrl = `${apiUrl}/developers/git-hub/repositories/`
        test('Repositorios por id de GitHub devuelve status 200 y JSON ', async () => {
            const gitId = await GitHub.findOne();
            await api
                .get(`${apiUrl}/developers/git-hub/repositories/${gitId._id}`)
                .expect(200)
                .expect('Content-Type', /json/)

            const response = await api.get(`${apiUrl}/developers/git-hub/repositories/${gitId._id}`);
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal('OK')
            expect(response.body.info).to.contains('Repos por developer')
        });
        test('Repositorios por lenguaje devuelve status 200 y JSON', async () => {
            const testUrl = `${apiUrl}/developers/git-hub/repositories/language/javascript`
            await api
                .get(testUrl)
                .expect(200)
                .expect('Content-Type', /json/)

            const response = await api.get(testUrl);
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal('OK')
            expect(response.body.info).to.contains('Repositorios por lenguage')
        });
        test('Búsqueda de texto en repositorio devuelve status 200 y JSON', async () => {
            const searchParam = 'javascript'
            const testUrl = `${apiUrl}/developers/search/git-hub/repositories/?repo=${searchParam}`
            await api
                .get(testUrl)
                .expect(200)
                .expect('Content-Type', /json/)

            const response = await api.get(testUrl);
            expect(response.status).to.equal(200)
            expect(response.body.status).to.equal('OK')
            expect(response.body.info).to.contains('Busqueda en git por texto')
        });
    })
})

describe ('Endpoinst youtube listas y vídeos',()=>{
    test('Listado de todos los vídeos y listas en BD devuelve status 200 y JSON', async () => {
        const testUrl = `${apiUrl}/developers/youtube/list-videos`
        await api
            .get(testUrl)
            .expect(200)
            .expect('Content-Type', /json/)

        const response = await api.get(testUrl);
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('OK')
        expect(response.body.info).to.contains("Todos los videeos y listas almacenados")
    });
    test('Búsqueda de listas y videos por id de developerrepositorio devuelve status 200 y JSON', async () => {
        const developer= await getParams.getDeveloperId()
        const testUrl = `${apiUrl}/developers/youtube/list-videos/${developer._id}`
        await api
            .get(testUrl)
            .expect(200)
            .expect('Content-Type', /json/)

        const response = await api.get(testUrl);
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('OK')
        expect(response.body.info).to.contains("Listas y vídeos por id de developer")
    });
    test('Búsqueda de texto en youtube devuelve status 200 y JSON', async () => {
        const searchParam = 'javascript'
        const testUrl = `${apiUrl}/developers/search/youtube/?video=${searchParam}`
        await api
            .get(testUrl)
            .expect(200)
            .expect('Content-Type', /json/)

        const response = await api.get(testUrl);
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('OK')
        expect(response.body.info).to.contains('Búsqueda de vídeos por texto')
    });
})

describe('Twitters por id',()=>{
    test('Búsqueda de tweets por id',async()=>{
        const twitter  = await getParams.getTwittertId()
        const testUrl = `${apiUrl}/developers/twitter/${twitter._id}`
        await api
            .get(testUrl)
            .expect(200)
            .expect('Content-Type', /json/)

        const response = await api.get(testUrl);
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('OK')
        expect(response.body.info).to.contains('Tweets por id')
    })
})



afterAll(() => {
    server.close()
    mongoose.connection.close()
})