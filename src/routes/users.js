const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/signup', usersController.renderSignUp);
router.post('/signup', usersController.signUp);

router.get('/signin', usersController.renderSignIn);
router.post('/signin', usersController.signIn);

router.get('/signout', usersController.signOut);

module.exports = router;
