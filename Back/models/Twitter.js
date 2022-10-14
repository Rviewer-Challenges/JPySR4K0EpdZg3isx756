const mongoose = require('mongoose');
const {Schema, model} = mongoose;


/**
 * @openapi
 *  components:
 *    schemas:
 *      Twitter:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          username: 
 *            type: string
 *            example: UserTwitterSinArroba    
 *          description: 
 *            type: string
 *            example: Descripción de usuario en twitter  
 *          followers: 
 *            type: number
 *            example: 3
 *          tweets: 
 *            type: Schema.Types.ObjectId
 *            example: 633163a8b7e04142f5a4bc61
 */

const TwitterSchema = Schema({
    username: {
        type: String,
        unique: true
    },
    description: String,
    followers: Number,
    tweets: [{
        text:String
    }],
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }

})

module.exports =model ('Twitter', TwitterSchema);