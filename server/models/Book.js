// models/Book.js
const { Schema } = require('mongoose');

const bookSchema = new Schema({
  authors: [String],
  description: { type: String, required: true },
  bookId: { type: String, required: true },
  image: String,
  link: String,
  title: { type: String, required: true }
});

module.exports = bookSchema;

