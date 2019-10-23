import api from "../API"

export class Info {
    constructor(private readonly api: api) {}

    public guideCategories = async (params?: any) => {
        const response = await this.api.get("guideCategories", params)
        return response
    }

    public videoCategories = async (params?: any) => {
        const response = await this.api.get("videoCategories", params)
        return response
    }

    public guideCategory = async (categoryID: string, params?: any) => {
        if (!params) params = {}
        params.id = categoryID
        const response = await this.api.get("guideCategories", params)
        return response
    }

    public videoCategory = async (categoryID: string, params?: any) => {
        if (!params) params = {}
        params.id = categoryID
        const response = await this.api.get("videoCategories", params)
        return response
    }
}
