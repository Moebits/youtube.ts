import api from "../API"

export class Util {
    constructor(private readonly api: api) {}

    public resolveID = async (resolvable: string, type: string) => {
        resolvable = resolvable.trim()
        let id: string
        if (resolvable.includes("youtube.com") || resolvable.includes("youtu.be")) {
            if (resolvable.includes("channel")) {
                id = String(resolvable.match(/(?<=channel\/)(.*?)(?=(?:\?|$))/))
            } else if (resolvable.includes("c/")) {
                const username = String(resolvable.match(/(?<=c\/)(.*?)(?=(?:\?|$))/)[0])
                id = await this.api.part("search", "id", {q: username, type: "channel"}).then((r) => r.items[0] ? r.items[0].id.channelId : null)
            } else if (resolvable.includes("user/")) {
                const username = String(resolvable.match(/(?<=user\/)(.*?)(?=(?:\?|$))/)[0])
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
}
