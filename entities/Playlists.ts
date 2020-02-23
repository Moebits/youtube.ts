import api from "../API"
import {YoutubePlaylist, YoutubePlaylistItem, YoutubePlaylistItemsSearch, YoutubePlaylistParams, YoutubePlaylistSearch, YoutubeSearchParams} from "../types/index"
import {Util} from "./index"

export class Playlists {
    private readonly util = new Util(this.api)
    constructor(private readonly api: api) {}

    public get = async (playlistResolvable: string, params?: YoutubePlaylistParams) => {
        if (!params) params = {}
        const id = await this.util.resolveID(playlistResolvable, "playlist")
        params.id = id
        const response = await this.api.get("playlist", params)
        return response.items[0] as Promise<YoutubePlaylist>
    }

    public items = async (playlistResolvable: string, params?: YoutubePlaylistParams) => {
        if (!params) params = {}
        const id = await this.util.resolveID(playlistResolvable, "playlist")
        params.playlistId = id
        const response = await this.api.get("playlistItems", params)
        return response as Promise<YoutubePlaylistItemsSearch>
    }

    public item = async (playlistResolvable: string, videoResolvable: string, params?: YoutubePlaylistParams) => {
        if (!params) params = {}
        const playlistId = await this.util.resolveID(playlistResolvable, "playlist")
        const videoId = await this.util.resolveID(videoResolvable, "video")
        params.playlistId = playlistId
        const response = await this.api.get("playlistItems", params) as YoutubePlaylistItemsSearch
        for (let i = 0; i < response.items.length; i++) {
            if (response.items[i].contentDetails.videoId === videoId) {
                return response.items[i] as YoutubePlaylistItem
            }
        }
    }

    public itemByID = async (playlistItemID: string, params?: YoutubePlaylistParams) => {
        if (!params) params = {}
        params.id = playlistItemID
        const response = await this.api.get("playlistItems", params)
        if (!response.items[0]) return Promise.reject("Invalid playlist item id.")
        return response.items[0] as Promise<YoutubePlaylistItem>
    }

    public search = async (params?: YoutubeSearchParams) => {
        if (!params) params = {}
        params.type = "playlist"
        const response = await this.api.part("search", "snippet", params)
        return response as Promise<YoutubePlaylistSearch>
    }
}
