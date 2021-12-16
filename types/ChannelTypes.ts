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
    commentCount: string
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
    hints: Array<{
        property: string
        value: string
    }>
}

export interface YoutubeBanner {
    bannerImageUrl: string
    bannerMobileImageUrl: string
    bannerTabletLowImageUrl: string
    bannerTabletImageUrl: string
    bannerTabletHdImageUrl: string
    bannerTabletExtraHdImageUrl: string
    bannerMobileLowImageUrl: string
    bannerMobileMediumHdImageUrl: string
    bannerMobileHdImageUrl: string
    bannerMobileExtraHdImageUrl: string
    bannerTvImageUrl: string
    bannerTvLowImageUrl: string
    bannerTvMediumImageUrl: string
    bannerTvHighImageUrl: string
}

export interface YoutubeChannelParams {
    key?: string
    part?: string
    id?: string
    h1?: string
    maxResults?: number
    pageToken?: string
}
