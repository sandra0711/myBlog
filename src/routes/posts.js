const express = require('express');

const isUserExist = require('../middleware/isuser');

const router = express.Router();
const postsController = require('../controllers/posts');

router.get('/', isUserExist, postsController.render);

module.exports = router;
