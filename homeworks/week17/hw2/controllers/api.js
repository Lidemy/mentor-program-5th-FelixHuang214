const db = require('../models')

const { Lottery } = db

const apiController = {
  async get(req, res) {
    const id = await getRandomApiId()
    Lottery.findOne({
      where: {
        id
      }
    }).then((rows) => {
      res.set('Content-type', 'application/json')
      rows.image = rows.image.toString('base64')
      res.status(200).json({
        rows
      })
    }).catch((err) => {
      res.status(400).json({
        message: 'error'
      })
    })
  },
  getImage(req, res) {
    const { id } = req.params
    Lottery.findOne({
      where: {
        id,
        deleted: 0
      }
    }).then((row) => {
      const image = row.image.toString('base64')
      res.render('image', {
        image,
        type: row.type
      })
    }).catch(() => {
      res.redirect('/')
    })
  }
}

module.exports = apiController

function getRandomApiId() {
  const promise = new Promise((resolve, reject) => {
    Lottery.findAll({
      where: {
        deleted: '0'
      }
    }).then((rows) => {
      const ids = rows.map((row) => [row.id, row.probability])
      resolve(randomId(ids))
    })
  })
  return promise
}

function randomId(arr) {
  const randomNumber = Math.floor(Math.random() * 100)
  let count = 0
  let n = 0
  while (n < 100) {
    console.log(arr)
    const range = [n, n + arr[count][1]]
    console.log(range)
    if (randomNumber >= range[0] && randomNumber < range[1]) {
      return arr[count][0]
    }
    n += arr[count][1]
    count++
  }
}
