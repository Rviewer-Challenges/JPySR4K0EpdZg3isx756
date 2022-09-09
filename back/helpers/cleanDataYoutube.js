


const clearChannelData = (data) => {
    const channelsInfo = {}

    channelsInfo.regionCode = data?.regionCode || null
    channelsInfo.channels = data?.items?.map(item => {
        return {
            channelId: item.snippet.channelId,
            description: item.snippet.description,
            channelTitle: item.snippet.channelTitle
        }
    }) || []
    return channelsInfo

}

const clearVideoData = (data) => {
    const videosInfo = data.items.map(item => {

        return {
            videoId: item.id.videoId,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.default.url

        }
    })
    return videosInfo

}

const clearListData = (data) => {

    const listsInfo = data.items.map(item => {

        return {
            id: item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnails: item.snippet.thumbnails.default.url
        }

    })

    return listsInfo;
}

module.exports = {
    clearChannelData,
    clearVideoData,
    clearListData,
}