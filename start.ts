import Youtube from "./youtube"

require("dotenv").config()
const youtube = new Youtube();

(async () => {
    const c = await youtube.util.downloadThumbnail("https://www.youtube.com/watch?v=OJf04b6884E", "./videos")
    console.log(c)
})()
