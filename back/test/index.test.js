const supertest = require('supertest');
const { app, server } = require('../index');
const api = supertest(app);



// test('Preuaba test get ok',async()=>{
//     await api
//         .get('/api/v1/')
//         .expect(200)



// })
describe('Testing api routes for developers', () => {
    const route = '/api/v1/';
    afterAll(() => {
        server.close()
    })
    test('/api/v1 get , must return status code 200', async () => {
        const result = await api
            .get(route)

        expect(result.status).toBe(200)
        expect(result.body.status).toBe('ok')




    })
})