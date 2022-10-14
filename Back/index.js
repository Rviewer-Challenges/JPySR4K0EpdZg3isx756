const express = require('express');
const morgan = require('morgan');
const { swaggerDocs } = require('./v1/swagger')

const app = express();
const routes = require('./v1/routes/routes');

const cors = require('cors');
const { response } = require('express');
require('dotenv').config();

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.static('public'));

//Routes
app.use('/api/v1/', routes);

const port = process.env.PORT;

//Routes en deploy
app.get(['/youtube*', '/developers*','/github*'],(req,res)=>{
    res.sendFile(__dirname + '/public/index.html')
})

if (process.env.NODE_ENV != 'test') {

    const { dbConnection } = require('./db/config')
    dbConnection();
}
const server = app.listen(port, () => {
    console.log(`Server runing at PORT  ${port} \n Enviroment: ${process.env.NODE_ENV}`);
    swaggerDocs(app, port);
})

module.exports = { app, server }