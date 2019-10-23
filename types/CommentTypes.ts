export interface YoutubeCommentParams {
    key?: string
    part?: string
    allThreadsRelatedToChannelId?: string
    videoId?: string
    channelId?: string
    id?: string
    maxResults?: string
    moderationStatus?: string
    order?: string
    pageToken?: string
    searchTerms?: string
    textFormat?: string
}

export interface YoutubeCommentThreadSearch {
    kind: string
    etag: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    },
    items: YoutubeCommentThread[]
}

export interface YoutubeCommentThread {
    kind: string
    etag: string
    id: string
    snippet: {
        channelId?: string
        videoId: string
        topLevelComment: YoutubeComment
    },
    canReply: boolean
    totalReplyCount: number
    isPublic: boolean
    replies?: {
        comments: YoutubeComment[]
    }
}

export interface YoutubeComment {
    kind: string
    etag: string
    id: string
    snippet: {
        authorDisplayName: string
        authorProfileImageUrl: string
        authorChannelUrl: string
        authorChannelId: {
            value: string
        },
        channelId?: string
        videoId: string
        textDisplay: string
        textOriginal: string
        canRate: boolean
        viewerRating: string
        likeCount: number
        publishedAt: string
        updatedAt: string
    }
}
