const mongoose = require('mongoose');
const Joi = require("joi");

const AuthorSchema = new mongoose.Schema({
        first_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 200,
        },
        last_name: {
            type: String,
            required: true,
            trim: true,
            minlength: 3,
            maxlength: 200,
        },
        nationality: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            maxlength: 100,
        },
        image: {
            type: String,
            default: 'default-avatar.png',
        },
    }, {
        timestamps: true,
    },
);

const Author = mongoose.model('Author', AuthorSchema);

// validate creation authors
function validateCreateAuthors(obj) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(200).required(),
        last_name: Joi.string().min(3).max(200).required(),
        nationality: Joi.string().min(2).max(100).required(),
        image: Joi.string().default('default-avatar.png'),
    })
    return schema.validate(obj);
}

// validate update authors
function validateUpdateAuthors(obj) {
    const schema = Joi.object({
        first_name: Joi.string().min(3).max(200),
        last_name: Joi.string().min(3).max(200),
        nationality: Joi.string().min(2).max(100),
        image: Joi.string().default('default-avatar.png'),
    })
    return schema.validate(obj);
}

module.exports = {Author, validateUpdateAuthors, validateCreateAuthors,};