import {YoutubeThumbnail} from "./index"

export interface YoutubePlaylist {
    kind: string
    etag: string
    id: string
    snippet: YoutubePlaylistSnippet
    status: {
      privacyStatus: string
    },
    contentDetails: {
      itemCount: number
    },
    player: {
      embedHtml: string
  }
}

export interface YoutubePlaylistSnippet {
    publishedAt: string
    channelId: string
    title: string
    description: string
    thumbnails: {
         default: YoutubeThumbnail
         medium: YoutubeThumbnail
         high: YoutubeThumbnail
         standard?: YoutubeThumbnail
         maxres?: YoutubeThumbnail
        },
    channelTitle: string
    tags: string[]
    localized: {
         title: string
         description: string
    }
}

export interface YoutubePlaylistParams {
    key?: string
    part?: string
    playlistId?: string
    id?: string
    h1?: string
    maxResults?: string
    pageToken?: string
}

export interface YoutubePlaylistItemsSearch {
    kind: string
    etag: string
    pageInfo: {
        totalResults: number
        resultsPerPage: number
    },
    items: YoutubePlaylistItem[]
    nextPageToken: string
}

export interface YoutubePlaylistItem {
    kind: string
    etag: string
    id: string
    snippet: YoutubePlaylistItemsSnippet
    contentDetails: {
        videoId: string
        videoPublishedAt: string
    },
    status: {
        privacyStatus: string
    }
}

export interface YoutubePlaylistItemsSnippet {
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
    playlistId: string
    position: number
    resourceId: {
        kind: string
        videoId: string
    }
}
