const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User, validateUpdateUser} = require('../models/User');

/**
 * @desc Updates a user
 * @route PUT /api/users/update
 * @access Private
 * @method PUT
 * */
const updateUser = asyncHandler(
    async (req, res) => {
        const {error} = validateUpdateUser(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10);
            req.body.password = await bcrypt.hash(req.body.password, salt);
        }
        const user = await User.findByIdAndUpdate(req.params.id,
            {
                $set: {
                    email: req.body.email,
                    username: req.body.username,
                    password: req.body.password,
                }
            }, {new: true}).select('-password');
        if (user) {
            res.status(200).json({
                success: true,
                data: user
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    });

/**
 * @desc Gets all users
 * @route GET /api/users
 * @access Private
 * @method GET
 * */
const getAllUsers = asyncHandler(
    async (req, res) => {
        const users = await User.find().select('-password');
        res.status(200).json({
            success: true,
            data: users
        });
    });

/**
 * @desc Deletes a user
 * @route DELETE /api/users/:id
 * @access Private (only admin and user himself can delete)
 * @method DELETE
 * */
const deleteUser = asyncHandler(
    async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        if (user) {
            res.status(200).json({
                success: true,
                data: user
            });
        } else {
            res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
    });

/**
 * @desc Get a user by id
 * @route GET /api/users/:id
 * @access Private
 * @method GET
 * */
const getUserById = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) {
        res.status(200).json({
            success: true,
            data: user
        });
    } else {
        res.status(404).json({
            success: false,
            message: 'User not found'
        });
    }
});

module.exports = {
    updateUser,
    getAllUsers,
    deleteUser,
    getUserById
}
