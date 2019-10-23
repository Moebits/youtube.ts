import api from "../API"
import {YoutubeChannel, YoutubeChannelParams, YoutubeChannelSearch, YoutubeCommentParams, YoutubeCommentThreadSearch,
YoutubeSearchParams, YoutubeSubscriptionParams, YoutubeSubscriptionSearch} from "../types"
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

    public allComments = async (channelResolvable: string, params?: YoutubeCommentParams) => {
        const id = await this.util.resolveID(channelResolvable, "channel")
        if (!params) params = {}
        params.allThreadsRelatedToChannelId = id
        const response = await this.api.get("commentThreads", params)
        return response as Promise<YoutubeCommentThreadSearch>
    }

    public comments = async (channelResolvable: string, params?: YoutubeCommentParams) => {
        const id = await this.util.resolveID(channelResolvable, "channel")
        if (!params) params = {}
        params.channelId = id
        const response = await this.api.get("commentThreads", params)
        return response as Promise<YoutubeCommentThreadSearch>
    }

    public subscriptions = async (channelResolvable: string, params?: YoutubeSubscriptionParams) => {
        const id = await this.util.resolveID(channelResolvable, "channel")
        if (!params) params = {}
        params.channelId = id
        const response = await this.api.get("subscriptions", params)
        return response as Promise<YoutubeSubscriptionSearch>
    }
}
