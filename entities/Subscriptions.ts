import api from "../API"
import {YoutubeSubscription, YoutubeSubscriptionParams} from "../types/index"

export class Subscriptions {
    public constructor(private readonly api: api) {}

    public get = async (subscriptionId: string, params?: YoutubeSubscriptionParams) => {
        if (!params) params = {}
        params.id = subscriptionId
        const response = await this.api.get("subscriptions", params)
        return response.items[0] as Promise<YoutubeSubscription>
    }
}
