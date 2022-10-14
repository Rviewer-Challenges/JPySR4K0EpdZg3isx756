const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * @openapi
 *  components:
 *    schemas:
 *      GitHub:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          gitUser: 
 *            type: string
 *            example: PedroPerez    
 *          html_url: 
 *            type: string
 *            example: PedroPerez  
 *          bio: 
 *            type: string
 *            example: PedroPerez  
 *          public_repos: 
 *            type: numbere
 *            example: PedroPerez  
 *          followers: 
 *            type: number
 *            example: PedroPerez
 *          developes: 
 *            type: Schema.Types.ObjectId
 *            example: 633163a8b7e04142f5a4bc61
 */

const gitHubSchema = Schema({
    gitUser: String,
    avatar_url: String,
    html_url: String,
    bio: String,
    public_repos: Number,
    followers: Number,
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }

})

module.exports = model('GitHub',gitHubSchema);
