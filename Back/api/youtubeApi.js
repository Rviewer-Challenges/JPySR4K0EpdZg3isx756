const axios = require('axios');
const searchUrl = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=channel&q=';
const urlLists = 'https://youtube.googleapis.com/youtube/v3/playlists?part=id%2Csnippet&channelId=';
const urlVideos = 'https://www.googleapis.com/youtube/v3/search?key='
const reproductionUrlVideos ="https://www.youtube.com/watch?v="
const reproductionUrlLists="https://www.youtube.com/playlist?list="
const maxVideos = 5

const getChannelDetails = async (url_code) => {
    try {
        const { data } = await axios.get(`${searchUrl}${url_code}&key=${process.env.YOUTUBE_TOKEN}`);
        if (data.pageInfo.totalResults == 0) throw Error("No se han localizado datos en la consulta a Youtube para los detalles del canal");
        return {
            url_code: url_code,
            channelId: data.items[0].snippet.channelId,
            title: data.items[0].snippet.title,
            description: data.items[0].snippet.description,
            thumbnails: data.items[0].snippet.thumbnails.medium.url
        }

    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se han podido descargar datos del canal de la api de Youtube"
        }
    }
}

const getListDetails = async (channelId) => {
    try {

        const { data } = await axios.get(`${urlLists}${channelId}&key=${process.env.YOUTUBE_TOKEN}`);

        if (data.pageInfo.totalResults == 0) throw Error("No se han localizado datos en la consulta a Youtube para las listas");

        const listsInfo = data.items.map(item => {
            return {
                list_id: item.id,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails: item.snippet.thumbnails.medium.url,
                url: `${reproductionUrlLists}${item.id}`
            }
        })

        return listsInfo
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se han podido descargar datos de las listas de la api de Youtube"
        }
    }
}

const getVideoDetails = async (channelId) => {
    try {
        const { data } = await axios.get(`${urlVideos}${process.env.YOUTUBE_TOKEN}&channelId=${channelId}&part=id,snippet&order=date&maxResults=${maxVideos}`)
        if (data.pageInfo.totalResults == 0) throw Error("No se han localizado datos en la consulta a Youtube para vídeos");
        const videosInfo = data.items.map(item=>{
            return {
                video_id: item.id.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnails: item.snippet.thumbnails.medium.url,
                url: `${reproductionUrlVideos}${item.id.videoId}`
            }
        })
        return videosInfo
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se han podido descargar datos de las videos de la api de Youtube"
        }
    }
}


module.exports = {
    getChannelDetails,
    getListDetails,
    getVideoDetails
}