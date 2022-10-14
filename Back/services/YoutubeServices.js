const Youtube = require('../models/Youtube');
const YoutubeApi = require('../api/youtubeApi');
const UpdateDate = require('./UpdateDate');
const Lists = require('../models/Lists');
const Videos = require('../models/Video');
const { request } = require('express');


//CONSULTAS BASE DE DATOS

const getAllListAndVideos = async () => {
    try {
        const videos = await Videos.find();
        const lists = await Lists.find();
        return {
            videos,
            lists
        }
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los datos de los canales de Youtube"
        }
    }
}



const searchText = async (params) => {
    try {
        const result = {}
        if (params.video ) {
            const videos = await Videos.find({ $text: { $search: params.video, $caseSensitive: false } });
            if (videos.length > 0) result.videos = videos ;
        }
        if (params.list) {
            const lists = await Lists.find({ $text: { $search: params.list, $caseSensitive: false } })
            if (lists.length >0) result.lists= lists;
        }

        if (result === {}) throw new Error("No se ha localizado resultados en Youtube para la búsqueda de texto")
        return result

    } catch (error) {
        throw {
            status:  400,
            message: error?.message || "No se ha podido localizar los datos de los canales de Youtube"
        }
    }
}


const getListAndVideosById = async (developer) => {
    try {

        const youtube = await Youtube.findOne({ developer: developer });
        const videos = await Videos.find({ youtube: youtube._id });
        const lists = await Lists.find({ youtube: youtube._id });
        return { lists, videos }
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los datos de los canales de Youtube"
        }
    }
}

const updateChannelDetails = async () => {
    try {
        const youtubes = await Youtube.find();
        for (youtube of youtubes) {
            const channelInfo = await YoutubeApi.getChannelDetails(youtube.url_code);
            youtube._doc = {
                ...youtube._doc,
                ...channelInfo
            }
            await Youtube.findByIdAndUpdate(youtube._id, youtube);
        }
        await UpdateDate.UpdateDate();
        return youtubes

    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los datos de los canales de Youtube"
        }
    }
}


//CONSULTAS API EXTERNAS
const updateListDetails = async () => {
    try {
        const youtubes = await Youtube.find();
        let remoteList = [];
        for (youtube of youtubes) {
            remoteLists = await YoutubeApi.getListDetails(youtube.channelId);

            remoteLists = remoteLists.map(list => {
                list.youtube = youtube._id;
                return list;
            })
            await Lists.deleteMany({ youtube: youtube._id });
            await Lists.insertMany(remoteLists);
            remoteList.push(remoteLists)
        }
        await UpdateDate.UpdateDate();
        return remoteList
    } catch (error) {
        throw {
            status: error.request?.status || 500,
            message: error?.message || "No se ha podido localizar los datos las listas en Youtube",
            data: error.request
        }
    }
}

const updateVideoDetails = async () => {
    try {
        const youtubes = await Youtube.find();
        let remoteVideo = [];
        for (youtube of youtubes) {
            if (!youtube.channelId) throw Error("No existe channel Id")
            remoteVideos = await YoutubeApi.getVideoDetails(youtube.channelId);
            remoteVideos = remoteVideos.map(list => {
                list.youtube = youtube._id;
                return list;
            })
            await Videos.deleteMany({ youtube: youtube._id });
            await Videos.insertMany(remoteVideos);
            remoteVideo.push(remoteVideos)
        }
        await UpdateDate.UpdateDate();
        return remoteVideo
    } catch (error) {
        throw {
            status: error?.code || 500,
            message: error?.message || "No se ha podido localizar los datos las listas en Youtube"
        }
    }
}


module.exports = {
    updateChannelDetails,
    updateListDetails,
    updateVideoDetails,
    getAllListAndVideos,
    getListAndVideosById,
    searchText
}