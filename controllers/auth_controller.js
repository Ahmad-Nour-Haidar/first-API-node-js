const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const {User, validateRegisterUser, validateLoginUser} = require('../models/User');

/**
 * @description Registers a user
 * @route POST /api/users/register
 * @access Public
 * @method POST
 * */
const register = asyncHandler(
    async (req, res) => {
        const {error} = validateRegisterUser(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        let user = await User.findOne({email: req.body.email});
        if (user) {
            return res.status(400).json({message: 'User already exists'});
        }
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
        user = new User({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
        });
        const result = await user.save();
        const token = user.generateAuthToken();
        const {password, ...other} = result._doc;
        res.status(201).json({...other, token});
    });

/**
 * @description Login a user
 * @route POST /api/users/login
 * @access Public
 * @method POST
 * */
const login = asyncHandler(
    async (req, res) => {
        const {error} = validateLoginUser(req.body);
        if (error) {
            return res.status(400).json({message: error.details[0].message});
        }
        const user = await User.findOne({email: req.body.email});
        if (!user) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: 'Invalid email or password'});
        }
        const token = user.generateAuthToken();
        const {password, ...other} = user._doc;
        res.status(200).json({...other, token});
    });

module.exports = {register, login};
