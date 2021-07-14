const template = `
  <a href="$url">
    <img src="$preview" />
    <div class="stream-block__info">
      <img src="$logo"/>
      <div class="streamer-block">
        <p class="streamer-block__title">$status</p>
        <p class="streamer-block__streamer">$channel</p>
      </div>
    </div>
  </a>
`
const baseURL = 'https://api.twitch.tv/kraken/'
const clientID = ''
const twitchHeaders = new Headers({
  Accept: 'application/vnd.twitchtv.v5+json',
  'Client-ID': clientID
})
const twitchOptions = {
  method: 'GET',
  headers: twitchHeaders
}
let isLoading = false
let offset = 0

window.onload = () => {
  const firstGameName = getTopGames(getTopGamesData)
  getFirstGameStreams(firstGameName)
  document.querySelector('.navbar__list')
  // 顯示所選遊戲的實況
    .addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        offset = 0
        const gameName = e.target.innerText
        const presentGameName = document.querySelector('.section__game-name').innerText
        if (gameName === presentGameName) {
          return
        }
        switchGameStream(gameName)
      }
    })
    // 捲軸滑動載入實況
  window.addEventListener('scroll', (e) => {
    const { lastChild } = document.querySelector('.stream-block')
    const lastChildOffsetBottom = document.body.clientHeight - lastChild.offsetTop
    if (
      window.innerHeight + window.pageYOffset >=
      document.body.clientHeight - lastChildOffsetBottom
    ) {
      const gameName = document.querySelector('.section__game-name').innerText
      getMoreStreams(gameName)
    }
  })
}

const switchGameStream = async(gameName) => {
  document.querySelector('.section__game-name').innerText = gameName
  try {
    const streamsData = await getStreamsData(gameName, offset)
    appendStreams(streamsData, offset)
  } catch (error) {
    console.log('Error: ', error)
  }
}

const getFirstGameStreams = async(firstGameName) => {
  firstGameName = await firstGameName
  document.querySelector('.section__game-name').innerText = firstGameName
  try {
    const streamsData = await getStreamsData(firstGameName, offset)
    appendStreams(streamsData, offset)
  } catch (error) {
    console.log('Error: ', error)
  }
}
// 回傳第一個實況類型的名稱(Promise type)
const getTopGames = async(func) => {
  const data = func()
  const topGames = (await data).top
  for (const game of topGames) {
    const element = document.createElement('li')
    element.classList.add('navbar__game-name')
    element.innerText = game.game.name
    document.querySelector('.navbar__list').appendChild(element)
  }
  const firstGameName = topGames[0].game.name
  return firstGameName
}
// 將實況資料串入 html
const appendStreams = async(streamsData, haveOffset) => {
  const { streams } = streamsData
  if (!haveOffset) {
    document.querySelector('.stream-block').innerHTML = ''
  }
  streams.forEach((stream) => {
    const element = document.createElement('div')
    const { url, logo, status, displayName } = stream.channel
    const { preview } = stream
    const html = template
      .replace('$url', url)
      .replace('$preview', preview.large)
      .replace('$logo', logo)
      .replace('$status', status)
      .replace('$channel', displayName)
    element.classList.add('stream-block__stream')
    element.innerHTML = html
    document.querySelector('.stream-block').appendChild(element)
  })
  return false
}
// 加載更多實況
const getMoreStreams = async(gameName) => {
  if (isLoading) return
  isLoading = true
  offset += 18
  const streamsData = await getStreamsData(gameName, offset)
  isLoading = await appendStreams(streamsData, offset)
}

const getStreamsData = async(gameName, offset) => {
  const response = await fetch(`${baseURL}streams?game=${encodeURIComponent(gameName)}&limit=18&offset=${offset}`, twitchOptions)
  const errorMessage = statusErrorMessageFromResponse(response)
  const data = await response.json()
  if (await errorMessage) {
    throw new Error(await errorMessage)
  }
  return data
}

const getTopGamesData = async() => {
  const response = await fetch(`${baseURL}games/top?limit=5`, twitchOptions)
  const errorMessage = statusErrorMessageFromResponse(response)
  const data = await response.json()
  if (await errorMessage) {
    throw new Error(await errorMessage)
  }
  return data
}

// 回傳 Promise
const statusErrorMessageFromResponse = async(response) => {
  const statusCode = await response.status
  if (statusCode < 200 || statusCode >= 400) return 'Network response was wrong.'
  return ''
}
