const express = require('express');
const router = express.Router();

const { getAllUsers, getUser, getUserByUserName, updateUser } = require('../controllers/user');
const authenticateUser = require('../../src/middleware/authentication');

router.get('/', getAllUsers);
router.get('/me', authenticateUser, getUser);
router.get('/:username', getUserByUserName);
router.put('/', authenticateUser, updateUser);

module.exports = router;
