const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/authentication');

const {
    createTransaction,
    getTransactionsWithCondition,
    updateTransaction,
    deleteTransaction,
    findAndUpdateTransaction,
} = require('../controllers/transaction');

router.get('/', getTransactionsWithCondition);
router.post('/', authenticateUser, createTransaction);
router.delete('/', authenticateUser, deleteTransaction);
router.put('/:id', authenticateUser, updateTransaction);
router.put('/find/:id', authenticateUser, findAndUpdateTransaction);

module.exports = router;
