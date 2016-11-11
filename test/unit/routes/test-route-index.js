/* global describe beforeEach it */
var supertest = require('supertest')
var express = require('express')
var bodyParser = require('body-parser')

describe('index', function () {
  var request

  beforeEach(function () {
    // Setting up the app this way means all dependencies from app.js are explicitly defined per route file
    var app = express()
    app.set('views', './app/views')
    app.set('view engine', 'pug')
    app.use(bodyParser.urlencoded({ extended: false }))

    var route = require('../../../app/routes/index')

    route(app)

    request = supertest(app)
  })

  describe('GET /', function () {
    it('should respond with a 200', function () {
      request
        .get('/')
        .expect(200)
    })
  })
})
