const db = require('../models')

const { Lottery } = db

const lotteryController = {
  index(req, res) {
    Lottery.findAll({
      where: {
        deleted: '0'
      },
      order: [
        ['id', 'ASC']
      ]
    }).then((rows) => {
      res.render('lottery', { rows })
    }).catch((err) => {
      res.render('lottery')
    })
  },
  addLotteryPage(req, res) {
    res.render('add_lottery')
  },
  addLottery(req, res, next) {
    const { file } = req
    if (isContentBlank(req.body) || file === undefined) {
      req.flash('errorMessage', 'Content cannot be blank.')
      return next()
    }
    Lottery.create({
      ...req.body,
      image: req.file.buffer,
      type: req.file.mimetype
    }).then(() => res.redirect('/'))
      .catch((err) => {
        req.flash('errorMessage', '機率請輸入數字！')
        return next()
      })
  },
  edit(req, res) {
    const { id } = req.params
    Lottery.findOne({
      where: {
        id
      }
    }).then((row) => res.render('edit', { row }))
      .catch(() => {
        req.flash('errorMessage', 'Something went wrong, please try again.')
        return res.render('/')
      })
  },
  handleEdit(req, res, next) {
    const { id } = req.params
    const file = req.file
      ? {
          type: req.file.mimetype,
          image: req.file.buffer
        }
      : {}
    if (isContentBlank(req.body)) {
      req.flash('errorMessage', 'Content cannot be blank.')
      return next()
    }
    Lottery.findOne({
      where: {
        id
      }
    }).then((row) => {
      Object.assign(row, {
        ...req.body,
        ...file
      })
      row.save({ fields: ['award', 'title', 'probability', 'content', 'type', 'image'] })
        .then(() => res.redirect('/'))
        .catch(() => {
          req.flash('errorMessage', '機率請輸入數字！')
          return next()
        })
    }).catch(() => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      return next()
    })
  },
  delete(req, res) {
    const { id } = req.params
    Lottery.findOne({
      where: {
        id
      }
    }).then((row) => {
      Object.assign(row, { deleted: '1' })
      row.save().then(() => res.redirect('/'))
    }).catch(() => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      res.redirect('/')
    })
  }
}

module.exports = lotteryController

function isContentBlank(obj) {
  return Object.values(obj).some((ele) => ele === '')
}
