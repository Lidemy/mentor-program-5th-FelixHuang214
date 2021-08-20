const express = require('express')
const multer = require('multer')
const flash = require('connect-flash')
const session = require('express-session')
const lotteryController = require('./controllers/lottery')
const apiController = require('./controllers/api')

const app = express()
const port = process.env.PORT || 5002
const upload = multer({
  limit: {
    fileSize: 1000000
  },
  fileFilter(req, file, cb) {
    if (file.mimetype !== 'image/jpeg' &&
        file.mimetype !== 'image/png') {
      return cb('Please upload an image', false)
    }
    return cb(null, true)
  }
}).single('picture')

app.set('view engine', 'ejs')
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  next()
})
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}))
app.use(express.static(`${__dirname}/public`))
app.use(flash())
app.use(express.json())
app.use(express.urlencoded())
app.use((req, res, next) => {
  res.locals.errorMessage = req.flash('errorMessage')
  next()
})

app.get('/', lotteryController.index)
app.get('/add_lottery', lotteryController.addLotteryPage)
app.post('/add_lottery', uploadErrorControl, lotteryController.addLottery, pageBack)
app.get('/edit/:id', lotteryController.edit)
app.post('/edit/:id', uploadErrorControl, lotteryController.handleEdit, pageBack)
app.get('/delete/:id', lotteryController.delete)
app.get('/api', apiController.get)
app.get('/image/:id', apiController.getImage)

app.listen(port)

function pageBack(req, res) {
  res.redirect('back')
}

function uploadErrorControl(req, res, next) {
  upload(req, res, (err) => {
    if (!err) {
      return next()
    }
    req.flash('errorMessage', err)
    res.redirect(req.originalUrl)
  })
}
