import api from "../API"
import {YoutubeComment, YoutubeCommentParams, YoutubeCommentThread} from "../types"

export class Comments {
    public constructor(private readonly api: api) {}

    public get = async (commentId: string, params?: YoutubeCommentParams) => {
        if (!params) params = {}
        params.id = commentId
        params.textFormat = "text"
        const response = await this.api.get("comment", params)
        return response.items[0] as Promise<YoutubeComment>
    }

    public thread = async (commentThreadId: string, params?: YoutubeCommentParams) => {
        if (!params) params = {}
        params.id = commentThreadId
        const response = await this.api.get("commentThreads", params)
        return response.items[0] as Promise<YoutubeCommentThread>
    }

}
