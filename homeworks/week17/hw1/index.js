const express = require('express')
const flash = require('connect-flash')
const session = require('express-session')
const userController = require('./controllers/user')
const articleController = require('./controllers/article')

const port = process.env.PORT || 5001
const app = express()
app.use(flash())
app.set('view engine', 'ejs')
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use((req, res, next) => {
  res.locals.username = req.session.username
  res.locals.authority = req.session.authority
  res.locals.UserId = req.session.UserId
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})
app.use(express.urlencoded())
app.use(express.json())
app.use(express.static(`${__dirname}/public`))

app.get(['/', '/home', '/home/:page'], articleController.index)
app.get('/login', userController.login)
app.post('/login', userController.handleLogin, pageBack)
app.get('/logout', userController.logout, pageBack)
app.get('/register', userController.register)
app.post('/register', userController.handleRegister, pageBack)
app.get('/article/:id', articleController.article, pageBack)
app.get('/add_article', articleController.addArticle, directHome)
app.post('/add_article', articleController.handleAddArticle, directHome)
app.get(['/admin/:page', '/admin'], articleController.admin, directHome)
app.get('/edit/:id', articleController.edit, directHome)
app.post('/edit/:id', articleController.handleEdit, pageBack)
app.get('/delete/:id', articleController.delete, directHome)
app.get('/restore/:id', articleController.restore, directHome)
app.listen(port, () => {
  console.log('ENTER 5001 PORT')
})

function pageBack(req, res) {
  res.redirect('back')
}

function directHome(req, res) {
  res.redirect('/')
}
