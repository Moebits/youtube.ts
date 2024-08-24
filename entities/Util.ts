import axios from "axios"
import fs from "fs"
import path from "path"
import querystring from "querystring"
import stream from "stream"
import play from "play-dl"
import child_process from "child_process"
import api from "../API"
import {YoutubeDownloadOptions, YoutubeVideo, YoutubeVideoParams} from "../types"
const downloadURL = "https://www.youtube.com/download_my_video"

export class Util {
    constructor(private readonly api: api) {}

    public resolveID = async (resolvable: string, type: string) => {
        resolvable = resolvable.trim()
        let id: string
        if (resolvable.includes("youtube.com") || resolvable.includes("youtu.be")) {
            if (resolvable.includes("channel")) {
                id = String(resolvable.match(/(channel\/)(.*?)(?=(?:\?|\/|$))/)[0].replace("channel/", ""))
            } else if (resolvable.includes("c/")) {
                const username = String(resolvable.match(/(c\/)(.*?)(?=(?:\?|\/|$))/)[0].replace("c/", ""))
                id = await this.api.part("search", "id", {q: username, type: "channel"}).then((r) => r.items[0] ? r.items[0].id.channelId : null)
            } else if (resolvable.includes("user/")) {
                const username = String(resolvable.match(/(user\/)(.*?)(?=(?:\?|\/|$))/)[0].replace("user/", ""))
                id = await this.api.part("channels", "id", {forUsername: username}).then((r) => r.items[0] ? r.items[0].id : null)
            } else if (resolvable.includes("watch?v=")) {
                id = String(resolvable.match(/(watch\?v=)(.*?)(?=(?:&|$))/)[0].replace("watch?v=", ""))
            } else if (resolvable.includes("youtu.be")) {
                id = String(resolvable.match(/(youtu.be\/)(.*?)(?=(?:\?|$))/)[0].replace("youtu.be/", ""))
            } else if (resolvable.includes("playlist?list=")) {
                id = String(resolvable.match(/(playlist\?list=)(.*?)(?=(?:\?|$))/)[0].replace("playlist?list=", ""))
            } else {
                const query = String(resolvable.match(/(youtube.com\/)(.*?)(?=(?:\?|$))/)[0].replace("youtube.com/", ""))
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
        if (!response.headers["content-disposition"]) return Promise.reject("Cannot download this video.")
        const filename = querystring.unescape(response.headers["content-disposition"].replace(`attachment; filename="`, "").slice(0, -1))
        if (!dest) dest = "./"
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, {recursive: true})
        if (dest.endsWith("/")) dest = dest.slice(0, -1)
        dest = `${dest}/${filename}`
        fs.writeFileSync(dest, Buffer.from(response.data, "binary"))
        return dest
    }

    public iteratePages = async (searchResults: any, params: any, limit?: number) => {
        const resultArray = []
        const search = await this.api.get("search", params)
        for (let i = 0; i < search.items.length; i++) {
            if (limit) {
                if (limit === 0) return resultArray
                limit--
            }
            resultArray.push(search.items[i])
        }
        if (!limit) limit = Infinity
        let rejected = false
        while (rejected === false && limit > 0) {
            params.pageToken = searchResults.nextPageToken
            try {
                const newSearch = await this.api.get("search", params)
                for (let i = 0; i < newSearch.items.length; i++) {
                    resultArray.push(newSearch.items[i])
                    limit--
                }
                searchResults = newSearch
            } catch {
                rejected = true
            }
        }
        return resultArray
    }

    public downloadMyVideos = async (yourChannel: string, key: string, cookie: string, dest?: string, limit?: number) => {
        const id = await this.resolveID(yourChannel, "channel")
        const search = await this.api.get("search", {channelId: id, order: "date"})
        const videos = await this.iteratePages(search, {channelId: id, order: "date"}, limit)
        const links: string[] = []
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id.videoId) {
                try {
                    const link = await this.downloadMyVideo(videos[i].id.videoId, key, cookie, dest)
                    links.push(link)
                } catch (error) {
                    continue
                }
            }
        }
        return links
    }

    public awaitStream = async (writeStream: stream.Writable) => {
        return new Promise((resolve, reject) => {
            writeStream.on("finish", resolve)
            writeStream.on("error", reject)
        })
    }

    
    public downloadVideo = async (videoResolvable: string,  dest?: string, downloadOptions?: YoutubeDownloadOptions) => {
        let height = "1080"
        let fps = "30"
        let format = "mp4"
        if (downloadOptions?.format) format = downloadOptions.format
        if (downloadOptions?.quality) {
            const [resolution, framerate] = downloadOptions.quality.split("p")
            height = resolution || "1080"
            fps = framerate || "30"
        }
        if (!path.isAbsolute(dest)) {
            let local = __dirname.includes("node_modules") ? path.join(__dirname, "../../../") : path.join(__dirname, "..")
            dest = path.join(local, dest)
        }
        let command = downloadOptions?.ytDlpPath ? downloadOptions.ytDlpPath : "yt-dlp"
        const child = child_process.exec(`${command} -f "ba+bv[height=${height}][fps=${fps}]" --merge-output-format ${format} -o "${dest}/%(title)s.%(ext)s" "${videoResolvable}"`)
        let title = ""
        await new Promise<void>((resolve) => {
            child.stdout.on("data", (chunk) => {
                if (chunk.includes("Merging formats")) title = chunk.match(/(?<=")(.*?)(?=")/)?.[0]
            })
            child.on("close", () => resolve())
            child.on("error", (err) => console.log(err))
        })
        return `${dest}/${title}`
    }

    public downloadVideos = async (videos: string[] | YoutubeVideo[], dest?: string, ytdlOptions?: YoutubeDownloadOptions) => {
        const links: string[] = []
        for (let i = 0; i < videos.length; i++) {
            try {
                let id = videos[i] as string
                if (id.hasOwnProperty("id")) id = (videos[i] as YoutubeVideo).id
                const link = await this.downloadVideo(id, dest, ytdlOptions)
                links.push(link)
            } catch (error) {
                continue
            }
        }
        return links
    }

    public downloadChannelVideos = async (channelResolvable: string, dest?: string, ytdlOptions?: YoutubeDownloadOptions, limit?: number) => {
        const id = await this.resolveID(channelResolvable, "channel")
        const search = await this.api.get("search", {channelId: id, order: "date"})
        const videos = await this.iteratePages(search, {channelId: id, order: "date"}, limit)
        const links: string[] = []
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id.videoId) {
                try {
                    const link = await this.downloadVideo(videos[i].id.videoId, dest, ytdlOptions)
                    links.push(link)
                } catch (error) {
                    continue
                }
            }
        }
        return links
    }

    public downloadMP3 = async (videoResolvable: string, dest?: string, downloadOptions?: YoutubeDownloadOptions) => {
        let format = "mp3"
        if (downloadOptions) format = downloadOptions.format
        if (!path.isAbsolute(dest)) {
            let local = __dirname.includes("node_modules") ? path.join(__dirname, "../../../") : path.join(__dirname, "..")
            dest = path.join(local, dest)
        }
        let command = downloadOptions?.ytDlpPath ? downloadOptions.ytDlpPath : "yt-dlp"
        const child = child_process.exec(`${command} -x --audio-format ${format} -o "${dest}/%(title)s.%(ext)s" "${videoResolvable}"`)
        let title = ""
        await new Promise<void>((resolve) => {
            child.stdout.on("data", (chunk) => {
                if (chunk.includes("Destination")) title = chunk.match(/(?<=Destination: ).*/)?.[0]
            })
            child.on("close", () => resolve())
            child.on("error", (err) => console.log(err))
        })
        return `${dest}/${title}`
    }

    public downloadMP3s = async (videos: string[] | YoutubeVideo[], dest?: string) => {
        const links: string[] = []
        for (let i = 0; i < videos.length; i++) {
            try {
                let id = videos[i] as string
                if (id.hasOwnProperty("id")) id = (videos[i] as YoutubeVideo).id
                const link = await this.downloadMP3(id, dest)
                links.push(link)
            } catch (error) {
                continue
            }
        }
        return links
    }

    public downloadChannelMP3s = async (channelResolvable: string, dest?: string, limit?: number) => {
        const id = await this.resolveID(channelResolvable, "channel")
        const search = await this.api.get("search", {channelId: id, order: "date"})
        const videos = await this.iteratePages(search, {channelId: id, order: "date"}, limit)
        const links: string[] = []
        for (let i = 0; i < videos.length; i++) {
            if (videos[i].id.videoId) {
                try {
                    const link = await this.downloadMP3(videos[i].id.videoId, dest)
                    links.push(link)
                } catch (error) {
                    continue
                }
            }
        }
        return links
    }

    public streamMP3 = async (videoResolvable: string) => {
        const id = await this.resolveID(videoResolvable, "video")
        const url = `https://www.youtube.com/watch?v=${id}`
        return play.stream(url)
    }

    /**
     * Downloads the thumbnail of a youtube video.
     */
    public downloadThumbnail = async (videoResolvable: string, folder?: string, noDL?: boolean) => {
        if (!folder) folder = "./"
        if (!fs.existsSync(folder)) fs.mkdirSync(folder, {recursive: true})
        const id = await this.resolveID(videoResolvable, "video")
        const url = `https://www.youtube.com/watch?v=${id}`
        const info = await play.video_basic_info(url).then((i) => i.video_details)
        const thumbnail = info.thumbnails[info.thumbnails.length - 1].url
        if (noDL) return thumbnail
        const dest = path.join(folder, `${info.title}.png`)
        const arrayBuffer = await axios.get(thumbnail, {responseType: "arraybuffer"}).then((r) => r.data)
        fs.writeFileSync(dest, Buffer.from(arrayBuffer, "binary"))
        return dest
    }

    /**
     * Gets a video's title from the url.
     */
    public getTitle = async (videoResolvable: string) => {
        const id = await this.resolveID(videoResolvable, "video")
        const url = `https://www.youtube.com/watch?v=${id}`
        const info = await play.video_basic_info(url).then((i) => i.video_details)
        return info.title
    }
}
