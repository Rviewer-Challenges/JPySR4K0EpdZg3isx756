const axios = require('axios');
const  cleanDataYoutube = require('../helpers/cleanDataYoutube')
const urlSearchById = 'https://www.googleapis.com/youtube/v3/search?part=id,snippet&type=channel&q=';
const urlSearchVideos = 'https://www.googleapis.com/youtube/v3/search?key='
const urlSearchList = 'https://youtube.googleapis.com/youtube/v3/playlists?part=id%2Csnippet&channelId='

const getChannelInfo = async (url_code) => {

    try {
        const { data } = await axios.get(`${urlSearchById}${url_code}&key=${process.env.YOUTUBE_TOKEN}`);
        if( data.pageInfo.totalResults ===0){
            throw new Error ('No se han encontrado canales')
        }
        return cleanDataYoutube.clearChannelData(data)
         
    } catch (error) {
        throw{
            status: error?.status || 400,
            message: error?.message || 'No se ha podido actualizar datos de usuario de Youtube'
        }
    }


}

const getiVideosInfo =async(channelId)=>{
    try {
        const { data } = await axios.get(`${urlSearchVideos}${process.env.YOUTUBE_TOKEN}&channelId=${channelId}&part=id,snippet&order=date&maxResults=5`);
        return cleanDataYoutube.clearVideoData(data)
        
    } catch (error) {
       
        throw {
            status: error?.status || error?.code || 400,
            message: error?.message || 'No se ha podido actualizar datos de usuario de Youtube'
        }
    }
}
const getListInfo = async(channelId)=>{
    try {
        const { data } = await axios.get(`${urlSearchList}${channelId}&key=${process.env.YOUTUBE_TOKEN}`);
        return  cleanDataYoutube.clearListData(data);
        
        
    } catch (error) {

        throw {
            status: error?.status || 400,
            message: error?.message || 'No se ha podido actualizar datos de usuario de Youtube'
        }
    }
}

module.exports = {
    getChannelInfo,
    getiVideosInfo,
    getListInfo
}