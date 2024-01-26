const mongoose = require('mongoose');
const Joi = require('joi');

// Books Schema
const bookSchema = new mongoose.Schema({
    title: {
        type: String, required: true, trim: true, minlength: 3, maxlength: 250,
    }, author: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Author', required: true,
    }, description: {
        type: String, required: true, trim: true, minlength: 5,
    }, price: {
        type: Number, required: true, min: 0,
    }, cover: {
        type: String, required: true, enum: ['soft cover', 'medium cover', 'hard cover'],
    }
}, {timestamps: true});

// Books Model
const Book = mongoose.model('Book', bookSchema);

// Validation
const validateBookInput = (book) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(250).required(),
        author: Joi.string().required(),
        description: Joi.string().min(5).required(),
        price: Joi.number().min(0).required(),
        cover: Joi.string().valid('soft cover', 'medium cover', 'hard cover').required(),
    });
    return schema.validate(book);
};

const validateUpdateBookInput = (book) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(250),
        author: Joi.string(),
        description: Joi.string().min(5),
        price: Joi.number().min(0),
        cover: Joi.string().valid('soft cover', 'medium cover', 'hard cover'),
    });
    return schema.validate(book);
};

module.exports = {Book, validateBookInput, validateUpdateBookInput};

