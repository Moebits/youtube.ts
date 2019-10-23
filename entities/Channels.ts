import api from "../API"
import {YoutubeChannel, YoutubeChannelParams, YoutubeChannelSearch, YoutubeSearchParams} from "../types"
import {Util} from "./index"

export class Channels {
    private readonly util = new Util(this.api)
    constructor(private readonly api: api) {}

    public get = async (channelResolvable: string, params?: YoutubeChannelParams) => {
        if (!params) params = {}
        const id = await this.util.resolveID(channelResolvable, "channel")
        params.id = id
        const response = await this.api.get("channel", params)
        return response.items[0] as Promise<YoutubeChannel>
    }

    public search = async (params?: YoutubeSearchParams) => {
        if (!params) params = {}
        params.type = "channel"
        const response = await this.api.part("search", "snippet", params)
        return response as Promise<YoutubeChannelSearch>
    }
}
