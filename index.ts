import Youtube from "./Youtube"

require("dotenv").config()
const youtube = new Youtube(process.env.GOOGLE_API_KEY);

(async () => {
    // const result = await youtube.playlists.items("https://www.youtube.com/playlist?list=PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t")
    // const result = await youtube.playlists.item("PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t", "tenpi - moonlight (chill)")
    // const result = await youtube.channels.comments("tenpi")
    // const result = await youtube.comments.thread("UgzNgGMYuY6qJl0RV7d4AaABAg")
    // const result = await youtube.comments.get("UgzNgGMYuY6qJl0RV7d4AaABAg")
    // const result = await youtube.channels.subscriptions("https://www.youtube.com/channel/UCwgEMWqaNlp0TVb5BLqO-jg/videos")
    const cookie = "YSC=CgcSjqhRGDo; VISITOR_INFO1_LIVE=oMMUhNEREHw; CONSENT=YES+US.en+20180128-05-1; PREF=f1=50000000; SID=pgd0NaaLGKJfwu4CpTcH74Ev7B3Plw91PqfG3IvGaD_XwfOa6AcdDA9dINy7zH8JNX8daA.; HSID=AoX8S2xmDH10GQpHc; SSID=AtkR9Z80c_5c1Vp5z; APISID=JbKJPazbD8O9ItTh/AZWDADuwqkCISQINk; SAPISID=Ar1yQmjm0m0eaGRu/AXLo7rw02J5p5H16p; LOGIN_INFO=AFmmF2swRgIhAOIl7J1KvFn1eGgYBlW09_wKaP9XHQXKnel3zhr2We_7AiEAxbh1YG1TAKHl9LSGNIHNVOzUlp71zk4snKfEqlpjhWA:QUQ3MjNmeTdIZ0pDVjc2QWJGeEUwX0IzdWN2ZjFEZ09USTFReDFWRnJUZHZsc3h5RHR6Qm4yU2dFNUh3ZXZZZWhUX0h1dUVsVDhOSVJoUDRYcl9ycUl3WkhVZFZkUzc0cW50QXQtMklsc1RyVWNNLWVjTW56aUZkQXlHcGNTdExhSE4yQUllZUJ5LVA3OU5MWHJyTTV5MDk3WDFjbkRHcVB0N0JQUE16a1QtTDRCR2lFSUNyZnlQQVJ5c3NhYXBKNGpDbTVzdjBEMm5WZi1ieFVoQnpkTDRVd0Nhc2RjNGFGR2hjcXRfeG9JMVN3Q19lZFBRZzZMVQ==; SIDCC=AN0-TYtV2r8vD9ONlA5dgkLShmK0u6dhjq6cQMtVjIxQt5FUsquo52OxnXiNar2d2CFVut_w3A"
    const key = "lJGPgo6rkJXi8_l2BUDvkNOJM2V8MTU3MTg5MzMwM0AxNTcxODA2OTAz"
    // await youtube.util.downloadMyVideo("mLJQ0HO5Alc", key, cookie, "./videos")
    // await youtube.util.downloadMyVideos("tenpi", key, cookie, "./videos/tenpi")
    await youtube.util.downloadMP3("mLJQ0HO5Alc", "./videos/ytdl/bad")
    // await youtube.util.downloadChannelVideos("UC8qU4aFe81jzG1attsyQ5wQ", "./videos/tenpi")
    // console.log(result.items[0])
})()
