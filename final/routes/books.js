var express = require('express')
var router = express.Router()
const book = require('../controllers/book')

/* GET users listing. */

router.get('/', book.getAllBooks)
router.post('/', book.createNewBook)
router.get('/published', book.getAllBooks)
router.get('/:id/details', book.getOneBook)
// Update a Book with id
router.get('/:id/update', book.getBookToUpdate)
router.post('/:id/update', book.updateBook) // you should use put in real world or intall library like method-override
// Delete a Book with id
router.get('/:id/delete', book.deleteBook)
// Delete all book
router.get('/deleteAll', book.deleteAllBooks)

module.exports = router
