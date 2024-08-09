import {assert} from "chai"
import "mocha"
import {youtube} from "./login"

describe("Channels", async function() {
    it("should get a channel", async function() {
        const response = await youtube.channels.get("pewdiepie")
        assert(response.hasOwnProperty("brandingSettings"))
    })

    it("should search for channels", async function() {
        const response = await youtube.channels.search({q: "kawaii"})
        assert(response.hasOwnProperty("items"))
    })

    it("should search for all comments", async function() {
        const response = await youtube.channels.allComments("pewdiepie")
        assert(response.hasOwnProperty("items"))
    })

    it("should search discussion comments", async function() {
        const response = await youtube.channels.comments("pewdiepie")
        assert(response.hasOwnProperty("items"))
    })

    it("should search for channel subscriptions", async function() {
        const response = await youtube.channels.subscriptions("https://www.youtube.com/channel/UCwgEMWqaNlp0TVb5BLqO-jg")
        assert(response.hasOwnProperty("items"))
    })

})
