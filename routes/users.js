const express = require('express');
const router = express.Router();
const {verifyTokenAndAuthorization, verifyTokenAndAdmin} = require('../middleware/verifyToken');
const {
    updateUser,
    getAllUsers,
    deleteUser,
    getUserById
} = require('../controllers/user_controller');

// api/users
router.route('/:id')
    .put( verifyTokenAndAuthorization, updateUser)
    .get( verifyTokenAndAuthorization, getUserById)
    .delete( verifyTokenAndAuthorization, deleteUser);

router.route('/').get( verifyTokenAndAdmin, getAllUsers);
// api/users/:id
module.exports = router;