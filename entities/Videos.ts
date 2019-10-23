import api from "../API"
import {YoutubeSearchParams, YoutubeVideo, YoutubeVideoParams, YoutubeVideoSearch} from "../types"
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
}
