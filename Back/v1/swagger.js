const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const path = require('path')

//Metadata info about API
const models = path.resolve('../models/Developer.js')

const options = {
    definition: {
        openapi: "3.0.0",
        info: { title: "RRSS Developers api", version: '1.0.0' }
    },
    servers: ['http://localhost:4000'],
     apis: [`${__dirname}/routes/routes.js`, `./models/*.js`]

}

//Docs JSON format

const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs

const swaggerDocs = (app, port) => {
    // Route-Handler to visit our docs
    app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    // Make our docs in JSON format available
    app.get("/api/v1/docs.json", (req, res) => {
      res.setHeader("Content-Type", "application/json");
      res.send(swaggerSpec);
    });
    console.log(
      `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
    );
  };
module.exports = {
    swaggerDocs
}