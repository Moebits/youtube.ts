import {YoutubeThumbnail} from "./index"

export interface YoutubeSearchParams {
    key?: string
    part?: string
    relatedToVideoId?: string
    channelId?: string
    channelType?: string
    eventType?: string
    location?: string
    locationRadius?: string
    maxResults?: number
    order?: "date" | "relevance" | "rating" | "title" | "videoCount" | "viewCount"
    pageToken?: string
    publishedAfter?: string
    publishedBefore?: string
    q?: string
    regionCode?: string
    relevanceLanguage?: string
    safeSearch?: string
    topicId?: string
    type?: "channel" | "playlist" | "video"
    videoCaption?: "any" | "closedCaption" | "none"
    videoCategoryId?: string
    videoDefinition?: "any" | "high" | "standard"
    videoDimension?: "2d" | "3d" | "any"
    videoDuration?: "any" | "long" | "medium" | "short"
    videoEmbeddable?: "any" | "true"
    videoLicense?: "any" | "creative commons" | "youtube"
    videoSyndicated?: "any" | "true"
    videoType?: "any" | "episode" | "movie"
}

export interface YoutubeSearch {
    kind: string
    etag: string
    nextPageToken: string
    regionCode: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    }
}

export interface YoutubeChannelSearch extends YoutubeSearch {
    items: YoutubeChannelSearchItem[]
}

export interface YoutubeVideoSearch extends YoutubeSearch {
    items: YoutubeVideoSearchItem[]
}

export interface YoutubePlaylistSearch extends YoutubeSearch {
    items: YoutubePlaylistSearchItem[]
}

export interface YoutubeChannelSearchItem {
    kind: string
    etag: string
    id: {
        kind: string
        channelId: string
    },
    snippet: {
        publishedAt: string
        channelId: string
        title: string
        description: string
        thumbnails: {
            default: YoutubeThumbnail
            medium: YoutubeThumbnail
            high: YoutubeThumbnail
        },
        channelTitle: string
        liveBroadcastContent: string
    }
}

export interface YoutubeVideoSearchItem {
    kind: string
    etag: string
    id: {
        kind: string
        videoId: string
    },
    snippet: {
        publishedAt: string
        channelId: string
        title: string
        description: string
        thumbnails: {
            default: YoutubeThumbnail
            medium: YoutubeThumbnail
            high: YoutubeThumbnail
        },
        channelTitle: string
        liveBroadcastContent: string
    }
}

export interface YoutubePlaylistSearchItem {
    kind: string
    etag: string
    id: {
        kind: string
        playlistId: string
    },
    snippet: {
      publishedAt: string
      channelId: string
      title: string
      description: string
      thumbnails: {
         default: YoutubeThumbnail
         medium: YoutubeThumbnail
         high: YoutubeThumbnail
        },
      channelTitle: string
      liveBroadcastContent: string
    }
}
