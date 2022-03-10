var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Liste de lecture 2022' })
})

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'A propos de nous' })
})

module.exports = router
