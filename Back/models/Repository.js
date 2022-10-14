const mongoose = require('mongoose');
const { Schema, model } = mongoose;


/**
 * @openapi
 *  components:
 *    schemas:
 *      Repository:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          name: 
 *            type: string
 *            example: NomobredeRepositorio    
 *          description: 
 *            type: string
 *            example: Descripción de respositorio en github  
 *          htmlurl: 
 *            type: string
 *            example: http://urldeimagen.com/11.jpg  
 *          dev_language: 
 *            type: string
 *            example: es  
 *          gitHub: 
 *            type: Schema.Types.ObjectId
 *            example: 633163a8b7e04142f5a4bc61
 */
const RespositorySchema = Schema({

    name: String,
    html_url: String,
    description: String,
    dev_language: String,
    gitHub: {
        type: Schema.Types.ObjectId,
        ref: 'GitHub'
    }


})

RespositorySchema.index({description: 'text'});


module.exports = model('Repository', RespositorySchema);
