const db = require('../models')

const Book = db.books
const Op = db.Sequelize.Op

// Create and Save a new Book
const createNewBook = (req, res) => {
  console.log('RE ', req.body)

  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: 'Content can not be empty!',
    })
    return
  }

  // Create a Book
  const book = {
    title: req.body.title,
    resume: req.body.resume,
    author: req.body.author,
    published: req.body.published ? req.body.published : false,
  }

  // Save Book in the database
  Book.create(book)
    .then((data) => {
      res.redirect('/books')
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Book.',
      })
    })
}

// Retrieve all Books from the database.
const getAllBooks = (req, res) => {
  const title = req.query.title
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null

  Book.findAll({ where: condition })
    .then((data) => {
      console.log('data ', data)
      res.render('books', { title: 'Liste des livres', books: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Books.',
      })
    })
}

// Find a single Book with an id
const getOneBook = (req, res) => {
  const id = req.params.id
  Book.findByPk(id)
    .then((data) => {
      res.render('book', { title: data.title, book: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Book with id=' + id,
      })
    })
}

const getBookToUpdate = (req, res) => {
  const id = req.params.id
  Book.findByPk(id)
    .then((data) => {
      res.render('update', { title: data.title, book: data })
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Book with id=' + id,
      })
    })
}

// Update a Book by the id in the request
const updateBook = (req, res) => {
  const id = req.params.id

  Book.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.redirect('/books')
      } else {
        res.send({
          message: `Cannot update Book with id=${id}. Maybe Book was not found or req.body is empty!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Book with id=' + id,
      })
    })
}

// Delete a Book with the specified id in the request
const deleteBook = (req, res) => {
  const id = req.params.id

  Book.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Book was deleted successfully!',
        })
      } else {
        res.send({
          message: `Cannot delete Book with id=${id}. Maybe Book was not found!`,
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Book with id=' + id,
      })
    })
}

// Delete all Books from the database.
const deleteAllBooks = (req, res) => {
  Book.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Books were deleted successfully!` })
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while removing all Books.',
      })
    })
}

// find all published Book
const findAllPublishedBook = (req, res) => {
  Book.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data)
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Books.',
      })
    })
}

module.exports = {
  getAllBooks,
  getOneBook,
  createNewBook,
  getBookToUpdate,
  updateBook,
  deleteBook,
  deleteAllBooks,
}
