const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

// User Schema
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        minlength: 5,
        maxlength: 100,
        unique: true
    },
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        maxlength: 200,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {timestamps: true});

// Generate Token
UserSchema.methods.generateAuthToken = function () {
    return jwt.sign({id: this._id, isAdmin: this.isAdmin}, process.env.JWT_SECRET_KEY);
}

// User Model
const User = new mongoose.model('User', UserSchema);

// Validation Register User
function validateRegisterUser(user) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        username: Joi.string().trim().min(2).max(200).required(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(user);
}

// Validation Login User
function validateLoginUser(user) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).required().email(),
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(user);
}

// Validation Change Password User
function validateChangePassword(user) {
    const schema = Joi.object({
        password: Joi.string().trim().min(6).required(),
    });
    return schema.validate(user);
}

// Validation Update User
function validateUpdateUser(user) {
    const schema = Joi.object({
        email: Joi.string().trim().min(5).max(100).email(),
        username: Joi.string().trim().min(2).max(200),
        password: Joi.string().trim().min(6),
    });
    return schema.validate(user);
}

module.exports = {
    User,
    validateRegisterUser,
    validateLoginUser,
    validateUpdateUser,
    validateChangePassword
}