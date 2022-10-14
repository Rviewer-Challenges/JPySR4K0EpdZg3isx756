const { expect } = require('chai');



const makeGetOneTest =(result ={}, api, apiUrl)=>{
    
    test(result.tipoTest, async () => {
        
        const url = result.params === undefined
            ? `${apiUrl}${result.url}`
            : `${apiUrl}${result.url}/${result.params}`
            
            
        await api
            .get(url)
            .expect(200)
            .expect('Content-Type', /json/)

        const response = await api.get(`${apiUrl}${result.url}`);
        expect(response.status).to.equal(200)
        expect(response.body.status).to.equal('OK')
        expect(response.body.info).to.contains(result.info)

    })
}


const makeGetMultiTest = (results = [], api, apiUrl) => {
    
    results.forEach(result => {
        makeGetOneTest(result, api, apiUrl);
        
    })
}


module.exports = {makeGetOneTest, makeGetMultiTest}