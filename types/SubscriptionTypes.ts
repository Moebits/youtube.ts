import {YoutubeThumbnail} from "./index"

export interface YoutubeSubscriptionParams {
    key?: string
    part?: string
    id?: string
    channelId?: string
    forChannelId?: string
    maxResults?: number
    onBehalfOfContentOwner?: string
    onBehalfOfContentOwnerChannel?: string
    order?: "alphabetical" | "relevance" | "unread"
    pageToken?: string
}

export interface YoutubeSubscriptionSearch {
    kind: string
    etag: string
    nextPageToken: string
    pageInfo: {
      totalResults: number
      resultsPerPage: number
    },
    items: YoutubeSubscription[]
}

export interface YoutubeSubscription {
    kind: string
    etag: string
    id: string
    snippet: {
        publishedAt: string
        title: string
        description: string
        resourceId: {
            kind: string
            channelId: string
        },
        channelId: string
        thumbnails: {
            default: YoutubeThumbnail
            medium: YoutubeThumbnail
            high: YoutubeThumbnail
        }
    },
    contentDetails: {
        totalItemCount: number
        newItemCount: number
        activityType: string
    },
    subscriberSnippet: {
        title: string
        description: string
        channelId: string
        thumbnails: {
         default: YoutubeThumbnail
         medium: YoutubeThumbnail
         high: YoutubeThumbnail
        }
    }
}
