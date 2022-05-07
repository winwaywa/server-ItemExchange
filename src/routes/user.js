const express = require('express');
const router = express.Router();

const { getUser, updateUser } = require('../controllers/user');

router.get('/', getUser);
router.put('/', updateUser);

module.exports = router;
