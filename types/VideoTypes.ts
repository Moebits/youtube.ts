export interface YoutubeVideo {
    kind: string
    etag: string
    id: string
    snippet: YoutubeVideoSnippet
    contentDetails: YoutubeVideoContentDetails
    status: YoutubeVideoStatus
    statistics: YoutubeVideoStatistics
    player: {
      embedHtml: string
  }
}

export interface YoutubeVideoStatistics {
    viewCount: string
    likeCount: string
    dislikeCount: string
    favoriteCount: string
    commentCount: string
}

export interface YoutubeVideoStatus {
    uploadStatus: string
    privacyStatus: string
    license: string
    embeddable: boolean
    publicStatsViewable: boolean
}

export interface YoutubeVideoContentDetails {
    duration: string
    dimension: string
    definition: string
    caption: string
    licensedContent: boolean
    projection: string
}

export interface YoutubeVideoSnippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
        default: YoutubeThumbnail
        medium: YoutubeThumbnail
        high: YoutubeThumbnail
        standard: YoutubeThumbnail
        maxres: YoutubeThumbnail
    },
    channelTitle: string
    tags: string[]
    categoryId: string
    liveBroadcastContent: string
    defaultLanguage: string
    localized: {
        title: string
        description: string
        defaultAudioLanguage: string
    }
}

export interface YoutubeThumbnail {
    url: string
    width: number
    height: number
}

export interface YoutubeVideoParams {
    key?: string
    part?: string
    id?: string
    h1?: string
    maxHeight?: number
    maxResults?: number
    maxWidth?: number
    pageToken?: string
    regionCode?: string
    videoCategoryId?: string
}