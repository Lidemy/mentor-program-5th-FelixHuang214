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

window.onload = function() {
  document.querySelector('.navbar__list')
    .addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        const gameName = e.target.innerText
        getStreams(gameName, appendStreams, 0)
      }
    })

  document.querySelector('.btn-load')
    .addEventListener('click', (e) => {
      const gameName = document.querySelector('.section__game-name').innerText
      const gameCount = document.querySelectorAll('.stream-block__stream').length
      getStreams(gameName, appendStreams, gameCount)

      // 100 條影片將按鈕隱藏
      if (gameCount + 20 === 100) {
        document.querySelector('.btn-load').classList.add('btn--hide')
      }
    })

  getTopGames((topGames) => {
    for (const game of topGames) {
      const element = document.createElement('li')
      element.classList.add('navbar__game-name')
      element.innerText = game.game.name
      document.querySelector('.navbar__list').appendChild(element)
    }
    getStreams(topGames[0].game.name, appendStreams, 0)
  })
}
function checkName(nameChange) {
  return nameChange
    .replace(/\s/, '%20')
}

function appendStreams(streams, getMoreStreams) {
  if (!getMoreStreams) {
    document.querySelector('.stream-block').innerHTML = ''
  }
  streams.forEach((stream) => {
    const element = document.createElement('div')
    const html = template
      .replace('$url', stream.channel.url)
      .replace('$preview', stream.preview.large)
      .replace('$logo', stream.channel.logo)
      .replace('$status', stream.channel.status)
      .replace('$channel', stream.channel.display_name)
    element.classList.add('stream-block__stream')
    element.innerHTML = html
    document.querySelector('.stream-block').appendChild(element)
  })
}

function getStreams(gameName, cb, getMoreStreams) {
  const request2 = new XMLHttpRequest()
  request2.open('GET', `${baseURL}streams?game=${checkName(gameName)}&limit=${20 + getMoreStreams}`)
  request2.setRequestHeader('Client-ID', clientID)
  request2.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request2.onload = () => {
    if (request2.status >= 200 && request2.status < 400) {
      document.querySelector('.section__game-name').innerText = gameName
      const { streams } = JSON.parse(request2.responseText)
      if (getMoreStreams) {
        const newStreams = streams.slice(getMoreStreams, streams.length + 1)
        cb(newStreams, getMoreStreams)
      } else {
        cb(streams, 0)
      }
    } else {
      alert('網路不穩請稍後再試！')
    }
  }
  request2.send()
}

function getTopGames(cb) {
  const request = new XMLHttpRequest()
  request.open('GET', `${baseURL}games/top?limit=5`, true)
  request.setRequestHeader('Client-ID', clientID)
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      const topGames = JSON.parse(request.responseText).top
      cb(topGames)
    } else {
      alert('網路不穩請稍後再試！')
    }
  }
  request.send()
}
