import Youtube from "./Youtube"

require("dotenv").config()
const youtube = new Youtube(process.env.GOOGLE_API_KEY);

(async () => {
    // const result = await youtube.playlists.items("https://www.youtube.com/playlist?list=PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t")
    // const result = await youtube.playlists.item("PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t", "tenpi - moonlight (chill)")
    const result = await youtube.playlists.search({q: "tenpi", maxResults: 10})
    console.log(result)
    console.log(result.items[0])
})()
