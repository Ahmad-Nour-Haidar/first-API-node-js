const asyncHandler = require("express-async-handler");
const {Book, validateBookInput, validateUpdateBookInput} = require("../models/Books");

/**
 * @desc Get all books
 * @route GET /api/books
 * @access Public
 * @method GET
 */
const getAllBooks = asyncHandler(
    async (req, res) => {
        // Comparison Query Operators
        // $eq, $ne, $gt, $gte, $lt, $lte, $in, $nin, $regex,
        const {minPrice, maxPrice} = req.query;
        let books;
        if (minPrice && maxPrice) {
            books = await Book.find({
                price: {$gte: minPrice, $lte: maxPrice},
            }).populate("author", ["_id", "firstName", "lastName"]);
        } else {
            books = await Book.find().populate("author", [
                "_id",
                "firstName",
                "lastName",
            ]);
        }
        res.status(200).json(books);
    });


/**
 * @desc Get book by id
 * @route GET /api/books/:id
 * @access Public
 * @method GET
 */
const getBookById = asyncHandler(
    async (req, res) => {
        const book = await Book.findById(req.params.id).populate('author');
        if (book) {
            res.status(200).json(book);
        } else {
            res.status(404).json({message: 'Book not found'});
        }
    });

/**
 * @desc Create books
 * @route post /api/books
 * @access Private
 * @method POST
 */
const createBook = asyncHandler(
    async (req, res) => {
        const {error} = validateBookInput(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const book = new Book({
            title: req.body.title,
            author: req.body.author,
            description: req.body.description,
            price: req.body.price,
            cover: req.body.cover,
        });
        const result = await book.save();
        res.status(201).json(result);
    }
);

/**
 * @desc Update books
 * @route put /api/books
 * @access Private
 * @method PUT
 */
const updateBook = asyncHandler(
    async (req, res) => {
        const {error} = validateUpdateBookInput(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const book = await Book.findByIdAndUpdate(req.params.id, {
            $set: {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                price: req.body.price,
                cover: req.body.cover,
            },
        }, {new: true,});
        if (book) {
            res.status(201).json(book);
        } else {
            res.status(404).json({message: 'Book not found'});
        }
    }
);

/**
 * @desc Delete books
 * @route delete /api/books/:id
 * @access Private
 * @method DELETE
 */
const deleteBook = asyncHandler(
    async (req, res) => {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const result = await Book.findByIdAndDelete(req.params.id);
            if (result) {
                res.status(200).json({message: 'Book deleted'});
            } else {
                res.status(404).json({message: 'Book not found'});
            }
        } else {
            res.status(400).json({message: 'Id not valid'});
        }
    }
);


module.exports = {
    getAllBooks,
    getBookById,
    createBook,
    updateBook,
    deleteBook,
};