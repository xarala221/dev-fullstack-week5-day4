const Book = require('../models/book')

function getAllBooks(req, res) {
  Book.find()
    .then(function (data) {
      res.render('books', { title: 'Mes lectures en 2022', books: data })
    })
    .catch(function (err) {
      res.status(500).send({ message: err.message })
    })
}

function createBook(req, res) {
  if (!req.body.title || !req.body.author || !req.body.resume) {
    res.status(400).send('Vous devez remplir les données')
  }

  const book = {
    title: req.body.title,
    author: req.body.author,
    resume: req.body.resume,
  }
  const newBook = new Book(book)
  newBook.save(function (err) {
    if (err) {
      res.status(500).send({ message: err.message })
    }
    res.redirect('/books')
  })
}

function getBookDetails(req, res) {
  const id = req.params.id
  Book.findOne({ _id: id })
    .then(function (data) {
      res.render('book', { title: data.title, book: data })
    })
    .catch(function (err) {
      res.status(500).send({ message: err.message })
    })
}

function getBooktoUpdate(req, res) {
  const id = req.params.id
  Book.findOne({ _id: id })
    .then(function (data) {
      res.render('update', { title: data.title, book: data })
    })
    .catch(function (err) {
      res.status(500).send({ message: err.message })
    })
}

function updateBook(req, res) {
  const id = req.params.id
  Book.updateOne(
    {
      _id: id,
    },
    req.body,
    { upsert: true },
    function (err) {
      if (err) {
        res.status(500).send({ message: err.message })
      }
      res.redirect('/books')
    }
  )
}

function deleteBook(req, res) {
  const id = req.params.id

  Book.deleteOne({ _id: id })
    .then(function () {
      // res.send("Livre supprimé")
      res.redirect('/books')
    })
    .catch(function (error) {
      res.status(500).send({ message: err.message })
    })
}

module.exports = {
  getAllBooks,
  createBook,
  getBookDetails,
  deleteBook,
  getBooktoUpdate,
  updateBook,
}
