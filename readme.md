<div align="left">
  <p>
    <a href="https://tenpi.github.io/youtube.ts/"><img src="https://raw.githubusercontent.com/Tenpi/youtube.ts/master/images/youtube.tslogo.gif" width="500" /></a>
  </p>
  <p>
    <a href="https://nodei.co/npm/youtube.ts/"><img src="https://nodei.co/npm/youtube.ts.png" /></a>
  </p>
</div>

### About
This is a wrapper for the Youtube API with typings. It allows you to easily search videos, channels, playlists, and more content from Youtube!

### Install
```ts
npm install youtube.ts
```
### Getting Started
You will need to obtain a Google API Key from here: https://console.developers.google.com
Create a new project and enable **Youtube Data API v3**.

#### Searching for channels and subscriptions
```ts
import Youtube from "youtube.ts"

async function useAPI() {
  /*Instantiate a new Youtube object with your Google API key.*/
  const youtube = new Youtube(process.env.GOOGLE_API_KEY)

  /*You can find channels by URL or search query. youtube.com/username, /c/username and /user/username links also work.
  The http and www parts can be omitted.*/
  const channel = await youtube.channels.get("https://www.youtube.com/channel/UC8qU4aFe81jzG1attsyQ5wQ")
  const channelByCustomURL = await youtube.channels.get("https://www.youtube.com/c/tenpi")
  const channelByQuery = await youtube.channels.get("tenpi")
  

  /*Searching is simple, but beware as it uses 100 quota. Important parameters are q (query) and maxResults.*/
  const channelSearch = await youtube.channels.search({q: "cool channels", maxResults: 10})

  /*You can get the comments in the discussion tab, or all comments in all videos on the channel.*/
  const discussionComments = await youtube.channels.comments("tenpi")
  const allComments = await youtube.channels.allComments("tenpi")

  /*If the channel has their subscriptions set to public, you can also retrieve them all.*/
  const subscriptions = await youtube.channel.subscriptions("some channel")

  /*You will need a subscription ID to get a specific subscription, which can be gotten from the above API call.*/
  const subscription = await youtube.subscriptions.get("g3a2JN_ndb4bKe1baMCxV1arn1DRZpHxVk1i_ZTl4uA")
}
useAPI()
```

#### Searching for videos and comments
```ts
async function useAPI() {
  /*You can get a video by URL or by search query.*/
  const video = await youtube.videos.get("https://www.youtube.com/watch?v=yexu92rKpjs")

  /*Searching is basically the same.*/
  const videoSearch = await youtube.videos.search({q: "anime", maxResults: 10})

  /*You can easily retrieve all of the comments on a video.*/
  const comments = await youtube.videos.comments("https://www.youtube.com/watch?v=mLJQ0HO5Alc")

  /*You will need a commentThread ID to get a specific comment thread, and a comment ID to get 
  a single comment. It will be the same if there is only one comment on the thread. The Youtube API
  does not support getting replies of replies, unfortunately.*/
  const comment = await youtube.comments.thread("UgzNgGMYuY6qJl0RV7d4AaABAg")
  const reply = await youtube.comments.get("UgzNgGMYuY6qJl0RV7d4AaABAg")
}
```

#### Searching for playlists
```ts
async function useAPI() {
  /*Getting the metadata for a playlist is easy, but it won't return any of the items inside the playlist.*/
  const playlist = await youtube.playlists.get("https://www.youtube.com/playlist?list=PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t")

  /*Retrieving all of the items for a playlist is done in a seperate API call.*/
  const playlistItems = await youtube.playlists.items("https://www.youtube.com/playlist?list=PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t")

  /*There are two methods for retrieving a specific item in a playlist. The first is to pass in both the playlist URL and video URL,
  and the second is to pass in the playlistItem ID (which can only be gotten from the API). A very specific query might also work.*/
  const item = await youtube.playlists.item("PL1BC175_2xP8ifSS9CM92G5eIOPRG1g7t", "tenpi - moonlight (chill)")
  /*Yes, youtube ID's are incredibly ugly.*/
  const itemByID = await youtube.playlists.itemByID("UEwxQkMxNzVfMnhQOGlmU1M5Q005Mkc1ZUlPUFJHMWc3dC41MzJCQjBCNDIyRkJDN0VD")

  /*Finally, searching for playlists is the same as before.*/
  const playlistSearch = await youtube.playlists.search({q: "cool playlist"})
}
```

#### Common Types