const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const { createTransaction, getTransactionsWithCondition } = require('../controllers/transaction');

router.get('/', getTransactionsWithCondition);
router.post('/', authenticateUser, createTransaction);

module.exports = router;
