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

const inputArray = ['https://api.twitch.tv/kraken/', 'e24g5pbpbi1yvkbjnb266hg75ypqw4']
let offset = 0

window.onload = function() {
  document.querySelector('.navbar__list')
    .addEventListener('click', (e) => {
      if (e.target.tagName.toLowerCase() === 'li') {
        const gameName = e.target.innerText
        offset = 0
        getStreams(gameName, appendStreams, offset)
      }
    })

  document.querySelector('.btn-load')
    .addEventListener('click', (e) => {
      const gameName = document.querySelector('.section__game-name').innerText
      getMoreStreams(gameName)

      // 100 條影片將按鈕隱藏
      /*
      if (gameCount + 20 === 100) {
        document.querySelector('.btn-load').classList.add('btn--hide')
      }
      */
    })

  getTopGames((topGames) => {
    for (const game of topGames) {
      const element = document.createElement('li')
      element.classList.add('navbar__game-name')
      element.innerText = game.game.name
      document.querySelector('.navbar__list').appendChild(element)
    }
    getStreams(topGames[0].game.name, appendStreams, offset)
  })
}
/*
function checkName(nameChange) {
  return nameChange
    .replace(/\s/, '%20')
}
*/
function appendStreams(streams, haveOffset) {
  if (!haveOffset) {
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

function getMoreStreams(gameName) {
  offset += 20
  getStreams(gameName, appendStreams, offset)
}

function getStreams(gameName, cb, offset) {
  const request = new XMLHttpRequest()
  request.open('GET', `${inputArray[0]}streams?game=${encodeURIComponent(gameName)}&limit=20&offset=${offset}`)
  request.setRequestHeader('Client-ID', inputArray[1])
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      document.querySelector('.section__game-name').innerText = gameName
      let streams
      try {
        streams = JSON.parse(request.responseText).streams
      } catch (err) {
        console.log('Error! 解析 STREAMS 資料錯誤！')
        console.log('ERROR:', err)
      }
      cb(streams, offset)
      /*
      if (getMoreStreams) {
        const newStreams = streams.slice(getMoreStreams, streams.length + 1)
        cb(newStreams, getMoreStreams)
      } else {
        cb(streams) // , 0)
      }
      */
    } else {
      alert('網路不穩請稍後再試！')
    }
  }
  request.send()
}

function getTopGames(cb) {
  const request = new XMLHttpRequest()
  request.open('GET', `${inputArray[0]}games/top?limit=5`, true)
  request.setRequestHeader('Client-ID', inputArray[1])
  request.setRequestHeader('Accept', 'application/vnd.twitchtv.v5+json')
  request.onload = () => {
    if (request.status >= 200 && request.status < 400) {
      let topGames
      try {
        topGames = JSON.parse(request.responseText).top
      } catch (err) {
        console.log('Error! 解析 TOP GAME 資料錯誤！')
        console.log('ERROR:', err)
      }
      cb(topGames)
    } else {
      alert('網路不穩請稍後再試！')
    }
  }
  request.send()
}
