const express = require('express')
const passport = require('passport')

module.exports = function (app) {
  var route = express.Router()

  app.use('/', route)

  route.get('/', function (req, res) {
    var message
    if (req.user) {
      message = `Logged in as user: ${JSON.stringify(req.user, null, 2)}`
    }

    return res.render('index', { title: 'Login', message: message })
  })

  route.get('/auth/:provider', passport.authenticate('oauth2'))

  route.get('/auth/:provider/callback', passport.authenticate('oauth2', { failureRedirect: '/failure' }),
    function (req, res) {
    // Successful authentication, redirect home.
      res.redirect('/')
    })

  route.get('/failure', function (req, res) {
    return res.render('index', { title: 'Login', message: 'Failed to login!' })
  })
}
