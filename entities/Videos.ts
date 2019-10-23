import api from "../API"
import {YoutubeCommentThreadSearch, YoutubeSearchParams, YoutubeVideo, YoutubeVideoParams, YoutubeVideoSearch} from "../types/index"
import {Util} from "./index"

export class Videos {
    private readonly util = new Util(this.api)
    constructor(private readonly api: api) {}

    public get = async (videoResolvable: string, params?: YoutubeVideoParams) => {
        if (!params) params = {}
        const id = await this.util.resolveID(videoResolvable, "video")
        params.id = id
        const response = await this.api.get("video", params)
        return response.items[0] as Promise<YoutubeVideo>
    }

    public search = async (params?: YoutubeSearchParams) => {
        if (!params) params = {}
        params.type = "video"
        const response = await this.api.get("search", params)
        return response as Promise<YoutubeVideoSearch>
    }

    public comments = async (videoResolvable: string, params?: any) => {
        const id = await this.util.resolveID(videoResolvable, "video")
        if (!params) params = {}
        params.videoId = id
        const response = await this.api.get("commentThreads", params)
        return response as Promise<YoutubeCommentThreadSearch>
    }
}
