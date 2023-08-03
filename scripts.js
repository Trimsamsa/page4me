/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

/**
 * Search function
 */

const searchInput = document.querySelector("#searchbar > input")
const searchButton = document.querySelector("#searchbar > button")

const lookup = {"/":"/","deepl":"https://deepl.com/","reddit":"https://reddit.com/","maps":"https://maps.google.com/"}
const engine = "google"
const engineUrls = {
  deepl: "https://www.deepl.com/translator#-/-/",
  duckduckgo: "https://duckduckgo.com/?q=",
  ecosia: "https://www.ecosia.org/search?q=",
  google: "https://www.google.com/search?q=",
  startpage: "https://www.startpage.com/search?q=",
  youtube: "https://www.youtube.com/results?q=",
}

const isWebUrl = value => {
  try {
    const url = new URL(value)
    return url.protocol === "http:" || url.protocol === "https:"
  } catch {
    return false
  }
}

const getTargetUrl = value => {
  if (isWebUrl(value)) return value
  if (lookup[value]) return lookup[value]
  return engineUrls[engine] + value
}

const search = () => {
  const value = searchInput.value
  const targetUrl = getTargetUrl(value)
  window.open(targetUrl, "_self")
}

searchInput.onkeyup = event => event.key === "Enter" && search()
searchButton.onclick = search

/**
 * inject bookmarks into html
 */

const bookmarks = [{"id":"7vv7qkgKebH5zcfZ","label":"Brain","bookmarks":[{"id":"8GFD34on1yvFDmy3","label":"H_Sheets","url":"https://hacksheets.in/"},{"id":"RRE5N0XRGQIjx5bB","label":"H_Planning","url":"https://www.hacksplaining.com/"},{"id":"QpBY2e4nT2Ne9UqF","label":"H_Me","url":"https://tryhackme.com/"}]},{"id":"la2GvuPmTRTo7VOH","label":"design tools","bookmarks":[{"id":"OQBkvBWMoFUQSNc4","label":"DuckDuckGo","url":"https://duckduckgo.com/"},{"id":"f2SWU3gvOhrqqHEm","label":"Bing","url":"https://bing.com"},{"id":"FYwCiKgj3253eez4","label":"Shodan","url":"https://www.shodan.io/"},{"id":"9bZmzVYqRO4sJpKM","label":"Google","url":"https://google.com"}]},{"id":"UK7v0wfhihhszmwr","label":"worth reading","bookmarks":[{"id":"8izxZiIXvA0vXjTe","label":"happy hues","url":"https://www.happyhues.co/"},{"id":"lU8UbH7Wh8d2k79o","label":"styled-components","url":"https://www.joshwcomeau.com/react/demystifying-styled-components/"},{"id":"yc0QFxwu46fnMXIo","label":"react docs","url":"https://reactjs.org/docs/getting-started.html"}]},{"id":"kfqGPU628Mw1cGiZ","label":"sources","bookmarks":[{"id":"QWpOQyTbxYKD6zSG","label":"Github","url":"https://github.com"},{"id":"JAA08s4dcsHQL1si","label":"PortSwigger","url":"https://portswigger.net/"},{"id":"IE41wSS3QmgxME4D","label":"CStation","url":"https://crackstation.net/"},{"id":"T6BUQW0kZ4lPuoxH","label":"HHunt","url":"https://kathan19.gitbook.io/howtohunt/"}]}]

const createGroupContainer = () => {
  const container = document.createElement("div")
  container.className = "bookmark-group"
  return container
}

const createGroupTitle = title => {
  const h2 = document.createElement("h2")
  h2.innerHTML = title
  return h2
}

const createBookmark = ({ label, url }) => {
  const li = document.createElement("li")
  const a = document.createElement("a")
  a.href = url
  a.innerHTML = label
  li.append(a)
  return li
}

const createBookmarkList = bookmarks => {
  const ul = document.createElement("ul")
  bookmarks.map(createBookmark).forEach(li => ul.append(li))
  return ul
}

const createGroup = ({ label, bookmarks }) => {
  const container = createGroupContainer()
  const title = createGroupTitle(label)
  const bookmarkList = createBookmarkList(bookmarks)
  container.append(title)
  container.append(bookmarkList)
  return container
}

const injectBookmarks = () => {
  const bookmarksContainer = document.getElementById("bookmarks")
  bookmarksContainer.append()
  bookmarks.map(createGroup).forEach(group => bookmarksContainer.append(group))
}

injectBookmarks()
