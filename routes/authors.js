const express = require('express');
const router = express.Router();
const {verifyTokenAndAdmin} = require('../middleware/verifyToken')
const {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
} = require('../controllers/author_controller');


router.route('/')
    .get(getAllAuthors)
    .post(verifyTokenAndAdmin, createAuthor);
router.route('/:id')
    .get(getAuthorById)
    .put(verifyTokenAndAdmin, updateAuthor)
    .delete(verifyTokenAndAdmin, deleteAuthor);

module.exports = router;