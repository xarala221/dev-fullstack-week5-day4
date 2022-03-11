const mongoose = require('mongoose')

const schema = mongoose.Schema({
  title: String,
  resume: String,
  author: String,
})

module.exports = mongoose.model('Book', schema)
