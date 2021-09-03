const bcrypt = require('bcrypt')
const db = require('../models')

const { User } = db
const saltRounds = 10

const userController = {
  login(req, res) {
    res.render('login')
  },
  handleLogin(req, res, next) {
    const { username, password } = req.body
    if (!username || !password) {
      req.flash('errorMessage', 'Content cannot be blank.')
      return next()
    }
    User.findOne({
      where: {
        username
      }
    }).then((user) => {
      bcrypt.compare(password, user.password, (err, isSuccess) => {
        if (!isSuccess) {
          req.flash('errorMessage', 'Password or username was wrong.')
          return next()
        }
        if (err) {
          req.flash('errorMessage', 'Something went wrong, please try again.')
          return next()
        }
        req.session.username = username
        req.session.authority = user.authority
        req.session.UserId = user.id
        res.redirect('/')
      })
    }).catch(() => {
      req.flash('errorMessage', 'Password or username was wrong.')
      return next()
    })
  },
  logout(req, res, next) {
    req.session.destroy(() => {
      res.redirect('/')
    })
  },
  register(req, res) {
    res.render('register')
  },
  handleRegister(req, res, next) {
    const { username, password, nickname, authority } = req.body
    if (!username || !password || !nickname) {
      req.flash('errorMessage', 'Content cannot be blank.')
      return res.redirect('/register')
    }
    bcrypt.hash(password, saltRounds, (err, hash) => {
      User.create({
        username,
        password: hash,
        nickname,
        authority
      }).then((user) => {
        req.session.username = username
        req.session.authority = user.authority
        req.session.UserId = user.id
        res.redirect('/')
      }).catch(() => {
        req.flash('errorMessage', 'Duplicate account, please try again.')
        return next()
      })
    })
  }
}

module.exports = userController
