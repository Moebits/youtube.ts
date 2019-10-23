import axios from "axios"

const apiURL = "https://www.googleapis.com/youtube/v3/"

export default class API {
    public constructor(private readonly apiKey: string) {}

    public get = async (type: string, params?: any) => {
        if (!params) params = {}
        params.key = this.apiKey
        let endpoint: string
        switch (type) {
            case "channel":
                endpoint = "channels"
                if (!params.part) params.part = "id, snippet, contentDetails, statistics, brandingSettings"
                break
            case "video":
                endpoint = "videos"
                if (!params.part) params.part = "id, player, snippet, contentDetails, status, statistics"
                break
            case "playlist":
                endpoint = "playlists"
                if (!params.part) params.part = "id, player, snippet, status, contentDetails"
                break
            case "search":
                endpoint = "search"
                params.part = "snippet"
                if (!params.maxResults) params.maxResults = 50
                break
            case "comment":
                endpoint = "comments"
                params.part = "id, snippet"
                break
            case "commentThreads":
                endpoint = "commentThreads"
                params.part = "id, snippet, replies"
                break
            case "subscriptions":
                endpoint = "subscriptions"
                params.part = "id, snippet, contentDetails, subscriberSnippet"
                break
            case "playlistItems":
                endpoint = "playlistItems"
                params.part = "id, snippet, status, contentDetails"
                break
            case "channelSections":
                endpoint = "channelSections"
                params.part = "id, snippet, contentDetails"
                break
            case "guideCategories":
                endpoint = "guideCategories"
                params.part = "snippet"
                break
            case "videoCategories":
                endpoint = "videoCategories"
                params.part = "snippet"
                break
            default:
        }
        endpoint = apiURL + endpoint
        const response = await axios.get(endpoint, {params}).then((r) => r.data)
        if (!response.items[0]) return Promise.reject("Nothing was found.")
        return response
    }

    public part = async (endpoint: string, part: string, params?: any) => {
        if (!params) params = {}
        params.key = this.apiKey
        params.part = part
        if (endpoint.startsWith("/")) endpoint = endpoint.slice(1)
        endpoint = apiURL + endpoint
        const response = await axios.get(endpoint, {params}).then((r) => r.data)
        return response
    }
}
