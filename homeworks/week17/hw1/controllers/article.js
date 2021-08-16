const db = require('../models')

const { Article, User } = db

const articleController = {
  index(req, res) {
    const page = req.params.page > 0 ? parseInt(req.params.page, 10) : 1
    const options = {
      where: {
        deleted: '0'
      },
      include: User,
      order: [
        ['id', 'DESC']
      ],
      limit: 5,
      offset: (page - 1) * 5
    }
    getDataFromDb(Article, options).then((data) => {
      const { rows } = data
      const finalPage = Math.ceil(data.count / options.limit)
      const pageMove = finalPage
      res.render('index', {
        rows,
        page,
        finalPage,
        pageMove
      })
    }).catch((err) => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      // 因部屬在 heroku，因此將錯誤訊息印在網頁上，讓網頁不會整個崩潰
      res.send(err)
    })
  },
  article(req, res, next) {
    Article.findOne({
      where: {
        id: req.params.id
      },
      include: User
    }).then((row) => {
      res.render('article', {
        row
      })
    }).catch(() => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      return next()
    })
  },
  addArticle(req, res, next) {
    const { username } = req.session
    if (!username) {
      return next()
    }
    res.render('add_article')
  },
  handleAddArticle(req, res, next) {
    const { username, UserId } = req.session
    const { title, type, content } = req.body
    if (!username) {
      return next()
    }
    if (isContentBlank(req.body)) {
      req.flash('errorMessage', 'title, type or content cannot be blank.')
      return next()
    }
    Article.create({
      title,
      type,
      content,
      UserId
    }).then(() => {
      res.redirect('/')
    }).catch(() => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      return next()
    })
  },
  admin(req, res, next) {
    if (req.session.authority !== 'ADMIN') {
      return next()
    }
    const page = req.params.page > 0 ? parseInt(req.params.page, 10) : 1
    const options = {
      limit: 5,
      offset: (page - 1) * 5,
      order: [
        ['id', 'DESC']
      ],
      include: User
    }
    getDataFromDb(Article, options).then((data) => {
      const { rows } = data
      const finalPage = Math.ceil(data.count / options.limit)
      const pageMove = finalPage
      res.render('admin', {
        rows,
        page,
        finalPage,
        pageMove
      })
    }).catch((err) => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      // 因部屬在 heroku，因此將錯誤訊息印在網頁上，讓網頁不會整個崩潰
      res.send(err)
    })
  },
  edit(req, res) {
    Article.findOne({
      where: {
        id: req.params.id
      },
      include: User
    }).then((row) => {
      if (!haveAUTHToCRUD(req, row)) {
        return res.redirect('/')
      }
      res.render('edit', { row })
    }).catch(() => {
      req.flash('errorMessage', 'Something went wrong, please try again.')
      return res.redirect('/')
    })
  },
  handleEdit(req, res, next) {
    if (isContentBlank(req.body)) {
      req.flash('errorMessage', 'Content cannot be blank.')
      return next()
    }
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((row) => {
      if (!haveAUTHToCRUD(req, row)) {
        return res.redirect('/')
      }
      Object.assign(row, req.body)
      row.save({ fields: ['title', 'type', 'content'] })
      return res.redirect('/')
    }).catch(() => {
      req.flash('errorMessage', 'You are not article owner,so you cannot edit it.')
      return res.redirect('/')
    })
  },
  delete(req, res, next) {
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((row) => {
      if (!haveAUTHToCRUD(req, row)) {
        return next()
      }
      row.deleted = '1'
      row.save({ fields: ['deleted'] })
      return res.redirect('/admin')
    }).catch((err) => {
      req.flash('errorMessage', 'You are not article owner,so you cannot delete it.')
      return res.redirect('/admin')
    })
  },
  restore(req, res) {
    if (req.session.authority !== 'ADMIN') {
      req.flash('errorMessage', 'You are not admin,so you cannot restore it.')
      return res.redirect('/admin')
    }
    Article.findOne({
      where: {
        id: req.params.id
      }
    }).then((row) => {
      row.deleted = '0'
      row.save()
      return res.redirect('/admin')
    }).catch(() => {
      req.flash('errorMessage', 'You are not article owner,so you cannot delete it.')
      return res.redirect('/admin')
    })
  }
}

module.exports = articleController

function getDataFromDb(model, options) {
  const promise = new Promise((resolve, reject) => {
    model.findAndCountAll(options).then((data) => {
      resolve(data)
    }).catch((err) => {
      reject(err)
    })
  })
  return promise
}

function isContentBlank(obj) {
  return Object.values(obj).some((ele) => ele === '')
}

function haveAUTHToCRUD(req, row) {
  const { UserId, authority } = req.session
  return (authority === 'ADMIN' || UserId === row.UserId)
}
