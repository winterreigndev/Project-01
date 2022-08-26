// imports
const express = require('express');
const router = express.Router();

// controllers
const UserController = require('../controllers/user');

// router paths
// -- register user
router.post('/register', UserController.user_register);

// -- login user
router.post('/login', UserController.user_login);

// -- get all users
router.get('/users', UserController.user_list);

// -- update user information
router.patch('/:userId', UserController.user_update);

// -- get single user profile
router.get('/:userId', UserController.user_profile);

// -- delete user
router.delete('/:userId', UserController.user_delete);

// export router
module.exports = router;
