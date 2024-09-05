import Youtube from "./youtube"

require("dotenv").config()
const youtube = new Youtube();

(async () => {
    const c = await youtube.util.downloadMP3("https://www.youtube.com/watch?v=wzKiyCboShU", "../videos")
    console.log(c)
})()