import axios from "axios"
import * as fs from "fs"
import * as querystring from "querystring"
import api from "../API"
import {Channels, Playlists} from "./index"
const downloadURL = "https://www.youtube.com/download_my_video"

export class Util {
    private readonly playlists = new Playlists(this.api)
    private readonly channels = new Channels(this.api)
    constructor(private readonly api: api) {}

    public resolveID = async (resolvable: string, type: string) => {
        resolvable = resolvable.trim()
        let id: string
        if (resolvable.includes("youtube.com") || resolvable.includes("youtu.be")) {
            if (resolvable.includes("channel")) {
                id = String(resolvable.match(/(?<=channel\/)(.*?)(?=(?:\?|\/|$))/)[0])
            } else if (resolvable.includes("c/")) {
                const username = String(resolvable.match(/(?<=c\/)(.*?)(?=(?:\?|\/|$))/)[0])
                id = await this.api.part("search", "id", {q: username, type: "channel"}).then((r) => r.items[0] ? r.items[0].id.channelId : null)
            } else if (resolvable.includes("user/")) {
                const username = String(resolvable.match(/(?<=user\/)(.*?)(?=(?:\?|\/|$))/)[0])
                id = await this.api.part("channels", "id", {forUsername: username}).then((r) => r.items[0] ? r.items[0].id : null)
            } else if (resolvable.includes("watch?v=")) {
                id = String(resolvable.match(/(?<=watch\?v=)(.*?)(?=(?:&|$))/)[0])
            } else if (resolvable.includes("youtu.be")) {
                id = String(resolvable.match(/(?<=youtu.be\/)(.*?)(?=(?:\?|$))/)[0])
            } else if (resolvable.includes("playlist?list=")) {
                id = String(resolvable.match(/(?<=playlist\?list=)(.*?)(?=(?:\?|$))/)[0])
            } else {
                const query = String(resolvable.match(/(?<=youtube.com\/)(.*?)(?=(?:\?|$))/)[0])
                id = await this.api.part("search", "id", {q: query, type: "channel"}).then((r) => r.items[0] ? r.items[0].id.channelId : null)
            }
        } else {
            if (type === "video" && (resolvable.length < 11 || resolvable.includes(" "))) {
                id = id = await this.api.part("search", "id", {q: resolvable, type: "video"}).then((r) => r.items[0] ? r.items[0].id.videoId : null)
            } else if (type === "channel" && ((!resolvable.startsWith("UC") && resolvable.length < 20) || resolvable.includes(" "))) {
                id = id = await this.api.part("search", "id", {q: resolvable, type: "channel"}).then((r) => r.items[0] ? r.items[0].id.channelId : null)
            } else if (type === "playlist" && (resolvable.length < 20 || resolvable.includes(" "))) {
                id = id = await this.api.part("search", "id", {q: resolvable, type: "playlist"}).then((r) => r.items[0] ? r.items[0].id.playlistId : null)
            } else {
                id = resolvable
            }
        }

        if (!id) return Promise.reject("Invalid URL or query.")
        return id
    }

    public downloadMyVideo = async (videoResolvable: string, key: string, cookie: string, dest?: string) => {
        const id = await this.resolveID(videoResolvable, "video")
        const headers = {
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36",
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
            "referer": `https://studio.youtube.com/video/${id}/edit?utm_campaign=upgrade&utm_medium=redirect&utm_source=%2Fmy_videos`,
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-site",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": 1,
            "cookie": cookie
        }
        const response = await axios.get(downloadURL, {responseType: "arraybuffer", params: {t: key, v: id}, headers})
        const filename = querystring.unescape(response.headers["content-disposition"].replace(`attachment; filename="`, "").slice(0, -1))
        if (!dest) dest = "./"
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, {recursive: true})
        if (dest.endsWith("/")) dest = dest.slice(0, -1)
        dest = `${dest}/${filename}`
        fs.writeFileSync(dest, Buffer.from(response.data, "binary"))
    }

    public downloadMyVideos = async (yourChannel: string, key: string, cookie: string, dest?: string) => {
        const id = await this.resolveID(yourChannel, "channel")
        const channel = await this.channels.get(id)
        const playlistID = channel.contentDetails.relatedPlaylists.uploads
        // const items = await this.playlists.items(playlistID)
        console.log(playlistID)
    }
}
