import Youtube from "./youtube"

require("dotenv").config()
const youtube = new Youtube(process.env.GOOGLE_API_KEY);

(async () => {
    // const result = await youtube.playlists.items("https://www.youtube.com/playlist?list=PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t")
    // const result = await youtube.playlists.item("PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t", "tenpi - moonlight (chill)")
    // const result = await youtube.channels.comments("tenpi")
    // const result = await youtube.comments.thread("UgzNgGMYuY6qJl0RV7d4AaABAg")
    // const result = await youtube.comments.get("UgzNgGMYuY6qJl0RV7d4AaABAg")
    // const result = await youtube.channels.subscriptions("https://www.youtube.com/channel/UCwgEMWqaNlp0TVb5BLqO-jg/videos")
    // await youtube.util.downloadMyVideo("mLJQ0HO5Alc", key, cookie, "./videos")
    // await youtube.util.downloadMyVideos("tenpi", key, cookie, "./videos/tenpi")
    await youtube.util.downloadMP3("https://www.youtube.com/watch?v=LysVlPg2fd8", "./videos/ytdl/bad")
    // await youtube.util.downloadChannelVideos("UC8qU4aFe81jzG1attsyQ5wQ", "./videos/tenpi")
    // console.log(result.items[0])
    // const c = await youtube.videos.comments("https://www.youtube.com/watch?v=cZDsFjEmlDg")
    // console.log(c)
})()
