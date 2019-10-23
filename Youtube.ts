import api from "./API"
import {Channels, Comments, Info, Playlists, Util, Videos} from "./entities"

export default class Youtube {
    public static apiKey: string
    public api = new api(Youtube.apiKey)
    public channels = new Channels(this.api)
    public videos = new Videos(this.api)
    public playlists = new Playlists(this.api)
    public comments = new Comments(this.api)
    public util = new Util(this.api)
    public info = new Info(this.api)
    public constructor(apiKey: string) {
        Youtube.apiKey = apiKey
        this.api = new api(Youtube.apiKey)
        this.channels = new Channels(this.api)
        this.videos = new Videos(this.api)
        this.util = new Util(this.api)
        this.playlists = new Playlists(this.api)
        this.comments = new Comments(this.api)
        this.info = new Info(this.api)
    }
}

module.exports.default = Youtube
export * from "./entities/index"
export * from "./types/index"
