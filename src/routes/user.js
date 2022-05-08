const express = require('express');
const router = express.Router();

const { getUser, getUserById, updateUser } = require('../controllers/user');

router.get('/', getUser);
router.get('/:id', getUserById);
router.put('/', updateUser);

module.exports = router;
