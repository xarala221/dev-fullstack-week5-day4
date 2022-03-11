var express = require('express')
var router = express.Router()

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Lecture' })
})

router.get('/about', function (req, res, next) {
  res.render('about', { title: 'A propos de la plateforme' })
})
module.exports = router
