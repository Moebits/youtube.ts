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
            case "playlist":
                endpoint = "playlists"
                if (!params.part) params.part = "id, player, snippet, status, contentDetails"
            case "search":
                endpoint = "search"
                params.part = "snippet"
            case "comment":
                endpoint = "comments"
                params.part = "id, snippet"
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
