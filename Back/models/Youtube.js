const { Schema, model  }  = require('mongoose');


/**
 * @openapi
 *  components:
 *    schemas:
 *      Youtube:
 *        type: object
 *        properties:
 *          id: 
 *            type: Schema.Types.ObjectId
 *            example: 61dbae02-c147-4e28-863c-db7bd402b2d6
 *          url_code:
 *            type: string
 *            example: url_code_yutube
 *          channelId: 
 *            type: string
 *            example: 1234548
 *          title:
 *            type: string
 *            example: titulo del canal de youtube
 *          description: 
 *            type: string
 *            example: Descripción de usuario en un vídeo del canal de youtube
 *          thumbnails: 
 *            type: string
 *            example: http://urldelaimagen.com/jpg
 *          developer: 
 *            type: Schema.Types.ObjectId
 *            example: 633163a8b7e04142f5a4bc61
 */
const YoutubeSchema = Schema({
    url_code: String,
    channelId: String,
    title: String,
    description: String,
    thumbnails: String,
    developer: {
        type: Schema.Types.ObjectId,
        ref: 'Developer'
    }
})

YoutubeSchema.index({ title: 'text', description: 'text'});


module.exports = model('Youtube', YoutubeSchema)