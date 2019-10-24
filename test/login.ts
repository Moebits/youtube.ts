import Youtube from "../Youtube"

require("dotenv").config()
const youtube = new Youtube(process.env.GOOGLE_API_KEY)

export {youtube}
