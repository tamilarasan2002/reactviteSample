const mongoose = require('mongoose');

// Define the schema for a single book
const bookSchema = new mongoose.Schema({
  book_id: { type: String, required: true },
  book_author: { type: String, required: true },
  book_image: { type: String, required: true },
  book_category: { type: String, required: true },
  book_publisher: { type: String, required: true },
  book_pagecount: { type: Number, required: true },
  book_uploadedurl: { type: String, required: true },
});


// Define the schema for user books
const userBooksSchema = new mongoose.Schema({
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User ', required: true }, // Reference to User collection
  books: [bookSchema], // Directly store an array of bookSchema
});

// Create the UserBooks model
const UserBooks = mongoose.model('bookdatas', userBooksSchema);

module.exports = UserBooks;