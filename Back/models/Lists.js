const {Schema, model, models} = require('mongoose');


/**
 * @openapi
 *  components:
 *    schemas:
 *      Lists:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          list_id: 
 *            type: string
 *            example: PedroPerez    
 *          title: 
 *            type: string
 *            example: Lista de reproduccción  
 *          
 *          thumbnails: 
 *            type: string
 *            example: http://urldeimagen.com/11.jpg  
 *          youtube: 
 *            type: Schema.Types.ObjectId
 *            example: 633163a8b7e04142f5a4bc61
 */


const ListSchema = Schema({
    list_id: String,
    title: String,
    description: String,
    thumbnails: String,
    url: String,
    youtube: {
        type: Schema.Types.ObjectId,
        ref: 'Youtube'
    }
})

ListSchema.index({title: 'text', description: 'text'});


module.exports = model('List',ListSchema);