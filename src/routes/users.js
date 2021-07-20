const express = require('express');

const router = express.Router();
const usersController = require('../controllers/users');

router.get('/signup', usersController.render);

router.post('/signup', usersController.signUp);

module.exports = router;
