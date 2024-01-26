const {Author, validateCreateAuthors, validateUpdateAuthors} = require('../models/Author');
const asyncHandler = require('express-async-handler');
const {models} = require("mongoose");

/**
 * @desc Get all authors
 * @route GET /api/authors
 * @access Public
 * @method GET
 * */
const getAllAuthors = asyncHandler(
    async (req, res) => {
        const {page} = req.query;
        const limit = 2;
        const authorsList = await Author.find()
            .skip((page - 1) * limit)
            .limit(limit);
        res.status(200).json(authorsList);
    });

/**
 * @desc Get author by id
 * @route GET /api/authors/:id
 * @access Public
 * @method GET
 * */
const getAuthorById = asyncHandler(
    async (req, res) => {
        const author = await Author.findById(req.params.id);
        if (author) {
            res.status(200).json(author);
        } else {
            res.status(404).json({message: 'Author not found'});
        }
    });

/**
 * @desc Create authors
 * @route post /api/authors
 * @access Private
 * @method POST
 * */
const createAuthor = asyncHandler(
    async (req, res) => {
        const {error} = validateCreateAuthors(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const author = new Author({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            nationality: req.body.nationality,
            image: req.body.image,
        });
        const result = await author.save();
        res.status(201).json(result);
    });

/**
 * @desc Update authors
 * @route put /api/authors
 * @access Private
 * @method PUT
 */
const updateAuthor = asyncHandler(
    async (req, res) => {
        const {error} = validateUpdateAuthors(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const author = await Author.findByIdAndUpdate(req.params.id, {
            $set: {
                first_name: req.body.first_name,
                last_name: req.body.last_name,
                nationality: req.body.nationality,
                image: req.body.image,
            },
        }, {new: true,});
        if (author) {
            res.status(201).json(author);
        } else {
            res.status(404).json({message: 'Author not found'});
        }
    }
);

/**
 * @desc Delete authors
 * @route delete /api/authors/:id
 * @access Private
 * @method DELETE
 * */
const deleteAuthor = asyncHandler(
    async (req, res) => {
        if (req.params.id.match(/^[0-9a-fA-F]{24}$/)) {
            const result = await Author.findByIdAndDelete(req.params.id);
            if (result) {
                res.status(200).json({message: 'Author deleted'});
            } else {
                res.status(404).json({message: 'Author not found'});
            }
        } else {
            res.status(404).json({message: 'Id not correct'});
        }
    }
);

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
};