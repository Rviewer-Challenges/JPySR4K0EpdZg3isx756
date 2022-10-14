const { Schema, model } = require('mongoose');

/**
 * @openapi
 *  components:
 *    schemas:
 *      Videos:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          video_id: 
 *            type: string
 *            example: 1234548    
 *          description: 
 *            type: string
 *            example: Descripción de usuario en un vídeo de youtube
 *          thumbnails: 
 *            type: string
 *            example: http://urldelaimagen.com/jpg
 *          youtube: 
 *            type: Schema.Types.ObjectId
 *            example: 633163a8b7e04142f5a4bc61
 */


const VideoSchema = Schema({
    video_id: String,
    title: String,
    description:  String,
    thumbnails: String,
    url: String,
    youtube: {
        type: Schema.Types.ObjectId,
        ref: 'Youtube'
    }
})
VideoSchema.index({title: 'text', description: 'text'});

module.exports = model('Video',  VideoSchema)