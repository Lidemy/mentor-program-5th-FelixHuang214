const request = require('request')
const process = require('process')

let limit = ''

if (process.argv[2]) {
  limit = `?limit=${process.argv[2]}`
}

const data = {
  url: `https://api.twitch.tv/kraken/games/top${limit}`,
  headers: {
    Accept: 'application/vnd.twitchtv.v5+json',
    'Client-ID': 'e24g5pbpbi1yvkbjnb266hg75ypqw4'
  }
}

request(data, (error, response, body) => {
  const newBody = JSON.parse(body)
  if (response.statusCode === 200) {
    const topGame = newBody.top
    for (let i = 0; i < topGame.length; i++) {
      console.log(topGame[i].viewers, topGame[i].game.name)
    }
  } else {
    console.log('找不到資訊')
  }
})
