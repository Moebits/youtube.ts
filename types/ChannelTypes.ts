import {YoutubeThumbnail} from "./index"

export interface YoutubeChannel {
    kind: string
    etag: string
    id: string
    snippet: YoutubeChannelSnippet
    contentDetails: YoutubeChannelContentDetails
    statistics: YoutubeChannelStatistics
    brandingSettings: YoutubeBrandingSettings
}

export interface YoutubeChannelSnippet {
    title: string
    description: string
    customUrl: string
    publishedAt: string
    thumbnails: {
        default: YoutubeThumbnail
        medium: YoutubeThumbnail
        high: YoutubeThumbnail
    }
    defaultLanguage: string
    localized: {
         title: string
         description: string
    }
    country: string
}

export interface YoutubeChannelContentDetails {
    relatedPlaylists: {
        uploads: string
        watchHistory: string
        watchLater: string
    }
}

export interface YoutubeChannelStatistics {
    viewCount: string
    subscriberCount: string
    hiddenSubscriberCount: boolean
    videoCount: string
}

export interface YoutubeBrandingSettings {
    channel: {
        title: string
        description: string
        keywords: string
        defaultTab: string
        moderateComments: boolean
        showRelatedChannels: boolean
        showBrowseView: boolean
        featuredChannelsTitle: string
        featuredChannelsUrls: string[]
        unsubscribedTrailer: string
        profileColor: string
        defaultLanguage: string
        country: string
        },
    image: YoutubeBanner
}

export interface YoutubeBanner {
    bannerExternalUrl: string
}

export interface YoutubeChannelParams {
    key?: string
    part?: string
    id?: string
    h1?: string
    maxResults?: number
    pageToken?: string
}
