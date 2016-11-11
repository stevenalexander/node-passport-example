const config = require('./config')
const express = require('express')
const session = require('express-session')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const passport = require('passport')
const OAuth2Strategy = require('passport-oauth2').Strategy
const request = require('request')

const indexRoute = require('./routes/index')

const app = express()

var sessionOptions = {
  secret: 'node-passport-example',
  cookie: {},
  resave: true,
  saveUninitialized: true
}

if (app.get('env') === 'production') {
  app.set('trust proxy', 1) // trust first proxy
  sessionOptions.cookie.secure = true // serve secure cookies
}

app.use(session(sessionOptions))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new OAuth2Strategy({
  authorizationURL: config.TOKEN_HOST + config.AUTHORIZE_PATH,
  tokenURL: config.TOKEN_HOST + config.TOKEN_PATH,
  clientID: config.CLIENT_ID,
  clientSecret: config.CLIENT_SECRET,
  callbackURL: config.REDIRECT_URI
},
function (accessToken, refreshToken, profile, cb) {
  console.log('getting user details: ' + accessToken)
  // Call API to get details on user
  var options = {
    uri: config.TOKEN_HOST + config.USER_DETAILS_PATH,
    qs: { access_token: accessToken },
    json: true
  }
  request(options, function (error, response, userDetails) {
    console.log('got user details')
    console.dir(userDetails)
    if (!error && response.statusCode === 200) {
      cb(null, {'email': userDetails.email})
    } else {
      cb(error, null)
    }
  })
}))
passport.serializeUser(function (user, done) {
  done(null, user)
})
passport.deserializeUser(function (user, done) {
  done(null, user)
})

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(path.join(__dirname, 'public')))

// index route will mount itself with any required dependencies
indexRoute(app)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})

module.exports = app
