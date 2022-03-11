const express = require('express')

const router = express.Router()

const book = require('../controllers/book')

router.get('/', book.getAllBooks)
router.post('/', book.createBook)

router.get('/:id/details', book.getBookDetails)

router.get('/:id/delete', book.deleteBook)

router.get('/:id/update', book.getBooktoUpdate)
router.post('/:id/update', book.updateBook)

module.exports = router
