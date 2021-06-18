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
const clientID = 'e24g5pbpbi1yvkbjnb266hg75ypqw4'
let isLoading = false
let offset = 0

window.onload = () => {
  document.querySelector('.navbar__list')
    .addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        const gameName = e.target.innerText
        offset = 0
        getStreams(gameName, appendStreams, offset)
      }
    })
  // 點擊按鈕載入 streams
  // document.querySelector('.btn-load')
  //   .addEventListener('click', (e) => {
  //     const gameName = document.querySelector('.section__game-name').innerText
  //     getMoreStreams(gameName)
  //   })

  getTopGames((topGames) => {
    for (const game of topGames) {
      const element = document.createElement('li')
      element.classList.add('navbar__game-name')
      element.innerText = game.game.name
      document.querySelector('.navbar__list').appendChild(element)
    }
    getStreams(topGames[0].game.name, appendStreams, offset)
  })

  // 捲軸滑動載入 streams
  window.addEventListener('scroll', (e) => {
    const { lastChild } = document.querySelector('.stream-block').lastChild
    const lastChildOffsetBottom = document.body.clientHeight - lastChild.offsetTop
    // console.groupCollapsed('數值')
    // console.log('最後一個元素到底部的距離: ', lastChildOffsetBottom)
    // console.log('可視範圍的距離(視窗的長度): ', window.innerHeight)
    // console.log('不可視範圍距離(拉條拉到最底): ', window.pageYOffset)
    // console.log('body 的距離: ', document.body.clientHeight)
    // console.groupEnd()
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.clientHeight - lastChildOffsetBottom
    ) {
      const gameName = document.querySelector('.section__game-name').innerText
      getMoreStreams(gameName)
    }
  })
}

const appendStreams = (streams, haveOffset) => {
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
    isLoading = false
  })
}

const getMoreStreams = (gameName) => {
  if (isLoading) return
  offset += 20
  getStreams(gameName, appendStreams, offset)
  isLoading = true
}

const getStreams = (gameName, cb, offset) => {
  const request = new XMLHttpRequest()
  request.open('GET', `${baseURL}streams?game=${encodeURIComponent(gameName)}&limit=20&offset=${offset}`)
  request.setRequestHeader('Client-ID', clientID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      document.querySelector('.section__game-name').innerText = gameName
      try {
        const { streams } = JSON.parse(request.responseText)
        cb(streams, offset)
      } catch (err) {
        console.log('Error! 解析 STREAMS 資料錯誤！')
        console.log('ERROR:', err)
      }
    } else {
      alert('網路不穩請稍後再試！')
    }
  }
  request.send()
}

const getTopGames = (cb) => {
  const request = new XMLHttpRequest()
  request.open('GET', `${baseURL}games/top?limit=5`, true)
  request.setRequestHeader('Client-ID', clientID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      try {
        const { top } = JSON.parse(request.responseText)
        cb(top)
      } catch (err) {
        return console.log(`
        Error! 解析 TOP GAME 資料錯誤！
        ERROR: ${err}
        `)
      }
    } else {
      alert('網路不穩請稍後再試！')
    }
  }
  request.send()
}
