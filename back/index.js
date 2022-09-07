const express = require('express');
const morgan = require('morgan');

const app = express();

require ('dotenv').config();
const port = process.env.WEB_PORT;
const host = process.env.WEB_HOST;

const routes = require('./v1/routes/routes');

app.use(express.json());
app.use(morgan('combined'));


//Routes
app.use('/api/v1/', routes);

//pruebas
const {dbConnection} =require('./db/config')
dbConnection()
const server = app.listen(port,host,()=>{

    console.log(`Server runing at http://${host}:${port} \n Enviroment: ${process.env.NODE_ENV}`);
    
})

module.exports = { app, server }