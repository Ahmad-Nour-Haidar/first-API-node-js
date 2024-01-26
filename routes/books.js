const express = require('express');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middleware/verifyToken');
const {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
} = require('../controllers/book_controllers')

// /api/books
router.route('/')
    .get(getAllBooks)
    .post(verifyTokenAndAdmin, createBook);

// /api/books/:id
router.route('/:id')
    .get(getBookById)
    .put(verifyTokenAndAdmin, updateBook)
    .delete(verifyTokenAndAdmin, deleteBook);

module.exports = router;