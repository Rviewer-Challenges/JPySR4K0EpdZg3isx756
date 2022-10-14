const mongoose = require('mongoose');
const { Schema, model } = mongoose;

/**
 * @openapi
 *  components:
 *    schemas:
 *      Developers:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          name: 
 *            type: string
 *            example: Pedro Pérez  
 *          update:
 *            type: date
 *            example: 2022-09-26T08:32:40.374+00:00
 *          gitHub:
 *            type: ObjectId,
 *            example: 633163a8b7e04142f5a4bc61
 *          twitter:
 *               type: Schema.Types.ObjectId
 *               example: 633163a8b7e04142f5a4bc61
 *          youtube:
 *              type: Schema.Types.ObjectId,
 *              example: 633163a8b7e04142f5a4bc61
 */
const developerSchema = Schema({
    name: {
        type: String,
        unique: true,
        index: true
    },
    update: {
        type: Date,
        default: Date.now
    },
    gitHub:{
        type: Schema.Types.ObjectId,
        ref: 'GitHub'
    },twitter:{
        type: Schema.Types.ObjectId,
        ref: 'Twitter'
    },youtube:{
        type: Schema.Types.ObjectId,
        ref: 'Youtube'
    }
})




module.exports = model('Developer', developerSchema);