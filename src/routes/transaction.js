const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {
    createTransaction,
    getTransactionsWithCondition,
    updateTransaction,
    deleteTransaction,
} = require('../controllers/transaction');

router.get('/', getTransactionsWithCondition);
router.post('/', authenticateUser, createTransaction);
router.delete('/', authenticateUser, deleteTransaction);
router.put('/:id', authenticateUser, updateTransaction);

module.exports = router;
