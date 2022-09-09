


const clearChannelData = (data) => {
    const channelsInfo = {}

    channelsInfo.regionCode = data.regionCode || null
    channelsInfo.channels = data.items.map(item => {
        return {
            channelId: item.snippet.channelId,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle
        }
    }) || []
    return channelsInfo

}

const clearVideoData = (data) => {
    return data.items.map(item => {

        return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.default.url

        }
    })

}

const clearListData = (data) => {

    return data.items.map(item => {

        return {
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.default.url
        }

    })

}

module.exports = {
    clearChannelData,
    clearVideoData,
    clearListData,
}