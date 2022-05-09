const express = require('express');
const router = express.Router();

const { getUser, getUserById, updateUser } = require('../controllers/user');
const authenticateUser = require('../../src/middleware/authentication');

router.get('/', authenticateUser, getUser);
router.get('/:id', getUserById);
router.put('/', authenticateUser, updateUser);

module.exports = router;
